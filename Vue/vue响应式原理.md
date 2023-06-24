# vue 双向数据绑定原理
> 一句话总结：vue采用数据劫持结合发布-订阅者模式，通过 Object.defineProperties 劫持每个属性的 getter/setter，当数据变化的时候，发布消息通知订阅者，调用相应的监听回调
- 具体一点说： vue 会将 data 中的所有属性都使用 Object.defineProperties 转化成相应的 getter 和 setter ，然后会有一个 Dep 依赖收集器来收集所有依赖，还会有一个 Watcher ，在 Watcher 中实例化了 Dep ，Dep 中有一个 subs 数组，存放了所有的订阅者，当数据发生变动时，就会触发 dep 的 nitify 方法，通知所有订阅者进行数据更新。

- 2023-6-23：vue 会将 data 中所有的属性使用 Object.defineProperty 转化成相应的 getter 和 setting，然后给每个属性都绑定一个 dep，当取值时触发 getter，调用 dep.depend() 方法进行依赖收集；当赋值时会触发 setting，调用 dep.notify() 方法，通知 Watcher 进行更新