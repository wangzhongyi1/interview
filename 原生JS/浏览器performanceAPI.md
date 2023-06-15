# 浏览器 performanceAPI
## performance.timing
- `navigationStart` 从 a页面 准备开始跳转到 b页面 的时间
- `unloadEventStart` 从 a页面 跳转到 b页面时，a页面中绑定的 windown.onunload 事件开始执行的时间
- `unloadEventEnd` 从 a页面 跳转到 b页面时，a页面中绑定的 window.onunload 事件执行结束的时间
- `redirectStart` 跳转过程中发生重定向的话，这是重定向开始的时间
- `redirectEnd` 重定向结束的时间

- `fetchStart` 浏览器准备开始使用 HTTP 抓取文档的时间
    + 该事件发生在查询本地缓存之前
- `domainLookupStart` 开始 DNS 域名查找的时间
- `domainLookupEnd` DNS 查询结束的时间

- `connectStart` 开始建立 HTTP连接 的时间（三次握手开始时间）
- `connectEnd` HTTP连接 成功建立的时间（三次握手结束时间）
- `secureConnectStart` 安全连接开始时间（SSL/TLS握手开始时间）

- `requestStart` 浏览器开始真正发起抓取文档请求的时间
- `responseStart` 浏览器接收到第一个字节的时间
- `responseEnd` 浏览器接受完最后一个字节的时间

- `domLoading` document.readyState 设置成 loading 的时间，准备开始解析文档
- `domInteractive` DOM结构解析完成的时间
    + 但是此时的 图片、子框架等 还未加载
    + document.readyState 为 'interactive'
    + onreadystatechange事件 触发
- `domContentLoadedStart` domContentLoaded事件 开始执行的时间
- `domContentLoadedEnd` domContentLoaded事件 执行结束的时间
- `domComplete` html文档加载(渲染)完成的时间
    + document.readyState 为 'complete'
    + onreadystatechange事件 触发
- `loadEventStart` window.onload事件 开始执行的时间
- `loadEventEnd` window.onload事件 执行结束时间

## 时间计算
- 白屏时间：domInteractive - navigationStart
- 解析dom树的时间：domInteractive - domLoading
- 渲染dom树的时间：domComplete - domInteractive
- TCP连接的时间：connectEnd - connectStart
- 请求耗时：responseEnd - requestStart
- DNS查询耗时：domainLookupEnd - domainLookupStart