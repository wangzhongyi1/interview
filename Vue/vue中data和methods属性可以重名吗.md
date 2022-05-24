# vue中data和methods属性可以重名吗
- 首先肯定的是，不能重名

## data,methods,computed等属性的初始化顺序是什么？
- 按照 props, methods, data, computed, watch 的顺序初始化

## 不同选项如果重名vue是如何处理的？
- 在 非production环境下 会控制台报警告
- 在 production环境下 不会控制台报警告
- 两种情况下都会直接覆盖