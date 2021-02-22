# webpack中的 loader 分为两部分
- webpack 中的 loader 分为 normal 和 pitch 两部分

## normal 和 pitch
- 我们正常编写的 loader 函数，是逆序的方式执行的，而 pitch 函数是可选的，是正序方式执行的。
- 正常 loader 的执行是先执行 `pitch` 函数，然后执行 `normal` 函数
- 如果没写 pitch 函数，或者 pitch 函数没有返回值，就正常执行 loader
- 如果写了 pitch 函数，并且有返回值，就会跳过后面的 pitch 函数和当前 pitch 所对应的 normal 函数，再接着往下执行。

***

> 参考：https://www.jianshu.com/p/9dfb8e18e76d?utm_campaign=hugo&utm_content=note&utm_medium=seo_notes&utm_source=recommendation

