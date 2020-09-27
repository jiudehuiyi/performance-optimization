/*
    传输加载优化
*/

1.启用GZIP压缩:
对传输资源进行体积压缩，可高达90%
可以使用Nginx启用GZIP压缩
2.keep-alive
(1).是一个持久的TCP连接，节省连接创建时间，默认开启(HTTP1.1)
(2).但是它是是会根据请求的数量决定是否关闭的,例如当请求达到100的时候，这时候就会进行关闭

3.HTTP缓存:(一般通过nginx进行配置)
Cache-Control/Expires

Last-Modified + If-Modified-Since

Etag+If-Node-Match

4.Service Worker:
1.加速重复访问
2.离线支持
可以直接使用React脚手架中已经配置好的，
也可以参考React脚手架中进行配置，主要包括WorkboxWebpackPlugin和ManifestPlugin

优缺点：延长了首屏渲染时间，但是页面总加载时间减少，兼容性问题，只能使用在localhost和https中使用

5.HTTP2协议:
可以使用Nginx进行相关配置

优势：
二进制传输
请求响应多路复用
Server push

6.SSR好处:
加速首屏加载
更好的SEO
