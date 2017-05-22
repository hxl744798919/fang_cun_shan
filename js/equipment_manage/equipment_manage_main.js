define(
    ["jquery", "common", "web_gis"],
    function ($) {
        var rightHeight = $("#flashing").outerHeight(true);		//获取右侧总高度
        document.getElementById("ocean_parameters_lucency").style.height = rightHeight - 183 +"px";	//右侧菜单全部收起下方空白高度
	});