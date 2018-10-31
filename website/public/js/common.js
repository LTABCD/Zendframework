$(function(){
	//导航宽度自适应
	var header_nav_li=$('#header_nav>li');
	var bottom_nav_li=$('#bottom_nav li');
	var footer_nav_li=$("#footer_nav>li");
	function divide(obj){
		var navNum=obj.length;
		for(var i=0;i<navNum;i++){
			obj.eq(i).css("width",(100/navNum-0.1)+"%");
			obj.eq(i).css("float","left");
		}
	}
	divide(header_nav_li);
	divide(footer_nav_li);
	divide(bottom_nav_li);
	
	//底部模块的自适应
	var foot=$('.foot>.footList');
	var footNum=foot.length;
	for(var i=0;i<footNum;i++){
		foot.eq(i).css("width",(100/footNum-0.1)+"%");
		foot.eq(i).css("float","left");
	}
	
	//判断是否为IE7浏览器
	var browser=navigator.appName;
	var b_version=navigator.appVersion;
	var version=b_version.split(";");
	var ver=version[1];
	if(ver==" MSIE 7.0"){
		var circle=$("div.container-fluid div.header-banner>.banner-circle>li");
		var foot_div=$("div.foot>div");
		var search=$("#search");
		function inline(obj){
			var lens=obj.length;
			for(var i=0;i<lens;i++){
				obj.eq(i).css("display","inline");
			}
		}
		inline(circle);
		inline(foot_div);
		search.css("right","30px");
	}
	if(ver==" MSIE 7.0"||ver==" MSIE 8.0"){
		var input_button=$(".input_button");
		input_button.css("height","52px");
	}
	
	//搜索按钮的移入移出效果
	var search_button=$(".input_button");
	var img=$("div.nav>div.nav_search>img");
	function over(){
		search_button.css("background","red");
		search_button.css("border-color","red");
		img.attr("src","/img/search2.png");
	}
	search_button.on("mouseover",over);
	search_button.on("mouseout",function(){
		search_button.css("background","transparent");
		search_button.css("border-color","#ccc");
		img.attr("src","/img/search1.png");
	})
	img.on("mouseover",over);
	
	//搜索框边框变色效果
	var input_search=$(".input_search");
	input_search.on('focus',function(){
		$(this).css("border-color","red");
		search_button.css("border-color","red");
	})
	input_search.on('blur',function(){
		$(this).css("border-color","#ccc");
		search_button.css("border-color","#ccc");
	})
	
	//搜索框边框移入移出变色效果
	function overColor(){
		input_search.css("border-color","#b0b0b0");
		search_button.css("border-color","#b0b0b0");
	}
	function overColor1(){
		input_search.css("border-color","#b0b0b0");
		search_button.css("border-color","red");
	}
	function outColor(){
		input_search.css("border-color","#e0e0e0");
		search_button.css("border-color","#e0e0e0");
	}
	input_search.on("mouseover",overColor);
	search_button.on("mouseover",overColor1);
	input_search.on("mouseout",outColor);
	search_button.on("mouseout",outColor);
	img.on("mouseover",overColor1);
	
	
	//底部链接移入移出效果
	var spanList=$(".footList_right>p>a>span");
	var spanLens=spanList.length;
	spanList.on("mouseover",function(){
		$(this).css("color","red");
	})
	spanList.on("mouseout",function(){
		$(this).css("color","rgb(135,135,135)");
	})
})
