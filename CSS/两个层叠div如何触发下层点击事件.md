# 两个层叠div如何触发下层点击事件

```html
<div style="width: 100px;height: 100px;position: relative;background-color: #f40;">
    <div class="top" style="width: 100px;height: 100px;position: absolute;top: 0;left: 0;z-index: 2;">top</div>
    <div class="bottom" style="width: 100px;height: 100px;position: absolute;top: 0;left: 0;z-index: 1;">bottom</div>
</div>
```

因为 top 层级更高，覆盖在bottom上，此时给bottom绑定点击事件，是不能触发的

此时给 top 设置 `pointer-events: none` 就能穿透触发 bottom 的鼠标点击事件了