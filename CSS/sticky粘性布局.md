# sticky粘性布局

`position: sticky` 配合 [`left`, `right`, `top`, `bottom`] 中一个即可实现粘性布局

表现形式就相当于 relative + fixed，达到阈值就相对父容器位置固定

- 坑：
1. 父容器高度必须大于设置粘性布局盒子的高度
2. 父容器不能设置除 `overflow: visible` 之外的值
3. 至少设置 [`left`, `right`, `top`, `bottom`] 其一，未设置不生效
