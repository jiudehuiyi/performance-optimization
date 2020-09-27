/*
    webpack优化基于webpackv4
*/

1.Tree shaking：
去掉冗余代码，一些没有用到的代码,但是它只能去掉模块化导入的代码(import/export),也就是它是基于ES6 Import/Export
但是我们有些文件是不希望去treeSkaing的，例如css，全局作用域js文件，在package.json中去配置不希望使用treeskaing的文件
sideEffects:[
    "*.css"
]
值得注意的是在babel中配置的插件会将ES6语法转化为ES5的语法，这也就是Tree Shaking不生效了，所以我们应该在babel文件上去进行相应的配置
presets:[
    [
        "@babel/preset-env",
        {
            module:false,//启用这个选项Tree Shaking才生效
            "target":{
                browsers:[">0.25%"],//需要支持的浏览器
                "useBuiltIns":"usage",//去除没有使用到的babel-polyfill
            }
        }
    ]
]
2.压缩JS代码：
webpack4引入u'glifyjs-webpack-plugin
后来由terser-webpack-plugin替代，不仅起到压缩JS作用，同时还会支持ES6

3.辅助函数的复用:
例如:
ES6的一个类需要通过babel转化为ES5的构造函数的时候，会生成一个classCallCheck，那么怎么复用了呢？
只需要在babel文件中配置：
plugins:[
    "@babel/plugin-transform-runtime"
]

4. noParse: 提高构建速度,通知webpack忽略较大的库，被忽略的库不能有import,required,define的引入方式,
例如忽略lodash库,采用这样的配置:
module:{
    noParse:/lodash/,
    rules:[]
}
(5).DllPlugin:提高构建速度，避免对打包时不变的库进行重新构建,例如(React,React-dom)
例如如下配置:
entry:{
    "react":["react","react-dom"]
}
output:{
    filename:"[name].dll.js",
    pathname:path.resolve(__dirname,"dll"),
    library:"[name]"
}
plugins:[
    new webpack.DllPlugin(options:{
        name:"[name]",
        path:path.resolve(__dirname,"dll/[name].manifest.json")//描述文件的路径
    })
]
6.对dllplugin进一步优化:
new DllReferencePlugin(options:{
    manifest:required(`${__dirname}/dll/react.manifest.json`)
})
7.代码拆分:
(1).enrty中配置多入口，但是这种方法需要手动维护，而且当两个或者多个bundle有重复的代码就会有资源的浪费
(2).splitChunks:提取公共代码，拆分业务代码和第三方库,配置:
optimization:{
    splitChunks:{
        cacheGroups:{
            vendor:{
                name:"vendor",
                test:/[\\/]node_modules[\\/]/,
                minSize:0,
                minChunks:1,
                priority:10,//优先级
                chunks:"initial"
            },
            common:{
                name:"common",
                test:/[\\/]src[\\/]/,
                chunks:"all",
                minSize:0,
                
            }
        }
    }
}
(3).动态加载：
React利用：lazy，Suspense属性进行动态加载,它会在webpack中会被拆出来，拆出来文件名为:x.bundle.js和x.style.css

8.webpack资源压缩(CSS,JS,HTML)
Terser压缩JS
mini-css-extract-plugin压缩CSS
HtmlWebpackPlugin-minify 压缩HTML

9.持久化缓存方案：当内容改变，hash就会改变
(1).每个打包资源文件有唯一得hash值
(2).修改后只有受影响的文件hash发生变化
(3).充分利用浏览器缓存
例如：
output:{
    //这样配置还有一个缺点，就是css和js没有分离开，它们是共用同一个hash值，所以我们需要额外配置css
    filename:"[name].[hash].bundle.js",//非按需加载的js文件，没有被拆分出来的文件
    chunkFilename:"[name].[chunkhash:8].bundle.js",//按需加载的js文件，被拆分出来的文件
}
额外配置css:
new MiniCssExtractPlugin( options:{
    filename:"[name].[contenthash].css",
    chunkFilename:"[id].[contenthash:8].css"
} )
10.监测与分析:
(1).Stats:分析与可视化图
(2).webpack-bundle-analyzer进行体积分析
script :{
    analyze:"source-map-exploreed 'build/*.js' "//它是依赖source-map进行分析的,并不是基于bundle文件
}
module.export = {
    devtool:"hidden-source-map"
}

(3).speed-measure-webpack-plugin 速度分析
11.React的按需加载
(1).React Router基于webpack动态引入
(2).使用Reloadable高级组件
(3).React-loadable
