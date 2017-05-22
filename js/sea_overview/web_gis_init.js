var subframe = null;
var subframe_mini = null;
var userName = "admin";
var pageName = "test";
var hostIP = "";
var infoWindow = "";
var mini_infoWindow = "";

function init() {
    //mini map
    subframe_mini = document.getElementById("ocean_map_2");
    var options = {
        center: [114.478,22.525],
        zoomLevel:12,
        minZoomLevel: 12,//限制(地图/缩放条)最大级别，取值3~17;
        numZoomLevels: 15,
        hideZoomBar: true, //隐藏缩放条
        hidesatelliteMap:true, //隐藏卫星地图
        hideLegend: true,
        mapTypeId: subframe_mini.contentWindow.MapTypeId.SATELLITE,
        hideTools: true,
        zoomBarPos: {right: 75, top: 10}

    };
    subframe_mini.contentWindow.InitMap(userName, pageName, hostIP, options);

    subframe = document.getElementById("ocean_map");
    var options = {
        center: [114.1906, 22.525],
        zoomLevel:11,
        minZoomLevel: 11,//限制(地图/缩放条)最大级别，取值3~17;
        numZoomLevels: 11,
        hideZoomBar: true, //隐藏缩放条
        hideLegend: true,
        mapTypeId: subframe.contentWindow.MapTypeId.SATELLITE,
        hideTools: true,
        zoomBarPos: {right: 75, top: 10}

    };
    subframe.contentWindow.InitMap(userName, pageName, hostIP, options);

}

