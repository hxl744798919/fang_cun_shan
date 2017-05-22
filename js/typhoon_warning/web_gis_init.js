var subframe = null;
var userName = "admin";
var pageName = "test";
var hostIP = "";
var infoWindow = "";

function init() {
    subframe = document.getElementById("ocean_map");
    var options = {
        center: [128.1906, 21.525],
        zoomLevel:5,
        minZoomLevel: 5,//限制(地图/缩放条)最大级别，取值3~17;
        numZoomLevels: 12,
        hideZoomBar: true, //隐藏缩放条
        hidesatelliteMap:true, //隐藏卫星地图
        hideLegend: true,
        mapTypeId: subframe.contentWindow.MapTypeId.SATELLITE,
        hideTools: true,
        zoomBarPos: {right: 175, top: -8}

    };
    subframe.contentWindow.InitMap(userName, pageName, hostIP, options);
}

