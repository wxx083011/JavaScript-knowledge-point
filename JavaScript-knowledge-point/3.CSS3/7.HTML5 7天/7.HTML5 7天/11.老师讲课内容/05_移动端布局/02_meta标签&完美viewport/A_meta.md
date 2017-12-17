###meta(苹果发明的，桌面浏览器不支持)
	###viewport
	<meta name="viewport" content="" />
		width [pixel_value | device-width] width 
		-- 直接去设置具体数值大部分的安卓手机是不支持的 但是IOS支持
		initial-scale 初始缩放比例
		user-scalable 是否允许缩放 （no||yes）,默认允许
		minimum-scale 允许缩放的最小比例
		maximum-scale 允许缩放的最大比例 
		target-densitydpi 
			-- dpi_value 70–400 //每英寸像素点的个数
			-- device-dpi 设备默认像素密度2
			-- high-dpi 高像素密度	
			-- medium-dpi 中等像素密度
			-- low-dpi 低像素密度
			-- webkit内核不再支持了
		height

	<meta name="viewport" content="width=device-width,height=device-height,user-scalable=no,
	initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,target-densitydpi=device-dpi" /> 
	
###width
	就是用来控制布局视口的大小的，width=device-width会使布局视口的大小变成理想视口的大小
												（即独立设备像素代表的大小）
												
	-浏览器支持width的最大值为10000个像素，最小值为理想视口的20%
	-安卓的webkit不允许小于布局视口的宽度，如果你指定了一个小于布局视口的值，它默认
	会转为布局视口的大小，通常是980
	-ie10不允许超出480px的值，超出的话会自动转为布局视口的默认宽度1024px
	
	-95%的浏览器都支持width=device-width
	
          旋转（横竖屏切换）：
		当用户旋转设备时，布局视口的宽度通常会发生改变。因为横竖屏时的理想视口尺寸不一样
		但ios的safari很例外，基于性能的考虑它的布局视口不会做出改变

###inital-scale
	缩放是根据理想视口来计算的，这个缩放不同于我们用户的缩放，它会使布局视口跟随着我们的视觉视口一起转变
	所以只设置inital-scale=1其实等同于只设置width=device-width
	
	 意外的惊喜：
	          在不加inital-scale时，基于性能的考虑， 旋转（横竖屏切换）时ios的safari的布局视口不会随之发生改变
	    但ios的safari在inital-scale设置的情况下，当用户旋转设备时，ios的safari布局视口的宽度会发生改变
	    如果只设置inital-scale，ie10在旋转时就会有问题
	    如果只设置width=device-width，safari在旋转时就会有问题
	    
###完美视口！！！！
	<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />
	
	        完美视口不仅仅只能解决旋转时的问题。
	        如果你页面中存在太大的元素，你的meta标签只使用width=device-width，initial-scale=1.0中的
	一个，有些浏览器会扩展布局视口的宽度来容纳这个元素，这里的兼容性很复杂，但你两个都使用了，
	大部分浏览器都不会改变布局视口了
	
###width与inital-scale之间的冲突
	布局视口在width与inital-scale产生分歧时会选择他们中比较大的那一个

###minimum-scale 允许缩放的最小比例
###maximum-scale 允许缩放的最大比例   	
	没有这些指令，默认为20%-500%
	有这些指令后可扩大到10%-1000%

	安卓webkit不支持这两个属性（默认缩放范围为25%-400%）
	ie压根不认识他们俩
	