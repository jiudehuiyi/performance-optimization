									**前端需要懂的node.js基础**

**1.模块的执行:**

在一个node.js文件中它是对内容的执行：

(function( exports,require,module,__filename,__dirname ){

​		//模块中的内容

})

所以从上述可知,exports,require,module,__filename,__dirname这五个变量并不是全局变量,由于是当作为参数,所以可以在node文件中直接使用,而不用加载.

**2.require(id)**

​	这是node的引入库的方式,因为它是遵循common.js规则的,它首先会去缓存中寻找,当缓存中没有则按照路径去寻找想对应的模块,例如加载一个axios库

node方式:let axios = require("axios");

ES6方式 : import axios from "axios";

**3.module和module.js**:

- exports 是 module 的属性，默认情况是空对象
- require 一个模块实际得到的是该模块的 exports 属性
- [exports.xxx](http://exports.xxx/) 导出具有多个属性的对象
- module.exports = xxx 导出一个对象

