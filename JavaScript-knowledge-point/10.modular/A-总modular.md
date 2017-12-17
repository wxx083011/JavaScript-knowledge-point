#modular
###全局函数模式
 * 全局函数模式: 将不同的功能封装成不同的全局函数
 * 问题: Global被污染了, 很容易引起命名冲突
 * 
![](https://i.imgur.com/nIFsCza.png)

###namespace模式
 * namespace模式: 简单对象封装
 * 作用: 减少了全局变量
 * 问题: 不安全(数据不是私有的)
 
 ![](https://i.imgur.com/srn1Jyo.png)

###IIFE模式
  * IIFE模式: 匿名函数自调用(闭包)
 * IIFE : immediately-invoked function expression(立即调用函数表达式)
 * 作用: 数据是私有的, 外部只能通过暴露的方法操作
 * 问题: 如果当前这个模块依赖另一个模块怎么办?
 
 ![](https://i.imgur.com/4sC86ia.png)

###IIFE模式增强
 * IIFE模式增强 : 引入依赖
 * 这就是现代模块实现的基石
 
![](https://i.imgur.com/Sn8183U.png)


#CommonJS-Node模块化教程
## Node.js模块化教程，服务器端的实现
1. 下载安装node.js
2. 创建项目结构
  ```
  |-modules
    |-module1.js
    |-module2.js
    |-module3.js
  |-app.js
  |-package.json
    {
      "name": "commonJS-node",
      "version": "1.0.0"
    }
  ```
3. 下载第三方模块
  * npm install uniq --save
4. 模块化编码
  * module1.js
    ```
    module.exports = {
      foo() {
        console.log('moudle1 foo()')
      }
    }
    ```
  * module2.js
    ```
    module.exports = function () {
      console.log('module2()')
    }
    ```
  * module3.js
    ```
    exports.foo = function () {
      console.log('module3 foo()')
    }
    
    exports.bar = function () {
      console.log('module3 bar()')
    }
    ```
  * app.js 
    ```
   
		      1. 定义暴露模块:
		        module.exports = value;
		        exports.xxx = value;
		      2. 引入模块:
		        var module = require(模块名或模块路径);
		     */
		    "use strict";
		    //引用模块
		    let module1 = require('./modules/module1')
		    let module2 = require('./modules/module2')
		    let module3 = require('./modules/module3')
		    
		    let uniq = require('uniq')
		    let fs = require('fs')
		    
		    //使用模块
		    module1.foo()
		    module2()
		    module3.foo()
		    module3.bar()
		    
		    console.log(uniq([1, 3, 1, 4, 3]))
5. 通过node运行app.js
  * 命令: node app.js
  * 工具: 右键-->运行

## Browserify模块化使用教程，浏览器端的实现
1. 创建项目结构
  ```
  |-js
    |-dist //打包生成文件的目录
    |-src //源码所在的目录
      |-module1.js
      |-module2.js
      |-module3.js
      |-app.js //应用主源文件
  |-index.html
  |-package.json
    {
      "name": "browserify-test",
      "version": "1.0.0"
    }
  ```
![](https://i.imgur.com/tIrQ0g1.png)
2. 下载browserify
  * 全局: npm install browserify -g
  * 局部: npm install browserify --save-dev
3. 定义模块代码
  * module1.js
    ```
    module.exports = {
      foo() {
        console.log('moudle1 foo()')
      }
    }
    ```
  * module2.js
    ```
    module.exports = function () {
      console.log('module2()')
    }
    ```
  * module3.js
    ```
      exports.foo = function () {
        console.log('module3 foo()')
      }

      exports.bar = function () {
        console.log('module3 bar()')
      }
    ```
  * app.js (应用的主js)
    ```
    //引用模块
    let module1 = require('./module1')
    let module2 = require('./module2')
    let module3 = require('./module3')
    
    let uniq = require('uniq')
    
    //使用模块
    module1.foo()
    module2()
    module3.foo()
    module3.bar()
    
    console.log(uniq([1, 3, 1, 4, 3]))
    ```
* 打包处理js:
  * browserify js/src/app.js -o js/dist/bundle.js 
  * 这里前面汇总的那个js的文件位置(这里有一个空格)-o 这个一个编译后要放的文件夹位置    
* 页面使用引入:
  ```
  <script type="text/javascript" src="js/dist/bundle.js"></script> 
                                   这个是编译后那个文件夹位置的文件

  ```
直接打开，运行结果如下
![](https://i.imgur.com/BPpqFRj.png)

##AMD---用require.js实现
    - Asynchronous Module Definition(异步模块定义)
	- https://github.com/amdjs/amdjs-api/wiki/AMD
	- 专门用于浏览器端, 模块的加载是异步的 
###基本语法
定义暴露模块
//定义没有依赖的模块

	   define(function(){
	    	return 模块
	   })
			
//定义有依赖的模块

		define(['module1', 'module2'], function(m1, m2){
			return 模块
		})
引入使用模块

		require(['module1', 'module2'], function(m1, m2){
       	使用m1/m2
       })
实现(浏览器端)

		Require.js
		http://www.requirejs.cn/
		http://www.ruanyifeng.com/blog/2012/11/require_js.html


## require.js使用教程
1. 下载require.js, 并引入
  * 官网: http://www.requirejs.cn/
  * github : https://github.com/requirejs/requirejs
  * 将require.js导入项目: js/libs/require.js 
2. 创建项目结构
  ```
  |-js
    |-libs
      |-require.js
    |-modules
      |-alerter.js
      |-dataService.js
    |-main.js
  |-index.html
  ```
3. 定义require.js的模块代码
  * dataService.js
    ```
    define(function () {
      let msg = 'atguigu.com'
    
      function getMsg() {
        return msg.toUpperCase()
      }
    
      return {getMsg}
    })
    ```
  * alerter.js
    ```
    define(['dataService', 'jquery'], function (dataService, $) {
      let name = 'Tom2'
    
      function showMsg() {
        $('body').css('background', 'gray')
        alert(dataService.getMsg() + ', ' + name)
      }
    
      return {showMsg}
    })
    ```
4. 应用主(入口)js: main.js
  ```
  (function () {
    //配置
    requirejs.config({
      //基本路径
      baseUrl: "js/",
      //模块标识名与模块路径映射
      paths: {
        "alerter": "modules/alerter",
        "dataService": "modules/dataService",
      }
    })
    
    //引入使用模块
    requirejs( ['alerter'], function(alerter) {
      alerter.showMsg()
    })
  })()
  ```
        
5. 页面使用模块:
  <script data-main="js/main" src="js/libs/require.js"></script>
    
------------------------------------------------------------------------

6. 使用第三方基于require.js的框架(jquery)
  * 将jquery的库文件导入到项目: 
    * js/libs/jquery-1.10.1.js
  * 在main.js中配置jquery路径
    ```
    paths: {
              'jquery': 'libs/jquery-1.10.1'
          }
    ```
  * 在alerter.js中使用jquery
    ```
    define(['dataService', 'jquery'], function (dataService, $) {
        var name = 'xfzhang'
        function showMsg() {
            $('body').css({background : 'red'})
            alert(name + ' '+dataService.getMsg())
        }
        return {showMsg}
    })
    ```
------------------------------------------------------------------------

7. 使用第三方不基于require.js的框架(angular)
    * 将angular.js导入项目
    * js/libs/angular.js
   
  * 在main.js中配置
    ```
    (function () {
      require.config({
        //基本路径
        baseUrl: "js/",
        //模块标识名与模块路径映射
        paths: {
          //第三方库
          'jquery' : './libs/jquery-1.10.1',
          'angular' : './libs/angular',
          //自定义模块
          "alerter": "./modules/alerter",
          "dataService": "./modules/dataService"
        },
        /*
         配置不兼容AMD的模块
         exports : 指定与相对应的模块名对应的模块对象
         */
        shim: {
          'angular' : {
            exports : 'angular'
          }
        }
      })
      //引入使用模块
      require( ['alerter', 'angular'], function(alerter, angular) {
        alerter.showMsg()
        console.log(angular);
      })
    })()
    ```

例子解析：
**dataService:**
![](https://i.imgur.com/pFzHgpL.png)

**alerter**
![](https://i.imgur.com/57VU66d.png)

**主文件js**
![](https://i.imgur.com/iJYBanV.png)

**在浏览器中引入**
![](https://i.imgur.com/BYyM6ue.png)

###用第三方软件
- juqery
![](https://i.imgur.com/ik3gSUU.png)

**在函数中调用时**
![](https://i.imgur.com/9VZgt3Y.png)

-angular
![](https://i.imgur.com/g9jzAEK.png)


###require.js使用注意事项
 - 路径=basUrl+自己文件当前的路径
 - jquery要用小写，因为在源码的时候已经为AMD说明了要用小写
 - angular要单独再配置
 - 使用这些引入路径了之后，在全局都可以用，像电脑的全局变量
 - 在使用是，首先在中括号里面添加函数名，就会得到一个对象，和angular一样，在函数的参数中与中括号一一对象，叫做声明式依赖注入，做好这两布就可以用函数了
 


CMD
规范

		说明
		Common Module Definition(通用模块定义)
		https://github.com/seajs/seajs/issues/242
		专门用于浏览器端, 模块的加载是异步的 
		模块使用时才会加载执行

基本语法

	定义暴露模块
	//定义没有依赖的模块
	define(function(require, exports, module){
	exports.xxx = value
	module.exports = value
	})
				
//定义有依赖的模块

		define(function(require, exports, module){
			//引入依赖模块(同步)
			var module2 = require('./module2')
			//引入依赖模块(异步)
		  	require.async('./module3', function (m3) {
		    	
		  	})
			//暴露模块
			exports.xxx = value
		})
引入使用模块

		define(function (require) {
		var m1 = require('./module1')
		var m4 = require('./module4')
		m1.show()
		m4.show()
	    })
实现(浏览器端)
		Sea.js
		http://www.zhangxinxu.com/sp/seajs/

## CMD--sea.js简单使用教程
1. 下载sea.js, 并引入
  * 官网: http://seajs.org/
  * github : https://github.com/seajs/seajs
  * 将sea.js导入项目: js/libs/sea.js 
2. 创建项目结构
  ```
  |-js
    |-libs
      |-sea.js
    |-modules
      |-module1.js
      |-module2.js
      |-module3.js
      |-module4.js
      |-main.js
  |-index.html
  ```
3. 定义sea.js的模块代码
  * module1.js
    ```
    define(function (require, exports, module) {
      //内部变量数据
      var data = 'atguigu.com'
      //内部函数
      function show() {
        console.log('module1 show() ' + data)
      }
    
      //向外暴露
      exports.show = show
    })
    ```
  * module2.js
    ```
    define(function (require, exports, module) {
      module.exports = {
        msg: 'I Will Back'
      }
    })
    ```
  * module3.js
    ```
    define(function (require, exports, module) {
      const API_KEY = 'abc123'
      exports.API_KEY = API_KEY
    })
    ```
  * module4.js
    ```
    define(function (require, exports, module) {
      //引入依赖模块(同步)
      var module2 = require('./module2')
    
      function show() {
        console.log('module4 show() ' + module2.msg)
      }
    
      exports.show = show
      //引入依赖模块(异步)
      require.async('./module3', function (m3) {
        console.log('异步引入依赖模块3  ' + m3.API_KEY)
      })
    })
    ```
  * main.js : 主(入口)模块
    ```
    define(function (require) {
      var m1 = require('./module1')
      var m4 = require('./module4')
      m1.show()
      m4.show()
    })
    ```
4. index.html:
  ```
  <!--
  使用seajs:
    1. 引入sea.js库
    2. 如何定义导出模块 :
      define()
      exports
      module.exports
    3. 如何依赖模块:
      require()
    4. 如何使用模块:
      seajs.use()
  -->
  <script type="text/javascript" src="js/libs/sea.js"></script>
  <script type="text/javascript">
    seajs.use('./js/modules/main')
  </script>
  ```
        
    
       
## ES6模块化
ES6
规范

	说明
	http://es6.ruanyifeng.com/#docs/module
	依赖模块需要编译打包处理
语法

	导出模块: export
	引入模块: import
实现(浏览器端)
	
	使用Babel将ES6编译为ES5代码
	使用Browserify编译打包js
## ES6-Babel-Browserify使用教程
1. 定义package.json文件
  ```
  {
    "name" : "es6-babel-browserify",
    "version" : "1.0.0"
  }
  ```
2. 安装babel-cli, babel-preset-es2015和browserify
  * npm install babel-cli browserify -g 
	* npm install babel-preset-es2015 --save-dev 
	* preset 预设(将es6转换成es5的所有插件打包)
3. 定义.babelrc文件，与json在同一个目录下，文件名直接是.babelrc，用来说明转化es6语法 
	```
	{
    "presets": ["es2015"]
    }
	```
4. 编码，分别暴露和统一暴露都是常规暴露，是对象要用对象的解构赋值的方式去接收
  * js/src/module1.js  分别暴露
    ```
    export function foo() {
      console.log('module1 foo()');
    }
    export function bar() {
      console.log('module1 bar()');
    }
    export const DATA_ARR = [1, 3, 5, 1]
    ```
  * js/src/module2.js  统一暴露
    ```
    let data = 'module2 data'
    
    function fun1() {
      console.log('module2 fun1() ' + data);
    }
    
    function fun2() {
      console.log('module2 fun2() ' + data);
    }
    
    export {fun1, fun2}
    ```
  * js/src/module3.js----这个是默认暴露，
    ```
    export default {//这两单词一定要写
      name: 'Tom',
      setName: function (name) {
        this.name = name
      }
    }
    ```
  * js/src/app.js  在主文件中
    ```
    import {foo, bar} from './module1'
    import {DATA_ARR} from './module1'
    import {fun1, fun2} from './module2'
    import person from './module3'
    
    import $ from 'jquery'
    
    $('body').css('background', 'red')
    
    foo()
    bar()
    console.log(DATA_ARR);
    fun1()
    fun2()
    
    person.setName('JACK')
    console.log(person.name);
    ```
5. 编译（上面每次修改都要再编译一次）
  * 使用Babel将ES6编译为ES5代码(但包含CommonJS语法) : babel js/src -d js/lib
  * 使用Browserify编译js : browserify js/lib/app.js -o js/lib/bundle.js
6. 页面中引入测试
  ```
  <script type="text/javascript" src="js/lib/bundle.js"></script>
  ```
7. 引入第三方模块(jQuery)
  1). 下载jQuery模块: 
    * npm install jquery@1 --save
  2). 在app.js中引入并使用
    ```
    import $ from 'jquery'
    $('body').css('background', 'red')
    ```

## JS模块化
* 模块化的理解
* 什么是模块?
  * 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
  * 块的内部数据/实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信
* 一个模块的组成
  * 数据--->内部的属性
  * 操作数据的行为--->内部的函数
* 模块化
  * 编码时是按照模块一个一个编码的, 整个项目就是一个模块化的项目
* 模块化的进化过程
  * 全局function模式 : 
    * 编码: 全局变量/函数
    * 问题: 污染全局命名空间, 容易引起命名冲突/数据不安全
    
  * namespace模式 : 
    * 编码: 将数据/行为封装到对象中
    * 解决: 命名冲突(减少了全局变量)
    * 问题: 数据不安全(外部可以直接修改模块内部的数据)
  * IIFE模式/增强
    * IIFE : 立即调用函数表达式--->匿名函数自调用
    * 编码: 将数据和行为封装到一个函数内部, 通过给window添加属性来向外暴露接口
    * 引入依赖: 通过函数形参来引入依赖模块
      ```
      (function(window, module2){
        var data = 'atguigu.com'
        function foo() {
           module2.xxx()
           console.log('foo()'+data)
        }
        function bar() {
           console.log('bar()'+data)
        }
        
        window.module = {foo}
      })(window, module2)
      ```
* 模块化规范
  * CommonJS
    * Node.js : 服务器端
    * Browserify : 浏览器端    也称为js的打包工具
    * 基本语法:
      * 定义暴露模块 : exports
        ```
        exports.xxx = value
        module.exports = value
        ```
      引入模块 : require
        ```
        var module = require('模块名/模块相对路径')
        ```
    * 引入模块发生在什么时候?
      * Node : 运行时, 动态同步引入
      * Browserify : 在运行前对模块进行编译/转译/打包的处理(已经将依赖的模块包含进来了), 
                  运行的是打包生成的js, 运行时不存在需要再从远程引入依赖模块
  * AMD : 浏览器端
    * require.js
    * 基本语法
      * 定义暴露模块: define([依赖模块名], function(){return 模块对象})
      * 引入模块: require(['模块1', '模块2', '模块3'], function(m1, m2){//使用模块对象})
      * 配置: 
        ```
        require.config({
          //基本路径
          baseUrl : 'js/',
          //标识名称与路径的映射
          paths : {
            '模块1' : 'modules/模块1',
            '模块2' : 'modules/模块2',
            'angular' : 'libs/angular',
            'angular-messages' : 'libs/angular-messages'
          },
          //非AMD的模块
          shim : {
            'angular' : {
                exports : 'angular'
            },
            'angular-messages' : {
                exports : 'angular-messages',
                deps : ['angular']
            }
          }
        })
        ```
  * CMD : 浏览器端
    * sea.js
    * 基本语法
      * 定义暴露模块: 
        ```
        define(function(require, module, exports){
          通过require引入依赖模块
          通过module/exports来暴露模块
          exports.xxx = value
        })
        ```
      * 使用模块seajs.use(['模块1', '模块2'])
  * ES6
    * ES6内置了模块化的实现
    * 基本语法
      * 定义暴露模块 : export
        * 暴露一个对象: 
          ```
          export default 对象
          ```
        * 暴露多个: 
          ```
          export var xxx = value1
          export let yyy = value2
          
          var xxx = value1
          let yyy = value2
          export {xxx, yyy}
          ```
              
      * 引入使用模块 : import
        * default模块:
          ```
          import xxx  from '模块路径/模块名'
          ```
        * 其它模块
          ```
          import {xxx, yyy} from '模块路径/模块名'
          import * as module1 from '模块路径/模块名'
          ```
    * 问题: 所有浏览器还不能直接识别ES6模块化的语法  
    * 解决:
        * 使用Babel将ES6--->ES5(使用了CommonJS) ----浏览器还不能直接支行
        * 使用Browserify--->打包处理----浏览器可以运行
            
    
    

