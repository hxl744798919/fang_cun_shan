//解决营养盐四小时及以下时间粒度上报问题。
var CURRENT_SELECT_PARA = 0;
//require路径参数配置
require.config({
    //模块路径
    paths: {
        jquery: "../thirdparty/jquery-1.8.3.min",
        jquery_ui: "../thirdparty/jquery-ui.min",

        main: "data_show/data_show_main",
        bar: "data_show/data_show_bar",
        trend: "data_show/data_show_trend",
        multi: "data_show/data_show_multi",
        single: "data_show/data_show_single",
        map: "data_show/data_show_map",
        list: "data_show/data_show_list",
        compass: "data_show/data_show_compass",
        rdk_url: "common/rdkUrl",		//rdk
		common: "common/list_up_down",
        data: "common/data_show_data",
        date: "common/date",
        static: "common/static",
        sort:"common/sort"       //data_show里面公共文件路径名
    },
    //指定模块依赖关系
    shim: {
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

//启动data_show页面流程
require(["main"], function (){});
