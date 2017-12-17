###js性能瓶颈
	在webkit中广泛使用的两大js引擎
		-JavaScriptCore引擎
		-V8引擎
	
	javascript本质上是一门解释性的语言，它有一个重大特点：无类型！！
		--虽然javascript是解释性语言，但它必然也有编译和运行过程
		      只是编译通常在运行前几微秒发生的。
		--javascript语言的特性让我们没有办法在编译的时候知道变量的类型
		      所以只能在运行的时候才能确定，在运行时计算和决定类型会带来很严重的性能损失
		      这导致了javascript语言的运行效率及其低下
		      
		      
		  javascript:
			  function add(a,b){
			  	return a.x + b.y;
			  }
			  
		  java/c++:
		  	  class Class1{
		  	  	int x;
		  	  	int y;
		  	  }
		  	  
		  	  int add(Class1 a,Class1 b){
		  	  	return a.x + b.y;
		  	  }
		  	  
		  	  
	JIT:(Just-In-Time)
		主要思想：在编译阶段，javascirpt执行环境可以尽可能的创建一套寻址等其他规范来提高运行速度
			
	