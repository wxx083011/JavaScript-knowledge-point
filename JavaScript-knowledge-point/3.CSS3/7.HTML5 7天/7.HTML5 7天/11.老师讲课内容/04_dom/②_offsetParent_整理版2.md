###offsetParent(body和html不应该有任何空隙)
		本身定位不为fixed
			父级没有定位
				所有浏览器：==> offsetParent:body
			父级有定位
				所有浏览器：==> offsetParent:定位父级
					
		本身定位为fixed
			非火狐==> offsetParent:null
					
			火狐	==> offsetParent:body

