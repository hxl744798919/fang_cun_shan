/**
 * Created by Administrator on 2017/3/14.
 */
require.config({
    paths: {
        jquery: "../thirdparty/jquery-1.8.3.min",
        jquery_ui: "../thirdparty/jquery-ui.min",
        web_gis: "sea_overview/web_gis",
        web_gis_mini: "sea_overview/web_gis_mini",
        sea_overview_main:"sea_overview/sea_overview_main",
        web_gis_init: "sea_overview/web_gis_init",
        rdk_url: "common/rdkUrl",		//rdk
        data_update: "common/sea_overview_data",
        static: "common/static",
        date: "common/date"
    },
    //指定模块依赖关系
    shim:{
        "jquery_ui": ["jquery"]
    }
});

require([ "data_update", "sea_overview_main", "web_gis_init"], function (data_update) {
    data_update.list_data_update();
});