# animation所有属性
- animation-name: 动画名称，就是 @keyframes 后面的名字
- animation-duration: 动画执行时间，不包含 animation-delay 的等待时长
- animation-timing-function: 运动曲线、贝塞尔曲线
- animation-delay: 动画开始前的等待时间
- animation-iteration-count: 动画执行次数，infinite 表示动画永不停止
- animation-direction: 动画方向，alternate 表示执行反向动画(要iteration-count设置2以上才能看到效果)
- animation-fill-mode: 指定动画执行前后如何给目标应用样式
    + forwards 在动画开始之前，元素应用第一帧的样式（应用delay就更好观看和理解这句话）
    + backwards 在动画结束后，元素应用最后一帧的样式
    + both 动画开始前应用第一帧样式，动画结束后应用最后一帧样式

## 例子
```html
<style>
    #anim {
      width: 100px;
      height: 100px;
      background-color: #000;
      animation-name: aaa;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-delay: 1s;
      animation-iteration-count: 3;
      animation-direction: alternate;
      animation-fill-mode: backwards;
    }
    @keyframes aaa {
      from {
        width: 10px;
        height: 10px;
        background-color: green;
      }
      to {
        width: 200px;
        height: 200px;
        background-color: red;
      }
    }
</style>

<div id="anim"></div>
```