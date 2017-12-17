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