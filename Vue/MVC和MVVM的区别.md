# MVC 和 MVVM 的区别
## MVVM
- model 负责存储数据
- view 负责 ui视图的显示
- viewmodel 负责处理业务逻辑
  + 将 model 的数据同步到 view 上显示出来
  + 也将 view 的修改同步到 model 上

## MVC
- model 负责存储数据
- view 负责 ui视图的显示
- controller 负责处理业务逻辑
  + 将 model 的数据同步到 view 上显示

> 区别：mvc 是单向数据流，mvvm 是双向数据流
