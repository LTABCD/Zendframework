$(function(){
	//初始化轮播图容器高度
	var banner_opacity=$(".banner_opacity");
	var banner_opacity_width=banner_opacity.width();
	var img=new Image();
	img.src="/img/banner_opacity1.jpg";
	banner_opacity.css("height",banner_opacity_width/img.width*img.height+"px");
	
	//轮播图效果
	var imgList=$(".banner_opacity>img");
	var imgList_lens=imgList.length;
	var timer;
	var count=imgList_lens-1;
	imgList.eq(count).css("opacity",1);
	imgList.eq(count).css("filter","alpha(opacity=100)");
	function set(){
		timer=setInterval(function(){
			imgList.eq(count).stop().animate({
				"opacity":0
			},1000);
			count--;
			if(count<0){
				count=imgList_lens-1;
			}
			imgList.eq(count).stop().animate({
				"opacity":1
			},1000);
		},3000);
	}
	set();
	
	
	//左右小箭头高度自适应
	var iList=$(".banner_opacity>i");
	for(var i=0;i<iList.length;i++){
		iList.eq(i).css("top",banner_opacity.height()/2-iList.eq(i).width()+"px");
	}
	iList.on("mouseover",function(){
		clearInterval(timer);
		$(this).css("color","grey");
	})
	iList.on("mouseout",function(){
		$(this).css("color","#ccc");
		set();
	})
	
	imgList.on("mouseover",function(){
		clearInterval(timer);
		$(this).css("color","grey");
	})
	imgList.on("mouseout",function(){
		$(this).css("color","#ccc");
		set();
	})
	
	
	//左右小箭头点击切换效果
	iList.eq(0).on("click",function(){
		imgList.eq(count).stop().animate({
			"opacity":0
		},1000);
		count++;
		if(count>imgList_lens-1){
			count=0;
		}
		imgList.eq(count).stop().animate({
			"opacity":1
		},1000);
	})
	iList.eq(1).on("click",function(){
		imgList.eq(count).stop().animate({
				"opacity":0
		},1000);
		count--;
		if(count<0){
			count=imgList_lens-1;
		}
		imgList.eq(count).stop().animate({
			"opacity":1
		},1000);
	})
	
	//下拉框相关元素获取
	var select_container=$("div.address>div.address_container>div.address_select>div.select");
	var select=$("div.address>div.address_container>div.address_select>div.select>select");
	var span=$("div.address>div.address_container>div.address_select>div.select>span");
	var address=$("div.address>div.address_container");
	var type=$("#type");
	
	//ie7浏览器下拉框设定
	var browser=navigator.appName;
	var b_version=navigator.appVersion;
	var version=b_version.split(";");
	var ver=version[1];
	if(ver==" MSIE 7.0"){
		span.css("text-indent","17px");
		span.css("display","inline");
		address.css("padding-bottom","50px");
		type.css("padding-bottom","0px");
		address.eq(1).css("padding-bottom","0px");
	}
	
	//下拉框鼠标移入效果
	select_container.on("mouseover",function(){
		$(this).css("border-color","#b0b0b0");
	})
	
	select_container.on("mouseout",function(){
		$(this).css("border-color","#e0e0e0")
	})
	
	//下拉框内容切换
	for(var i=0;i<select.length;i++){
		(function(i){
			span.eq(i).text(select.eq(i).val());
			select.eq(i).on("change",function(){
				span.eq(i).text($(this).val());
				$.ajax({
					url:"/studio/city",
					type:"post",
					data:{"name":1},
					dataType:"json",
					success:function(data){
						console.log(data);
					},
					error:function(){
						console.log(err);
					}
				})
			})
		})(i)
	}
	
	var jsonStudio=[{
		"name":"大卫博士濮阳市授权体验店",
		"detailed_address":"河南省濮阳市华龙区中华大道中华大道中华大道中华大道中华大道中华大道中华大道",
		"tel":"0371-1234567 18625588667"
	}];
	
	//自动生成工作室列表
	var addressList=$("div.address>div.address_container>.addressList");
	for(var i=0;i<jsonStudio.length;i++){
		var html="<li><p>河南<a>"+jsonStudio[i]['name']+"</a></p><p>"+jsonStudio[i]['detailed_address']+"</p><p>电话："+jsonStudio[i]['tel']+"</p></li>";
		addressList.append(html);
	}
	
})
