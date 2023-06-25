# ES6和TS中class区别

- ts 中属性必须先声明，才能在 constructor 中赋值，而 es6 class 可以直接在 constructor 中使用 this.xx = yy 赋值

- ts 的属性描述符更丰富，比如 private、protected 等

- 在继承上两者都是使用 extends 关键字进行继承，访问父类也是一样使用 super
