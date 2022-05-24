# vuex持久化
## 使用localStorage和replaceState来实现
- 自定义一个 vuex插件
    + vuex插件就是一个方法，会把store传给你
    + 然后使用`store.subscribe`订阅状态改变，传入一个回调，当 vuex状态改变时将新最状态存入 localStorage
    + 最后在页面刷新的时候，取一下localStorage里保存的状态，使用`store.replaceState`更新状态
```js
let flag = true;
const myplugin = (store) => {
    const prevStore = localStorage.getItem('prevStore');
    if (flag && prevStore) { // 替换state
        flag = false; //保证页面刷新时只改变一次 store.state
        store.replaceState(JSON.parse(prevStore))
    }
    store.subscribe((mutation, state) => {
        localStorage.setItem('prevStore', JSON.stringify(state));
    })
}

const store = new Vuex.Store({
    plugins: [myplugin],
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {},
})
```

- 借助插件 `vuex-persistedstate` 来实现