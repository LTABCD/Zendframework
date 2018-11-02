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
	
	
	
	var search_button=$(".input_button");
	var img=$(".search");
	var input_search=$(".input_search");
	for(var i=0;i<input_search.length;i++){
		(function(i){
		
			if(ver==" MSIE 7.0"){
				var circle=$("div.container-fluid div.header-banner>.banner-circle>li");
				var foot_div=$("div.foot>div");
				function inline(obj){
					var lens=obj.length;
					for(var j=0;j<lens;j++){
						obj.eq(j).css("display","inline");
					}
				}
				inline(circle);
				inline(foot_div);
				img.eq(i).css("right","30px");
			}
			if(ver==" MSIE 7.0"||ver==" MSIE 8.0"){
				search_button.eq(i).css("height","52px");
			}
		
		
		
			//搜索按钮的移入移出效果
			function over(){
				search_button.eq(i).css("background","red");
				search_button.eq(i).css("border-color","red");
				img.eq(i).attr("src","/img/search2.png");
			}
			search_button.eq(i).on("mouseover",over);
			search_button.eq(i).on("mouseout",function(){
				$(this).css("background","transparent");
				if(bool){
					search_button.eq(i).css("border-color","#ccc");
				}
				img.eq(i).attr("src","/img/search1.png");
			})
			img.eq(i).on("mouseover",over);
			search_button.eq(i).css("cursor","pointer");
			img.eq(i).css("cursor","pointer");
			//搜索框边框变色效果
			var bool=true;
			input_search.eq(i).on('focus',function(){
				bool=false;
				$(this).css("border-color","red");
				search_button.eq(i).css("border-color","red");
			})
			input_search.eq(i).on('blur',function(){
				bool=true;
				$(this).css("border-color","#ccc");
				search_button.eq(i).css("border-color","#ccc");
			})
			
			//搜索框边框移入移出变色效果
			function overColor(){
				if(bool){
					input_search.eq(i).css("border-color","#b0b0b0");
					search_button.eq(i).css("border-color","#b0b0b0");
				}
			}
			function overColor1(){
				if(bool){
					input_search.eq(i).css("border-color","#b0b0b0");
					search_button.eq(i).css("border-color","red");
				}
				
			}
			function outColor(){
				if(bool){
					input_search.eq(i).css("border-color","#e0e0e0");
					search_button.eq(i).css("border-color","#e0e0e0");
				}
			}
			input_search.eq(i).on("mouseover",overColor);
			search_button.eq(i).on("mouseover",overColor1);
			input_search.eq(i).on("mouseout",outColor);
			search_button.eq(i).on("mouseout",outColor);
			img.eq(i).on("mouseover",overColor1);
		})(i);
	}
	
	
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
