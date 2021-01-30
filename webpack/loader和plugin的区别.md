# loader 和 plugin 的区别
> 针对这个问题百度了一下，真的是应了那句话，“天下文章一大抄”。看来看去都是一样的回答。
- 以下是我自己的理解
```js
一句话总结：loader 帮助 webpack 处理打包非JS文件；plugin 帮助 webpack 扩展更多功能，让 webpack 能做更多的事。
```
- 详细分析如下
  + loader
  ```js
  默认 webpack 只能解析打包 js 文件，如果你想要处理诸如图片文件、样式文件等，就需要使用对应的 loader 来达到目的
  ```
  + plugin
  ```js
  plugin 目的在于解决 loader 无法实现的其他功能，可以扩展 webpack 功能，让 webpack 更加灵活。在 webpack 的生命周期中会广播出许多事件，插件可以监听这些事件，做一些事情。
  ```
