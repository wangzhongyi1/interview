# vue3新增的Teleport和Suspense组件

## Teleport

意为传送、瞬移，可以将 vue 组件插入到页面上任意指定的位置

以前 html 中只能有一个 `<div id="app"></div>` 的节点，现在可以和`#app`同级书写其他节点，然后将 vue 组件利用 Teleport 插入到其他节点中，多用于全局的 loading、Modal、dialog

## Suspense

就是一个异步组件，有两个插槽 default 和 fallback，default插槽包裹的是异步渲染的组件内容，而 fallback 是缺省值，非常适用于接口请求回来之前，先展示一个 loading，然后数据回来了再展示内容组件

注意：defaul插槽内的异步渲染组件，需要在 setup 中返回一个 promise，
