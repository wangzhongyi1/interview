# 你是怎么处理vue项目中的错误的?

1. 设置全局错误处理函数 `errorHandler`
```js
Vue.config.errorHandler = function (err, vm, info) {
    // info 是 vue 特定的错误信息，比如错误所在的生命周期钩子
}
```
errorHandler 指定组件渲染和观察期间间未捕获错误的处理函数

2. 生命周期钩子 `errorCaptured` 捕获来自子孙组件的错误
```js
(err, vm, info) => ?boolean
```
错误捕获具有传播性，但是如果返回`false`就会停止向上传播，有点像事件冒泡
