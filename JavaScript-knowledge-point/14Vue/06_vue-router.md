# 1. 说明
	官方提供的用来实现SPA的vue插件
	github: https://github.com/vuejs/vue-router
	中文文档: http://router.vuejs.org/zh-cn/
	下载: npm install vue-router --save

路由拿来实现SPA，是一种隐射关系，分为前端路由和后端路由，一个是key（path）一个是value（回调函数）这是后端  前端是key（path）value（组件），
  
# 2. 相关API说明
## 1). VueRouter(): 用于创建路由器的构建函数
    new VueRouter({
      // 多个配置项
    })

## 2). 路由配置
    多个路由数组
    routes: [
      { // 一般路由
        path: '/about',
        component: about
      },
      { // 自动跳转路由
        path: '/', 
        redirect: '/about'
      }
    ]

## 3). 注册路由器，在main.js中加如下的代码

	import router from './router'
	new Vue({
		router
	})

	* 例子：
	  import Vue from 'vue'
	  import App from './App.vue'
	  import router from './router' // 会自动加载router文件夹下的index.js
	
	// 创建vm对象
	new Vue({
	  el: '#app',
	  render: h => h(App),
	  router // 配置路由器
	})


## 4). 使用路由组件标签:
	1. router-link: 用来生成路由链接，点击这个就会出现响应的路由
		<router-link to="/xxx">Go to XXX</router-link>
	2. <router-view>: 用来显示当前路由组件界面，表示当前路由组件放置这里
		<router-view></router-view>
## 5）.给路由标签跳动样式时
       linkActiveClass:'active',
# 3. 简单路由
## 1). 路由组件:
	home.vue
	about.vue

## 2). 应用组件: App.vue
    <div>
      <!--路由链接-->
      <router-link to="/about">About</router-link>
      <router-link to="/home">Home</router-link>
      <!--用于渲染当前路由组件-->
      <router-view></router-view>  
    </div>

## 3). 路由器模块: src/router/index.js
	export default new VueRouter({
      routes: [
        {
          path: '/',
          redirect: '/about'
        },
        {
          path: '/about',
          component: about
        },
        {
          path: '/home',
          component: home
        }
      ]
    })

## 4). 入口js: main.js
	import Vue from 'vue'
    import router from './router'
    // 创建vue配置路由器
    new Vue({
      el: '#app',
      router,
      render: h => h(app)
    })

## 5). 优化路由器配置
    linkActiveClass: 'active', // 指定选中的路由链接的class
    
# 4. 嵌套路由
## 1). 配置嵌套路由
    path: '/home',
    component: home,
    children: [
      {
        path: 'news',
        component: news
      },
      {
        path: 'message',
        component: message
      }
    ]

## 2). 路由链接
    <router-link to="/home/news">News</router-link>
    <router-link to="/home/message">Message</router-link>

# 5. 向路由组件传递数据
## 1). 方式1: 路由路径携带参数
	1.配置路由
      children: [
        {
          path: 'mdetail/:id',
          component: messageDetail
        }
      ]
    2.路由路径，
      <router-link :to="'/home/message/mdetail/'+m.id">{{m.title}}</router-link>
    3.路由组件中读取请求参数 $route在路由组件有这个参数
      this.$route.params.id

## 2). 方式2: <router-view>属性携带数据
    <router-view :msg="msg"></router-view>

# 6. 缓存路由组件对象++；: <keep-alive>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>



7.编程式导航

		this.$router.push(path):相当于点击路由链接（可以返回点击当前路由界面）
		this.$router.replace(path)用于新路由替换旧路由（可以返回点击当前路由界面）
		this.$router.back(path):相当于点击路由链接（可以返回点击当前路由界面）
		this.$router.go(-1):相当于点击路由链接（可以返回点击当前路由界面）
		this.$router.go(1):相当于点击路由链接（可以返回点击当前路由界面）
     
      路由跳转：
          <a href="#/xxx">
      页面跳转
          <a href = "#/xxx">
           window.location = '/xxx'



# 7. 路由总结
## 1). 分类 
	后台路由
	前台路由
## 2). 是什么
	一句话: 就是一个映射关系(key:value)
	后台路由: path: callback
	前台路由: path: component
路由也可以通过js跳转，Windows.local，


路由实现的基本原理，是通过操作hash值来操作url，来请求不同的网址内容 vue运用了BOM中对hash值的监视函数和修改来监听hash来跳转页面
      window.location.hash===>得到hash的值，可以改变hash的值
      window.onhashchange = function(监听hash的改变)



路由组件和一般组件的区别
		路由组件：路由组件不用写标签的
		一般组件：是要标签显示，两者的定义没区别 使用有区别


路由：
		1.创建路由组件
		2.映射路由
		3.使用路由----><router link>  生成a标签跳转路由
		         ----><router view>  显示路由



