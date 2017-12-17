(function(w){
	w.$={};
	w.$.drag=function(testNode,callBack){
		//1.确定元素一开始的位置
		var elementPoint ={x:0,y:0};
		//鼠标一开始的位置
		var startPoint={x:0,y:0};
		testNode.onmousedown=function(ev){
			ev = ev||event;
			//  参照于offsetParent
			elementPoint.x=this.offsetLeft;
			elementPoint.y=this.offsetTop;
			
			//	参照于视口
			startPoint.x=ev.clientX;
			startPoint.y=ev.clientY;
			
			if(testNode.setCapture){
				testNode.setCapture();
			}
			
			document.onmousemove=function(ev){
				ev = ev||event;
				
				//  参照于视口
				var nowPoint = {x:0,y:0};
				nowPoint.x=ev.clientX;
				nowPoint.y=ev.clientY; 
				
				var L =elementPoint.x + nowPoint.x - startPoint.x;
				var T =elementPoint.y + nowPoint.y - startPoint.y;
				
				if(L<10){
					L=0;
				}else if(L>testNode.offsetParent.clientWidth - testNode.offsetWidth){
					L=testNode.offsetParent.clientWidth - testNode.offsetWidth;
				}
				
				if(T<10){
					T=0;
				}else if(T>testNode.offsetParent.clientHeight - testNode.offsetHeight){
					T=testNode.offsetParent.clientHeight - testNode.offsetHeight;
				}
				
				// 参照于offsetParent
				testNode.style.left = L+"px";
				
				
				if(callBack&&typeof callBack["move"] ==="function"){
					callBack["move"].call(testNode);
				}
			}
			
			document.onmouseup=function(){
				document.onmousemove = document.onmouseup =null;
				if(document.releaseCapture){
					document.releaseCapture();
				}
			}
			
			return false;
		}
	}
})(window)
