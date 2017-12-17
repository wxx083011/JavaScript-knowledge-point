##ECMA：
它是一种由ECMA组织（前身为欧洲计算机制造商协会）制定和发布的脚本语言规范
2. 而我们学的 JavaScript 是ECMA的实现, 但术语ECMAScript和JavaScript平时表达同一个意思
3. JS包含三个部分：
 1). ECMAScript（核心）
 2). 扩展==>浏览器端
  * BOM（浏览器对象模型）
  * DOM（文档对象模型）
 3). 扩展==>服务器端
  * Node
4. ES的几个重要版本
 * ES5 : 09年发布
 * ES6(ES2015) : 15年发布, 也称为ECMA2015
 * ES7(ES2016) : 16年发布, 也称为ECMA2016  (变化不大)
ES5：
严格模式：
1. 理解:
  * 除了正常运行模式(混杂模式)，ES5添加了第二种运行模式："严格模式"（strict mode）。
  * 顾名思义，这种模式使得Javascript在更严格的语法条件下运行
2.  目的/作用
 * 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为
 * 消除代码运行的一些不安全之处，为代码的安全运行保驾护航
 * 为未来新版本的Javascript做好铺垫
3. 使用
  * 在全局或函数的第一条语句定义为: 'use strict';
  * 如果浏览器不支持, 只解析为一条简单的语句, 没有任何副作用
4. 语法和行为改变
 * 必须用var声明变量
 * 禁止自定义的函数中的this指向window
 * 创建eval作用域
 * 对象不能有重名的属性
JSON
1. JSON.stringify(obj/arr)
  * js对象(数组)转换为json对象(数组)
2. JSON.parse(json)
  * json对象(数组)转换为js对象(数组)
		 var obj = {
		    name:'wxx',
		    age:18
		  }
		  var jsonss = JSON.stringify(obj)
		  console.log(jsonss);
		
		  var obj1 = JSON.parse(jsonss);
		  console.log(obj1);

##ES5给Object扩展了好一些静态方法, 常用的2个:
 1. Object.create(prototype, [descriptors])
  * 作用: 以指定对象为原型创建新的对象
  * 为新的对象指定新的属性, 并对属性进行描述
    value : 指定值
    writable : 标识当前属性值是否是可修改的, 默认为false
    configurable: 标识当前属性是否可以被删除 默认为false
    enumerable： 标识当前属性是否能用for in 枚举 默认为false
			var obj = {name : 'curry', age : 29}
			    var obj1 = {};
			    obj1 = Object.create(obj, {
			
			        sex : {
			            value : '男',
			            writable : true
			        }
			    });
			    obj1.sex = '女';
			    console.log(obj1.sex);

 2. Object.defineProperties(object, descriptors)
  * 作用: 为指定对象定义扩展多个属性
  * get ：用来获取当前属性值得回调函数
  * set ：修改当前属性值得触发的回调函数，并且实参即为修改后的值
  * 存取器属性：setter,getter一个用来存值，一个用来取值

	      var obj2 = {
		        firstName : 'curry',
		        lastName : 'stephen'
		    };
		    Object.defineProperties(obj2, {
		        fullName : {
		            get : function () {
		                return this.firstName + '-' + this.lastName
		            },
		            set : function (data) {
		                var names = data.split('-');
		                this.firstName = names[0];
		                this.lastName = names[1];
		            }
		        }
		    });
		    console.log(obj2.fullName);
		    obj2.firstName = 'tim';
		    obj2.lastName = 'duncan';
		    console.log(obj2.fullName);
		    obj2.fullName = 'kobe-bryant';
		    console.log(obj2.fullName);
Obj的拓展，对象本身的两个方法
    * get propertyName(){} 用来得到当前属性值的回调函数
    * set propertyName(){} 用来监视当前属性值变化的回调函数
	       var obj = {
	        firstName : 'kobe',
	        lastName : 'bryant',
	        get fullName(){
	            return this.firstName + ' ' + this.lastName
	        },
	        set fullName(data){
	            var names = data.split(' ');
	            this.firstName = names[0];
	            this.lastName = names[1];
	        }
		    };
		    console.log(obj.fullName);
		    obj.fullName = 'curry stephen';
		    console.log(obj.fullName);

##数组的Array的拓展
1. Array.prototype.indexOf(value) : 得到值在数组中的第一个下标
2. Array.prototype.lastIndexOf(value) : 得到值在数组中的最后一个下标
3. Array.prototype.forEach(function(item, index){}) : 遍历数组
4. Array.prototype.map(function(item, index){}) : 遍历数组返回一个新的数组，返回加工之后的值
5. Array.prototype.filter(function(item, index){}) : 遍历过滤出一个新的子数组， 返回条件为true的值
### 需求:
   1. 输出第一个6的下标
          var arr = [1, 4, 6, 2, 5, 6];
		  console.log(arr.indexOf(6));//2
   2. 输出最后一个6的下标
            Array.prototype.lastIndexOf(value) : 得到值在数组中的最后一个下标
		    console.log(arr.lastIndexOf(6));//5
   3. 输出所有元素的值和下标
          arr.forEach(function (item, index) {
		        console.log(item, index);
		    });
   4. 根据arr产生一个新数组,要求每个元素都比原来大10
           var arr1 = arr.map(function (item, index) {
		        return item + 10
		    });
   5. 根据arr产生一个新数组, 返回的每个元素要大于4
           var arr2 = arr.filter(function (item, index) {
		        return item > 4
		    });
		    console.log(arr, arr2);

		   
##Function的拓展
1. Function.prototype.bind(obj) :
  * 作用: 将函数内的this绑定为obj, 并将函数返回
2. 面试题: 区别bind()与call()和apply()?
  * 都能指定函数中的this
  * call()/apply()是立即调用函数
  * bind()是将函数返回
   
		 
     <script type="text/javascript">
	    function fun(age) {
	        this.name = 'kobe';
	        this.age = age;
	        console.log('dddddddddddddd');
	    }
	    var obj = {};
	    fun.bind(obj, 12)();
	    console.log(obj.name, obj.age);
##let	
1. 作用:
  * 与var类似, 用于声明一个变量
2. 特点:
  * 在块作用域内有效，如果不是let定义就要用闭包，用了这个就有自己的块作用域
		  let btns = document.getElementsByTagName('button');
		  for(let i = 0;i<btns.length;i++){
		  btns[i].onclick = function () {
		    alert(i);
		  }
		  }

  * 不能重复声明，不能定义同样的名字
  * 不会预处理, 不存在提升
		    //console.log(age);如果是之前就会undefined 这个直接报错
		    // age is not defined
		    let age = 12;
3. 应用:
  * 循环遍历加监听
  * 使用let取代var是趋势
##const关键字		
1. 作用:
  * 定义一个常量
2. 特点:
  * 不能修改
  * 其它特点同let
3. 应用:
  * 保存不用改变的数据

 		 const sex = '男';
    console.log(sex);
    //sex = '女';//不能修改
    console.log(sex);

##简化的对象写法
	* 省略同名的属性值
	* 省略方法的function
	* 例如:	 
**普通额写法：**
           let x = 1;
		   let y = 2;
	       let obj = {
	        x : x,
	        y : y,
	        getPoint : function () {
	            return this.x + this.y
	        }
	       };
**简化的写法：**
			  let point = {
			    x,
			    y,
			    setX (x) {this.x = x}
			  };

##三点运算符用途
1. rest(可变)参数
    * 用来取代arguments 但比arguments灵活,只能是最后部分形参参数
		   function add(...values) {
		    let sum = 0;
		    for(value of values) {
		      sum += value;
		    }
		    return sum;
		  }
2. 扩展运算符
			  let arr1 = [1,3,5];
			  let arr2 = [2,...arr1,6];
			  arr2.push(...arr1);
点点点的运用：
		let  arr = [2,3,4,5,6]
		let arr1=[1,...arr,6]
		console.log(arr1);//[1,2,3,4,5,6]

##模板字符串
  1. 模板字符串 : 简化字符串的拼接
    * 模板字符串必须用 `` 包含
    * 变化的部分使用${xxx}定义
    **对比：**
		    console.log('我叫:' + obj.name + ', 我的年龄是：' + obj.age);
		    console.log(`我叫:${obj.name}, 我的年龄是：${obj.age}`);

##变量的解构赋值
1. 理解:
  * 从对象或数组中提取数据, 并赋值给变量(多个)
2. 对象的解构赋值（）
  let {n, a} = {n:'tom', a:12}
		let obj = {name:'wxx', age:18}
 		 let {age}=obj
  		console.log(age);//可以直接调用 不用在用对象去点出来
3. 数组的解构赋值
  let [a,b] = [1, 'atguigu'];
		  let arr= ['abc',23,true]
		  let [a,b,c,d]=arr;
		  console.log(a, b, c, d);//abcd只是站位置，会依次输出 如果少后面就undefined
4. 用途
  * 给多个形参赋值
		   let obj = {name : 'kobe', age : 39};
		  function person(p) {
		    console.log(p.name, p.age);
		
		  }
		  person(obj) 

##箭头函数
作用: 定义匿名函数
* 基本语法:
  * 没有参数: () => console.log('xxxx')
		   let fun1 = ()=> console.log(1234)
		   fun1();
  * 一个参数: i => i+2
		   let fun2 = x => console.log(x+17)
		  fun2(80);
  * 大于一个参数: (i,j) => i+j
		  let fun3 = (x,y)=>console.log(x+y)
		  fun3(50,50)
					
		 //多个语句
		let fun5 = (x, y) => {
		  console.log(x, y);
		  return x + y;
		}
		console.log(fun5(35, 49));			

  * 函数体不用大括号: 默认返回结果
  * 函数体如果有多个语句, 需要用{}包围，若有需要返回的内容，需要手动返回
* 使用场景: 多用来定义回调函数

* 箭头函数的特点：
    1、简洁
    2、箭头函数没有自己的this，箭头函数的this不是调用的时候决定的，而是在定义的时候处在的对象就是它的this
    3、扩展理解： 箭头函数的this看外层的是否有函数，
        如果有，外层函数的this就是内部箭头函数的this，
        如果没有，则this是window。
**没有函数的情况**
		var btn1 = document.querySelector("#btn1")
		var btn2 = document.querySelector("#btn2")
		  btn1.onclick =()=> {
		   alert(this);
		  }//外层没有函数就是window
**有函数**
		let obj = {
		    name: '箭头函数',
		    getName: () => {
		      btn2.onclick = () => {
		        console.log(this);//要调用才能点击成功
		      }
		    }
		  }
		  obj.getName();


##形参的默认值
   * 形参的默认值----当不传入参数的时候默认使用形参里的默认值，就是咋用户没有传实参的时候，形参可以用形参的默认值
	
		    function Point(x=12, y=12) {
		        this.x = x;
		        this.y = y;
		    }
		    let point = new Point(25, 36);
		    console.log(point);
		    let p = new Point();
		    console.log(p);
		    let point1 = new Point(12, 35);
		    console.log(point1);

##Promise对象
1. 理解:
  * Promise对象: 代表了未来某个将要发生的事件(通常是一个异步操作)
  * 有了promise对象, 可以将异步操作以同步的流程表达出来, **避免了层层嵌套的回调函数**(俗称'回调地狱')，回调函数的错综浮渣
  * ES6的Promise是一个构造函数, 用来生成promise实例
2. 使用promise基本步骤(2步):
  * 创建promise对象
		    let promise = new Promise((resolve, reject) => {
		        //初始化promise状态为 pending
		      //执行异步操作
		      if(异步操作成功) {
		        resolve(value);//修改promise的状态为fullfilled
		      } else {
		        reject(errMsg);//修改promise的状态为rejected
		      }
		    })
  * 调用promise的then()
		    promise.then(function(
		      result => console.log(result),
		      errorMsg => alert(errorMsg)
		    ))
	3. promise对象的3个状态
	  * pending: 初始化状态，
	  * fullfilled: 成功状态
	  * rejected: 失败状态
	4. 应用:
	  * 使用promise实现超时处理
	  * 使用promise封装处理ajax请求
			    let request = new XMLHttpRequest();
			    request.onreadystatechange = function () {
			    }
			    request.responseType = 'json';
			    request.open("GET", url);
			    request.send();
	
 **例子**
	
		let promise = new Promise((resolve,reject)=>{
		  consle.log('111')
		  setTimeout(()=>{
		  console.log('333')
		  //异步执行完后，传入成功的函数
		 resolve（'hahaha'）；
		 //异步失败后给失败的回调函数传的参数
		  reject（'这是失败函数的参数'）
		  })
		console.log()		
		//下面都是接收上面的回调函数的
		promise
		  .then((data)=>{//接收上面的resolve传过来的函数
		     console.log(data,'成功了')//hahaha 成功了
		}，（error）=>{//接收上面reject传来的函数
		    console.log(error,'失败了')；
		})
		})
	

## Symbol：
      前言：ES5中对象的属性名都是字符串，容易造成重名，污染环境
      概念：ES6中的添加了一种原始数据类型symbol(已有的原始数据类型：String, Number, boolean, null, undefined, 对象)
      特点：
        1、Symbol属性对应的值是唯一的，解决命名冲突问题
        2、Symbol值不能与其他数据进行计算，包括同字符串拼串
        3、for in, for of遍历时不会遍历symbol属性。
        4、必须要用 obj[symbol] = 'hello';这样去创建
  使用：
    1、调用Symbol函数得到symbol值

		      let symbol = Symbol();
		      let obj = {};
		      obj[symbol] = 'hello';

   2、传参标识

		      let symbol = Symbol('one');
		      let symbol2 = Symbol('two');
		      console.log(symbol);// Symbol('one')
		      console.log(symbol2);// Symbol('two')
3、内置Symbol值
  * 除了定义自己使用的Symbol值以外，ES6还提供了11个内置的Symbol值，指向语言内部使用的方法。
  - Symbol.iterator
   * 对象的Symbol.iterator属性，指向该对象的默认遍历器方法(后边讲)
	   window.onload = function () {
	      let symbol = Symbol();
	      console.log(typeof symbol);
	      console.log(symbol);
	      
	      // 用作对象的属性(唯一)
	      let obj = {username: 'kobe', age: 39};
	      obj[symbol] = 'hello';
	      obj[symbol] = 'symbol';
	      console.log(obj);
	      for(let i in obj){
	        console.log(i);
	      }
	    }

##iterator
 概念： iterator是一种接口机制，为各种不同的数据结构提供统一的访问机制
 作用：
		1、为各种数据结构，提供一个统一的、简便的访问接口；
		2、使得数据结构的成员能够按某种次序排列
		3、ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。
工作原理：
	  - 创建一个指针对象，指向数据结构的起始位置。
	  - 第一次调用next方法，指针自动指向数据结构的第一个成员
	  - 接下来不断调用next方法，指针会一直往后移动，直到指向最后一个成员
	  - 每调用next方法返回的是一个包含value和done的对象，{value: 当前成员的值,done: 布尔值}
	    * value表示当前成员的值，done对应的布尔值表示当前的数据的结构是否遍历结束。
	    * 当遍历**结束**的时候返回的value值是undefined，done值为false
	原生具备iterator接口的数据(可用for of遍历)
	  1、Array
	  2、arguments
	  3、set容器
	  4、map容器
	  5、String

例子：

	  window.onload = function () {
	        // 自定义iterator生成指针对象
	        function mockIterator(arr) {
	          let nextIndex = 0;
	          return {
	            next: function () {
	              return nextIndex<arr.length?{value: arr[nextIndex++], done: false}:{value: undefined, done: true}
	            }
	          }
	        }
	
	        let arr = [1,2,3,4,5];
	        let iteratorObj = mockIterator(arr);
	        console.log(iteratorObj.next());
	        console.log(iteratorObj.next());
	        console.log(iteratorObj.next());
	
	
##Generator函数
- 概念：
  1、ES6提供的解决异步编程的方案之一
  2、Generator函数是一个状态机，内部封装了不同状态的数据，
  3、用来生成遍历器对象
  4、可暂停函数(惰性求值), yield可暂停，next方法可启动。每次返回的是yield后的表达式结果
- 特点：
  1、function 与函数名之间有一个星号
  2、内部用yield表达式来定义不同的状态
  例如：
    function* generatorExample(){
      let result = yield 'hello';  // 状态值为hello
      yield 'generator'; // 状态值为generator
    }
  3、generator函数返回的是指针对象(接11章节里iterator)，而不会执行函数内部逻辑
  4、调用**next方法**函数内部逻辑开始执行，**遇到yield表达式停止**，返回
  {value: yield后的表达式结果/undefined, done: false/true}
  5、再次调用next方法会从上一次停止时的yield处开始，直到最后
  6、yield语句返回结果通常为undefined， 当调用next方法时传参内容会作为启动时yield语句的返回值。
		
	 // 对象的symbol.iterator属性  指向遍历器对象
	    //第一步定义函数，要用*号
	     function* generatorTest() {
	       //函数的定义，里面要执行的语句 yield是暂停
	       console.log('函数开始执行了')
	       yield 'hello';
	       console.log("函数暂停后再次启动")
	       yield  'generator';
	
	     }
	     //生成遍历器
	    let Gt = generatorTest();//将遍历器给Gt
	     console.log(Gt);//遍历器对象，打印看看什么样子
	     let res  = Gt.next();//第一句函数执行，然后遇到yield暂停，吧执行的值给res
	     console.log(res)//这时候{value:'hello',done:false}//这个值是hello，然后没有执行完
	
	    res = Gt.next();//开启遍历器，继续执行下一步，
	    console.log(res);
运行结果：
		函数执行了
	     Object{
	         done：false
	         value："hello"
	         
	         }
	     函数暂停后再次启动了
	     Object{
	         done：true
	         value："hello"
	         
	         }
对象的Symbol.iterator属性;
	    let myIterable = {};
	    myIterable[Symbol.iterator] = function* () {
	      yield 1;
	      yield 2;
	      yield 4;
	    };
	    for(let i of myIterable){
	      console.log(i);
	    }
	    let obj = [...myIterable];
	    console.log(obj);
	
	    console.log('-------------------------------');
    

案例练习
    
    * 需求：
    * 1、发送ajax请求获取新闻内容
    * 2、新闻内容获取成功后再次发送请求，获取对应的新闻评论内容
    * 3、新闻内容获取失败则不需要再次发送请求。
    * 
    * 
    function getNews(url) {
      $.get(url,function (data) {//这个url是下面那个第四步的url
        console.log(data);
        let commentsUrl = data.commentsUrl;//第五步，发送之后得到数据，就会得到名值段，拼串之后，
        let url = "http://localhost:3000"+commentsUrl;
        sx.next(url)//第六步，再把这个网址给next 然后把跳到sendXml的下一步

      })

    }

    let sx=sendXml();//第二步，创建generator函数的遍历器
    sx.next();//第三步，启动暂停函数，执行下面那个函数的第一句。

    function* sendXml() {  //第一步：写暂停函数
      let url = yield  getNews("http://localhost:3000/news?id=2'")//第四步，调用函数，吧网址传进ajax发送
      yield  getNews(url)//第七部，接收上面next的的参数，在发一次请求

    }

##async函数(源自ES2017)
  概念： 真正意义上去解决异步回调的问题，同步流程表达异步操作
  本质： Generator的语法糖
  语法：
	      async function foo(){
	        await 异步操作;
	        await 异步操作；
	      }
  特点：
	    1、不需要像Generator去调用next方法，遇到await等待，当前的异步操作完成就往下执行
	    2、返回的总是Promise对象，可以用then方法进行下一步操作
	    3、async取代Generator函数的星号*，await取代Generator的yield
	    4、语意上更为明确，使用简单，经临床验证，暂时没有任何副作用

	  async function sendXml(url) {
	    return new Promise((resolve, reject) => {
	      $.ajax({
	        url,
	        type: 'GET',
	        success: data =>  resolve(data),
	        error: error => reject(error)
	      })
	    })
	  }
	
	  async function getNews(url) {
	    let result = await sendXml(url);
	    let result2='http://localhost:3000'+result.commentsUrl
	    ]
	    sendXml(result2);
	    console.log(result, result2);
	  }
	  getNews('http://localhost:3000/news?id=2')


发送求情失败：
在reject里面要换成resolve 传一个flase 然后就在接收的地方判断一下是不是false，如果是就提示一下并且return
##class

1. 通过class定义类/实现类的继承
2. 在类中通过constructor定义构造方法
3. 通过new来创建类的实例
4. 通过extends来实现类的继承
5. 通过super调用父类的构造方法
6. 重写从父类中继承的一般方法


		<script type="text/javascript">
	    class Person {
	        //调用类的构造方法
	        constructor(name, age){
	            this.name = name;
	            this.age = age;
	
	        }
	        //定义一般的方法
	        showName(){
	            console.log(this.name, this.age);
	        }
	    }
	    let person = new Person('kobe', 39);
	    console.log(person, person.showName());
	
	    //定义一个子类
	    class StrPerson extends Person{
	        constructor(name, age, salary){
	            super(name, age);//调用父类的构造方法
	            this.salary = salary;
	        }
	        showName(){//在子类自身定义方法
	            console.log(this.name, this.age, this.salary);
	        }
	    }
	    let str = new StrPerson('weide', 38, 1000000000);
	    console.log(str);
	    str.showName();

##字符串拓展
1. includes(str) : 判断是否包含指定的字符串
2. startsWith(str) : 判断是否以指定字符串开头
3. endsWith(str) : 判断是否以指定字符串结尾
4. repeat(count) : 重复指定次数
		<script type="text/javascript">
		
		    let str = 'abcdefg';
		    console.log(str.includes('a'));//true
		    console.log(str.includes('h'));//false
		
		    //startsWith(str) : 判断是否以指定字符串开头
		    console.log(str.startsWith('a'));//true
		    console.log(str.startsWith('d'));//false
		    //endsWith(str) : 判断是否以指定字符串结尾
		    console.log(str.endsWith('g'));//true
		    console.log(str.endsWith('d'));//false
		    //repeat(count) : 重复指定次数a
		    console.log(str.repeat(5));
##数值的拓展
	1. 二进制与八进制数值表示法: 二进制用0b, 八进制用0o
	2. Number.isFinite(i) : 判断是否是有限大的数
	3. Number.isNaN(i) : 判断是否是NaN
	4. Number.isInteger(i) : 判断是否是整数
	5. Number.parseInt(str) : 将字符串转换为对应的数值
	6. Math.trunc(i) : 直接去除小数部分


	1. 二进制与八进制数值表示法: 二进制用0b, 八进制用0o
		    console.log(0b1010);//10
		    console.log(0o56);//46
	2.Number.isFinite(i) : 判断是否是有限大的数
		    console.log(Number.isFinite(NaN));//false
		    console.log(Number.isFinite(5));//true
	3.Number.isNaN(i) : 判断是否是NaN
		    console.log(Number.isNaN(NaN));//true
		    console.log(Number.isNaN(5));//falsse
		
	4.Number.isInteger(i) : 判断是否是整数
	
		    console.log(Number.isInteger(5.23));//false
		    console.log(Number.isInteger(5.0));//true
		    console.log(Number.isInteger(5));//true
		
	5.Number.parseInt(str) : 将字符串转换为对应的数值
	
		    console.log(Number.parseInt('123abc'));//123
		    console.log(Number.parseInt('a123abc'));//NaN
		
	6 . Math.trunc(i) : 直接去除小数部分
	
		 	    console.log(Math.trunc(13.123));//13



##数组的拓展
1. Array.from(v) : 将伪数组对象或可遍历对象转换为真数组
2. Array.of(v1, v2, v3) : 将一系列值转换成数组
3. find(function(value, index, arr){return true}) : 找出第一个满足条件返回true的元素
4. findIndex(function(value, index, arr){return true}) : 找出第一个满足条件返回true的元素下标
 1.Array.from(v) : 将伪数组对象或可遍历对象转换为真数组
		let bt = document.querySelectorAll("button")
		  console.log(bt)
		  Array.from(bt).forEach(function (item,index) {
		    console.log(item, index);
		
		  })
  2.. Array.of(v1, v2, v3) : 将一系列值转换成数组
		 let arr = Array.of(1,2,3)
		  console.log(arr);
  3..find(function(value, index, arr){return true}) : 找出第一个满足条件返回true的元素
		let arr1 = [1,3,5,2,6,7,3];
		  let result = arr1.find(function (item, index) {
		    return item >3
		  });
		  console.log(result);
   4.findIndex(function(value, index, arr){return true}) : 找出第一个满足条件返回true的元素下标
		  let result1 = arr1.findIndex(function (item, index) {
		    return item >3
		  });
		  console.log(result1);//2
##对象的拓展
 1. Object.is(v1, v2)
  * 判断2个数据是否完全相等
 2. Object.assign(target, source1, source2..)
  * 将源对象的属性复制到目标对象上
 3. 直接操作 __proto__ 属性
  let obj2 = {};
  obj2.__proto__ = obj1;

	1.判断两个数是否完全相等
	
		 	console.log(Object.is('abc', 'abc'));//true
		    console.log(NaN == NaN);//false
		    console.log(Object.is(NaN, NaN));//true
		
		    console.log(0 == -0);//true
		    console.log(Object.is(0, -0));//false
		
	2..//Object.assign(target, source1, source2..)
		    let obj = {name : 'kobe', age : 39, c: {d: 2}};
		    let obj1 = {};
		    Object.assign(obj1, obj);
		    console.log(obj1, obj1.name);
    3.. //直接操作 __proto__ 属性
    
		    let obj3 = {name : 'anverson', age : 41};
		    let obj4 = {};
		    obj4.__proto__ = obj3;//obj3是obj4的原型了
		    console.log(obj4, obj4.name, obj4.age);

##深度克隆
  1、数据类型：
    * 数据分为基本的数据类型(String, Number, boolean, Null, Undefined)和对象数据类型
    - 基本数据类型：
      特点： 存储的是该对象的实际数据
    - 对象数据类型：
      特点： 存储的是该对象在栈中引用，真实的数据存放在堆内存里
  2、复制数据
    - 基本数据类型存放的就是实际的数据，可直接复制
      let number2 = 2;
      let number1 = number2;
    - 克隆数据：对象/数组
      1、区别： 浅拷贝/深度拷贝
         判断： 拷贝是否产生了新的数据还是拷贝的是数据的引用
         知识点：对象数据存放的是对象在栈内存的引用，直接复制的是对象的引用
         let obj = {username: 'kobe'}
         let obj1 = obj; // obj1 复制了obj在栈内存的引用
      2、常用的拷贝技术
        1). arr.concat(): 数组浅拷贝
        2). arr.slice(): 数组浅拷贝
        3). JSON.parse(JSON.stringify(arr/obj)): 数组或对象深拷贝, 但不能处理函数数据
        4). 浅拷贝包含函数数据的对象/数组
        5). 深拷贝包含函数数据的对象/数组

例1：

	 基本数据类型存放的就是实际的数据，可直接复制
	  let number2 = 2;
	  let number1 = number2;
例2：

	  // 浅度复制
	  let obj = {username: 'kobe', age: 39, sex: {option1: '男', option2: '女'}};
	  let obj1 = obj;
	  console.log(obj1);
	  obj1.sex.option1 = '不男不女'; // 修改复制的对象会影响原对象
	  console.log(obj1, obj);
	
**深度克隆**
   要掌握技能1:
1.for in 遍历数组的时候遍历的是下标

	  let testArr = [1,2,3,4];
	  for(let i in testArr){
	    console.log(i); // 对应的下标索引
	  }
2.判断是函数还是对象

	    function getObjClass(obj) {
	    let result = Object.prototype.toString.call(obj).slice(8, -1);//这个是[object array],前面八个和后面一个都不要
	    if(result === 'Null'){
	      return 'Null';
	    }else if(result === 'Undefined'){
	      return 'Undefined';
	    }else {
	      return result;
	    }
	  }

深度克隆的实现

	  function deepClone(obj) {
	    let result, objClass = getObjClass(obj);
	    if(objClass === 'Object'){
	      result = {};
	    }else if(objClass === 'Array'){
	      result = [];
	    }else {
	      return obj; // 如果是其他数据类型不复制，直接将数据返回
	    }
	    // 遍历目标对象
	    for(let key in obj){
	      let value = obj[key];//既是数组的值也是对象的取值
	      if(getObjClass(value) === "Object" || 'Array'){
	        result[key] = deepClone(value);//递归，看看是不是还是对象或者数组
	      }else {
	        result[key] = obj[key];
	      }
	    }
	    return result;
	  }
	  
	  
	  let obj3 = {username: 'kobe',age: 39, sex: {option1: '男', option2: '女'}};
	  let obj4 = deepClone(obj3);
	  console.log(obj4);
	  obj4.sex.option1 = '不男不女'; // 修改复制后的对象不会影响原对象
	  console.log(obj4, obj3);

##Set和Map数据结构
1. Set容器 : 无序不可重复的多个value的集合体
  * Set()
  * Set(array)
  * add(value)
  * delete(value)
  * has(value)
  * clear()
  * size
2. Map容器 : 无序的 key不重复的多个key-value的集合体
  * Map()
  * Map(array)
  * set(key, value)//添加
  * get(key)
  * delete(key)
  * has(key)
  * clear()
  * size

例子1：

    let set = new Set([1,2,3,4,3,2,1,6]);=
    console.log(set);==>Set(5){1,2,3,4,6}

    set.add('abc');
    console.log(set, set.size);==>Set(6){1,2,3,4,6,"abc"}
    
    //delete(value)
    set.delete(2);
    console.log(set);==>Set(5){1,3,4,6,"abc"}

    //has(value)
    console.log(set.has(2));//false
    console.log(set.has(1));//true

    //clear()
    set.clear();
    console.log(set);==>Set（0）{}

例子2：

    let map = new Map([['abc', 12],[25, 'age']]);
    console.log(map);==>map(2){"abc"=>12,25=>"abc"}

    map.set('男', '性别');
    console.log(map);==>map(2){"abc"=>12,25=>"abc",'男'=>"性别"}

    console.log(map.get(25));//age

    //delete(key)
    map.delete('男');
    console.log(map);//map（0）{}

    console.log(map.has('男'));//false
    console.log(map.has('abc'));//true

    map.clear();
    console.log(map);//空的

##for(let value of target){}循环遍历
  1. 遍历数组
  2. 遍历Set
  3. 遍历Map
  4. 遍历字符串
  5. 遍历伪数组
body：

			<button>按钮1</button>
			<button>按钮2</button>
			<button>按钮3</button>
	

    <script type="text/javascript">
遍历数组：

      let arr = [1,2,3,4,5];
    for(let num of arr){
        console.log(num);
    }
遍历Set

	    let set = new Set([1,2,3,4,5]);
	    for(let num of set){
	        console.log(num);
	    }
遍历字符串

    let str = 'abcdefg';
    for(let num of str){
        console.log(num);
    }
遍历伪数组

    let btns = document.getElementsByTagName('button');
    for(let btn of btns){
        console.log(btn.innerHTML);
    }
</script>



##ES7
1. 指数运算符(幂): **
2. Array.prototype.includes(value) : 判断数组中是否包含指定value
		
		<script type="text/javascript">
		    console.log(3 ** 3);//27
		    let arr = [1,2,3,4, 'abc'];
		    console.log(arr.includes(2));//true
		    console.log(arr.includes(5));//false
		</script>