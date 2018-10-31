function banner(){
	var bannerList=$('.hind-banner');
	
	//参数数据
//	var counts=Number(obj.count)+2;
	var counts=6
	var per=100/counts;
	
	//生成图片
//	function create(){
//		var bannerCircle=$('.banner-circle');
//		var strIpads=`<a href="`+obj.data[obj.count-1].url+`"><img src="`+obj.data[obj.count-1].imgurli+`" id="imgs"/></a>`;
//		var liListBs=`<a href="`+obj.data[obj.count-1].url+`"><li style="background:url(`+obj.data[obj.count-1].imgurl+`) no-repeat;background-size:100% 100%;"/></a>`;
//		
//		for(var i=0;i<obj.count;i++){
//			strIpads+=`<a href="`+obj.data[i].url+`"><img src="`+obj.data[i].imgurli+`" id="imgs"/></a>`;
//			liListBs+=`<a href="`+obj.data[i].url+`"><li style="background:url(`+obj.data[i].imgurl+`) no-repeat;background-size:100% 100%;"/></a>`;
//		}
//		strIpads+=`<a href="`+obj.data[0].url+`"><img src="`+obj.data[0].imgurli+`" id="imgs"/></a>`;
//		liListBs+=`<a href="`+obj.data[0].url+`"><li style="background:url(`+obj.data[0].imgurl+`) no-repeat;background-size:100% 100%;"/></a>`;
//		var liLists=`<li class="active"></li>`;
//		var liLists2=`<li class="active"></li>`;
//		for(var i=0;i<obj.count-1;i++){
//			liLists+=`<li></li>`;
//			liLists2+=`<li></li>`;
//		}
//		var img=$(strIpads);
//		var li=$(liLists);
//		var li2=$(liLists2);
//		var liListB=$(liListBs);
//		bannerList.eq(1).append(img);
//		bannerList.eq(0).append(liListB);
//		bannerCircle.eq(0).append(li);
//		bannerCircle.eq(1).append(li2);
//	}
//	create();
	
	//自定义轮播图图片大小
	var header=$(".header-banner");
	var imgLists=$('.hind-banner img');
	for(var i=0;i<imgLists.length;i++){
		imgLists.eq(i).css("width",header.width());
	}
	
	
	
	//定义小圆点样式
	var circle_img=$(".banner-circle>li>img");
	var lens=circle_img.length;
	function circleTab(){
		for(var i=0;i<lens;i++){
			if(i==Math.abs(count)){
				circle_img.eq(i).attr("src","/img/banner-circle1.png");
			}else{
				circle_img.eq(i).attr("src","/img/banner-circle2.png");
			}
			
		}
	}
	
	//ie7浏览器下小圆点设定
	var browser=navigator.appName;
	var b_version=navigator.appVersion;
	var version=b_version.split(";");
	var ver=version[1];
	if(ver==" MSIE 7.0"){
		var circle_li=$(".banner-circle>li");
		var li_lens=circle_li.length;
		for(var i=0;i<li_lens;i++){
			circle_li.eq(i).css("display","inline");
		}
	}
	
	//轮播图
	//初始化变量
	
	var count=0;
	
	
	//轮播图尺寸自适应并兼容ie7
	var width=counts+'00%';
	var win=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
	bannerList.css("width",width);
	
	
	
	if(win>1025){
		var timer;
		bannerList.css("left",(-1)*100+"%");
		
		//轮播图自动轮播功能部分
		function set(){
			timer=setInterval(function(){
				count--;
				bannerList.animate({
					"left":(count-1)*100+"%"
				},300,'linear',function(){
					if(count<=(2-counts)){
						count=0;
						bannerList.css("left",(count-1)*100+"%");
					}
					circleTab();
				});
			},5000);
		}
		set();
		function goLeft(){
			count--;
			bannerList.animate({
				"left":(count-1)*100+"%"
			},300,'linear',function(){
				if(count<=(2-counts)){
					count=0;
					bannerList.css("left",(count-1)*100+"%");
				}
				circleTab();
			});
		}
		function goRight(){
			count++;
			bannerList.animate({
				"left":(count-1)*100+"%"
			},300,'linear',function(){
				if(count>=1){
					count=(3-counts);
					bannerList.css("left",(count-1)*100+"%");;
				}
				circleTab();
			});
		}
		
		
		//小圆点切换功能
		for(var i=0;i<lens;i++){
			(function(i){
				circle_img.eq(i).on("click",function(){
					clearInterval(timer);
					count=-i;
					bannerList.animate({
						"left":(count-1)*100+"%"
					},300,'linear',function(){
						circleTab();
						set();
					});
				})
			})(i)
		}
		
		//左右箭头切换功能
		var left=$('.left');
		var right=$('.right');
		left.on('click',function(){
			clearInterval(timer);
			count--;
			bannerList.animate({
				"left":(count-1)*100+"%"
			},300,'linear',function(){
				if(count<=(2-counts)){
					count=0;
					bannerList.css("left",(count-1)*100+"%");
				}
				circleTab();
				set();
			});
		})
		right.on('click',function(){
			clearInterval(timer);
			count++;
			bannerList.animate({
				"left":(count-1)*100+"%"
			},300,'linear',function(){
				if(count>=1){
					count=(3-counts);
					bannerList.css("left",(count-1)*100+"%");;
				}
				circleTab();
				set();
			});
		})
	}else{
		
		//轮播图
		//初始化变量
		var timer;
		var startX=0;
		var endX=0;
		var translatX=0;
		var l=0;
		var lenX=0;
		var border;
		var num=0;
		var startTime;
		var endTime;
		var Dval;
		var li;
		
		//初始化数据
		var width=counts+'00%';
		bannerList.css("width",width);
		bannerList.css("transform","translateX("+(count-1)*100+"vw) translateY(0px)");
		var imgLists=$('.hind-banner img');
		for(var i=0;i<imgLists.length;i++){
			imgLists.eq(i).css("width",per+"%");
		}
		
		
		function Intval(){
			if($(window).innerWidth()>767){
				setInt(1);
			}else{
				setInt(0);
			}
		}
		function goLeft(This){
			$(This).css("transform","translateX("+(count-1)*100+"vw)");;
			$(This).on("transitionend",function(){
				if(count<=(2-counts)){
					count=0;
					$(This).css("transition","none");
					$(This).css("transform","translateX("+(count-1)*100+"vw)");;
				}
				l=0;
				num=0;
				circleTab();
			})
		}
		function goRight(This){
			$(This).css("transform","translateX("+(count-1)*100+"vw)");;
			$(This).on("transitionend",function(){
				if(count>=1){
					count=(3-counts);
					$(This).css("transition","none");
					$(This).css("transform","translateX("+(count-1)*100+"vw)");;
				}
				l=0;
				num=0;
				circleTab();
			})
		}
		function goBack(This){
			$(This).css("transition","all 0.2s ease-in-out");
			$(This).css("transform","translateX("+(count-1)*100+"vw)");;
			$(This).on("transitionend",function(){
				l=0;
				num=0;
			})
		}
		function setInt(i,j){
			count--;
			border=bannerList.eq(i).innerWidth()/12;
			li=bannerList.eq(i).parent().find(".banner-circle>li")
			bannerList.eq(i).css("transition","all 0.2s");
			goLeft(bannerList.eq(i));
		}
		
		bannerList.on('touchstart',function(e){
			console.log(1);
			if(num<=0){
				var touch1=e.originalEvent.touches[0];
				startX=touch1.pageX;
				startTime=Date.now();
				var arr=$(this).css('transform').replace(/[^0-9\-,$]/g,'.').split(',')[4];
				translatX=Number(arr.substr(1,arr.length-1));
				$(this).css("transition","none");
				border=$(e.currentTarget).innerWidth()/12;
				li=$(this).parent().find(".banner-circle>li");
			}
		})
		bannerList.on('touchmove',function(e){
			if(num<=0){
				clearInterval(timer); 
				var touch2=e.originalEvent.touches[0];
				endX=touch2.pageX;
				l=endX-startX;
				if(Math.abs(l)>border*2){
					if(l>0){
						l=border*2;
					}else{
						l=-border*2;
					}
				}
				lenX=translatX+l;
				if(Math.abs(l)<border*2){
					$(this).css("transform","translateX("+lenX+"px)");
				}
			}
		})
		bannerList.on('touchend',function(e){
			if(num<=0&&l!=0){
				num=1;
				endTime=Date.now();
				Dval=endTime-startTime;
				if(l<0){
					if(Dval<500){
						count--;
						$(this).css("transition","all 0.1s ease-in-out");
						goLeft(this);
					}else{
						if(Math.abs(l)>border){
							count--;
							$(this).css("transition","all 0.2s ease-in-out");
							goLeft(this);
						}else if(Math.abs(l)<border){
							goBack(this);
						}
					}
				}else{
					if(Dval<500){
						count++;
						$(this).css("transition","all 0.1s ease-in-out");
						goRight(this);
					}else{
						if(Math.abs(l)>border){
							count++;
							$(this).css("transition","all 0.2s ease-in-out");
							goRight(this);
						}else if(Math.abs(l)<border){
							goBack(this);
						}
					}
					
				}
				timer=setInterval(Intval,3000);
			}
		})
		timer=setInterval(Intval,3000);
	
	}
	
	
	//左右箭头的隐藏和显示
	var banner=$(".header-banner");
	function opacity(num){
	}
	banner.on("mouseover",function(){
		var display=$(".display");
		for(var i=0;i<display.length;i++){
			display.eq(i).stop().animate({
				"opacity":1
			},1000);
		}
	});
	banner.on("mouseout",function(){
		var display=$(".display");
		for(var i=0;i<display.length;i++){
			display.eq(i).stop().animate({
				"opacity":0
			},1000);
		}
	});
	
	
	
	
	
	
	
}
banner();
