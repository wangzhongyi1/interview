# webpack 中常用 plugin 和作用

## html-webpack-plugin
- 为你的应用程序添加一个 html页面入口

## mini-css-extract-plugin
- 抽离 css 成单独文件

## happypack
- 启用多进程打包

## uglifyjs-webpack-plugin
- 压缩和混淆 JS 代码
> 缺点：只能单线程代码压缩，效率低。<br>
> 推荐使用 `webpack-parallel-uglify-plugin`，会进行多进程压缩。<br>
> webpack 5 开始推荐使用 `terser-webpack-plugin`，压缩效率更高

## eslint-webpack-plugin
- 启用 eslint 进行代码校验（之前是 eslint-loader）

## copy-webpack-plugin
- 将文件进行拷贝

## clean-webpack-plugin
- 重构之前清除之前的 dist 目录

## webpack 内置插件
### webpack.ProvidePlugin
- 向每个模块中注入一些变量（自动加载模块）
### webpack.DefinePlugin
- 定义全局变量
### webpack.BannerPlugin
- 为每个 chunk 添加 banner注释
### webpack.DllPlugin 和 webpack.DllReferencePlugin
- 定义动态连接库相关的插件

