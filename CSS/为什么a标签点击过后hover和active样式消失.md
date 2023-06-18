# 为什么a标签点击过后hover和active样式消失

点击访问过的超链接，就不再具有hover和active了

答：和4个伪类的书写顺序有关，将 :hover 写在 :link, :visited 之后就好了

- 正确的书写顺序是 `L-V-H-A`，即 :link -> :visited -> :hover -> :active