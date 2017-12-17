# zepto
    * 特点：
        1、体积8kb
        2、针对移动端的框架
        3、语法同jquery大部分一样，都是$为核心函数
        4、目前功能完善的框架体积最小的左右
#* 同jquery相似的语法
        核心：$
            --作为函数使用
            参数：
                1、function(){}
                2、选择器字符串
                3、html标签字符串
                3、DOM code
            --作为对象使用
            方法；
                1、$.each()
                2、$.trim()
                3、$.ajax()   $.get()  $.post()
                4、$.isArray()
            jquery对象/zepto对象
            概念：$调用返回的就是 jquery对象/zepto对象 伪数组(有时候只有一个元素)
            
##* zepto同jquery不同的API
    * attr同prop
    
	        jquery：标签的固有属性，布尔值属性<prop>
	                标签的自定义属性，用attr布尔值属性并且布尔值属性在标签体内没有定义时候<attr>
	        zepto:attr同样获取布尔值属性。
        
    * DOM操作
          配置对象：
            jquery不同使用配置对象添加id，class。。。
               jquery中插入DOM元素的时候添加配置对象（属性选择器：id，class。。。)的时候不会显示；
            zepto可以使用配置对象---结构，样式分离，而且容易管理
                  插入DOM元素的时候添加配置对象的时候可以添加进去，并且添加的配置对象的内容会直接反应在标签属性内，且可以操作，影响对应的DOM元素。

    * offset()----用来获取目标元素相对于视口的偏移量  对象
          jquery：top ， left
            1、获取匹配元素在当前视口的相对偏移。
            2、返回的对象包含两个整型属性：top 和 left。此方法只对可见元素有效。
          zeptop：top，left，width，height(content,补白，border)
            * offset()
		    1、获得当前元素相对于视口的位置。
		    2、返回一个对象含有： top, left, width和height(获取的宽高是盒模型可见区域的宽高)
		        
    * width(),height()
         jquery:
            1、width(),height()  获取content内容区的值，没有单位
            2、.css  获取content内容区的值，有单位px
            3、 innerHeight()   content,padding没有单位
               innerHeight()   content,padding border没有单位
        zepto:
            1、width(),height()获取的content，补白，border
            2、没有innerHeight()，innerHeight()
            3、.css()
     //zepto用width(),height()是根据盒模型决定的，并且不包含单位PX
      //包含padding的值,border的值
      //zepto中没有innerHeight(),innerWidth()---outerHeight(),outerWidth()
            
    * 事件委托
        原理：利用冒泡的原理将事件绑定到父元素/祖先元素身上，event.target指向的子元素
        zepto：
            1、委托同一个父元素身上
            2、同一个世界
            3、操作关联，操作对应的元素/类
            4、顺序
            5、谁操作的关联类就是谁触发的
            
    * each
        jquery：能遍历数组，对象，不能遍历字符串/json对象/json数组

          //$.each(collection, function(index, item){ ... })
	      //可以遍历数组,以index，item的形式，
	      //可以遍历对象，以key-value的形式
	      //不可以遍历字符串。
	      //不可以遍历json字符串
        zepto：能遍历数组，对象，字符串
              //$.each(collection, function(index, item){ ... })
		    //可以遍历数组,以index，tiem的形式，
		    //可以遍历对象，以key-value的形式，
		    //可以遍历字符串。
        
    * 隐藏元素的宽高
        jquery：能获取
        zepto： 不能宽，高
        
##zepto的touch event
    * tap点击事件
    * singleTap()点击事件
    * doubleTap()双击事件
    * longTap()长按事件--连续作用750ms
    * 滑动事件(浏览器的默认行为---翻页---touch-action)
    1、swipe滑动事件 在同一个方向连续滑动30px才为滑动，否则就是点击
    2、longTap长按事件 手指在目标对象上连续作用超过750ms算长按，否则算点击
    
jquery：

        on()  绑定事件处理程序
		off() 方法移除用目标oon绑定的事件处理程序。
		bind()  为每个匹配元素的特定事件绑定事件处理函数，可同时绑定多个事件，也可以自定义事件。
		one() 为每一个匹配元素的特定事件（像click）绑定一个一次性的事件处理函数。只执行一次。
		trigger() 触发有bind定义的事件（通常是自定义事件）
		unbind()  bind的反向操作，删除匹配元素所绑定的bind事件。
       
zepto：
	   * zepto touch方法
				* tap()点击事件 利用在document上绑定touch事件来模拟tap事件的，并且tap事件会冒泡到document上
				* singleTap()  点击事件
				* doubleTap()  双击事件
				* longTap()    当一个元素被按住超过750ms触发。
				* swipe, swipeLeft, swipeRight, swipeUp, swipeDown — 当元素被划过(同一个方向滑动距离大于30px)时触发。(可选择给定的方向)
				   在一个方向滑动大于30px即为滑动。否则算点击。


##事件处理机制
 zepto有自己的一套事件机制，并且对不同的浏览器做了兼容的内部封装处理。
 * 1、像新版本的zepto中已经舍弃了bind，delegate，die，同样jquery中舍弃了live，die等。
 * 2、现在统一使用on，off标准事件来绑定事件。


##form表单
    1、serialize()
        * 在Ajax post请求中将用作提交的表单元素的值编译成 URL-encoded 字符串。---key(name)/value
    2、serializeArray()
        * 将用作提交的表单元素的值编译成拥有name和value对象组成的数组。
        * 不能使用的表单元素，buttons，未选中的radio buttons/checkboxs 将会被跳过。
    3、submit()
        * 为 "submit" 事件绑定一个处理函数，或者触发元素上的 "submit" 事件。
        * 当参数function没有给出时，触发当前表单“submit”事件，并且执行默认的提交表单行为，除非阻止默认行为。

##ajax:

    如何废除一个ajax请求 ----abort()方法
    需求：点击获取验证码的按钮，用户十秒时候可以再次获取，当十秒过后第一次请求没有返回，用户再次点击获取
    然后因为网速好或者其他原因，两次请求同时返回，该怎么解决

    * disabled属性   设置表单项或者按钮不可再点击或者操作；但是只是针对click事件，而并没有针对touch事件作出处理。