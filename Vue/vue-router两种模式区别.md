# vue-router 两种模式的区别

## hash 模式

- \# 后面的 hash 值改变，不会向服务器发出请求，也不会刷新页面。我们可以监听 onhashchange 事件，来实现更新页面内容的操作。

- HashHistory.push() 将新路由添加到浏览器历史访问栈的栈顶，HashHistory.replace() 替换掉当前栈顶的路由。

## history 模式

- HTML5标准中新增两个API，pushState() 和 replaceState() 。
- 这两个 API (1) 可以改变 url 地址且不会发送请求，(2)可以读取和修改**浏览器历史访问栈**
  + 除此之外，还有我们可以监听 `onpopState` 事件，当浏览器跳转到新状态时，将触发`onpopstate`事件

### 区别：

+ hash 模式是通过监听 window 对象上的 onhashchange 事件，当浏览器地址中的 hash 值改变时，触发事件，然后拿到对应的 hash 值，根据不同 hash 值显示不同的页面内容。

+ history 模式是调用原生的 history 对象上的 pushState(state, title, url) 方法向浏览器历史栈顶添加一条记录，然后在触发 onpopstate 的事件时可以拿到调用 pushState 时传入的 state 值，然后根据 state 值显示不同的页面内容。（replaceState 方法和 pushState方法 类似，只不过是替换浏览器历史栈顶数据）

+ 注意：

  > hash 模式，你只能改变\#后面的 url 片段。而history模式中的pushState设置的新URL可以是与当前URL同源的任意URL。
  >
  > history 模式 当刷新页面，浏览器会向服务起发送请求，所以这个实现需要服务器的支持。
  >
  > pushState 和 replaceState 不会触发 onpopstate 事件，history.go(), history.back(), history.forward() 可以触发 onpopstate 事件。

***

#### $route 和 $router 的区别

1. $route 是从路由对象中获取path、query、param等路由参数
2. $router 表示的是 VueRouter 的实例，可以使用路由跳转的方法 push()、back()、go()