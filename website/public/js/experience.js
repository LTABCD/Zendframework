$(function(){
	//创建和初始化地图函数
    function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
    }

    
    //创建地图函数：
    function createMap(){
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        var point = new BMap.Point(113.806566,34.704207);//定义一个中心点坐标
        map.centerAndZoom(point,10);//设定地图的中心点和坐标并将地图显示在地图容器中
		 window.map = map;//将map变量存储在全局
		
    }
    
    //地图事件设置函数：
    function setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }
    
    function addMapControl(){
    //向地图中添加缩放控件
	var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	map.addControl(ctrl_nav);
	var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
	map.addControl(ctrl_ove);
	//向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(ctrl_sca);
    }

	//创建和初始化地图
    initMap();
	
	//体验店各项功能
	function pageToggle(){
		//获取体验店列表
		var text;
		function getList(){
			text=$("div.map_container>div.map_container_left>ul>li");
			var text_lens=text.length;
			for(var i=0;i<text_lens;i++){
				var text_b=text.eq(i).find(".tel").attr("coordinates");
				var text_arr=text_b.split(",");
				var x=Number(text_arr[0]);
				var y=Number(text_arr[1])
				var points = new BMap.Point(x,y);
				var marker1 = new window.BMap.Marker(points);        // 创建标注    
				map.addOverlay(marker1); 
			}
		}
		getList();
		
		//自动生成体验店列表
		function createLi(json){
			var ul=$("div.map_container>.map_container_left>ul");
			var nowPage=$("#nowPage").text();
			var serial=((nowPage-1)*5+1);
			ul.html('');
			for(var i=0;i<json.length;i++){
				var li="<li><div class='top'><span>授权体验店</span></div><div class='serial'>"+serial+"</div><div class='text'><p class='detailed_title'><b class='tel' coordinates='"+json[i]['coordinates']+"'><span>"+json[i]['micro_letter_name']+"</span>"+json[i]['tel']+"</b>"+json[i]['experience_name']+"<span style='display:none;' id='city_none'>"+json[i]['city']+"店</span></p><p class='detailed_address'>"+json[i]['address']+"</p></div></li>";
				ul.append(li);
				serial++;
			}
			
		}
		
		//信息窗口点击弹出效果
		function tap(){
			$("div.map_container>div.map_container_left>ul>li").on("click",function(){
				var opts = {    
				    width : 500,     
				    height: 150      
				} 
				var pTitle=$(this).find("p.detailed_title>span");
				var pAddress=$(this).find("p.detailed_address");
				var tel=$(this).find("p.detailed_title>b.tel");
				var text_b=$(this).find(".tel").attr("coordinates");
				var text_arr=text_b.split(",");
				var x=Number(text_arr[0]);
				var y=Number(text_arr[1])
				var points = new BMap.Point(x,y);
				map.panTo(points);
				var html="<div class='infowindow'>"+"<div class='infowindow_left'>"+"<h6>"+pTitle.eq(0).text()+"</h6>"+"<p title='"+pAddress.eq(0).text()+"' class='infowindow_address'>"+"<img src='"+"/img/address.png"+"'>"+"<span class='detail_address'>"+pAddress.eq(0).text()+"</span>"+"</p>"+"<p title='"+tel.eq(0).text()+"' class='infowindow_tel'>"+"<img src='"+"/img/tel.png"+"'>"+"<span>"+tel.eq(0).text()+"</span>"+"</p>"+"</div>"+"<div class='infowindow_right'>"+"<div class='infowindow_right_list'>"+"<p class='infowindow_right_list_title'>"+services_title1+"</p>"+"<p class='infowindow_right_list_body'>"+services_body1+"</p>"+"</div>"+"<div class='infowindow_right_list'>"+"<p class='infowindow_right_list_title'>"+services_title2+"</p>"+"<p class='infowindow_right_list_body'>"+services_body2+"</p>"+"</div>"+"</div>"+"</div>";
				setTimeout(function(){
					var infoWindow = new BMap.InfoWindow(html, opts);  // 创建信息窗口对象    
					map.openInfoWindow(infoWindow, map.getCenter()); 
				},300)
			})
			var services_title1="支持服务";
			var services_body1="预约服务,换货服务,维修服务,预约服务,换货服务,维修服务";
			var services_title2="支持产品";
			var services_body2="青春裤男款,青春裤女款,青春裤男款,青春裤女款,青春裤男款,青春裤女款";
		}
		tap();
		
		//地址列表切换效果
		function toggle(){
			var map_liList=$("div.map_container>div.map_container_left>ul>li");
			var map_lens=map_liList.length;
			map_liList.on("click",function(){
				for(var i=0;i<map_lens;i++){
					var serialList=map_liList.eq(i).find(".serial");
					serialList.removeClass("active");
				}
				var serial=$(this).find(".serial");
				serial.addClass("active");
			})
		}
		toggle();
		
		//发送ajax请求
		function toAjax(nowPage){
			$.ajax({
				url:"/experience/limit",
				type:"post",
				data:{"nowPage":nowPage},
				success:function(data){
					var json_list=$.parseJSON(data);
					createLi(json_list);
					getList();
					tap();
					toggle();
				},
				error:function(){
					console.log('error');
				}
			});
		}
		
		//页面切换效果
		var nowPage=$("#nowPage").text();
		var sumPage=$("#sumPage").text();
		
		var prev=$("#prev");
		var next=$("#next");
		//判断页数是否大于1页
		function judgePage(){
			var page_container=$("div.map_container>div.map_container_left>p.page");
			if(sumPage<=1){
				page_container.css("display","none");
			}
		}
		judgePage();
		
		//下一页
		next.on("click",function(){
			if(nowPage>=sumPage){
				return false;
			}
			nowPage++;
			$("#nowPage").text(nowPage);
			toAjax(nowPage);
		});
		
		//上一页
		prev.on("click",function(){
			if(nowPage<=1){
				return false;
			}
			nowPage--;
			$("#nowPage").text(nowPage);
			toAjax(nowPage);
		});
		
		
		//解决IE7,IE8兼容问题
		var browser=navigator.appName;
		var b_version=navigator.appVersion;
		var version=b_version.split(";");
		var ver=version[1];
		if(ver==" MSIE 7.0"||ver==" MSIE 8.0"){
			page_container.css("bottom","0px");
		}
		
		//地图部分样式兼容问题
		var ie2=$("#ie2");
		var ie3=$("#ie3");
		var ie5=$("#ie5");
		var ie4=$("#ie4");
		if(ver==" MSIE 8.0"){
			ie2.css("height","34px");
		}
		if(ver==" MSIE 7.0"){
			ie5.css("top","-15px");
		}
		if(ver==" MSIE 9.0"||ver==" MSIE 7.0"||ver==" MSIE 8.0"){
			ie5.css("display","block");
			ie5.on('click',function(){
				ie2.focus();
			})
			ie2.on("keydown",function(e){
				var keycode=e.keyCode;
				ie5.css("display","none");
				if(keycode==8){
					if(ie2.val()==" "||ie2.val()==''||ie2.val().length==1){
						ie5.css("display","block");
					}
				}
			});
		}
		
		
		//搜索功能
		var valss;
		ie3.on("click",function(){
			valss=$.trim(ie2.val());
			if(valss==''){
				alert('请输入文字');
				return;
			}
			valss=valss.replace(/\s+/gi,'');
			toCity(valss);
		});
		ie4.on('click',function(){
			valss=$.trim(ie2.val());
			if(valss==''){
				alert('请输入文字');
				return;
			}
			valss=valss.replace(/\s+/gi,'');
			toCity(valss);
		})
		
		//搜索城市
		function toCity(cityName){
			$.ajax({
				url:"/experience/like",
				type:"post",
				data:{"cityName":valss},
				success:function(data){
					if(!data){
						alert('搜索内容不存在');
					}else{
						var json_list=$.parseJSON(data);
						createLi(json_list);
						getList();
						tap();
						toggle();
						judgePage();
					}
				},
				error:function(){
					console.log('error');
				}
			});
		}
		
	}

	pageToggle();
})
