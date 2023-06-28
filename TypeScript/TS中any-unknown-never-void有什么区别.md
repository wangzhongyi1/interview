# TS中any-unknown-never-void有什么区别

1. any 和 unknown
    - 使用 any 后就和写 js 一样了，没有了类型推导
    - unknown 被认为是更安全的 any，它可以接受任意类型赋值，但unknown类型赋值给其他类型前，必须先断言

2. void
    - void 常用于函数返回值，表示返回值为空
    - void 用于变量，此变量只能被赋值 null 或 undefined

3. never
    - 表示永远不存在的值。比如函数抛出错误，而没有返回值。或者函数内部死循环而没有返回值。此时就可以使用 never 作为函数返回值
