# TCP和UDP的区别

1. TCP 是面向连接的传输，UDP 是无连接的传输
    - 这句话怎么理解呢？也就是说，TCP 传输一定要先建立连接，而 UDP 不需要建立连接发送端就可以直接发送数据
    - 这就引出了 TCP 的三次握手和四次挥手

2. TCP 有流量控制、拥塞控制、校验数据顺序、超时重发的特点，而 UDP 没有
    - 所以说 TCP 是可靠传输，而 UDP 是不可靠传输

3. UDP 相比 TCP 首部更小，所以传输效率就更高

4. TCP 只能一对一，而 UDP 支持一对多

总结：

UDP 适用于对实时性要求比较高的场景，比如：视频会议、网络直播。我们不可能打个视频会议，丢包了然后还卡在那里，等待重传然后继续是吧

TCP 适用于对数据准确性要求高的场景，比如：我们传输 HTML 文件，不可能只接收其中的一部分，然后其余部分就不要了是吧
