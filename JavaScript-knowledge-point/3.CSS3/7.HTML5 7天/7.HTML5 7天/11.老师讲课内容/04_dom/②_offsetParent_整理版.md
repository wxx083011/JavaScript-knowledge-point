###offsetParent(body和html不应该有任何空隙)
 	ie7以上(不是火狐)
		父级没有定位
				==> offsetParent:body
		父级有定位
				==> offsetParent:定位父级
				
		本身定位为fixed
				==>offsetParent:null
				
	ie7以上(是火狐)
		父级没有定位
				==>offsetParent:body
		父级有定位
				==> offsetParent:定位父级
		本身定位为fixed
				==>offsetParent:body
					
	ie7以下 
		父级没有定位
				==> offsetParent:body
		父级有定位
				==> offsetParent:定位父级
		本身定位为fixed
				==> offsetParent:null
