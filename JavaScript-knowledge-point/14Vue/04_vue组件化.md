# 1. vue组件的定义与使用
## 1). vue组件定义：一个.vue文件就是一个vue组件

## 2). 组成(3个部分)
	1.模板页面: 
      <template>
        页面模板
      </template>
    2.JS模块对象: 
      <script>
        export default {
          data() {return {}},
          methods: {},
          computed: {},
          components: {}
        }
      </script>
    3.样式: 
      <style>  
        样式定义
      </style>

## 3). 基本使用
	1. 引入组件
	2. 映射成标签
	3. 使用标签
	    <template>
	      <hello>---------------------------------->3.先引入标签
	    </template>
	    <script>
	      import Hello from './components/Hello'--->1.引入标签
	      export default {
	        components: {
	          Hello-------------------------------->2.隐射成标签
	        }
	      }
	    </script>

## 4). 关于标签名与标签属性名书写问题:
	写法一: 一模一样
	写法二: 大写变小写, 并用-连接 
  
# 2. 组件化编码的基本流程
	1). 拆分界面, 抽取组件
	2). 编写静态组件
	3). 编写动态组件
    	初始化数据, 动态显示初始化界面
    	实现与用户交互功能
    
# 3. 组件间通信
## 1). 组件通信的5种方式
	props：标签属性传递
          函数：子组件向父组件传递数据（如add之类）
          非函数（对象和数组等）：父组件向子组件传递数据
          不好：props只能逐层传递，兄弟组件传递还要通过父组件
	vue的自定义事件
          在父组件中给子组件的的标签上自定义事件，只支持子组件向父组件传递信息
	pubsub第三方库（全局事件主线）：消息的订阅和发布
	slot
	vuex
## 2). 基本原则: 
	不要在子组件中直接修改父组件的状态数据
    数据在哪个组件，更新数据的行为就在哪个组件操作
## 3). 通信方式1: props
	1. 注意: 此方式用于父组件向子/孙组件传递数据
	2. 使用组件标签时: 是动态属性（有：是js，没有是html）
		<my-component name='tom' :age='3' :set-name='setName'></my-component>
	3. 定义组件MyComponent时:
		* 在组件内声明所有的props
		    //方式一: 只指定名称
		    props: ['name', 'age', 'setName']
		    //方式二: 指定名称和类型
		    props: {
		      name: String,
		      age: Number,
		      setNmae: Function
		    }
		    //方式三: 指定名称/类型/必要性/默认值（不传值的时候有用）
		    props: {
		      name: {type: String, required: true, default:xxx},
		    }
		* 所有props的属性都会成为component对象的只读属性, 模板页面可以直接引用
		
## 4). 通信方式2: vue自定义事件（编码触发触发是时候的代码）
        绑定事件监听（绑给谁，监听什么事件，回调函数是哪个函数），
        什么时候触发（对元素进行对应的操作时触发，event操作挂载在event上面）
	1. 绑定事件监听
		// 方式一: 通过v-on绑定
		@delete_todo="deleteTodo"
		// 方式二: 通过$on()
		this.$refs.xxx.$on('delete_todo', function (todo) {
		  this.deleteTodo(todo)
		})
	2. 触发事件
		this.$emit(eventName, data): 触发事件(只能在父组件中接收)
	3. 注意: 
		此方式用于子组件向父组件发送消息(数据)

## 5). 通信方式3: 消息订阅与发布/全局事件总线
	1. 使用第三方库: PubSubJS
	2. 订阅消息（定义触发事件）
		PubSub.subscribe('msg', function(msg, data){})
	3. 发布消息（触发事件）
		PubSub.publish('msg', data)
	4. 注意
		此方式可实现任意组件间通信(数据)
	
## 6). 通信方式4: 使用slot实现父子组件通信
	1. 注意: 此方式用于父组件向子组件传递`标签数据`
	2. 子组件: child.vue
		<template>
			<div>
				<slot name="xxx">不确定的标签结构1</slot>
				<div>组件确定的标签结构</div>
				<slot name="yyy">不确定的标签结构2</slot>
			</div>
		</template>
	3. 父组件: parent.vue
		<child>
			<div slot="xxx">xxx对应的标签结构</div>
			<div slot="yyy">yyyy对应的标签结构</div>
		</child>
		
# 4. 事件的2个概念
## 1). 绑定事件监听 (订阅)
	目标: 标签元素  <button>
	事件名(类型): click/focus
	回调函数: function(event){}

## 2). 触发事件 (发布)
   事件名：click/自定义名称
   数据：传递回调函数
   触发方式：
	  DOM事件: 用户在浏览器上对应的界面上做对应的操作
	  自定义: 编码手动触发

#5.数组常用的方法
  1.push()/shift()/unshif()就不说了
  2.我就说一些开发中常用的方法，都是声明式的函数
    map（），在react中经常用，用来根据数据的数组生成标签的数组
    filter
    reduce
    find/findIndex（）