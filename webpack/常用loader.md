# webpack 中的常用 loader 和作用

## html-loader
- 处理 html 中引入图片资源的问题

## style-loader、css-loader
- 处理解析 css 文件
### style-loader 和 css-loader 的区别
- css-loader 是把解析以 `.css` 结尾的文件并分析其中的 ***依赖关系*** ，最后转成字符串
> 依赖关系：如通过 `@import` 来引入其他样式文件；又比如引入了背景图片，需要解析其中的路径引用关系
- style-loader 是还原 css-loader 转换成的 css字符串，并创建 style 标签，插入到 html 中

## less-loader
- 处理以 `.less` 结尾的文件

## postcss-loader
- 处理 css 兼容性问题，添加浏览器前缀

## babel-loader
- 将 js 高级语法转化成低级语法

## file-loader 和 url-loader
- 处理比如 图片、字体图标等资源

## eslint-loader
- 处理 js 语法校验的问题。现在已经被弃用了，改用 EslintPlugin
