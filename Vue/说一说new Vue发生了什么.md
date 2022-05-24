# 说一说new Vue发生了什么
- 首先会调用 `Vue.prototype._init` 方法开始初始化
- 第二步：将用户传入的 `data,methods,computed,watch` 等选项初始化并挂载到`vm实例`上
- 第三步：调用 `compileToFunction` 将模板用 `with和new Function` 包裹形成 `render函数`
- 第四步：调用 `$mount` 方法进行挂载
- 第五步：new了一个渲染watcher，执行 `vm._update(vm._render())`
    + vm._render 就是之前模板编译生成的 render函数，这个函数的执行结果是一个 vnode
    + vm._render 在生成 vnode 的过程中会进行模板中变量取值
    + vm._update 将传入的vnode 转化为真实dom，并插入到页面中(至此完成了首次渲染)