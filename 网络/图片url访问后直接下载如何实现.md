# 图片url访问后直接下载如何实现

1. 设置 oss 的 http头，决定用户下载行为的参数
    - x-oss-object-type: Normal
    - x-oss-request-id: 598D5ED34F29D01FE2925F41
    - x-oss-storage-class: Standard

2. 利用 canvas drawImage 得到图片的 base64，然后用 a 标签触发点击来下载
```js
function downloadImage(imgSrc, name) {
    let image = new Image();

    // 解决跨域 canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous');

    image.onload = function () {
        let canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        let context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL('image/png'); // 得到图片的 base64 编码数据

        let a = document.createElement('a');
        let event = new MouseEvent('click'); // 创建一个点击事件
        a.download = name || 'phone';
        a.href = url;
        a.dispatchEvent(event); // 触发 a 的点击事件
    }

    image.src = imgSrc;
}

downloadImage('http://172.168.10.21:3000/test/image/download', 'ppcm');
```