###offsetParent
 	ie7以上(不是火狐)
		父级没有定位
			本身没有定位
					==> offsetParent:body
					
			本身定位为absoult/relative
					==> offsetParent:body
					
			本身定位为fixed
					==> offsetParent:null
		
		父级有定位
			本身没有定位
					==> offsetParent:定位父级
					
			本身定位为absoult/relative
					==> offsetParent:定位父级
					
			本身定位为fixed
					==> offsetParent:null
	火狐
		父级没有定位
			本身没有定位
					==> offsetParent:body
			
			本身定位为absoult/relative
					==> offsetParent:body
					
			本身定位为fixed
					==> offsetParent:body
			
		父级有定位
			本身没有定位
					==> offsetParent:定位父级
			
			本身定位为absoult/relative
					==> offsetParent:定位父级
					
			本身定位为fixed
					==> offsetParent:body
					
	ie7以下 
		父级没有定位
			本身没有定位
					==> offsetParent:body
					
			本身定位为absoult/relative
					==> offsetParent:html
					
			本身定位为fixed
					==> offsetParent:null	
						
		父级有定位
			本身没有定位
					==> offsetParent:定位父级
					
			本身定位为absoult/relative
					==> offsetParent:定位父级
					
			本身定位为fixed
					==> offsetParent:null
					
###haslayout
	ie7以下,如果当前元素的某个父级触发了haslayout，
		那么offsetParent就会被指向到这个触发了layout特性的父节点上