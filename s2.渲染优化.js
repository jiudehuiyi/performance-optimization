/*
    渲染优化
*/

1.页面绘制的过程:
DOM树和CSSOM树 合成 渲染树，下一步为布局，在下一步为绘制,再下一步为合成,如下所示
 DOM    Tree     
             => Render Tree  =>  Layout => Paint => Layer,composite   
CSSDOM  Tree

DOM树是将所有HTML节点建立起一棵树
CSSOM树是将所有CSS样式建立成一棵样式树
而渲染树是由DOM树和CSSOM树组合而成，他主要关心元素位置和大小
Layout叫做布局，也叫做回流，也就是reflow
Paint叫做绘制，也叫重绘，它是将布局得到的结果绘制到页面上
Layer分层
compositor 复合 将合并各个图层，将数据由CPU输出绘制给GPU最终绘制仔屏幕上（复杂的视图层会给这个阶段的 GPU 计算带来一些压力，在实际应用中为了优化动画性能，我们有时会手动区分不同的图层）

2.触发Layout(回流)一般操作:
由于回流只关心位置和大小，所以我们从这个角度可以得到触发回流的相关操作
(1).添加/删除元素 (2).display:none
(3).移动元素位置 (4).操作styles
(5).offsetLeft,scrollTop,clientWidth这些API
(6).修改浏览器大小，字体大小
也就是位置和大小改变都会触发回流!!

回流有时候还会触发一个怪异癖:回流抖动(layout thrashing),例如,不断改变元素位置，使用offsetTop这些值
代码为:
    //连续更新卡片宽度方法
    let cards = document.querySelectorAll(".card");
    const update = (timestamp)=>{
        for(let i=0;i<cards.length;i++){
            cards[i].style.width = (( Math.sin(cards[i].offsetTop+timestamp/1000 )+1)*500+"px"
        }
        window.requestAnimationFrame(update)
    }
解决的方式有两种:
第一种：避免回流
第二种：读写分离，也就是将读取元素位置和改变元素位置的操作进行分离

社区提供解决回流抖动最佳方案为使用:
 FastDom库(主要功能为批量对DOM的读写操作)
使用fastdom.measure读取，fastdom.mutate写入，例如:
fastdom.measure( ()=>{
    //读取相关值
    fastdom.mutate(()=>{
        //写入相关值

    })
} )

3.Layer和Compositor(分层与合成)
为什么需要分层？
当浏览器处理复杂的动画的时候如果没有分层这种机制就会频繁触发回流和重绘，会循环触发页面重新渲染，带来严重的性能问题
所以浏览器的分层机制就是专门来处理这种问题，当使用分层，动画触发，也就是触发分层和合成这两个阶段，减少浏览器重新渲染
如何分层？
当我们需要对某个元素做几何形状变化，透明度，或者缩放之类的操作的时候，可以使用will-change来告诉渲染引擎，
例如：
.box {
    will-change:transform,opacity;
}
使用这个属性后就会将此元素单独生成一层，直接启动GPU进行渲染，只会经历分层和组合两个流程，而不需要经过回流和重绘阶段，提高了部分性能
这就是为什么CSS动画比JS动画还好
但是需要值得注意的是分层并不是越多越好因为will-change 会让渲染引擎为该元素准备独立层，占用的内存也会大大增加，因为从层树开始，后续每个阶段都会多一个层结构，都需要额外内存。





