require.config({
    paths: {
        jquery: "../thirdparty/jquery-1.8.3.min",
        jquery_ui: "../thirdparty/jquery-ui.min",
        echarts: "../thirdparty/echarts.common.min",
        typhoon_warning_main:"typhoon_warning/typhoon_warning_main",
        web_gis_init: "typhoon_warning/web_gis_init", 
		web_gis: "typhoon_warning/web_gis", 
		web_gis_path: "typhoon_warning/web_gis_path",
		web_gis_path_points: "typhoon_warning/web_gis_path_points",
        typhoon_trend: "typhoon_warning/typhoon_trend",
        rdk_url: "common/rdkUrl",
        data_show_data: "common/data_show_data",
        typhoon_warning_data: "common/typhoon_warning_data",
        static: "common/static",
        common_date: "common/date"
    },
    //指定模块依赖关系
    shim:{
        "jquery_ui": ["jquery"]
    }
});
require(["typhoon_warning_main", "web_gis_init", "typhoon_warning_data", "web_gis"], function (typhoon_warning_main) {




});