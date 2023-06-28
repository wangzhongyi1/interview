# TS 中 const 和 readonly 区别

1. const 用于变量，readonly 用于属性
    - var、let、const 本质上都是用于定义一个变量，只不过 const 定义的变量的变量值是不可变的

2. 使用 const 定义的数组可以使用 push、pop等方法，但是使用 `ReadonlyArray<number>` 声明的数组不能使用这些数组方法