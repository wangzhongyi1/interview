# vue2和vue3的区别

1. 代码组织方式的不同
    - vue2 使用 option-api，vue3使用componsition-api
        + option-api 更简单易用
        + composition-api 更有利于代码组织，而且因为都是函数，所以有利于 tree-shaking

2. 响应式原理不同
    - vue2 使用 Object.defineProperty 劫持 get/set，来达到相应式更新
    - vue3 使用 Proxy 代理对象实现响应式更新
        + Proxy相比defineProperty不用再递归遍历对象，所以性能更好
        + 对数组的响应式支持更好，vue2中需要重写7个数组方法，而且通过数组下标更改数据，并不会触发重新渲染，而vue3没有这个问题
        + Proxy代理的对象添加、删除属性都可以被监听到，而vue2需要借助$set、$delete这样额外的api
        + Proxy有兼容性问题，完全不支持 IE

3. 生命周期钩子不同
    - 移除了 beforeCreate 和 created 两个钩子，用 setup 来代替
    - 其他钩子都一直，只不过写法不同，vue3中叫 on 什么什么

4. vue3支持多根节点，最终都会使用 Fragment 包裹，而 vue2 只能有一个跟节点

5. v-for 和 v-if 优先级不同
