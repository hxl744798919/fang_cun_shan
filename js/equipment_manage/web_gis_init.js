var subframe = null;
var userName = "admin";
var pageName = "test";
var hostIP = "";
var infoWindow = "";

function init(){
    subframe = document.getElementById("ocean_map");
    var options = {
        center: [114.1506, 22.4853],
        zoomLevel:11,
        minZoomLevel: 10,//限制(地图/缩放条)最大级别，取值3~17;
        numZoomLevels: 14,
        hideZoomBar:true, //隐藏缩放条
        hideLegend: true,
        hidesatelliteMap:true, //隐藏卫星地图
        mapTypeId: subframe.contentWindow.MapTypeId.SATELLITE,
        hideTools: true,
        zoomBarPos: {right:75,top:10}
    };
    subframe.contentWindow.InitMap(userName,pageName,hostIP,options);
}