/*
    前沿的优化解决方案
*/

1.图片的迁移历史：
jpg =》 png =》 iconfont =》svg

2.布局:
使用flex布局优点：
(1).更高性能的实现方案
(2).容器有能力决定子元素的大小，顺序，对齐，间隔等到\
(3).双向布局

3.资源优先级：
(1).浏览器默认安排资源加载优先级
(2).使用preload，prefetch调整优先级
使用preload将资源优先级提高例如:
<link ref="preload" href="" />
使用prefetch提前加载页面后面需要用到的资源,优先级比较低
<link ref="prefetch"  href=""  />
适用场景：
Preload：提前加载较晚出现，但对当前页面非常重要的资源
tip:注意在webpack中也可以进行相应的配置

4.预渲染页面:类似SSR,提高首屏渲染时间
react-snap:
使用:
"script":{
    "postbuild":"react-snap",//当build打包完毕之后就会自动跑
}
还需要修改ReactDOM的代码
let root = document.getElementById("root");
//当进行过预渲染或者SSR的时候   
if( root.hasChildNodes ){
    ReactDOM.hydrate(<App/>,root)
}else {
    //传统渲染的方式
    ReactDOM.render(<App/>,root);
}

作用：
大型单页应用性能瓶颈：JS下载+解析+执行

可以使用SSR来对首屏渲染进行加快
但是这个也会有牺牲的地方:
牺牲TTFB(前端请求到后端处理完，发送到前端的时间)来补救First Paint，同时实现起来也会复杂

所以可以采用预渲染的形式进行:
Pre-rendering打包的时候提前渲染页面，没有服务端参与
但是它也会有缺点，它首先会加载HTML，然后在加载CSS，会让用户有一个闪动的过程，这个叫样式的闪动，
而对应的处理方式，需要在package.json中将样式内联:
"reactSnap":{
    "inlineCss":true
}

5.windowing(窗口化)提高列表性能:
React插件:ReactDOM-window:它并不是一次性加载所有得LIST，只是加载到可以看到得列表，例如：有100条数据，那么可以看到得5条，那么加载再DOM中会有6，7条数据
作用有:
加载大列表，大表单的每一行严重影响性能
Lazy Loading仍然会让DOM变得过大
windowing只渲染可见的行，渲染和滚动的性能都会得到提升
使用场景：
配置一个一维列表List
配置一个二维列表Grid
配置滚动到指定元素

6.使用骨架组件减少布局移动(Layout Shift)
可使用：React-placeholder插件
预设置placeholders
自定义placeholder
