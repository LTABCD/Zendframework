$(function(){
	//页面列表移入效果
	var feedback=$("div.paging>a>span");
	feedback.on("mouseover",function(){
		$(this).addClass("active");
	})
	feedback.on("mouseout",function(){
		$(this).removeClass("active");
	})
})
