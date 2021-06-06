# vue 中常用的修饰符

## 在 v-model 中使用的三个

### .lazy

```vue
<input v-model.lazy="msg" />
```

> 使用 change 事件，而不是 input 事件

### .number

```vue
<input v-model.number="msg" />
```

> 将用户的输入值转化为数值类型

### .trim

```vue
<input v-model.trim="msg" />
```

> 自动过滤用户输入的首尾空格

## 事件修饰符

```vue
<a @click.stop="dosomething"></a> // 阻止事件冒泡

<a @click.prevent="dosomething"></a> //阻止默认事件

<a @click.self="dosomething"></a> // 事件是由当前元素自身触发时才调用 dosomething
```

## 按键修饰符

```vue
<input @keyup.enter="submit" /> // 当按下 enter 键时触发

<input @keyup.space="submit" /> // 当按下 空格键 触发

<input @keyup.tab="submit" /> // 当按下 tab 触发

/* 其他常用的按键码别名：
	.esc
	.up
	.down
	.left
	.right
	.delete
*/
// 你也可以直接通过按键码来控制
<input @keyup.13="submit" />
```



## 系统修饰符

```vue
<!-- Alt + C -->
<input @keyup.alt.67="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="dosomething"></div>

/*
	如下修饰符实现在按下相应按键时才触发鼠标或键盘事件的监听器
	.ctrl
	.alt
	.shift
	.meta
*/
```



