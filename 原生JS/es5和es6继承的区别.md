# es5和es6继承的区别

## 写法不同
- es6 中的继承
```js
class Parent {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }

    getName() {
        return this.name
    }
}

class Children {
    constructor (name, age, job) {
        super(name, age);
        this.job = job;
    }

    getJob() {
        return this.job
    }
}

const child = new Children('李白', 18, '诗歌写作');
```

- es5 中的继承
```js
function Parent(name, age) {
    this.name = name;
    this.age = age;
}
Parent.prototype.getName = function () {
    return this.name;
}

function Children(name, age, job) {
    Parent.call(this, name, age);
    this.job = job;
}
Children.prototype = Object.create(Parent.prototype);
Children.prototype.constructor = Children; // constructor 复位
Children.prototype.getJob = function () {
    return this.job;
}
```

## 关于this
- es5 中是先创建子类的 this，然后调用父类构造函数，给子类this添加上添加属性
- es6 中子类的constructor中一定要调用super，否则会报错
    + 这是因为 es6中的子类中是没有自己的this，需要调用super从父类中得到this
    + 其实es6 class中，constructor调用是有返回值的，返回的就是this
        * 所以调用super，就相当于调用父类的constructor函数
        * 在父类中创建this，然后返回给子类使用
> 参考：https://juejin.cn/post/6844903550636523533