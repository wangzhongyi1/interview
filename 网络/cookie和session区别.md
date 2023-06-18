# cookie和session区别

## cookie

http是一种无状态协议，也就是说两个请求之间是相互独立的，这就导致了如果后续请求需要用到之前的状态，就需要重传
而 cookie 的出现就是为了解决数据重传的问题。

- 一般是由后端向前端 种cookie，通过 http 的 Set-Cookie 字段设置，前端也可以通过 document.cookie 获取
- Cookie 在过期时间之前一直有效
- 浏览器对同一站点保存的 cookie 数量是有限制的，单个 cookie 大小不超过 4k
- 如果不想被前端 js 通过 document.cookie 访问到，可以设置 `HttpOnly: true`
- 设置 `Secure: true`，可以指定只在 https 携带 cookie
- 设置 `SameSite: Strict`，可以限制第三方cookie，能很好地防范 `CSRF攻击`（跨站请求伪造）

## session

session是基于cookie的，如果一些敏感信息使用 cookie 来传输不安全，所以才诞生了 session

- session 数据存在后端服务器，下发前端一个 sessionId，后续请求带上这个 sessionId，用于给服务端验证身份
- 每个用户都会产生一个 session，所以比较消耗服务端性能，不建议存放过多的东西，并且设置 session 删除机制
- 一般浏览器窗口关闭，session失效
