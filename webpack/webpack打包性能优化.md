# webpack 性能优化
## webpack 打包构建性能优化
### 使用 babel-loader 时开启 babel 缓存
- 可以让下次打包构建速度更快
```js
use: [{
  loader: 'babel-loader',
  options: {
    cacheDirectory: true
  }
}]
```
### 合理使用 exclude 和 include
- 使用 loader 时，可以把 node_modules 文件夹排除，加快处理速度。include 同理。
### 合理使用多进程打包
- 如使用 happypack 这样的插件，开启多进程打包，提升打包性能
> 需注意：进程开启和进程通行是需要花费时间的。所以你的项目越大，效果越明显。
### 使用 oneOf
- 把单一类型的 loader 放在 oneOf 中。这样 loader 命中后就不会向下匹配了。
> 需注意：oneOf 中不能出现两个处理同一类型的 loader。
### 合理使用 noParse
- 在你确定引入的包不会依赖其他包时，配置 onParse 可以阻止 webpack 尝试解析该包的依赖关系，加快打包速度
### 合理使用 externals
- 将一些资源通过 CDN 的方式引入，然后在 externals 中配置，就可以防止被打包
### 合理使用动态连接库
- 将一些不会变动的包提前打包出去，然后在打包整个项目的时候就可以少打包那部分包，提升打包速度。
- 使用动态连接库找到并引用提前打包出去的包
