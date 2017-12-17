# 1. 说明:
	vue-cli是vue官方提供的脚手架工具，下载已经有组件化，工程化，依赖配置都一样，
	github: https://github.com/vuejs/vue-cli
	作用: 它能帮助我们从https://github.com/vuejs-templates下载模板项目

# 2. 使用vue-cli快速创建工程化vue项目
## 1). 使用基于webpack的简单模板创建项目: webpack-simple_demo
    npm install -g vue-cli    //下载脚手架包
    vue init webpack-simple webpack-simple_demo   //下载模板
    cd webpack-simple_demo
    npm install
    npm run dev
    访问: http://localhost:8080/

## 2). 使用基于webpack的完整模板创建项目: webpack_demo
    vue init webpack webpack_demo
    cd webpack_demo
    npm install
    npm run dev
    访问: http://localhost:8080/

## 3). 模板项目的结构
完整的没有自动打开一般在config下的index中的autoOpenBreonew把flase改成true就行了
	|-- build : webpack相关的配置文件夹(基本不需要修改)
    	|-- dev-server.js : 通过express启动后台服务器
	|-- config: webpack相关的配置文件夹(基本不需要修改)
    	|-- index.js: 指定的后台服务的端口号和静态资源文件夹
	|-- node_modules
	|-- src : 源码文件夹
    	|-- components: vue组件及其相关资源文件夹
      	|-- app.vue: 应用根主组件
    	|-- main.js: 应用入口js
	|-- static: 静态资源文件夹
        |--gitkeep文件，因为git不传空文件，只能再加一个 
    |-- 有rc结尾都是配置文件
	|-- .babelrc: babel的配置文件
	|-- .eslintignore: eslint检查忽略的配置
	|-- .eslintrc.js: eslint检查的配置
	|-- .gitignore: git版本管制忽略的配置
	|-- index.html: 主页面文件，不用引入js和css就可以直接编译好
	|-- package.json: 应用包配置文件
        |--标识：name和version
        |--运行时打包脚本，script
        |-- 依赖：运行时依赖和开发时依赖
	|-- README.md: 应用描述说明的readme文件

# 3. 编码测试与打包发布项目
## 1). 编码测试:
	npm run dev  （是在内存中打包的。还运行了）
	    基本做法：修改代码，在服务器端只对当前模块更新页面自动打包，推送给浏览器，一个是js 		一个是json，浏览器加载新模块替换老模块，
	    好处：浏览器住需要请求加载新模块压力小，别的组件的状态得到了保留方便测试，只编译打   		包修改的部分，打包更快
    访问: http://localhost:8080
    编码, 查看效果(HMR) hot model replace 实时加载

## 2). 打包发布(发包)
    npm run build  先这个，再回压缩。会自动引入css和js
    npm install -g serve  先下载全部 
    serve dist  运行之后有一个网址，用那个网址来访问
    访问: http://localhost:5000  将dist文件复制出来



将文件夹部署出去


##在复杂的脚手架中，
	1.先建立main.js文件
	2.先在scr中定义每个组件
	3.在组件中，1.引入对应的模块，标签
           2.在new中，要映射这个便签 components：app将组件映射成标签
           3.在template中：<App/>当前标签会被插入到el对应的div中
