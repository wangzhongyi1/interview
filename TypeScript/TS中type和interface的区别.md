# TS中type和interface的区别

- 侧重点不一样：type 用来自定义一个类型，而 interface 通常用来描述一个对象的结构

- interface可以使用 extends 进行继承，而 type 只能定义一个新的类型

- interface可以多次定义，属性会合并，和适合扩展第三方接口，而type重复定义会报错
```ts
interface IDog {
    name: string
}

interface IDog {
    age: number
}

// 最终属性会合并，相当于：
interface IDog {
    name: string;
    age: number;
}
```
- 当然接口还可以使用 implements 进行实现，而 type 不行
