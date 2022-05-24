# nextTick原理
## 作用
- 为了在数据更新后可以获取到最新状态和dom元素

## 使用
- 有两种使用方式
 + 传入一个回调函数 `this.$nextTick(()=>{})`
 + 不传回调，会默认返回promise `this.$nextTick().then(_=>)`

## 原理
- 先说传入回调的情况
    + 一般写nextTick都是在更改数据的语句后面
    + 更改数据的时候，就会触发对应变量的被Object.defineProperty劫持的set
    + 新值赋上后，会调用和这个变量绑定的dep 的 notify方法
    + 然后这个会循环保存在这个dep身上的subs数组，每一项是一个watcher，调用每个watcher的update方法
    + 然后 `非同步的用户watcher` 和 `渲染watcher` 调用 queueWatcher方法
    + queueWatcher 执行中调用了 nextTick，也就是vue内部自己也调用了nextTick
    + 将每次调用 nextTick 传入的回调函数保存到 callbacks 数组中
    + 在首次调用 nextTick 的时候会生成一个异步任务，因为是异步任务，会等你所有调用nextTick并收集完所有回调后执行
    + 异步任务执行时，会循环callbacks数组把之前保存的回调进行调用，首先会调用内部注册的回调，其中会触发页面的更新
    + 然后才会调用用户注册的回调，所以用户才能拿到最新的状态和dom，因为在上一步dom已经更新了

- 采用promise的情况
    + 在调用 nextTick 的时候会生成一个promise
    + 将这个promise的resolve方法保存到callbacks数组中
    + 最后循环callbacks数组时，调用resolve方法，然后promise状态改变了就会调用用户注册的then中的回调函数