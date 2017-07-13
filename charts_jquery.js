/*
 * @param   cut_down           用于保存剪切的内容
 * @param   node_content       用于设置添加的节点内容
 * @param   ary            		概数组用于保存相关处理函数的名字
 * @param   i    				用于ary数组的下标，用来遍历添加的节点内容
 * @param   target  			事件对象的元素内容
 * @param   x,y  				鼠标的横纵坐标
 * @param 	sx,sy				自定义菜单的X，Y位置
 * @param 	self_menu_hight、self_menu_width      自定义菜单的高与宽
 * @param   avail_height、avail_width   浏览器的高与宽 
 * @param   timestamp           时间戳，通过时间戳区分不同的ID
 */

;(function($){
$.extend({
	//文件夹的显示与隐藏函数
	"show_hide":function(id,event){
		  event.stopPropagation();//阻止事件冒泡
		 // var ul_number=event.children().length;
		  var ul_length=$('#'+id).children("ul").length;
		  //如果目标元素没有子元素，当用户点击的时候，则中断该程序
		  if(ul_length==0){
		  	return false;
		  }
		  console.log(ul_length);
		 
		  	if($('#'+id+'>ul').css("display")=="block"){
		  		$('#'+id+'>ul').css("display","none");
		  		//此时子集隐藏之后，应该在父级添加扩展标签
		  		$('#'+id).css({
		  			"paddingLeft":"35px",
		  			"backgroundImage":"url(../../img/kuochan.jpg)",
		  			"backgroundSize":"35px 20px",
		  			"backgroundRepeat":"no-repeat"
		  		});
		  	}
		  	else{
		  		$('#'+id+'>ul').css("display","block");
		  		//此时子集显示之后，应该在父级添加隐藏标签
		  		$('#'+id).css({
		  			"paddingLeft":"35px",
		  			"backgroundImage":"url(../../img/suoxiao.jpg)",
		  			"backgroundSize":"35px 20px",
		  			"backgroundRepeat":"no-repeat"	
		  		});
		  	}
		  
		  
	},
	//用户添加下级菜单
	"add_h1_nav":function(){
	//在这里自定义prompt弹出框的时候，可以通过bind函数来绑定相关数据，解决无法得到用户输入数据的问题 
						var nav_str=prompt("请输入菜单名称"),
						ul=$("<ul></ul>"),
						li=$("<li>"+nav_str+"</li>"),
						timestamp=new Date().getTime();
						//当用户输入的内容为空，则中断程序
						if(nav_str==null){
							return false;
						}
						//将默认li与ul的样式改变
						ul.css({
							"list-style":"none",
							"paddingLeft":"0px"
							}
						);
						//设置多个属性
						li.attr({
							"id":"cc"+timestamp,
							"menu":"nav",
							"onclick":"$.show_hide('cc"+timestamp+"',event)"
						});
						ul.append(li);
						//当追加的父级元素没有子菜单的时候，此时追加子菜单，则改变父级的文件样式
						 var ul_length=$('#'+add_id+'>ul').children("ul").length;
						if(ul_length==0){
							$('#'+add_id).css({
								"paddingLeft":"35px",
								"backgroundImage":"url(../../img/suoxiao.jpg)",
								"backgroundRepeat":"no-repeat",
								"backgroundSize":"35px 20px"
							});
						}
						
						//在追加节点内容之前应该判断其子元素的状态
						//当追加目标的子元素为隐藏的情况下，追加的元素同样为隐藏
						if($('#'+add_id+'>ul').css("display")=="none"){
							ul.css("display","none");
							$('#'+add_id).css({
								"paddingLeft":"35px",
								"backgroundImage":"url(../../img/kuochan.jpg)",
								"backgroundSize":"35px 20px",
								"backgroundRepeat":"no-repeat"
							});
						}
						//当我们的用户在最外层追加一级标题的时候，这个标题应该没有文件夹的样式
						if($('#'+add_id)[0].tagName!="LI"){
							$('#'+add_id).css({
								"backgroundImage":"url()",
								"paddingLeft":"0px"
							});
						}
						
						$('#'+add_id).append(ul);
					},
	//用户删除指定菜单
	"delete_nav":function(){
						//当我们的用户在进行删除的时候，应该对用所删除的内容进行限制
						if($('#'+add_id)[0].tagName!="LI"){
							return false;
						}
						//判断有多少个兄弟元素
						var sibling_length=$('#'+add_id).parent().siblings("ul").length;
						
						
						//当用户将选择的目标元素删除之后，应该去判断其是否还有兄弟节点存在，如果存在，则父及的样式不改变
						//否则，则应该改变目标元素父级的样式
						console.log(sibling_length);
						if(sibling_length==0){
							$('#'+add_id).parent().parent().css({
								"backgroundImage":"url()",
								"paddingLeft":"0px"
							});
						}
						$('#'+add_id).parent().remove();
					
					},
	//用户剪切指定的菜单
	"cut":function(){
						//当我们的用户在进行剪切的时候，应该对用所剪切的内容进行限制
						if($('#'+add_id)[0].tagName!="LI"){
							return false;
						}
						//判断有多少个兄弟元素
						var sibling_length=$('#'+add_id).parent().siblings("ul").length;
						
						
						//当用户将选择的目标元素剪切之后，应该去判断其是否还有兄弟节点存在，如果存在，则父及的样式不改变
						//否则，则应该改变目标元素父级的样式
						
						if(sibling_length==0){
							$('#'+add_id).parent().parent().css({
								"backgroundImage":"url()",
								"paddingLeft":"0px"
							});
						}
						
						cut_content=$('#'+add_id).parent().remove();
					},
	//用户粘贴相关内容
	"copy":function(){
					//防止用户粘贴之后，再次粘贴，对粘贴内容进行判断
					if(cut_content==""){
						return false;
					}
					//当用户粘贴之后，应该判断是否改变父级的样式
					var ul_length=$('#'+add_id).children("ul").length;
					if(ul_length==0){
						$('#'+add_id).css({
								"paddingLeft":"35px",
								"backgroundImage":"url(../../img/suoxiao.jpg)",
								"backgroundRepeat":"no-repeat",
								"backgroundSize":"35px 20px"
							});
					}
					//如果粘贴源下面的内容是隐藏的，则在粘贴的时候，应该改变粘贴内容的样式
					if($('#'+add_id+'>ul').css("display")=="none"){
						cut_content.css("display","none");
						
					}
					$('#'+add_id).append(cut_content);
						//当用户粘贴之后，应该清空粘贴内容。
						cut_content="";
					},
	//用户编辑菜单栏目
	"change_nav":function(){
					var content=prompt("请编辑");
					//如果用户输入的内容为空，则中断程序
					if(content==null){
						return false;
					}
					//此时编辑源应该是用户指定的编辑源，
					$('#'+add_id)[0].firstChild.textContent=content;
					
					},
	//开发者定义多个页面的时候
	"more_menu":function(id,json,idv){
					$('#'+id).contextmenu(function(event){
					var d=new set_menu(json,idv);
					d.stop_default_menu(event);
					event.stopPropagation();
					});
					}
});


var set_menu=function(object,location){
//location代表的是，开发者需要将内容放到哪一个DIV块中（注意，这里的location是按照id命名的）

var cut_content="",node_content="",ary=new Array(),i=0;
//在生成右键自定义菜单的时候，必须清空这里面的内容。防止出现，鼠标右键单击一次之后，再次单击出现节点追加的情况
$('#'+location+' h4').remove();

for(var key in object){
	 //在进行遍历的时候，就将内容追加到开发者定义的location中
	ary[i]=key;
	var h4=$("<h4>"+object[key]+"</h4>"),
	timestamp=new Date().getTime();
	 h4.attr({
	 	"id":"cd"+timestamp,
	 	"onclick":"$."+ary[i]+"('cd"+timestamp+"')"
	 });
	 $('#'+location).append(h4);
	 i++;
}

//自定义右键菜单的位置，阻止默认弹出事件
this.stop_default_menu=function(event){
	var target=event.target,
	x=event.pageX,
	y=event.pageY,
	//自定义右键菜单的位置
	sx=x+5,
	sy=y+5,
	//判断鼠标的位置，防止鼠标出现的位置靠近浏览器边缘，进而影响自定义菜单的显示
		//先获取自定义菜单的高度与宽度
	self_menu_hight=$('#'+location).height(),
	self_menu_width=$('#'+location).width(),
	//获取屏幕可用工作区的高度
	avail_height=$(window).height(),
	avail_width=$(window).width();
	if(y+self_menu_hight>avail_height){
		sy=y-self_menu_hight;		
	}
	
	//防止用户鼠标靠近浏览器左边缘
	if(x+self_menu_width>avail_width){
		sx=x-self_menu_width;
	}
	add_id=$(target).attr("id");

	$("#"+location).css({
		"backgroundColor":"rgb(204,204,204)",
		"textAlign":"center",
		"position":"absolute",
		"left":sx,
		"top":sy,
		"display":"block"
	});
	
	$('#'+location+' h4').hover(
	function(){
		$('#'+location+' h4').css({
			"cursor":"pointer"
		});
	}
	);
	event.preventDefault();
};

//当用户点击自定义菜单之后，菜单应该消失
//this.hide_menu=function(){	
//	$('#'+location).click(function(event){
//		$('#'+location).css("display","none");
//	});
//};

//用户单击页面区域的时候，隐藏自定义菜单
$(window).click(function(){
	$('#'+location).css("display","none");
});
}
})(jQuery);
//插件封装结束


var json={"add_h1_nav":"添加下级菜单栏","delete_nav":"删除","cut":"剪切","copy":"粘贴","change_nav":"编辑"};
$.more_menu("message",json,"nav");
