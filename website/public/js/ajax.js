function ajax(selectProvince,selectCity,spanProvince,spanCity,urls){
	//省级下拉框功能
	for(var i=0;i<selectProvince.length;i++){
		(function(i){
			selectProvince.eq(i).on("change",function(){
				var vals=$(this).val();
				spanProvince.eq(i).text(vals);
				vals=$.trim(vals);
				$.ajax({
					url:"/"+urls+"/city",
					type:"post",
					data:{"province":vals},
					success:function(data){
						var jsonCity=$.parseJSON(data);
						var lens=jsonCity.length;
						selectCity.eq(i).html('');
						for(var j=0;j<lens;j++){
							var html="<option>&nbsp;&nbsp;&nbsp;&nbsp;"+jsonCity[j]['city']+"</option>";
							selectCity.eq(i).append(html);
						}
						var city_val=jsonCity[0]['city'];
						spanCity.eq(i).text(city_val);
						$.ajax({
							url:"/"+urls+"/list",
							type:'post',
							data:{"city":city_val},
							success:function(data){
								if(i==0){
									createStudio($.parseJSON(data));
								}
								if(i==1){
									var city=$("#city");
									var city_nums=$("#city_nums");
									city.text(city_val);
									city_nums.text($.parseJSON(data).length);
								}
							},
							error:function(){
								console.log('error');
							}
						});
					},
					error:function(error){
						console.log('error');
					}
				});
			})
			
			//市级下拉框功能
			selectCity.eq(i).on("change",function(){
				var vals=$(this).val();
				spanCity.eq(i).text(vals);
				vals=$.trim(vals);
					$.ajax({
						url:"/"+urls+"/list",
						type:'post',
						data:{"city":vals},
						success:function(data){
							if(i==0){
								createStudio($.parseJSON(data));
							}
						},
						error:function(){
							console.log('error');
						}
					});
			})
		})(i)
		
	}
	
	
	//自动生成工作室列表
	function createStudio(json){
		var addressList=$("div.address>div.address_container>.addressList");
		addressList.html('');
		var list_lens=json.length;
		for(var i=0;i<list_lens;i++){
			var html="<li><p>"+json[i]["province"]+"<a>"+json[i][urls+'_name']+"</a></p><p>"+json[i]['address']+"</p><p>电话："+json[i]['tel']+"</p></li>";
			addressList.append(html);
		}
	}
}
	
