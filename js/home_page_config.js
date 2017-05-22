require.config({
    paths: {
        jquery: "../thirdparty/jquery-1.8.3.min",
        jquery_ui: "../thirdparty/jquery-ui.min",
        jquery_cookie: "../thirdparty/jquery.cokie.min",

        home_page_main: "home_page/home_page_main",
        pie: "home_page/home_page_pie",
        rdk_url: "common/rdkUrl",		//rdk
        static: "common/static",
        data: "common/homepage_data",
        date: "common/date"
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
//设备状态饼图
require(["data", "home_page_main"], function () { });
