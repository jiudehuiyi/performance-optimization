/*
        性能检测工具
*/
一.
1.在控制台中的network中有个叫waterfall(瀑瀑流),里面的表示出从开始到结束所需要的时间(包括dns等相关的时间)
其中的Waiting(TTFB)则反应出的是这个请求从发出到收到的一共所需要的时间
2.lightHouse工具(chrome浏览器内置工具),可以帮我生成一份性能报告,
绿色代表非常好，橙色代表还可以，红色代表出现问题比较严重，
其中最主要我们需要关注两个指标，
(1).First Contentful Paint 这个是页面首次渲染的时间
(2).Speed Index 这个是谷歌生成的一个基数,叫做速度指数
3.页面也是有fps的，一般以60fps为佳，我们需要怎么才能知道浏览器的fps了呢?
Ctrl+p  =>  输入:>frame   =>  选中(Show frames per second(fps) meter)就是了  

二.RAIL评估标准:
(1). Response 响应
    处理事件应该在50ms内完成
(2).Animation 动画
    1秒60fps，每10ms产生一fps
(3). Idle 空闲 
    尽可能增加空闲时间
(4). Load加载
    在5s完成内容加载并可以交互

三.性能测试工具
(1).使用webPageTest在线网站进行测试
其中得性能指标:
    First Byte :第一次响应得到的数据
    Start render：首屏渲染时间
    total bolcking time:页面阻塞，用户不能交互的时间

(2).LightHouse    
    使用: npm install -g lighthouse
            lighthouse 网站地址(会自动生成一个html性能分析页面)
    性能指标:
        Performance-性能分数(受地区影响，CDN):
            1.First Contentful Paint :第一次内容绘制的时间
            2.Speed Index :用户可看到页面内容的时间
            3.Time to Interactive 用户可交互时间 

            Opportunities操作是很重要，他给出了一些可优化的简易
        Accessibility:可访问性
        Best Practices :使用的最佳实践
        SEO : 搜索引擎优化
        PWA：离线缓存应用        

(3). Chrome DevTool(调试工具)
        Network:网络加载分析
        Performance：性能分析
(4) 性能监测API：
    performance:
        网络时间重要的加载节点:
            performance.getEntriesByType("navigation")[0];
        通过PerformanceObserver得到所有的long tasks对象
        let observer = new PerformanceObserver( (list)=>{
            for(const entry of list.getEntries()){
                console.log(entry)
            }
        } )            



