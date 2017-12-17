function css(el,attr,val) {
	if(!el.transform){
		el.transform = {};
	}
	if(arguments.length>2) {
		el.transform[attr] = val;
		var sVal = "";
		for(var s in el.transform){
			switch(s) {
				case "rotate":
				case "skewX":
				case "skewY":
					sVal +=s+"("+el.transform[s]+"deg) ";
					break;
				case "translateX":
				case "translateY":
				case "translateZ":
					sVal +=s+"("+el.transform[s]+"px) ";
					break;
				case "scaleX":
				case "scaleY":
				case "scale":
					sVal +=s+"("+el.transform[s]+") ";
					break;	
			}
			el.style.WebkitTransform = el.style.transform = sVal;
		}
	} else {
		val  = el.transform[attr];
		if(typeof val == "undefined" ) {
			if(attr == "scale" || attr == "scaleX" || attr == "scaleY"  ) {
				val = 1;
			} else {
				val = 0;
			}
		}
		return val;
	}
}



function scrollY(wrap,index,callBack){
	var child = wrap.children[index];
	css(child,"translateZ",0.001);
	var startpoint=0;
	var startY =0;
	var minY =wrap.clientHeight - child.offsetHeight;
	var flag = 1;
	var lastDis = 0;
	var lastTime = 0;
	var disVal=0;
	var disTime =0;
	
	var isX =true;
	var isFirst =true;
	
	var Tween={
		backOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },	
        
		easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        }
	}
	
	wrap.addEventListener("touchstart",function(ev){
//					child.style.transition ="none";
		clearInterval(child.clearTime);
		
		if(callBack&&callBack.start){
			callBack.start();
		}
		
		startpoint = {clientX:ev.changedTouches[0].clientX,clientY:ev.changedTouches[0].clientY};
		startY = css(child,"translateY");
		
		lastDis = startpoint.clientY;
		lastTime = new Date().getTime();
		disVal=0;
		disTime =1;
		
		 isX =true;
		 isFirst =true;
	});
	
	wrap.addEventListener("touchmove",function(ev){
		if(!isX){
			return;
		}
		var nowpoint = ev.changedTouches[0];
		var disX =nowpoint.clientX - startpoint.clientX;
		var disY=nowpoint.clientY - startpoint.clientY;
		var translateY = startY+disY;
		var nowTime =new Date().getTime();
		if(translateY>0){
			flag = 0.6-translateY/(wrap.clientHeight*2);
			translateY =translateY*flag;
		}
		if(translateY<minY){
			var over =  minY - translateY;
			flag = 0.6-over/(wrap.clientHeight*2);
			translateY =minY-over*flag;
		}
		
		disVal=nowpoint.clientY - lastDis;
		disTime =nowTime - lastTime;
		lastDis = nowpoint.clientY;
		lastTime = nowTime;
		
		
		if(isFirst){
			isFirst=false;
			if(Math.abs(disY)<Math.abs(disX)){
				isX=false;
				return;
			}
		}
		
		
		css(child,"translateY",translateY);
		
		if(callBack&&callBack.in){
			callBack.in();
		}
		
		
						
		
	});
	
	
	wrap.addEventListener("touchend",function(){
		var speed = disVal /disTime;
		var translateY = css(child,"translateY");
		var traget = translateY+ speed*300;
		var time = Math.abs(traget*1.2);
			time=time < 300?300:time;
		var bessel ="easeOut";
		if(traget>0){
			traget=0;
			bessel ="backOut";
//						bessel ="cubic-bezier(.12,.39,.61,1.75)";
		}
		if(traget<minY){
			traget=minY;
			bessel ="backOut";
//						bessel ="cubic-bezier(.12,.39,.61,1.75)";
		}
		
//					child.style.transition=time+"ms "+bessel;
//					css(child,"translateY",traget);
		move(traget,bessel,time);
	});
	
	function move(traget,bessel,time){
		/*
			t:当前是哪一次
			b:移动的初始值
			c:初始值与目标点之间的差值
			d:总次数
		*/
		var t=0;
		var b=css(child,"translateY");
		var c =traget - b;
		var d =Math.ceil(time/20);
		
		clearInterval(child.clearTime);
		child.clearTime=setInterval(
			function(){
				t++;
				if(t>d){
					clearInterval(child.clearTime);
					if(callBack&&callBack.over){
						callBack.over();
					}
				}else{
					var top =Tween[bessel](t,b,c,d);
					css(child,"translateY",top);
					if(callBack&&callBack.in){
						callBack.in();
					}
				}
			},20
		);
	}
}