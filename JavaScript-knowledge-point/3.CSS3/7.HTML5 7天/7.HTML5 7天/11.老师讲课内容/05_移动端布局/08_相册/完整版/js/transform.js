	//变换函数的工具类
	function css(obj,attr,value){
			if(!obj.transform){
				obj.transform={};
			}
			
			if(arguments.length>2){//设置
				obj.transform[attr]=value;
				var text ="";
				for(var item in obj.transform){
					switch (item){
						case "rotate":
						case "skewX":
						case "skewY":
						case "skew":
							text += item+"("+obj.transform[item]+"deg) " 
							break;
						case "translateX":
						case "translateY":
						case "translateZ":
						case "translate":
							text += item+"("+obj.transform[item]+"px) " 
							break;
						case "scale":
						case "scaleX":
						case "scaleY":
							text += item+"("+obj.transform[item]+") " 
							break;
					}
				}
				obj.style.webkitTransform=obj.style.transform = text;
				
			}else{//读取
				
				value = obj.transform[attr];
				if(typeof value == "undefined"){
					//返回默认值
					if(attr == "scale" || attr == "scaleX" || attr == "scaleY"){
						return 1;
					}else{
						return 0;
					}
				}
				
				return value;
			}
		}
	//自定义多指事件
	function getR(point1,point2){
		var x = point1.clientX - point2.clientX;
		var y = point1.clientY - point2.clientY;
		var r = Math.sqrt(x*x + y*y);
		return r;
	}
	
	function getAngle(point1,point2){
		var x = point1.clientX - point2.clientX;
		var y = point1.clientY - point2.clientY;
		var angle =(Math.atan2(y,x) * 180)/Math.PI;
		return angle;
	}

	function gesTure(el,callback){
		var flag = false;
		var start={};
		el.addEventListener("touchstart",function(ev){
			if(ev.touches.length>=2){
				flag=true;
			
				start.r = getR(ev.touches[0],ev.touches[1]);
				start.angle = getAngle(ev.touches[0],ev.touches[1]);
				
				if(callback&&callback.start){
					callback.start.call(el,ev);
				}
			}
		})
		
		el.addEventListener("touchmove",function(ev){
			if(ev.touches.length>=2){
				
				var r = getR(ev.touches[0],ev.touches[1]);
				var angle = getAngle(ev.touches[0],ev.touches[1]);
				ev.scale=r/start.r;
				ev.rotation=angle - start.angle;
				
				if(callback&&callback.change){
					callback.change.call(el,ev);
				}
			}
		})
		
		el.addEventListener("touchend",function(){
			if(flag){
				if(callback&&callback.end){
					callback.end.call(el,ev);
				}
				flag = false;
			}
		})
		
	}

	
	
	
	//自定义滑屏组件
	function drag(wrap,index,callBack){
			var child = wrap.children[index];
			css(child,"translateZ",0.001);//3d加速 开启我们的GPU进程
			
			var step = 0;
//			var stratY =0;
//			var elementY = 0;
			var startPoint={};
			var elementPoint={};
			var min = wrap.clientHeight - child.offsetHeight;
			
			var lastTime =0;
			var lastPoint = 0;
			var timeValue = 1;//时间差值,避免初始点击speed值为undefined
			var disValue = 0;//距离的差值
			
			var isY=true;
			var isFirst=true;
			
			var Tween ={
				SineOut: function(t,b,c,d){
				            return c * Math.sin(t/d * (Math.PI/2)) + b;
				        },	
		        BackOut: function(t,b,c,d,s){
				            if (s == undefined) s = 1.70158;
						    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
						}
			}
			
			wrap.addEventListener("touchstart",function(ev){
				min = wrap.clientHeight - child.offsetHeight;
//				child.style.transition ="none";
				clearInterval(child.clear);
				
//				var touch = ev.changedTouches[0];
//				stratY = touch.clientY;
//				elementY = css(child,"translateY");
				startPoint = {clientX:ev.changedTouches[0].clientX,clientY:ev.changedTouches[0].clientY};
				elementPoint.elementY = css(child,"translateY");
				elementPoint.elementX = css(child,"translateX");
				
				lastTime=new Date().getTime();//毫秒数
				lastPoint = startPoint.clientY;
				timeValue = 1;//时间差值,避免初始点击speed值为undefined
				disValue = 0;//距离的差值
				
				if(callBack&&callBack["start"]){
					callBack["start"]();
				}
				
				isY=true;
				isFirst=true;
			})
			
			wrap.addEventListener("touchmove",function(ev){
				if(!isY){
					return;
				}
				
//				var touch = ev.changedTouches[0]; 
//				var nowY = touch.clientY;
//				var dis = nowY -stratY;
				var movePoint =ev.changedTouches[0]; 
				var	disX = movePoint.clientX - startPoint.clientX;
				var	disY = movePoint.clientY - startPoint.clientY;
				
				
				if(isFirst){
					isFirst=false;
					if(Math.abs(disX)>Math.abs(disY)){
						isY=false;
						return;
					}
				}
				
				var translateY = elementPoint.elementY+disY;
				
				if(translateY>0){
					step =0.6- translateY / (document.documentElement.clientHeight*3);
					translateY=step*translateY;
				}
				if(translateY<min){
					var overDis = min - translateY;
					step =0.6 - overDis / (document.documentElement.clientHeight*3);
					translateY =min - overDis*step;
				}
				
				
				var nowTime = new Date().getTime();
				var nowPoint = movePoint.clientY;
				timeValue = nowTime - lastTime;
				disValue = nowPoint - lastPoint;
				lastTime = nowTime;
				lastPoint = nowPoint;
				
				css(child,"translateY",translateY);
				
				if(callBack&&callBack["moving"]){
					callBack["moving"]();
				}
			})
			
			wrap.addEventListener("touchend",function(){
				var speed = disValue/timeValue;
//				if(Math.abs(speed)<0.2){
//					return;
//				}
				var left = speed*300;
				var translateY = css(child,"translateY");
				var target = translateY + left;
//				var bessel = "";
				var type="SineOut";
				var time =0;
				time=Math.abs(speed)*0.4;
				time=time<0.3?0.3:time;
				
				if(target>0){
					target = 0;
					type="BackOut";
//					bessel ="cubic-bezier(.08,1.44,.6,1.46)";
				}
				if(target<min){
					target = min;
					type="BackOut";
//					bessel ="cubic-bezier(.08,1.44,.6,1.46)";
				}
				
				
//				child.style.transition =time+"s "+bessel;
//				css(child,"translateY",target);
				move(target,time,type);
				
				if(callBack&&callBack["end"]){
					callBack["end"]();
				}
			})
			
			
			
			function move(target,time,type){
				//		t:代表当前次数
				//		b:代表初始的运动位置
				//		c:代表目标位置与初始位置之间的差值
				//		d:总次数
				//		s:回弹距离
				var t=0;
				var b=css(child,"translateY");
				var c=target - b;
				var d=time/0.01;
				
				clearInterval(child.clear);
				child.clear=setInterval(function(){
						t++;
						if(t>d){
							clearInterval(child.clear);
							if(callBack&&callBack["over"]){
								callBack["over"]();
							}
						}else{
							var top =Tween[type](t,b,c,d);
							css(child,"translateY",top);
							if(callBack&&callBack["moving"]){
								callBack["moving"]();
							}
						}
					},10);
				}
		}