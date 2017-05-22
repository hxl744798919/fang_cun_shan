var CURRENT_SELECT_PARA = 0;
require.config({
    paths: {
        jquery: "../thirdparty/jquery-1.8.3.min",
		jquery_ui: "../thirdparty/jquery-ui.min",

        main: "data_assess/data_assess_main",
        map: "data_assess/data_assess_map",
        assess: "data_assess/data_assess",
        data_assess_tooltip:"data_assess/data_assess_tooltip",
        trend: "data_assess/data_assess_trend",
		assess_data: "common/assess_data",
        rdk_url: "common/rdkUrl",		//rdk
        date: "common/date",
        sort:"common/sort"       //data_show里面公共文件路径名
    },
	//指定模块依赖关系
    shim:{
        "jquery_ui": ["jquery"]
    },
    packages: [
        {
            name: "echarts",
            location: "../thirdparty/echarts-2.2.1/src",
            main: "echarts"
        },
        {
            name: "zrender",
            location: "../thirdparty/zrender-2.1.1/src", // zrender与echarts在同一级目录
            main: "zrender"
        }
    ]

});
require(["jquery","jquery_ui", "trend", "map", "assess", "assess_data","data_assess_tooltip","date", "main"], function ($, jquery_ui, trend, map, assess, assess_data,data_assess_tooltip,date, main) {
    //设置最新上报时间
    $("#dateStart").val(localStorage.CURRENT_TIME.split(" ")[0]);
    $("#dateEnd").val(localStorage.CURRENT_TIME.split(" ")[0]);
    //多元数据时间控件, new_date(container, default_date, min_max)
    date.new_date("dateStart", "dateEnd");
    var datestart = document.getElementById("dateStart");
    var dateend = document.getElementById("dateEnd");
    datestart.onchange = dateend.onchange = function () {
        $("#confirm_btn").css({
            "backgroundColor": "#333",
            "color": "#fff"
        })
    };
    assess.isChecked();     //右上角地区选择
    assess.windowScale();   //趋势图窗口缩放
    trend.show_trend();     //趋势图
    //点击右上角添加浮标
	main.click_add_buoy();
    //點擊頁面下方地區切換、查詢
    $(".li").click();	//頁面加載默認“海水浴场”
    //拖拽地图变鼠标小手
});
