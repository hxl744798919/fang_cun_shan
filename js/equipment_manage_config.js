//require路径参数配置
require.config({
    paths: {
        jquery: "../thirdparty/jquery-1.8.3.min",

        main: "equipment_manage/equipment_manage_main",
        web_gis: "equipment_manage/web_gis",
        web_gis_init: "equipment_manage/web_gis_init",
        pie: "equipment_manage/equipment_manage_pie",
        static: "common/static",
        common: "common/list_up_down",
        rdk_url: "common/rdkUrl"		//rdk
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

//海洋参数二级菜单点击变色
require(["main", "web_gis_init"],function() {});
