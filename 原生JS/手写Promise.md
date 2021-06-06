# 原生 JS 手写 Promise

## class 版本
```js
class Promise {
  constructor(executor) {
    var _this = this;
    _this.callbacks = [];
    _this['[[promiseState]]'] = 'pending';
    _this['[[promiseValue]]'] = undefined;

    function resolve(data) {
      if (_this['[[promiseState]]'] !== 'pending') return;
      _this['[[promiseState]]'] = 'resolve';
      _this['[[promiseValue]]'] = data;
      if (_this.callbacks.length > 0) {
        _this.callbacks.forEach(v => {
          v.resolveFn(data);
        });
      }
    }
    function reject(err) {
      if (_this['[[promiseState]]'] !== 'pending') return;
      _this['[[promiseState]]'] = 'reject';
      _this['[[promiseValue]]'] = err;
      if (_this.callbacks.length > 0) {
        _this.callbacks.forEach(v => {
          v.rejectFn(err);
        });
      }
    }

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then (onResolve, onReject) {
    var _this = this;
    if (typeof onResolve !== 'function') {
      onResolve = data => data;
    }
    if (typeof onReject !== 'function') {
      onReject = err => { throw err } // 异常穿透
    }

    function operate (type, data, r, j) {
      try {
        let ret = type(data);
        if (ret instanceof Promise) {
          ret.then(res => {
            r(res);
          }, err => {
            j(err);
          });
        } else {
          r(ret);
        }
      } catch (e) {
        j(e);
      }
    }

    return new Promise((resolve, reject) => {
      if (_this['[[promiseState]]'] === 'resolve') {
        setTimeout(() => {
          operate(onResolve, _this['[[promiseValue]]'], resolve, reject);
        });
      }
      
      if (_this['[[promiseState]]'] === 'reject') {
        setTimeout(() => {
          operate(onReject, _this['[[promiseValue]]'], resolve, reject);
        });
      }

      if (_this['[[promiseState]]'] === 'pending') {
        _this.callbacks.push({
          resolveFn: function (data) {
            operate(onResolve, data, resolve, reject);
          },
          rejectFn: function (err) {
            operate(onReject, err, resolve, reject);
          }
        })
      }
    });

  }

  catch (onReject) {
    this.then(undefined, onReject);
  }

  static resolve (data) {
    return new Promise((resolve, reject) => {
      if (data instanceof Promise) {
        data.then(res => {
          resolve(res);  
        }, err => {
          reject(err);
        })
      } else {
        resolve(data);
      }
    });
  }

  static reject (data) {
    return new Promise((resolve, reject) => {
      reject(data);
    });
  }

  static all (promiseArr) {
    if (Array.isArray(promiseArr)) {
      let count = 0;
      let len = promiseArr.length;;
      let arr = [];
      return new Promise((resolve, reject) => {
        promiseArr.forEach((v, i) => {
          v.then(res => {
            count++;
            arr[i] = res;
            if (count === len) {
              resolve(arr);
            }
          }, err => {
            reject(err);
          });
        });
      });
    }
  }

  static race (promiseArr) {
    if (Array.isArray(promiseArr)) {
      return new Promise((resolve, reject) => {
        promiseArr.forEach(v => {
          v.then(res => {
            resolve(res);
          }, err => {
            reject(err);
          });
        })
      });
    }
  }

}
```