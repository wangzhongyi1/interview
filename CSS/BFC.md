# 块级格式化上下文（BFC）

## 什么是BFC

- bfc 直译为 `块级格式化上下文`，是 `css2.1` 中的一个规范，他是独立的渲染区域，决定了元素内容如何进行定位，以及与其他元素的关系和相互作用。

## 如何形成 BFC

- float 除 none 以外的值
- positino 为 absolute 或 fixed
- display: inline-block（或者 table-cells, table-captions）
- overflow 除 visible 以外的值（hidden, auto, scroll）

## 如何清楚浮动（BFC 产生的副作用）

- 给父元素设置高度
- 在父元素上设置 overflow: hidden;
- 在最后一个浮动元素的后面添加一个 div 并设置 clear: both;
- 父元素使用伪元素，如下：

```css
.clearfix:after{
    content: "";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}
.clearflx{
    zoom: 1; /* 兼容 IE */
}
```

