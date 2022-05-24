# link和@import区别

- @import 是 css2.1 中引入的，所以兼容性相比较link差一点，但是针对 ie5 的，所以这个现在也不是问题
- link 是一个 html标签，可以通过 js 控制，而@import不能通过js控制
- @import 只能写在 style标签 或 css文件的最顶端，否则不生效
- link是同步加载，@import是在页面加载后再加载的(无法验证)
- @import 只能加载 css，而link可用于加载rss或网站图标等一些其他用途(preload,prefetch)
