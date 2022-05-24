# vue系统中的三种watcher

## 渲染watcher
- vue以组件为单位，每个组件都会调用 Vue.extend 方法生成子类
- 子类会有自己的实例化过程
- 渲染watcher就是组件实例化过程中生成的 用于更新组件的watcher

## 计算属性watcher
- 就是用户写的计算属性，一个计算属性会生成一个 computedWatcher
- 计算属性为什么会有缓存效果？
    + computedWatcher 中会有一个 lazy 属性标识是computedWatcher，还有一个 dirty 标识是否要取值
    + 在计算属性依赖的响应式属性改变时，会触发这个响应式属性被Object.defineProperty劫持的set方法
    + 然后响应式属性赋完最新值后，会触发和这个响应式属性绑定的 dep 的 notify方法
    + notify里面会循环 subs数组，里面保存了所有和这个dep相关的watcher，然后调用每个watcher的 update方法
    + update里面会判断lazy为true,就把 dirty 置为true
    + 然后你取计算属性值的时候，会触发这个计算属性对应的 computedWatcher 的 evaluate方法
    + evaluate里面又重新把 dirty置为false，并重新取值赋给 computedWatcher 的 value属性，并将最新值返回给你
    + 所以当你没有改变依赖的响应式属性直接取计算属性值时，dirty一直是false，它会直接将computeWatcher身上的value返回给你

## 用户watcher
- 用户在 watch 选项里面写的自定义的 watcher
- 可以传如一个配置项，如：`{deep: true, immediate: true}`
- 用户还可以使用命令式调用`$watch`来创建侦听器，和声明式的唯一区别是会返回一个用于取消侦听的函数
- vue内部还会给你的配置项增加一个 `{user: true}`，标识是用户写的watcher
    + 监听的属性值改变后，会调用 watcher的 run方法 进行取值，并将新值和旧值传给用户