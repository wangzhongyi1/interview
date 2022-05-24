# 原生 JS 手写 new 操作符
- 先看一下原生的写法
```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.getName = function () {
    return this.name
}
// 正常使用 new 操作符如下：
var p = new Person('李白', 18);
```

- 开始实现自己的 new
```js
// 现在我们要使用自定义 _new函数 如下：
var p = _new(Person, '李白', 18);

// 开始写 _new函数
function _new(Ctor, ...args) {
    const _this = Object.create(Ctor.prototype);

    // 把 _this 对象传给 Person, 让Person函数 内部帮我们给 _this对象 身上添加相关属性
    const fnReturn = Ctor.apply(_this, args);

    // 判断 Person函数 调用的返回值是不是复杂数据类型。
    const fnReturnIsObject = ['object', 'function'].includes(typeof fnReturn);

    return (fnReturnIsObject && fnReturn) ||  _this
}
```

