$(function(){
	//用户评价鼠标移入效果
	var feedback=$("div.feedbackList>div.feedbacks>p.feedback>a");
	feedback.on("mouseover",function(){
		$(this).css("color","red");
	})
	feedback.on("mouseout",function(){
		$(this).css("color","#000");
	})
	
	//页面列表移入效果
	var feedback=$("div.paging>a>span");
	feedback.on("mouseover",function(){
		$(this).addClass("active");
	})
	feedback.on("mouseout",function(){
		$(this).removeClass("active");
	})
})
