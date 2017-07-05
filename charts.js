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
 */

function charts(){
	function getId(id) {
		return document.getElementById(id);
	}
	//当用户点击新建的文件夹之后，隐藏和显示该文件夹下面的文件
	this.show_hide = function(id,event) {
		var event=event || window.event;
		var target=event.target || event.srcElement;
		event.stopPropagation();
		var ul_number=getId(id).childNodes.length;
		if(ul_number==1){
			return false;
		}
		for(var k=0;k<ul_number;k++){
		if(getId(id).childNodes[k].nodeType==3){
				k=k+1;
			}

		var zt_ul=getId(id).childNodes[k].style.display;
		switch(zt_ul){
			case "block": getId(id).childNodes[k].style.display="none";
			getId(id).style.backgroundImage="url(../../img/kuochan.jpg)";
			getId(id).style.backgroundSize="35px 20px";
			break;
			case "": getId(id).childNodes[k].style.display="none";
			getId(id).style.backgroundImage="url(../../img/kuochan.jpg)";
			getId(id).style.backgroundSize="35px 20px";
			break;
			case "none": getId(id).childNodes[k].style.display="block";
			getId(id).style.backgroundImage="url(../../img/suoxiao.jpg)";
			getId(id).style.backgroundSize="35px 20px";
			break;
			}
		}

	}
	//用户添加下级菜单
	this.add_h1_nav = function() {
		// 通过bind函数来绑定相关数据，则可解决自定义弹出框无法获取用户输入数据的问题
						var nav_str = prompt("请输入菜单名称"),
						ul=document.createElement("ul"),
						li=document.createElement("li"),
						
						timestamp=new Date().getTime();
						li.style.marginLeft="-40px";
						if(nav_str==null){
							return false;
						}
						li.style.cursor="pointer";
						li.style.listStyle="none";
						li.style.backgroundRepeat="no-repeat";
						li.setAttribute("id","cc"+timestamp);
						li.setAttribute("menu","nav");
						li.setAttribute("onclick","new charts().show_hide('cc"+timestamp+"')");
						nav_str=document.createTextNode(nav_str);
						li.appendChild(nav_str);
						ul.appendChild(li);
						//在追加内容之前应该判断其子元素的状态，是否为block或者none
						for(var k=0;k<getId(add_id).childNodes.length;k++){
							if(getId(add_id).childNodes[k].nodeType==1){
								ul.style.display=getId(add_id).childNodes[k].style.display
							}
						}
						getId(add_id).appendChild(ul);
						//在这里需要考虑父级是否存在，如果存在则给父级添加扩展标签，否则不添加
						if(ul.parentNode.nodeName == 'LI'){
							ul.parentNode.style.backgroundImage="url(../../img/suoxiao.jpg)";
							
							ul.parentNode.style.backgroundSize="35px 20px";
							ul.parentNode.style.backgroundRepeat="no-repeat";
							ul.parentNode.style.paddingLeft="40px";
						for(var k=0;k<getId(add_id).childNodes.length;k++){
								if(getId(add_id).childNodes[k].nodeType==1){
									if(getId(add_id).childNodes[k].style.display=="none"){
										ul.parentNode.style.backgroundImage="url(../../img/kuochan.jpg)";
										ul.parentNode.style.backgroundSize="35px 20px";	
									}
								}
							}
							
						}
				};
	//用户删除指定菜单
	this.delete_nav=function(){
						//在用户剪删除之前应该判断用户剪切的内容是否合法
						if(getId(add_id).parentNode.parentNode.nodeName!="LI" && getId(add_id).parentNode.parentNode.nodeName!="DIV"){
							return false;
						}
						//在删除之前应该统计与该目录同级的目录有多少，以此来判断是否应该在父级改变文件夹的样式
						var a=0;
						var menu_length=getId(add_id).parentNode.parentNode.childNodes.length;
						
						for(var k=0;k<menu_length; k++){
							if(getId(add_id).parentNode.parentNode.childNodes[k].nodeType=1){
								a=a+1;
							}
						}
						if(a==2){
						getId(add_id).parentNode.parentNode.style.backgroundImage="url()";
						getId(add_id).parentNode.parentNode.style.paddingLeft="0px";
						}
						getId(add_id).parentNode.parentNode.removeChild(getId(add_id).parentNode);
						
				};
	//用户剪切指定的菜单
	this.cut=function(){
		//在用户剪切之前应该判断用户剪切的内容是否合法
						if(getId(add_id).parentNode.parentNode.nodeName!="LI" && getId(add_id).parentNode.parentNode.nodeName!="DIV"){
							return false;
						}
		//再剪切之前应该统计与该目录同级的目录有多少，以此来判断是否应该在父级改变文件夹的样式
						var a=0;
						var menu_length=getId(add_id).parentNode.parentNode.childNodes.length;
						
						for(var k=0;k<menu_length; k++){
							if(getId(add_id).parentNode.parentNode.childNodes[k].nodeType=1){
								a=a+1;
							}
						}
						
						if(a==2){
						getId(add_id).parentNode.parentNode.style.paddingLeft="0px"	
						getId(add_id).parentNode.parentNode.style.backgroundImage="url()";	
						}
						cut_content=getId(add_id).parentNode.parentNode.removeChild(getId(add_id).parentNode);
				};
	//用户粘贴相关内容
	this.copy=function(){
						if(cut_content==""){
										return false;
									}
						//在用户粘贴的时候,还需要判断用户的粘贴元素的位置子元素的display属性,根据此属性来决定,粘贴的display
					
						if(getId(add_id).nodeName!="DIV"){
							var child_length=getId(add_id).childNodes.length;
							
							for(var k=0; k<child_length;k++){
								if(getId(add_id).childNodes[k].nodeType==1){
									if(getId(add_id).childNodes[k].style.display=="none"){
										cut_content.style.display="none";
										getId(add_id).style.backgroundImage="url(../../img/kuochan.jpg)";
										
										
									}
									else{
										getId(add_id).style.backgroundImage="url(../../img/suoxiao.jpg)";
										
										
									}	
								}
								else{
									getId(add_id).style.backgroundImage="url(../../img/suoxiao.jpg)";
									
								}
							}
						//在用户粘贴的时候。同样需要判断粘贴的位置，如果粘贴在最外层，样式不需要改变。如果粘贴在一个目录下面
						//那么则需要改变父级的样式
								getId(add_id).style.paddingLeft="40px";
								getId(add_id).style.backgroundRepeat="no-repeat";
								getId(add_id).style.backgroundSize="35px 20px";
						}		
						getId(add_id).appendChild(cut_content);
						//清空用户的粘贴内容，防止用户重复粘贴
						cut_content="";
				};
	//用户编辑菜单栏目
	this.change_nav=function(){
					var content=prompt("请编辑");
					//采用这种方式，是为了防止一次性修改了所有节点内容，仅仅修改指定内容
					getId(add_id).firstChild.textContent=content;		
				};
	//开发者定义多个页面的时候
	this.more_menu=function(id,json,idv){
					getId(id).oncontextmenu=function(event){
						var event=event || window.event;
						set_menu(json,idv);
						stop_default_menu(event,idv);
						event.stopPropagation();
					};
		};
	
	function set_menu(object,location){
//location代表的是，开发者需要将内容放到哪一个DIV块中（注意，这里的location是按照class命名的）
//设定一个全局变量用于保存剪切的内容
 var cut_content="",node_content="",ary=new Array(),i=0;

//在程序实例化的时，首先清空自定义菜单中的内容，防止出现菜单内容的追加现象
	while(getId(location).hasChildNodes()){
		getId(location).removeChild(getId(location).firstChild);
	}

	for(var key in object){
	 //在进行遍历的时候，就将内容追加到开发者定义的location中
	ary[i]=key;
	 var h4=document.createElement("h4");
	 node_content=document.createTextNode(object[key]);
	 h4.appendChild(node_content);
	 var timestamp=new Date().getTime();
	 h4.style.cursor="pointer";
	 h4.setAttribute("id","cd"+timestamp);
	 h4.setAttribute("onclick","new charts()."+ary[i]+"('cd"+timestamp+",event')");
	 getId(location).appendChild(h4);
	 i=i+1;
	}
	}
//自定义右键菜单的位置，阻止默认弹出事件
	function stop_default_menu(event,location){
	event=event || window.event;
	var target=event.target,
	 x=event.pageX,
	 y=event.pageY,
	//自定义右键菜单的位置
	 sx=x+5,
	 sy=y+5,
	//判断鼠标的位置，防止鼠标出现的位置靠近浏览器边缘，进而影响自定义菜单的显示
		//先获取自定义菜单的高度与宽度
	 self_menu_hight=getId(location).clientHeight,
	 self_menu_width=getId(location).clientWidth,
	//获取屏幕可用工作区的高度
	 avail_height= window.innerHeight,
	 avail_width= window.innerHeight;
	 
	 //给自定义菜单添加样式
	 getId(location).style.backgroundColor="rgb(204,204,204)";
	 getId(location).style.textAlign="center";
	if(y+self_menu_hight>avail_height){
		sy=y-self_menu_hight;		
	}
	
	//防止用户鼠标靠近浏览器左边缘
	if(x+self_menu_width>avail_width){
		sx=x-self_menu_width;
	}

	add_id=target.getAttribute("id");
	getId(location).style.position="absolute";
	getId(location).style.zIndex=999999999999999;//将自定义菜单的层级设置为最高，防止遮挡
	getId(location).style.left=sx+"px";
	getId(location).style.top=sy+"px";
	getId(location).style.display="block";
	event.preventDefault();
	
	//当用户点击自定义菜单之后，菜单应该消失
	(function(){
		getId(location).onclick=function(){
			getId(location).style.display="none";
		};
	})();
	
	//用户单击页面区域的时候，隐藏自定义菜单
	document.onclick=function(){
	getId(location).style.display="none";	
		};
	}
}

//插件封装结束
// var json={"add_h1_nav":"添加下级菜单栏","delete_nav":"删除","cut":"剪切","copy":"粘贴","change_nav":"编辑"};

// new charts().more_menu("gps",json,"nav");
//上面两个语句是在引入该文件之后，自己调用该插件的方法。gps代表该方法触发的区域（这里为id），nav代表
//邮件菜单需要在什么地方显示（同样为id）
//change_nav();