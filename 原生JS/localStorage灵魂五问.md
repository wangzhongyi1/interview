# 关于 localStorage 的灵魂五问

## localStorage 存储的键值采用什么字符编码
- localStorage 键和值都采用 UTF-16 DOMString 格式存储
> 在 utf-16 中每个字符使用两个字节，但是码点超过 0xFFFF(65535) 的字符使用4个字节

## 5M 的单位是什么
- 单位是：字符的长度 或者 utf-16编码单元，更准确的是 10M的字节
- 注意：字符的个数不等于字符的长度
```js
// 以下都字符个数都为1个，但是字符长度后面两个是2
"a".length // 1
"人".length // 1
"𠮷".length // 2
"🔴".length // 2
```

## localStorage 的键占不占存储空间
- 键占空间，键和值一共加起来不能超过 5M

## localStorage 键的数量对写和读性能的影响
- 键的数量对 读写的性能有影响，但是影响较小
- 值的大小对读写性能影响很大，所以尽量不要保存大的值，因为是同步获取

## 写一个方法统计 localStorage 已使用空间
```js
function totalSize() {
    var entries = Object.entries(localStorage);
    var str = entries.map(v => v.join('')).join('');
    return str.length;
}
```

## 如何扩容 localStorage 空间
- localStorage 存储是每个域下面最大5M，当存储的数据超过这个值时，可以申请其他域，然后使用 postMessage 前往其他域存取
