define(
    ["jquery", "rdk_url","data_update"],
    function ($, rdk_url, data_update) {
        localStorage.infoWindow_clicked = false;
//波浪浮标
        var wave_marker_1, wave_marker_2, wave_marker_3, wave_marker_4, wave_marker_5, wave_marker_6;
        var wave_marker_1_s, wave_marker_2_s, wave_marker_3_s, wave_marker_4_s, wave_marker_5_s, wave_marker_6_s;//信号动画
//环境浮标
        var env_marker_1, env_marker_2,env_marker_3,env_marker_4,env_marker_5,env_marker_6,env_marker_7,env_marker_8,env_marker_9,
            env_marker_10,env_marker_11,env_marker_12,env_marker_13, env_marker_14;
        var env_marker_1_s, env_marker_2_s,env_marker_3_s,env_marker_4_s,env_marker_5_s,env_marker_6_s,env_marker_7_s,env_marker_8_s,env_marker_9_s,
            env_marker_10_s,env_marker_11_s,env_marker_12_s,env_marker_13_s, env_marker_14_s, env_marker_15_s;//信号动画
        //排污口浮标
        var pw_marker_1;
        var pw_marker_1_s;
        //主地图连线经纬度
        var env_points = {
            "type": "FeatureCollection",
            "features": [
                /*环境浮标*/
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "珠江口沙井",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[113.786, 22.760], [113.721, 22.760], [113.721, 22.693]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "珠江口矾石",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[113.792, 22.576], [113.792, 22.494]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "珠江口内伶仃南",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [ [113.800, 22.407], [113.800, 22.346]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "深圳湾蛇口",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[113.931, 22.481], [113.995, 22.481], [113.995, 22.560]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大鹏湾沙头角",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.143, 22.498], [114.233, 22.498], [114.233, 22.552]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大鹏湾大梅沙",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.119, 22.650],[114.178, 22.650], [114.178, 22.594], [114.321, 22.594]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大鹏湾下沙",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.238, 22.651],[114.238, 22.613],[114.335, 22.613], [114.441, 22.568]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大鹏湾南澳",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.245, 22.441], [114.465, 22.477], [114.465, 22.525]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大鹏湾口门",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.471, 22.454], [114.471, 22.427], [114.366, 22.427]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大亚湾东涌",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.580, 22.475], [114.580, 22.358]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大亚湾东山",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.506, 22.568], [114.336, 22.650]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大亚湾长湾",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.567, 22.609], [114.596, 22.609],[114.596, 22.726]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "哑呤湾坝光",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.563, 22.662], [114.450, 22.746]]
                    }
                },
                

            ]
        };
        var pw_points = {
            "type": "FeatureCollection",
            "features": [
                /*排污口*/
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "新圳河入口",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[113.879, 22.544], [113.879, 22.640]]
                    }
                }
            ]
        };
        var wave_points = {
            "type": "FeatureCollection",
            "features": [
                /*波浪浮标*/
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "深圳湾蛇口",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[113.913, 22.460], [113.913, 22.365]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大鹏湾大梅沙",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.118, 22.573], [114.298, 22.573]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大鹏湾下沙",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.343, 22.498], [114.343, 22.543], [114.441, 22.543]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大亚湾东涌",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.542, 22.454], [114.430, 22.353]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大亚湾杨梅坑",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.566, 22.558], [114.435, 22.647]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "name": "大亚湾坝光",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[114.260, 22.724],[114.260, 22.690],[114.506, 22.685], [114.542, 22.660]]
                    },
                }
            ]
        };
//调节因子
        var temp_factor = 0.005;
        var temp_factor_2 = 0.003;
        var temp_factor_3 = 0.02;
//[浮标名称，经度，纬度，浮标，浮标信号，浮标编号，浮标离线时长，浮标在线时长,地名，浮标类型]
        var env_buoy_position = [["哑呤湾坝光", 114.556 + temp_factor_3, 22.662, env_marker_1, env_marker_1_s, "FBDY1", "--", "--", "--"],
            ["大亚湾长湾", 114.580, 22.608, env_marker_2, env_marker_2_s, "FBDY2", "--", "--", "--"],
            ["大亚湾东山", 114.518, 22.569, env_marker_3, env_marker_3_s, "FBDY3", "--", "--", "--"],
            //["大亚湾杨梅坑", 114.555, 22.6595],//已坏，坐标不准
            ["大亚湾东涌", 114.573 + temp_factor_3, 22.474, env_marker_5, env_marker_5_s, "FBDY5", "--", "--", "--"],
            ["大鹏湾沙头角", 114.241 + temp_factor, 22.553, env_marker_6, env_marker_6_s, "FBDP1", "--", "--", "--"],
            ["大鹏湾大梅沙", 114.314 + temp_factor_3, 22.594, env_marker_7, env_marker_7_s, "FBDP2", "--", "--", "--"],
            ["大鹏湾下沙", 114.454, 22.566, env_marker_8, env_marker_8_s, "FBDP3", "--", "--", "--"],
            ["大鹏湾南澳", 114.478, 22.525, env_marker_9, env_marker_9_s, "FBDP4", "--", "--", "--"],
            ["大鹏湾口门", 114.485, 22.459, env_marker_10, env_marker_10_s, "FBDP5", "--", "--", "--"],
            ["深圳湾蛇口", 113.945, 22.481, env_marker_11, env_marker_11_s, "FBSZ1", "--", "--", "--"],
            ["珠江口沙井", 113.734, 22.690, env_marker_12, env_marker_12_s, "FBZJ1", "--", "--", "--"],
            ["珠江口矾石", 113.806, 22.494, env_marker_13, env_marker_13_s, "FBZJ2", "--", "--", "--"],
            ["珠江口内伶仃南", 113.814,22.346, env_marker_14, env_marker_14_s, "FBZJ3", "--", "--", "--"]
            //["珠江口内伶仃东", 114.555, 22.6595]//未开通，坐标不准
        ];
        var env_buoy_position2 = [["哑呤湾坝光", 114.365, 22.708, env_marker_1, env_marker_1_s, "FBDY1", "--", "--", "--", "坝光", "环境浮标"],
            ["大亚湾长湾", 114.510, 22.708, env_marker_2, env_marker_2_s, "FBDY2", "--", "--", "--", "核电站", "环境浮标"],
            ["大亚湾东山", 114.297, 22.636, env_marker_3, env_marker_3_s, "FBDY3", "--", "--", "--", "东山", "环境浮标"],
            //["大亚湾杨梅坑", 114.555, 22.6595],//已坏，坐标不准
            ["大亚湾东涌", 114.521, 22.340, env_marker_5, env_marker_5_s, "FBDY5", "--", "--", "--", "东涌", "环境浮标"],
            ["大鹏湾沙头角", 114.071 , 22.481, env_marker_6, env_marker_6_s, "FBDP1", "--", "--", "--", "沙头角", "环境浮标"],
            ["大鹏湾大梅沙", 114.050 , 22.627, env_marker_7, env_marker_7_s, "FBDP2", "--", "--", "--", "大梅沙", "环境浮标"],
            ["大鹏湾下沙", 114.178, 22.636, env_marker_8, env_marker_8_s, "FBDP3", "--", "--", "--", "下沙", "环境浮标"],
            ["大鹏湾南澳", 114.163, 22.415, env_marker_9, env_marker_9_s, "FBDP4", "--", "--", "--", "南澳", "环境浮标"],
            ["大鹏湾口门", 114.306, 22.398, env_marker_10, env_marker_10_s, "FBDP5", "--", "--", "--", "大鹏湾口", "环境浮标"],
            ["深圳湾蛇口", 113.928, 22.556, env_marker_11, env_marker_11_s, "FBSZ1", "--", "--", "--", "深圳湾", "环境浮标"],
            ["珠江口沙井", 113.722, 22.740, env_marker_12, env_marker_12_s, "FBZJ1", "--", "--", "--", "沙井", "环境浮标"],
            ["珠江口矾石", 113.725, 22.568, env_marker_13, env_marker_13_s, "FBZJ2", "--", "--", "--", "矾石", "环境浮标"],
            ["珠江口内伶仃南", 113.726,22.400, env_marker_14, env_marker_14_s, "FBZJ3", "--", "--", "--", "伶仃南", "环境浮标"]
            //["珠江口内伶仃东", 114.555, 22.6595]//未开通，坐标不准
        ];

        var wave_buoy_position = [["大亚湾坝光", 114.556, 22.66, wave_marker_1, wave_marker_1_s, "FB01", "--", "--", "--"],
            ["大亚湾杨梅坑", 114.579, 22.558, wave_marker_2, wave_marker_2_s, "FB02", "--", "--", "--"],
            ["大亚湾东涌", 114.574 - temp_factor_3, 22.474 - temp_factor_3, wave_marker_3, wave_marker_3_s, "FB03", "--", "--", "--"],
            ["大鹏湾下沙", 114.454, 22.564 - temp_factor_3, wave_marker_4, wave_marker_4_s, "FB04", "--", "--", "--"],
            ["大鹏湾大梅沙", 114.312, 22.593 - temp_factor_3, wave_marker_5, wave_marker_5_s, "FB05", "--", "--", "--"],
            ["深圳湾蛇口", 113.946 - temp_factor_3, 22.480 - temp_factor_3, wave_marker_6, wave_marker_6_s, "FB06", "--", "--", "--"]
        ];
        var wave_buoy_position2 = [["大亚湾坝光", 114.209, 22.710, wave_marker_1, wave_marker_1_s, "FB01", "--", "--", "--", "坝光", "波浪浮标"],
            ["大亚湾杨梅坑", 114.409, 22.636, wave_marker_2, wave_marker_2_s, "FB02", "--", "--", "--", "杨梅坑", "波浪浮标"],
            ["大亚湾东涌", 114.350, 22.332, wave_marker_3, wave_marker_3_s, "FB03", "--", "--", "--", "东涌", "波浪浮标"],
            ["大鹏湾下沙", 114.289, 22.499, wave_marker_4, wave_marker_4_s, "FB04", "--", "--", "--", "下沙", "波浪浮标"],
            ["大鹏湾大梅沙", 114.050, 22.553, wave_marker_5, wave_marker_5_s, "FB05", "--", "--", "--", "大梅沙", "波浪浮标"],
            ["深圳湾蛇口", 113.858, 22.363, wave_marker_6, wave_marker_6_s, "FB06", "--", "--", "--", "深圳湾", "波浪浮标"]
        ];
        var paiwu_buoy_position = [
            ["新圳河入海口", 113.895,22.540, pw_marker_1, pw_marker_1_s, "FBPW", "--", "--", "--"]
        ];
        var paiwu_buoy_position2 = [
            ["新圳河入海口", 113.821,22.636, pw_marker_1, pw_marker_1_s, "FBPW", "--", "--", "--"]
        ];
//增加端口判断传入不同的数据路径 updated 2016.02.05
        var path = null;
        if (((window.location.port)== 8080) || ((window.location.port)== 8081) || ((window.location.port)== 8082||(window.location.port)== 9999))
        {
            path = "/usr/local/jetty/webapps/webgis";
        }
        else if ((window.location.port)==9953 )
        {
            path = "/home/jetty/webapps/webgis";
        }
        else if ((window.location.port)==8086 )
        {
            path = "/home/tomcat/webapps/webgis";
        }
        else if ((window.location.port)==26180 )
        {
            path = "/home/netnumen/ems/ums-server/procs/ppus/webgis.ppu/webgis-web.pmu/webgis.ear/webgis.war";
        }

        var size;
        var offset;
//添加主、小地图浮标
        var add_buoy_to_map = function () {
            if (infoWindow) {
                infoWindow.close();
            }
            //此时为主地图
            size = new subframe.contentWindow.zmaps.Size(50, 50);
            offset = new subframe.contentWindow.zmaps.Pixel(-48, -28);
            //添加波浪浮标
            var wave_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/buoy_wave.png", size, offset);
            for(var i = 0; i < wave_buoy_position.length; i++){
                wave_buoy_position[i][3] = new subframe.contentWindow.zmaps.Marker(
                    new subframe.contentWindow.zmaps.LonLat(wave_buoy_position[i][1], wave_buoy_position[i][2]),
                    wave_icon.clone());
                add_tool_tip_click(wave_buoy_position[i][3], wave_buoy_position[i][0], wave_buoy_position[i][1],wave_buoy_position[i][2], "波浪浮标");
                subframe.contentWindow.zmaps.MarkerLayer.addMarker(wave_buoy_position[i][3]);
            }
            //添加环境浮标
            var env_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/buoy_env.png", size, offset);
            for(var i = 0; i < env_buoy_position.length; i++){
                env_buoy_position[i][3] = new subframe.contentWindow.zmaps.Marker(
                    new subframe.contentWindow.zmaps.LonLat(env_buoy_position[i][1], env_buoy_position[i][2]),
                    env_icon.clone());
                add_tool_tip_click(env_buoy_position[i][3], env_buoy_position[i][0], env_buoy_position[i][1], env_buoy_position[i][2], "环境浮标");
                subframe.contentWindow.zmaps.MarkerLayer.addMarker(env_buoy_position[i][3]);
            }
            //添加排污口浮标
            var paiwu_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/pwqxiao.png", size, offset);
            for(var i = 0; i < paiwu_buoy_position.length; i++){
                paiwu_buoy_position[i][3] = new subframe.contentWindow.zmaps.Marker(
                    new subframe.contentWindow.zmaps.LonLat(paiwu_buoy_position[i][1], paiwu_buoy_position[i][2]),
                    paiwu_icon.clone());
                add_tool_tip_click(paiwu_buoy_position[i][3], paiwu_buoy_position[i][0], paiwu_buoy_position[i][1],
                    paiwu_buoy_position[i][2], "陆源站");
                subframe.contentWindow.zmaps.MarkerLayer.addMarker(paiwu_buoy_position[i][3]);
            }
            //添加提示框
            add_all_tip(true);
        };
        //解决延时传参问题
        var _add_buoy_to_map = function () {
            add_buoy_to_map();
        };
        //延时启动添加浮标函数
        if(localStorage.CURRENT_BROWSER_TYPE == "Chrome")
            setTimeout(_add_buoy_to_map,1500);
        else
            setTimeout(_add_buoy_to_map,3000);
        //添加浮标连线
        function loadUserTracks(points_1, points_2, points_3) {
            var data = [];
            var points_1 = JSON.stringify(points_1);
            var points_2 = JSON.stringify(points_2);
            var points_3 = JSON.stringify(points_3);

            subframe.contentWindow.UserTrack.load({
                enableCluster: false,
                data: data,
                customTracklineData: [points_1, points_2, points_3],
                infoWindow: {
                    formatter: function (e) {
                        return '<div style="background:#5f52a0; padding:6px"> length:' + e.childFeatures.length + ' </div>';
                    }
                },
                styleRule: {
                    point: {
                        clustered: {
                            pointRadius: 10,
                            fillColor: 'red',
                            fillOpacity: .5,
                            strokeColor: 'blue',
                            strokeOpacity: 0.5,
                            strokeWidth: 10
                        },
                        nonclustered: {
                            pointRadius: 10,
                            fillColor: 'red',
                            fillOpacity: .5,
                            strokeColor: 'blue',
                            strokeOpacity: 0.5,
                            strokeWidth: 10
                        }
                    },
                    line: [{
                        strokeWidth: 2,
                        strokeColor:  '#00416D',
                        strokeOpacity: 0.9
                    },{
                        strokeWidth: 2,
                        strokeColor:  'green',
                        strokeOpacity: 0.9
                    },{
                        strokeWidth: 2,
                        strokeColor: '#E98F36',
                        strokeOpacity: 0.9
                    }],
                    arrow: {
                        radius: 5,
                        fillColor: '#fff',
                        fillOpacity: 0,
                        repeat: 20
                    }
                }
            });
        }
        //创建默认信息框
        var infowindow_count = [];
        var main_info_window;
        var all_data = data_update.all_data;
        function creat_tool_tip_init(position, name2, type) {
            if(localStorage.infoWindow_clicked == "true") return;
            var wave_height = "--";
			var wave_direction = "--";
			var water_tmp = "--";
            var max_wave_h = "--";
            var effect_wave_h = "--";
            var  wave_num= "--";
            var  air_tmp= "--";
            var oxygen = "--";
            var salinity = "--";
            var chlorophyll_a = "--";
            for(var n = 0; n < all_data.wave_data.length; n++){
                if(all_data.wave_data[n].name == name2){
                    wave_height = all_data.wave_data[n].shuidongli_data[8];
					wave_direction = all_data.wave_data[n].shuidongli_data[13];
                    max_wave_h = all_data.wave_data[n].shuidongli_data[4];
                    effect_wave_h = all_data.wave_data[n].shuidongli_data[10];
                    wave_num = all_data.wave_data[n].shuidongli_data[12];
                }
            }
            for(var n = 0; n < all_data.env_data.length; n++){
                if(all_data.env_data[n].name == name2){
                    air_tmp = all_data.env_data[n].qixiang_data[3];
                    oxygen = all_data.env_data[n].shuizhi_data[3];
                    salinity = all_data.env_data[n].shuizhi_data[1];
                    water_tmp = all_data.env_data[n].shuizhi_data[0];
                    chlorophyll_a = all_data.env_data[n].shuizhi_data[8];
                }
            }

            if(type == "波浪浮标提示框"){
                infoWindow = new subframe.contentWindow.zmaps.InfoWindow({
                    position : position,
                    content: '<link href="../../../ocean/css/sea_overview/web_gis_tip.css" rel="stylesheet" />\
                        <div class="buoy_box wave_buoy_box" onselectstart="return false">\
                        <div class="img_box">\
                        <img src="../../../ocean/image/wave_buoy.png">\
                        </div>\
                        <!--<div class="img_line_box">\
                        <img src="../../ocean/image/buoy_bakground_line.png">\
                        </div>-->\
                        <table class="buoy">\
                        <tr><td class="align_right">有效波高(m)</td><td>' + wave_height + '</td></tr>\
                        <tr><td>有效波周期(s)</td><td>' + effect_wave_h + '</td></tr>\
                        <tr><td>波浪个数</td><td>' + wave_num + '</td></tr>\
                        <tr><td>主波向(°)</td><td>' + wave_direction + '</td></tr>\
                        </table>\
                        </div>'
                });
            }
            if(type == "环境浮标提示框"){
                infoWindow = new subframe.contentWindow.zmaps.InfoWindow({
                    position : position,
                    content: '<link href="../../../ocean/css/sea_overview/web_gis_tip.css" rel="stylesheet" />\
                        <div class="buoy_box env_buoy_box" onselectstart="return false">\
                        <div class="img_box">\
                        <img src="../../../ocean/image/env_buoy.png">\
                        </div>\
                        <!--<div class="img_line_box">\
                        <img src="../../ocean/image/buoy_bakground_line.png">\
                        </div>-->\
                        <table class="buoy">\
                        <tr><td class="align_right">气温(°C)</td><td>' + air_tmp + '</td></tr>\
                        <tr><td class="align_right">水温(°C)</td><td>' + water_tmp + '</td></tr>\
                        <tr><td>溶解氧(mg/L)</td><td>' + oxygen + '</td></tr>\
                        <tr><td>盐度(ppt)</td><td>' + salinity + '</td></tr>\
                        <tr><td>叶绿素(μg/L)</td><td>' + chlorophyll_a + '</td></tr>\
                        </table>\
                        </div>'
                });
            }
            if(type == "排污口标提示框"){
                infoWindow = new subframe.contentWindow.zmaps.InfoWindow({
                    position : position,
                    content: '<link href="../../../ocean/css/sea_overview/web_gis_tip.css" rel="stylesheet" />\
                        <div class="buoy_box pw_buoy_box" onselectstart="return false">\
                        <div class="img_box">\
                        <img src="../../../ocean/image/pw_buoy.png">\
                        </div>\
                        <table class="buoy">\
                        <tr><td class="align_right">水温(°C)</td><td>--</td></tr>\
                        <tr><td>溶解氧(mg/L)</td><td>--</td></tr>\
                        <tr><td>盐度</td><td>--</td></tr>\
                        <tr><td>PH值</td><td>--</td></tr>\
                        <tr><td>总氮(mg/L)</td><td>--</td></tr>\
                        <tr><td>硫化物(mg/L)</td><td>--</td></tr>\
                        </table>\
                        </div>'
                });
            }
            infowindow_count.push(infoWindow);
            infoWindow.show();
        }
        //创建浮标弹出框
        function creat_tool_tip(position, name, lon, lat, type, data) {
            if(localStorage.infoWindow_clicked == "true") return;
            if (infoWindow) {
                infoWindow.close();
            }

            //弹出框数据处理逻辑
            var current_qixiang_data = ['--','--','--','--','--','--','--','--'];
            var current_shuidongli_data = ['--','--','--','--','--','--','--','--','--','--','--','--','--','--','--'];
            var current_shuizhi_data = ['--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--'];
            var current_time = '-';
            //名字对应值
            var  tip_name ={
                "坝光":"哑呤湾坝光",
                "核电站":"大亚湾长湾",
                "东山":"大亚湾东山",
                "东涌":"大亚湾东涌",
                "沙头角":"大鹏湾沙头角",
                "大梅沙":"大鹏湾大梅沙",
                "下沙":"大鹏湾下沙",
                "南澳":"大鹏湾南澳",
                "大鹏湾口":"大鹏湾口门",
                "深圳湾":"深圳湾蛇口",
                "沙井":"珠江口沙井",
                "矾石":"珠江口矾石",
                "伶仃南":"珠江口内伶仃南",
				"杨梅坑":"大亚湾杨梅坑"
            };
            var current_state = "离线";
            for(var i = 0; i < data.env_data.length; i++){
                if(tip_name[data.env_data[i].name] == name && type == "环境浮标"){
                    current_qixiang_data = data.env_data[i].qixiang_data;
                    current_shuizhi_data = data.env_data[i].shuizhi_data;
                    current_time = data.env_data[i].time;
                    if(data.env_data[i].is_online){
                        current_state = "在线";
                    }
                    break;
                }
            }
            for(var i = 0; i < data.wave_data.length; i++){
                if(tip_name[data.wave_data[i].name] == name && type == "波浪浮标"){
                    current_shuidongli_data = data.wave_data[i].shuidongli_data;
                    current_time = data.wave_data[i].time;
                    if(data.wave_data[i].is_online){
                        current_state = "在线";
                    }
                    break;
                }
            }

            if(type == "环境浮标"){
                infoWindow = new subframe.contentWindow.zmaps.InfoWindow({
                    position : position,
                    content: '<div class="gis_suspension"  onselectstart="return false" style="width: 300px;background: url("image/buoy_bakground.png") no-repeat;position: relative;font-family: \'微软雅黑\';">\
                <span class="close_off" onclick=close_tip()></span>\
                <div id="overview_label" style = "height: 381px;">\
                <div class="Over_head" style = "height: 58px;">\
                <p>'+ name+'</p>\
                </div>\
                <div class="colour"></div>\
                <ul class="label_switchover" style = "height: 58px;margin-bottom: 6px;">\
                <li onclick = a(this) class = "li_activation" data-active="geog_parameter">\
                <img src="../../../ocean/image/geog_norm.png" alt="">\
                </li>\
                <li onclick = a(this) data-active="scene_parameter">\
                <img src="../../../ocean/image/scene_down.png" alt="">\
                </li>\
                <li onclick = a(this) data-active="wate_parameter">\
                <img src="../../../ocean/image/wate_down.png" alt="">\
                </li>\
                </ul>\
                <div class="parameter" style="height:324px">\
                <!--地理-->\
                <div class="geog_parameter parameter_active">\
                <p>位置信息</p>\
                <ul>\
                <li>类型<span>环境浮标</span></li>\
                <li>经度<span>'+ Math.round(lon*1000)/1000 +'</span></li>\
                <li>纬度<span>'+ Math.round(lat*1000)/1000 +'</span></li>\
                <li>状态<span>'+ current_state +'</span></li>\
                <li>最近上报时间<div style="display: inline-block;margin-left: 30px;">'+ current_time +'</div></li>\
                </ul>\
                </div>\
                <!--气象-->\
                <div class="scene_parameter ">\
                <p>气象数据</p>\
                <ul>\
                <li>最大风速<span>'+ current_qixiang_data[0]+'</span>m/s</li>\
                <li>风<lable></lable>速<span>'+ current_qixiang_data[1]+'</span>m/s</li>\
                <li>风<lable></lable>向<span>'+ current_qixiang_data[2]+'</span>°</li>\
                <li>气<lable></lable>温<span>'+ current_qixiang_data[3]+'</span>°</li>\
                <li>相对湿度<span>'+ current_qixiang_data[4]+'</span>%</li>\
                <li>气<lable></lable>压<span>'+ current_qixiang_data[5]+'</span>hPa</li>\
                <li>雨<lable></lable>量<span>'+ current_qixiang_data[6]+'</span>mm</li>\
                <li>有效光合<span>'+ current_qixiang_data[7]+'</span></li>\
            </ul>\
            </div>\
            <!--水质-->\
            <div class="wate_parameter">\
                <p>水质数据</p>\
                <ul>\
                <li><lable>水温</lable><span>'+ current_shuizhi_data[0]+'</span>°C</li>\
                <li><lable>叶绿素a</lable><span>'+ current_shuizhi_data[1]+'</span>(μg/L)</li>\
                <li><lable>PH值</lable><span>'+ current_shuizhi_data[2]+'</span></li>\
                <li><lable>溶解氧</lable><span>'+ current_shuizhi_data[3]+'</span>(mg/L)</li>\
                <li><lable>溶解氧饱和度</lable><span>'+ current_shuizhi_data[4]+'</span>(%)</li>\
                <li><lable>浊度</lable><span>'+ current_shuizhi_data[5]+'</span></li>\
                <li><lable>电导率</lable><span>'+ current_shuizhi_data[6]+'</span>(mS/cm)</li>\
                <li><lable>氧化还原电位</lable><span>'+ current_shuizhi_data[7]+'</span>(mV)</li>\
                <li><lable>盐度</lable><span>'+ current_shuizhi_data[8]+'</span>(ppt)</li>\
                <li><lable>总溶解性固体</lable><span>'+ current_shuizhi_data[9]+'</span>(g/L)</li>\
                <li><lable>蓝绿藻</lable><span>'+ current_shuizhi_data[10]+'</span>(uL)</li>\
                <li><lable>化学需氧量</lable><span>'+ current_shuizhi_data[11]+'</span>(mg/L)</li>\
                <li><lable>水中油</lable><span>'+ current_shuizhi_data[12]+'</span></li>\
                <li><lable>表层水温</lable><span>'+ current_shuizhi_data[13]+'</span>(°C)</li>\
                <li><lable>表层电导率</lable><span>'+ current_shuizhi_data[14]+'</span>(mS/cm)</li>\
                <li><lable>表层盐度</lable><span>'+ current_shuizhi_data[15]+'</span>(ppt)</li>\
                <li><lable>钴60(Co)</lable><span>'+ current_shuizhi_data[17]+'</span>(Bq/L)</li>\
                <li><lable>锶89(Sr)</lable><span>'+ current_shuizhi_data[18]+'</span>(Bq/L)</li>\
                <li><lable>铯134(Cs)</lable><span>'+ current_shuizhi_data[19]+'</span>(Bq/L)</li>\
                <li><lable>铯137(Cs)</lable><span>'+ current_shuizhi_data[20]+'</span>(Bq/L)</li>\
                <li><lable>氨氮</lable><span>'+ current_shuizhi_data[21]+'</span>(μg/L)</li>\
                <li><lable>亚硝酸盐</lable><span>'+ current_shuizhi_data[22]+'</span>(μg/L)</li>\
                <li><lable>硝酸盐</lable><span>'+ current_shuizhi_data[23]+'</span>(μg/L)</li>\
                <li><lable>磷酸盐</lable><span>'+ current_shuizhi_data[24]+'</span>(μg/L)</li>\
            </ul>\
            </div>\
            </div>\
            <!--小三角-->\
            <div  class="triangle"></div>\
          </div>\
          <link href="../../../ocean/css/sea_overview/gis_lable.css" rel="stylesheet" />\
		<script >\
                function a (th){\
                var data_active = $(th).attr("data-active");\
                $("." + data_active).addClass("parameter_active").siblings(".parameter_active").removeClass("parameter_active");\
                $(th).addClass("li_activation").siblings(".li_activation").removeClass("li_activation");\
                var img_active = $(th).children().attr("src").split("_")[0];\
                var li_sib = $(th).siblings().children();\
                $(th).children().attr("src", img_active + "_norm.png");\
                for (var i = 0; i < li_sib.length; i++) {\
                $(li_sib[i]).attr("src", $(li_sib[i]).attr("src").split("_")[0] + "_down.png")\
        }\
        $(".wate_parameter ul li:odd").css("borderLeft","1px solid #91A3B8")\
            }\
            function close_tip(){$(".gis_suspension").css("display", "none")}\
                </script>\
			</div>'
                    });
                }
            if(type == "陆源站"){
                infoWindow = new subframe.contentWindow.zmaps.InfoWindow({
                    position : position,
                    content: '<div class="gis_suspension" onselectstart="return false" style="width: 300px;background: url("image/buoy_bakground.png") no-repeat;position: relative;font-family: \'微软雅黑\';">\
                    <span class="close_off" onclick=close_tip() ></span>\
                    <div id="overview_label">\
                    <div class="Over_head">\
                    <p>'+ name+'</p>\
                    </div>\
                    <div class="colour"></div>\
                    <ul class="label_switchover" style = "height: 58px;margin-bottom: 6px;">\
                    <li onclick = a(this) class = "li_activation" data-active="geog_parameter" style="width: 150px">\
                    <img src="../../../ocean/image/geog_norm.png" alt="">\
                    </li>\
                    <li onclick = a(this) data-active="wate_parameter" style="width: 150px;margin: 0">\
                    <img src="../../../ocean/image/waterPower_down.png" alt="">\
                    </li>\
                    </ul>\
                    <div class="parameter" style="height: 286px">\
                    <!--地理-->\
                    <div class="geog_parameter parameter_active">\
                    <p>位置信息</p>\
                    <ul>\
                    <li>类型<span>陆源站</span></li>\
                    <li>经度<span>'+ Math.round(lon*1000)/1000 +'</span></li>\
                    <li>纬度<span>'+ Math.round(lat*1000)/1000 +'</span></li>\
                    <li>状态<span>'+ current_state +'</span></li>\
                    <li>最近上报时间<div style="display: inline-block;margin-left: 30px;">'+ current_time +'</div></li>\
                    </ul>\
                    </div>\
                    <!--水动力-->\
                    <div class="wate_parameter">\
                    <p style="padding-top: 15px"></p>\
                    <ul style="margin-top: 10px;font-size: 13px">\
                    <li style="height: 28px;line-height: 28px "><lable>浊度</lable><span>'+current_shuidongli_data[0]+'</span>(NTU)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>PH值</lable><span>'+current_shuidongli_data[1]+'</span></li>\
                    <li style="height: 28px;line-height: 28px "><lable>水温</lable><span>'+current_shuidongli_data[2]+'</span>(℃)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>盐度</lable><span>'+current_shuidongli_data[4]+'</span></li>\
                    <li style="height: 28px;line-height: 28px "><lable>溶解氧</lable><span>'+current_shuidongli_data[5]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>挥发酚</lable><span>'+current_shuidongli_data[6]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>硫化物</lable><span>'+current_shuidongli_data[7]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>总氮</lable><span>'+current_shuidongli_data[8]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>硝酸盐</lable><span>'+current_shuidongli_data[9]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>COD</lable><span>'+current_shuidongli_data[10]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>TOC</lable><span>'+current_shuidongli_data[11]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>磷酸盐</lable><span>'+current_shuidongli_data[12]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>氨氮</lable><span>'+current_shuidongli_data[13]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable></lable>亚硝酸盐</lable><span>'+current_shuidongli_data[14]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>铜</lable><span>'+current_shuidongli_data[12]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>铬</lable><span>'+current_shuidongli_data[13]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>流量</lable><span>'+current_shuidongli_data[12]+'</span>(m³/s)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>总磷</lable><span>'+current_shuidongli_data[13]+'</span>(mg/L)</li>\
                </ul>\
                </div>\
                </div>\
                <!--小三角-->\
                <div class="triangle" style="top: 42%"></div>\
                </div>\
		<link href="../../../ocean/css/sea_overview/gis_lable.css" rel="stylesheet" />\
		<script >\
                function a (th){\
                var data_active = $(th).attr("data-active");\
                $("." + data_active).addClass("parameter_active").siblings(".parameter_active").removeClass("parameter_active");\
                $(th).addClass("li_activation").siblings(".li_activation").removeClass("li_activation");\
                var img_active = $(th).children().attr("src").split("_")[0];\
                var li_sib = $(th).siblings().children();\
                $(th).children().attr("src", img_active + "_norm.png");\
                for (var i = 0; i < li_sib.length; i++) {\
                $(li_sib[i]).attr("src", $(li_sib[i]).attr("src").split("_")[0] + "_down.png")\
        }\
        $(".wate_parameter ul li:odd").css("borderLeft","1px solid #91A3B8")\
            }\
            function close_tip(){$(".gis_suspension").css("display", "none")}\
                </script>\
			</div>'
                });
            }
            if(type == "波浪浮标"){
                    infoWindow = new subframe.contentWindow.zmaps.InfoWindow({
                        position : position,
                        content: '<div class="gis_suspension" onselectstart="return false" style="width: 300px;background: url("image/buoy_bakground.png") no-repeat;position: relative;font-family: \'微软雅黑\';">\
                    <span class="close_off" onclick=close_tip()></span>\
                    <div id="overview_label">\
                    <div class="Over_head">\
                    <p>'+ name+'</p>\
                    </div>\
                    <div class="colour"></div>\
                    <ul class="label_switchover" style = "height: 58px;margin-bottom: 6px;">\
                    <li onclick = a(this) class = "li_activation" data-active="geog_parameter" style="width: 150px">\
                    <img src="../../../ocean/image/geog_norm.png" alt="">\
                    </li>\
                    <li onclick = a(this) data-active="wate_parameter" style="width: 150px;margin: 0">\
                    <img src="../../../ocean/image/waterPower_down.png" alt="">\
                    </li>\
                    </ul>\
                    <div class="parameter" style="height: 252px">\
                    <!--地理-->\
                    <div class="geog_parameter parameter_active">\
                    <p>位置信息</p>\
                    <ul>\
                    <li>类型<span>'+ type +'</span></li>\
                    <li>经度<span>'+ Math.round(lon*1000)/1000 +'</span></li>\
                    <li>纬度<span>'+ Math.round(lat*1000)/1000 +'</span></li>\
                    <li>状态<span>'+ current_state +'</span></li>\
                    <li>最近上报时间<div style="display: inline-block;margin-left: 30px;">'+ current_time +'</div></li>\
                    </ul>\
                    </div>\
                    <!--水动力-->\
                    <div class="wate_parameter">\
                    <p style="padding-top: 15px">水动力数据</p>\
                    <ul style="margin-top: 10px;font-size: 13px">\
                    <li style="height: 28px;line-height: 28px "><lable>流速</lable><span>'+current_shuidongli_data[0]+'</span>(cm/s)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>流向</lable><span>'+current_shuidongli_data[1]+'</span>(°)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>波向</lable><span>'+current_shuidongli_data[2]+'</span>(°)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>最大波高</lable><span>'+current_shuidongli_data[4]+'</span>(m)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>最大波周期</lable><span>'+current_shuidongli_data[5]+'</span>(s)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>1/10波高</lable><span>'+current_shuidongli_data[6]+'</span>(m)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>1/10波周期</lable><span>'+current_shuidongli_data[7]+'</span>(s)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>有效波高</lable><span>'+current_shuidongli_data[8]+'</span>(m)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>有效波周期</lable><span>'+current_shuidongli_data[9]+'</span>(s)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>平均波高</lable><span>'+current_shuidongli_data[10]+'</span>(m)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>平均波周期</lable><span>'+current_shuidongli_data[11]+'</span>(s)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>波浪个数</lable><span>'+current_shuidongli_data[12]+'</span>(个)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>主波向</lable><span>'+current_shuidongli_data[13]+'</span>(°)</li>\
                <li style="height: 28px;line-height: 28px "><lable>方位</lable><span>'+current_shuidongli_data[14]+'</span>(°)</li>\
                </ul>\
                </div>\
                </div>\
                <!--小三角-->\
                <div class="triangle" style="top: 42%"></div>\
                </div>\
		<link href="../../../ocean/css/sea_overview/gis_lable.css" rel="stylesheet" />\
		<script >\
                function a (th){\
                var data_active = $(th).attr("data-active");\
                $("." + data_active).addClass("parameter_active").siblings(".parameter_active").removeClass("parameter_active");\
                $(th).addClass("li_activation").siblings(".li_activation").removeClass("li_activation");\
                var img_active = $(th).children().attr("src").split("_")[0];\
                var li_sib = $(th).siblings().children();\
                $(th).children().attr("src", img_active + "_norm.png");\
                for (var i = 0; i < li_sib.length; i++) {\
                $(li_sib[i]).attr("src", $(li_sib[i]).attr("src").split("_")[0] + "_down.png")\
        }\
        $(".wate_parameter ul li:odd").css("borderLeft","1px solid #91A3B8")\
            }\
            function close_tip(){$(".gis_suspension").css("display", "none")}\
                </script>\
			</div>'
                });
            }
            main_info_window = infoWindow;
            infoWindow.show();
        }
        //调用创建信息框
        function add_tool_tip_unclick(marker, name, type) {		//新建提示框
            creat_tool_tip_init(marker.position, name, type);
            subframe.contentWindow.zmaps.MarkerLayer.addMarker(marker);
        }
        //绑定浮标点击事件
        function add_tool_tip_click(marker, name, lon, lat, type) {		//新建提示框
            marker.events.register('click', marker, function (evt) {
                clear_all_tip();
                localStorage.infoWindow_clicked = false;
                //subframe.contentWindow.setBounds ("114.485,22.547,114.605,22.607");
                creat_tool_tip(this.position, name, lon, lat, type,data_update.all_data);
                subframe.contentWindow.Location.ZoomtoLonLat(lon, lat, 22000);//centerId,xOffset,yOffset,gridSize
                if($("ul.checkBox li.checkColor").text()=="海域全景"){
                    $("ul.checkBox li.checkColor").find("img").attr("src","../../../ocean/image/radio-deselect.png");
                    $("ul.checkBox li.checkColor").removeClass("checkColor");

                }
            });
        }
        //清除页面所有信息框
        var clear_all_tip = function () {
            subframe.contentWindow.UserTrack.clear();
            for(var i = 0; i < infowindow_count.length; i++){
                infowindow_count[i].close();
            }
            infowindow_count = [];
            if(main_info_window)
                main_info_window.close();
        };
        //重画页面提示框
        var add_all_tip = function (is_init) {
            var wave_icon2 = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/mini_bouy.png", size, offset);
            for(var i = 0; i < wave_buoy_position2.length; i++){
                if(is_init)
                wave_buoy_position2[i][3] = new subframe.contentWindow.zmaps.Marker(
                    new subframe.contentWindow.zmaps.LonLat(wave_buoy_position2[i][1], wave_buoy_position2[i][2]),
                    wave_icon2.clone());
                add_tool_tip_unclick(wave_buoy_position2[i][3], wave_buoy_position2[i][9], "波浪浮标提示框");
            }
            var env_icon2 = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/mini_bouy.png", size, offset);
            for(var i = 0; i < env_buoy_position2.length; i++){
                if(is_init)
                env_buoy_position2[i][3] = new subframe.contentWindow.zmaps.Marker(
                    new subframe.contentWindow.zmaps.LonLat(env_buoy_position2[i][1], env_buoy_position2[i][2]),
                    env_icon2.clone());
                add_tool_tip_unclick(env_buoy_position2[i][3], env_buoy_position2[i][9], "环境浮标提示框");
                //subframe.contentWindow.zmaps.MarkerLayer.addMarker(env_buoy_position2[i][3]);
            }
            var pw_icon2 = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/mini_bouy.png", size, offset);
            for(var i = 0; i < paiwu_buoy_position2.length; i++){
                if(is_init)
                paiwu_buoy_position2[i][3] = new subframe.contentWindow.zmaps.Marker(
                    new subframe.contentWindow.zmaps.LonLat(paiwu_buoy_position2[i][1], paiwu_buoy_position2[i][2]),
                    pw_icon2.clone());
                add_tool_tip_unclick(paiwu_buoy_position2[i][3], paiwu_buoy_position2[i][7], "排污口标提示框");
                //subframe.contentWindow.zmaps.MarkerLayer.addMarker(env_buoy_position2[i][3]);
            }
            loadUserTracks(env_points, wave_points, pw_points);
            subframe.contentWindow.Location.ZoomtoLonLat(114.1906, 22.545,2000);
        };
        //接口函数
        return{
            add_buoy_to_map: _add_buoy_to_map,
            clear_all_tip: clear_all_tip,
            add_all_tip: add_all_tip,
        }
    });
