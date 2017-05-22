define(
    ["jquery", "rdk_url", "pie"],
    function ($, rdk_url, pie) {
        localStorage.infoWindow_clicked = false;
//波浪浮标
        var wave_marker_1, wave_marker_2, wave_marker_3, wave_marker_4, wave_marker_5, wave_marker_6;
        var wave_marker_1_s, wave_marker_2_s, wave_marker_3_s, wave_marker_4_s, wave_marker_5_s, wave_marker_6_s;//信号动画
//环境浮标
        var env_marker_1, env_marker_2,env_marker_3,env_marker_4,env_marker_5,env_marker_6,env_marker_7,env_marker_8,env_marker_9,
            env_marker_10,env_marker_11,env_marker_12,env_marker_13, env_marker_14;
        var env_marker_1_s, env_marker_2_s,env_marker_3_s,env_marker_4_s,env_marker_5_s,env_marker_6_s,env_marker_7_s,env_marker_8_s,env_marker_9_s,
            env_marker_10_s,env_marker_11_s,env_marker_12_s,env_marker_13_s, env_marker_14_s;//信号动画
//调节因子
        var temp_factor = 0.005;
        var temp_factor_2 = 0.003;
        var temp_factor_3 = 0.02;

//获取时间
        var DAY = 24 * 3600 * 1000; //一天的毫秒数
        var half_hour = 30 * 60 * 1000; //半小时毫秒数
        function setDate(t) {          //对小于或等于9的数进行补0操作
            t = t <=9 ? "0" + t : t;
            return t;
        }
        function getDate(d) {       //从时间戳中获取时间
            var year = d.getFullYear();
            var month = setDate(d.getMonth() + 1);
            var day = setDate(d.getDate());
            var hour = setDate(d.getHours());
            var minutes = setDate(d.getMinutes());
            return year + "-" + month + "-" + day + " " + hour + ":" + minutes;
        }
        var back_time = new Date(localStorage.CURRENT_TIME).getTime();
        var loop_time = [localStorage.CURRENT_TIME];
        var i = 1;
        while (i < 30){
            loop_time.push(getDate(new Date(back_time - i * DAY)));
            i++;
        }
        var date_pie = loop_time[0].substring(0,10);
        var three_date_pie = loop_time[29].substring(0,10);
        var four_hour_before = getDate(new Date(back_time - 8 * half_hour));
//[浮标名称，经度，纬度，浮标，浮标信号，浮标编号，浮标离线时长，浮标在线时长]
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
        var wave_buoy_position = [["大亚湾坝光", 114.556, 22.66, wave_marker_1, wave_marker_1_s, "FB01", "--", "--", "--"],
            ["大亚湾杨梅坑", 114.579, 22.558, wave_marker_2, wave_marker_2_s, "FB02", "--", "--", "--"],
            ["大亚湾东涌", 114.574 - temp_factor_3, 22.474 - temp_factor_3, wave_marker_3, wave_marker_3_s, "FB03", "--", "--", "--"],
            ["大鹏湾下沙", 114.454, 22.564 - temp_factor_3, wave_marker_4, wave_marker_4_s, "FB04", "--", "--", "--"],
            ["大鹏湾大梅沙", 114.312, 22.593 - temp_factor_3, wave_marker_5, wave_marker_5_s, "FB05", "--", "--", "--"],
            ["深圳湾蛇口", 113.946 - temp_factor_3, 22.480 - temp_factor_3, wave_marker_6, wave_marker_6_s, "FB06", "--", "--", "--"]
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


        get_data_from_server(01);

        //解决IE加载慢问题
        function _add_buoy_to_map() {
            if(localStorage.CURRENT_BROWSER_TYPE == "Chrome")
                add_buoy_to_map();
            else
                $(document).ready(function () {
                    add_buoy_to_map();
                });
        }
        function add_buoy_to_map() {
            var size = new subframe.contentWindow.zmaps.Size(50, 50);
            var offset = new subframe.contentWindow.zmaps.Pixel(-48, -28);
            //添加波浪浮标
            var signal_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/signal2.gif", size, offset);
            var wave_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/buoy_wave.png", size, offset);
            for(var i = 0; i < wave_buoy_position.length; i++){
                var offline_num = wave_buoy_position[i][6];
                var online_num = wave_buoy_position[i][7];
                var current_state = wave_buoy_position[i][8];
                if(offline_num == "--" && online_num == "--") offline_num = 1;//饼图全部为失联
                if(current_state != "--" && current_state != "0"){
                    //在线时，添加信号动画
                    wave_buoy_position[i][4] = new subframe.contentWindow.zmaps.Marker(
                        new subframe.contentWindow.zmaps.LonLat(wave_buoy_position[i][1], wave_buoy_position[i][2]),
                        signal_icon.clone());
                    add_tool_tip(wave_buoy_position[i][4], wave_buoy_position[i][0], wave_buoy_position[i][1],
                        wave_buoy_position[i][2], "波浪浮标", current_state, offline_num, online_num, wave_buoy_position[i][5]);
                }
                wave_buoy_position[i][3] = new subframe.contentWindow.zmaps.Marker(
                    new subframe.contentWindow.zmaps.LonLat(wave_buoy_position[i][1], wave_buoy_position[i][2]),
                    wave_icon.clone());
                add_tool_tip(wave_buoy_position[i][3], wave_buoy_position[i][0], wave_buoy_position[i][1],
                    wave_buoy_position[i][2], "波浪浮标",current_state, offline_num, online_num, wave_buoy_position[i][5]);
            }
            //添加环境浮标
            var env_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/buoy_env.png", size, offset);
            for(var i = 0; i < env_buoy_position.length; i++){
                var offline_num =  env_buoy_position[i][6];
                var online_num =  env_buoy_position[i][7];
                var current_state = env_buoy_position[i][8];
                if(offline_num == "--" && online_num == "--") offline_num = 1;//饼图全部为失联
                if(current_state != "--" && current_state != "0"){
                    //在线时，添加信号动画
                    env_buoy_position[i][4] = new subframe.contentWindow.zmaps.Marker(
                        new subframe.contentWindow.zmaps.LonLat(env_buoy_position[i][1], env_buoy_position[i][2]),
                        signal_icon.clone());
                    add_tool_tip(env_buoy_position[i][4], env_buoy_position[i][0], env_buoy_position[i][1],
                        env_buoy_position[i][2], "环境浮标", current_state, offline_num, online_num, env_buoy_position[i][5]);
                }
                env_buoy_position[i][3] = new subframe.contentWindow.zmaps.Marker(
                    new subframe.contentWindow.zmaps.LonLat(env_buoy_position[i][1], env_buoy_position[i][2]),
                    env_icon.clone());
                add_tool_tip(env_buoy_position[i][3], env_buoy_position[i][0], env_buoy_position[i][1],
                    env_buoy_position[i][2], "环境浮标", current_state, offline_num, online_num, env_buoy_position[i][5]);
            }
        }
        //后台数据获取
        function get_data_from_server(flag) {
            //浮标状态查询
            var time_start = loop_time[29] + ":00";
            var time_end = loop_time[0];
            var flag_1 = false;
            var flag_2 = false;
            //查询30天状态
            param = [
                {"name":"buoy_name", "value":""},
                {"name":"ocean_param", "value":""},
                {"name":"unit", "value":""},
                {"name":"time_start", "value":time_start},
                {"name":"time_end", "value":time_end},
                {"name":"flag", "value":"01"}
            ];
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: rdk_url.rdkUrl('equipment_manage.js',"homePage"),
                data: rdk_url.rdkData(param),
                async: true,
                success: function(data ){
                    var res = eval("("+ data.result + ")");
                    if(res.length == 0){
                        return;
                    }
                    flag_1 = true;
                    for(var i = 0; i < res.length; i++){
                        for(var j = 0; j < env_buoy_position.length; j++){
                            if(res[i][0] == env_buoy_position[j][5]
                                && (res[i][1] != "null" || res[i][2] != "null")){
                                env_buoy_position[j][6] = res[i][1];//NULL数量
                                env_buoy_position[j][7] = res[i][2];//非NULL数量
                                break;
                            }
                        }
                        if(j != env_buoy_position.length) continue;
                        for(var j = 0; j < wave_buoy_position.length; j++){
                            if(res[i][0] == wave_buoy_position[j][5]
                                && (res[i][1] != "null" || res[i][2] != "null")){
                                wave_buoy_position[j][6] = res[i][1];//NULL数量
                                wave_buoy_position[j][7] = res[i][2];//非NULL数量
                                break;
                            }
                        }
                    }
                    if(flag_1 && flag_2)
                        _add_buoy_to_map();
                }
            });
            time_start = four_hour_before;
            //查询4小时状态
            param = [
                {"name":"buoy_name", "value":""},
                {"name":"ocean_param", "value":""},
                {"name":"unit", "value":""},
                {"name":"time_start", "value":time_start},
                {"name":"time_end", "value":time_end},
                {"name":"flag", "value":"01"}
            ];
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: rdk_url.rdkUrl('equipment_manage.js',"homePage"),
                data: rdk_url.rdkData(param),
                async: true,
                success: function(data ){
                    var res = eval("("+ data.result + ")");
                    if(res.length == 0){
                        return;
                    }
                    flag_2 = true;
                    for(var i = 0; i < res.length; i++){
                        for(var j = 0; j < env_buoy_position.length; j++){
                            if(res[i][0] == env_buoy_position[j][5]
                            && res[i][2] != "null"){
                                env_buoy_position[j][8] = res[i][2];//非NULL数量
                                break;
                            }
                        }
                        if(j != env_buoy_position.length) continue;
                        for(var j = 0; j < wave_buoy_position.length; j++){
                            if(res[i][0] == wave_buoy_position[j][5]
                            && res[i][2] != "null"){
                                wave_buoy_position[j][8] = res[i][2];//非NULL数量
                                break;
                            }
                        }
                    }
                    if(flag_1 && flag_2)
                        _add_buoy_to_map();
                }
            });
            //设备管理右侧最新上报时间查询
            var param = [
                {"name":"ocean_district", "value":""},
                {"name":"ocean_param", "value":""},
                {"name":"unit", "value":""},
                {"name":"time_start", "value":localStorage.CURRENT_TIME},
                {"name":"time_end", "value":""},
                {"name":"flag", "value":"02"}
            ];
            var finally_date = $(".finally_data");
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: rdk_url.rdkUrl('equipment_manage.js',"homePage"),
                data: rdk_url.rdkData(param),
                async: true,
                success: function(data ){
                    var res = eval("("+ data.result + ")");
                    if(res.length == 0){
                        return;
                    }
                    for(var i = 0; i < finally_date.length; i++){
                        $(finally_date[i]).text(res[0][i].substring(0,16));
                        if(res[0][i] == "null"){
                            $(finally_date[i]).text("----------- --:--");
                        }
                    }
                }
            });
        }

        function creat_tool_tip(position, name, lon, lat, type,  current_state, offline_num, online_num, buoy_name) {
            if(localStorage.infoWindow_clicked == "true") return;
            var buoy_state = "在线";
            if( current_state == "--" || current_state == "0")
                buoy_state = "失联";
            if (infoWindow) {
                infoWindow.close();
            }
            infoWindow = new subframe.contentWindow.zmaps.InfoWindow({
                position : position,
                content: '<div class="gis_suspension" onselectstart="return false" style="width: 240px;position: relative;font-family: \'微软雅黑\';">\
			<table style="width: 100%;font-size :14px;border-bottom: 1px solid #bfbfbf;background:rgba(144,137,109,1);color:#fff";padding:0 15px;">\
			<thead><tr><td colspan="2" style="text-align: center;font-weight:600; border-bottom:1px solid #fff; padding-bottom:5px;font-size :16px;">' + name + '</td></tr></thead>\
			<tbody><tr><td style="padding-top: 5px">&nbsp;类型</td><td style="text-align: right;padding-top:10px">' + type + '&nbsp;</td></tr>\
			<tr><td>&nbsp;经度</td><td style="text-align: right">' + (lon - temp_factor) + '&nbsp;</td></tr>\
			<tr><td>&nbsp;纬度</td><td style="text-align: right">' + (lat + temp_factor_2) +'&nbsp;</td></tr>\
			<tr><td>&nbsp;状态</td><td onclick="abnormal()" style="text-align: right;font-weight:700;font-family: \'宋体\';">' + buoy_state + '&nbsp;</td></tr></tbody></table>\
			<div style="font-size:12px;margin-top:10px;height:160px;display:block;" class="time_abnormal">\
			<span style="color:#90896D">' + three_date_pie + ' 至 ' + date_pie + '</span><div id="pie_content" style="height:160px;width:240px;"></div></div>\
		<link href="../../../ocean/css/equipment_manage/WEB_Gis.css" rel="stylesheet" />\
		<script>function abnormal(){}\
		</script>\
			</div>'
            });
            infoWindow.show();
            pie.creat_pie(buoy_name, offline_num, online_num);
        }

        function add_tool_tip(marker, name, lon, lat, type,  current_state, offline_num, online_num, buoy_name) {		//新建提示框
            marker.events.register('click', marker, function (evt) {
                localStorage.infoWindow_clicked = false;
                subframe.contentWindow.Location.ZoomtoLonLat(lon, lat,22000);//centerId,xOffset,yOffset,gridSize
                creat_tool_tip(this.position, name, lon, lat, type,  current_state, offline_num, online_num, buoy_name);
            });
            subframe.contentWindow.zmaps.MarkerLayer.addMarker(marker);
        }

        $("div.title > div").on("click", function () {
            var id = $(this).attr("id");
            localStorage.infoWindow_clicked = false;
            //侧边设置
            $(this).addClass("abnormal_list_sz").siblings().removeClass("abnormal_list_sz");
            $(this).next().addClass("abnormal_list_bg").siblings().removeClass("abnormal_list_bg");
            $(this).parent().siblings().children(".abnormal_list").removeClass("abnormal_list_sz");
            $(this).parent().siblings().children(".abnormal_list_lucency").removeClass("abnormal_list_bg");
            var name = $(this).children(".equipment").children(".equipment_name").text();
            var current_click_buoy;
            var buoy_type;
            //在环境浮标中找
            for(var j = 0; j < env_buoy_position.length; j++){
                if(name == env_buoy_position[j][5]){
                    current_click_buoy = env_buoy_position[j];
                    buoy_type = "环境浮标";
                    break;
                }
            }
            //在波浪浮标中找
            if(j >= env_buoy_position.length){
                for(var j = 0; j < wave_buoy_position.length; j++){
                    if(name == wave_buoy_position[j][5]){
                        current_click_buoy = wave_buoy_position[j];
                        buoy_type = "波浪浮标";
                        break;
                    }
                }
            }
            //根据点击调整地图中心点为点击浮标
            subframe.contentWindow.Location.ZoomtoLonLat(current_click_buoy[1], current_click_buoy[2],22000);
            creat_tool_tip(current_click_buoy[3].position, current_click_buoy[0], current_click_buoy[1], current_click_buoy[2],
                buoy_type,  current_click_buoy[8], current_click_buoy[6], current_click_buoy[7], current_click_buoy[5]);

        });
    });
