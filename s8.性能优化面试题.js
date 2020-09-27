/*
    性能优化面试题
*/

1.从输入URL到页面可见的过程:
注意的细节：
浏览器进程(Browser Process):
(1).UI线程(UI thread)：搜索关键字还是URL =》 搜索引擎还是站点
(2).Network线程(Network thread):
DNS查找IP=>建立TLS连接=>收到301，再来=>  设置UA等信息，发送GET请求=>Web Server上应用处理请求=>读取Response分析数据类型=>安全检查=>通知UI数据准备就绪
渲染进程(Render process):
主线程(Main Thread):
构建DOM树=>边解析DOM边加载子资源=>JS阻塞解析 async/defer
解析CSS，计算computed styles=>构造布局树位置&大小
Raster Thread &&Compositor Thread：
创建绘制记录，确定绘制顺序=>将页面拆分图层,构建图层树=>复合线程像素化图层，创建一个复合一怔

2.首屏加载优化:
分析:
Web增量加载的特点决定了首屏性能不完美
过长白屏影响用户体验和留存
首屏它是初印象
可以从以下方面进行回答:
资源体积太大:
资源压缩，传输压缩，代码拆分，Tree Shaking，HTTP/2,缓存
首页内容太多：
路由/组件/内容lazy-loading/预渲染SSR，Inline CSS
加载顺序不合适:
prefetch,preload
3.内存管理：
(1).变量创建时自动分配内存，不使用的时候会自动释放内存---GC(垃圾回收)
tip:
内存释放的主要问题是如何确定不再使用内存
所有的GC都是近似实现，只能通过判断变量是否还能再次访问到
(2).需要进行垃圾回收的行为：
局部变量，函数执行完，没有闭包引用，就会被标记回收
全局变量，直至浏览器卸载页面时释放
(3).实现方式:
引用计数---无法解决循环引用的问题
标记清除---一个标记的过程，一个清除的过程
(4).
避免意外使用全局变量
避免反复运行引发的大量闭包
避免脱离的DOM元素
