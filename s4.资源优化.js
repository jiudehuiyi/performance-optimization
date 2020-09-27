

1.压缩和合并:
(1).减少HTTP请求数量
(2).减少请求资源大小
(3).HTML压缩，利用webpack的HTML插件(HTML Minifier)压缩
(4).压缩CSS
(5).JS的压缩与混淆:
使用webpack对js构建的时候进行压缩
混淆的意思是将变量名缩小,达到别人获取不到相应的信息，同时体积也会变小
(6).CSS和JS合并:
合并有好处也有坏处，合并能减少请求时间，但是也会带来维护性能的问题，什么时候使用合并了呢，可以从以下几个阶段进行考虑
 --若干个小文件可以考虑成一个大文件
 --无冲突(css命名和js命名)

 2.图片的优化：
 jpg图片压缩工具:imagemin
png图片压缩工具:imagemin-pngquant

Baseline-jpg:基线jpg格式图片，它是加载一部分就会显示一部分，自上而下的
progressive-jpg:渐进式jpg，它是整个图片加载时从低像素到高像素的显示 (这个需要和美工沟通)

3.图片的懒加载：
原生加载:
(1).可以通过可视化高度和data-xxx这个属性去做图片的懒加载
(2).如果浏览器兼容loading="lazy"这个属性，那么图片就会自动进行懒加载，例如：
<img loading="lazy"  src="http://xxxx" />
第三方库:
react-lazy-load-image-component
verlok/lazyload
yall.js
Blazy

(4).响应式图片
就是根据屏幕大小，自动选择相应的图片，但是需要跟美工进行商量，拿各种不同宽度的图片
<img 
    src="li-200.jpg" 
    srcset="li-100.jpg 100w,li-200.jpg 200w,li-400.jpg 400,li-800.jpg 800w,li-1600.jpg 1600w"
    sizes="100vw"
/>
src为原始图片大小
而srcset为图片大小集合，当宽为100就会应用li-100.jpg这一张图片，同时他不会将全部图片加载进来，只会将相应宽度的相应图片加载进来
sizes:这个图片大小占比
(5).字体的处理：
//引入字体
@font-face{
    font-family:;//种类名称
    font-style:;//样式
    font-weight:;
    src:;
    unicode-range:;
}
使用font-display这个属性


