/*右侧一级菜单点击触发事件*/
define(["jquery"],function ($){
	$(".tree_div").click(function() {
		 var obj = $(this).next().attr("id");
		var icon =$(this).find("font").attr("id");
		showhide_obj(obj,icon)
		function showhide_obj(obj,icon){
			obj = document.getElementById(obj);
			icon = document.getElementById(icon);
			if(obj.style.display == "none")
			{
				$("#ocean_parameters_lucency").hide();
				//指定文档中的对象为div,仅适用于IE;
				div_list = document.getElementsByTagName("div");
				for (i=0; i< div_list.length; i++)
				{
					thisDiv = div_list[i];
					if(thisDiv.id.indexOf("title") != -1)//当文档div中的id含有list时,与charAt类似;
					{
						//循环把所有菜单链接都隐躲起来
						thisDiv.style.display = "none";
					}
				}
				myfont = document.getElementsByTagName("font");
				for(i=0; i<myfont.length; i++)
				{
					thisfont = myfont[i];
					myfont[i].innerHTML = '<i class="fa icon_bottom_right"></i>';
				}
				icon.innerHTML = '<i class="fa icon_right_down"></i>';
				obj.style.display = ""; //只显示当前链接
			}else{
				//当前对象是打开的，就封闭它;
				icon.innerHTML = '<i class="fa icon_bottom_right"></i>';
				obj.style.display = "none";
				$("#ocean_parameters_lucency").show();
			}
		}
	})
	return {
		statisticsAbnormal: function (){
			$(".abnormal_list").click(function(){
				$(this).addClass("abnormal_list_sz").siblings().removeClass("abnormal_list_sz");
				$(this).next().addClass("abnormal_list_bg").siblings().removeClass("abnormal_list_bg");
				$(this).parent().siblings().children(".abnormal_list").removeClass("abnormal_list_sz");
				$(this).parent().siblings().children(".abnormal_list_lucency").removeClass("abnormal_list_bg");
			});
		}
	};
});
