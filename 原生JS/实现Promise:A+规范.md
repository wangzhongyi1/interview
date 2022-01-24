# Promise/A+规范
> Promise 表示一个异步操作的最终结果。与Promise最主要的交互方式是通过将函数传入它的then方法从而获得Promise最终的值或Promise最终拒绝的原因。

## 1. 术语
- `promise` 是一个包含了兼容 promise 规范 then 方法的对象或函数
- `thenable` 是一个包含了 then 方法的对象或函数
- `value` 是任何 javascript 的值（包括 undefined、thenable、promise等）
- `exception` 是由 throw 语句抛出来的值
- `reason` 是一个用于表述 promise 被拒绝的原因

****

## 2. 要求
### 2.1 Promise状态
> 一个 Promise 必须处在其中之一的状态：pending、fulfilled、rejected
- 初始状态为 pending，pending状态可以转化为 fulfilled 状态或 rejected 状态
- 如果是 fulfilled 状态，则不能转化为其他任何状态，必须有一个值，且这个值不能被改变
- 如果是 rejected 状态，则不能转化为其他任何状态，必须有一个原因，且这个表示原因的值不能被改变

### 2.2 then 方法
> 一个 Promise 必须提供一个 then 方法来获取其值或原因。
```js
// Promise 的 then 方法接受两个参数
promise.then(onFulfilled, onRejected)
```
1. onFulfilled 和 onRejected 都是可选参数
    - onFulfilled 必须是函数类型，如果不是，则忽略
    - onRejected  必须是函数类型，如果不是，则忽略

2. 如果 onFulfilled 是函数
    - 必须在promise变成 fulfilled 时，调用 onFulfilled，参数是promise的value
    - 在promise的状态不是 fulfilled 之前，不能调用
    - onFulfilled 只能被调用一次

3. 如果 onRejected 是函数
    - 必须在promise变成 rejected 时，调用 onRejected，参数是promise的reason
    - 在promise的状态不是 rejected 之前，不能调用
    - onRejected 只能被调用一次
4. then必须返回一个promise
    ```js
        promise2 = promise1.then(onFulfilled, onRejected);
    ```
5. 对于一个promise，它的then方法可以调用多次
    - 当promise fulfilled后，所有onFulfilled都必须按照其注册顺序执行。
    - 当promise rejected后，所有onRejected都必须按照其注册顺序执行。


## 主要解决的问题
1. 回调地狱
2. 代码可读性
3. 信任问题

> 在使用第三方库时使用回调编码我们心里就默认了，传入的回调函数会按照我们预期的那样被调用。但是我们传给第三方的回调函数被调用情况完全是由第三方决定的，这其中存在着很严重的信任问题！

- 回调编码的信任问题：
    + 调用回调过早
    + 调用回调过晚
    + 调用回调次数过多或过少
    + 回调没有调用
    + 吞掉可能出现的错误和异常
```js

//某个第三方库
function method(cb) {
    setTimeout(() => {
        cb && cb();
        //这个库的bug，导致 cb 被调用多次
        cb && cb();
    })
}

function method() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(123)
            //状态只能被改变一次，之后再调用不会生效，下面两句并不会执行
            resolve(456);
            reject('出错了！')
        })
    })
}
```

## 实现
- 一般使用情况
```js
var p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(123)
    }, 1000)
})

p.then(
    value => console.log(value),
    reason => console.log(reason)
)
```
> 第一部分：
```js
/*思路：
    1. Promise 初始状态为 pending
    2. 可以从 pending 转化为 fullfilled/rejected 状态，且只可以改变一次
    3. executor 是同步执行
    4. executor 中抛出异常，就将状态置为 rejected
*/

class Promise {
    constructor (executor) {
        this.status = 'pending';
        this.value = null;
        this.reason = null;

        const resolve = (value) => {
            if (this.status === 'pending') {
                this.value = value;
                this.status = 'fulfilled'
            }
        }
        const reject = (reason) => {
            if (this.status === 'pending') { //这里就保证了状态只会被改变一次
                this.reason = reason
                this.status = 'rejected'
            }
        }

        try {
            executor(resolve, reject)
        }catch(e){
            reject(e);
        }
    }
}
```
> 第二部分：
```js
/*思路：
    1. 调用 then 方法 时可以注册两个回调函数
    2. 第一个表示成功的回调，第二个表示失败的回调
    3. 只能有一个被调用
    4. 需要先注册，后调用（异步）
    5. 可以多次调用 then 方法
*/

class Promise {
    constructor (executor) {
        this.status = 'pending';
        this.value = null;
        this.reason = null;

        this.callbackArr = [];

        const resolve = (value) => {
            if (this.status === 'pending') {
                this.value = value;
                this.status = 'fulfilled';

                setTimeout(() => {
                    this.callbackArr.forEach(v => {
                        v.onFulfilled(this.value)
                    })
                });

            }
        }
        const reject = (reason) => {
            if (this.status === 'pending') { //这里就保证了状态只会被改变一次
                this.reason = reason;
                this.status = 'rejected';

                setTimeout(() => {
                    this.callbackArr.forEach(v => {
                        v.onRejected(this.reason)
                    })
                });
            }
        }

        try {
            executor(resolve, reject);
        }catch(e){
            reject(e);
        }
    }

    then (onFulfilled, onRejected) {
        this.callbackArr.push({ onFulfilled, onRejected }) //先注册
    }
}
```
> 第三部分：
```js
/*思路：
    1. 调用 then 方法后，会触发对应的回调函数，然后返回一个新的 Promise 实例供后续链式调用
        1.1 如果被触发的回调函数中返回的是一个普通值，会传递到下一个 then 的成功回调中
        1.2 如果被调用的回调函数中返回的是一个 Promise，则会调用这个Promise then方法，将得到的结果传递到下一个 then 中
        1.3 如果被调用的回调函数中抛出异常，则会传递到下一个 then 的失败回调中
    2. 当你没有注册 接收对应状态值或原因的回调函数时，会发生值传递或异常穿透
*/

class Promise {
    constructor (executor) {
        this.status = 'pending';
        this.value = null;
        this.reason = null;

        this.callbackArr = [];

        const resolve = (value) => {
            if (this.status === 'pending') {
                this.value = value;
                this.status = 'fulfilled';

                setTimeout(() => {
                    this.callbackArr.forEach(v => {
                        v.onFulfilled(this.value)
                    })
                });

            }
        }
        const reject = (reason) => {
            if (this.status === 'pending') { //这里就保证了状态只会被改变一次
                this.reason = reason;
                this.status = 'rejected';

                setTimeout(() => {
                    this.callbackArr.forEach(v => {
                        v.onRejected(this.reason)
                    })
                });
            }
        }

        try {
            executor(resolve, reject);
        }catch(e){
            reject(e);
        }
    }

    then (onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') onFulfilled = value => value //给默认值，也是值传递
        if (typeof onRejected !== 'function') onRejected = reason => { throw reason } //给默认值，也是异常穿透

        return new Promise((rej, jec) => {//返回新的Promise

            const onFulfilledFn = value => {
                try {
                    const result = onFulfilled(value);
                    if (result instanceof Promise) {
                        result.then(
                            val => rej(val),
                            rea => jec(rea)
                        )
                    } else {
                        rej(result);
                    }
                }catch(e) {
                    jec(e);
                }
            }
            const onRejectedFn = reason => {
                try {
                    const result = onRejected(reason);
                    if (result instanceof Promise) {
                        result.then(
                            val => rej(val),
                            rea => jec(rea)
                        )
                    } else {
                        rej(result);
                    }
                }catch(e) {
                    jec(e);
                }
            }

            this.callbackArr.push({ onFulfilled: onFulfilledFn, onRejected: onRejectedFn }) //先注册

        })
    }
}
```
> 第四部分：
```js
/*思路：
    1. catch 方法的实现
    2. Promise.resolve 方法的实现
    3. Promise.reject 方法实现
    4. Promise.all 方法的实现
    5. ...
*/

class Promise {
    constructor (executor) {
        this.status = 'pending';
        this.value = null;
        this.reason = null;

        this.callbackArr = [];

        const resolve = (value) => {
            if (this.status === 'pending') {
                this.value = value;
                this.status = 'fulfilled';

                setTimeout(() => {
                    this.callbackArr.forEach(v => {
                        v.onFulfilled(this.value)
                    })
                });

            }
        }
        const reject = (reason) => {
            if (this.status === 'pending') { //这里就保证了状态只会被改变一次
                this.reason = reason;
                this.status = 'rejected';

                setTimeout(() => {
                    this.callbackArr.forEach(v => {
                        v.onRejected(this.reason)
                    })
                });
            }
        }

        try {
            executor(resolve, reject);
        }catch(e){
            reject(e);
        }
    }

    then (onFulfilled, onRejected) {
        return new Promise((rej, jec) => {//返回新的Promise

            if (typeof onFulfilled !== 'function') onFulfilled = value => value //给默认值，也是值传递
            if (typeof onRejected !== 'function') onRejected = reason => { throw reason } //给默认值，也是异常穿透

            const onFulfilledFn = value => {
                try {
                    const result = onFulfilled(value);
                    if (result instanceof Promise) {
                        result.then(
                            val => rej(val),
                            rea => jec(rea)
                        )
                    } else {
                        rej(result);
                    }
                }catch(e) {
                    jec(e);
                }
            }
            const onRejectedFn = reason => {
                try {
                    const result = onRejected(reason);
                    if (result instanceof Promise) {
                        result.then(
                            val => rej(val),
                            rea => jec(rea)
                        )
                    } else {
                        rej(result);
                    }
                }catch(e) {
                    jec(e);
                }
            }

            this.callbackArr.push({ onFulfilled: onFulfilledFn, onRejected: onRejectedFn }) //先注册

        })
    }

    catch (rejectFn) {
        return this.then(null, rejectFn)
    }

    static resolve(value) {
        /*
            1.传入普通值
            2.传入一个 Promise
        */
        return new Promise((res, rej) => {
            if (value instanceof Promise) {

                value.then(
                    val => res(val),
                    rea => rej(rea)
                )

            } else {
                res(value);
            }
        })
    }

    static reject (value) {
        return new Promise((res, rej) => {
            if (value instanceof Promise) {
                
                value.then(
                    val => rej(val),
                    rea => rej(rea)
                )

            } else {
                rej(value);
            }
        })
    }

    static all (promiseList) {
        return new Promise((res, rej) => {
            let time = 0, resultList = [], len = promiseList.length;
            promiseList.forEach((v,i) => {
                if (v instanceof Promise) {
                    v.then(
                        val => {
                            resultList[i] = val;
                            time++;
                            if (time === len) {//全部成功
                                res(resultList);
                            }
                        },
                        rea => {//有一个失败就失败
                            rej(rea);
                        }
                    )
                } else {
                    resultList[i] = v
                    time++;
                }

            })
        })
    }
}
```

> tip: https://chromium.googlesource.com/v8/v8/+/3.29.45/src/promise.js

## 感想
- 在前端这个领域，入门很简单，想要深入真的很难！
- 未来还有很多东西值得我们探索，但是我们不要心急，一步一步来，即使慢一点也没关系，走得扎实才是最重要的！
- 最后祝愿大家在新的一年里能够收获满满！！！
