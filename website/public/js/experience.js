$(function(){
	//创建和初始化地图函数
    function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件

		
    }

	/* 113.806566,34.704207 路畅科技园坐标
	 * 113.808998,34.697486 经开十七大街坐标
	 */
    
    //创建地图函数：
    function createMap(){
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        var point = new BMap.Point(113.806566,34.704207);//定义一个中心点坐标
        map.centerAndZoom(point,15);//设定地图的中心点和坐标并将地图显示在地图容器中
		
		var marker = new window.BMap.Marker(point);        // 创建标注    
		map.addOverlay(marker); 					// 将标注添加到地图中
		
		
		var points = new BMap.Point(113.808779,34.71847);
		var marker1 = new window.BMap.Marker(points);        // 创建标注    
		map.addOverlay(marker1); 
		
		
		
		
		
		var pTitle=$("div.text>p.detailed_title>span");
		var pAddress=$("div.text>p.detailed_address");
		var tel=$("div.text>p.detailed_title>b.tel");
		
		var services_title1="支持服务";
		var services_body1="预约服务,换货服务,维修服务,预约服务,换货服务,维修服务";
		var services_title2="支持产品";
		var services_body2="青春裤男款,青春裤女款,青春裤男款,青春裤女款,青春裤男款,青春裤女款";
		//页面元素
		var btn=$("#btn");
		btn.on("click",function(){
			var opts = {    
			    width : 500,     
			    height: 150      
			} 
			map.panTo(points);
			var html="<div class='infowindow'>"+"<div class='infowindow_left'>"+"<h6>"+pTitle.eq(0).text()+"</h6>"+"<p title='"+pAddress.eq(0).text()+"' class='infowindow_address'>"+"<img src='"+"/img/address.png"+"'>"+"<span class='detail_address'>"+pAddress.eq(0).text()+"</span>"+"</p>"+"<p title='"+tel.eq(0).text()+"' class='infowindow_tel'>"+"<img src='"+"/img/tel.png"+"'>"+"<span>"+tel.eq(0).text()+"</span>"+"</p>"+"</div>"+"<div class='infowindow_right'>"+"<div class='infowindow_right_list'>"+"<p class='infowindow_right_list_title'>"+services_title1+"</p>"+"<p class='infowindow_right_list_body'>"+services_body1+"</p>"+"</div>"+"<div class='infowindow_right_list'>"+"<p class='infowindow_right_list_title'>"+services_title2+"</p>"+"<p class='infowindow_right_list_body'>"+services_body2+"</p>"+"</div>"+"</div>"+"</div>";
			setTimeout(function(){
				var infoWindow = new BMap.InfoWindow(html, opts);  // 创建信息窗口对象    
				map.openInfoWindow(infoWindow, map.getCenter()); 
			},500)
			
			
		})
		
		
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






	//地址列表切换效果
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

})
