# vue父组件和子组件生命周期钩子的执行顺序

## 首次加载时
- 父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted

## 子组件更新时
- 父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated
## 父组件更新时
- 父beforeUpdate -> 父updated

## 销毁时
- 父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed
