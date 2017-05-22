define(
    ["jquery", "rdk_url" ,"typhoon_warning_data","web_gis_path", "web_gis"],
    function ($,rdk_url, typhoon_warning_data , web_gis_path, web_gis) {
        var marker_vector = [];
        var forecast_marker_vector = {
            中国:[],
            中国香港:[],
            美国:[],
            日本:[],
            中国台湾:[],
        };
        /*警戒线*/
        var warning_line = [
            ["24h警戒线", 127, 30, "warning_line"],
            ["48h警戒线", 132, 30, "warning_line"],
            ["100Km", 113.751, 21.7, "distance_shenzhen"],
            ["300Km", 113.751, 19.842, "distance_shenzhen"],
            ["500Km", 113.751, 17.964, "distance_shenzhen"],
            ["800Km", 113.751, 15.118, "distance_shenzhen"]
        ];
    //创建历史小圆圈
        var add_points_to_map = function (ty_name, ty_num, ty_en_name) {
            if (infoWindow) {
                infoWindow.close();
            }
            clear_points();
            var temp_marker;
            var temp_marker2;
            var temp_lat;
            var temp_lon;
            var marker_icon;
            marker_vector = [];

            var size = new subframe.contentWindow.zmaps.Size(18, 18);
            var offset = new subframe.contentWindow.zmaps.Pixel(-9, -9);

            /*台风名称*/
            var icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/mini_bouy.png", size, offset);
            temp_marker2 = new subframe.contentWindow.zmaps.Marker(
                new subframe.contentWindow.zmaps.LonLat(typhoon_warning_data.typhoon_data.lon[0], typhoon_warning_data.typhoon_data.lat[0]),
                icon.clone());
            marker_vector.push(temp_marker2);
            add_ty_name(temp_marker2, ty_name);
            subframe.contentWindow.zmaps.MarkerLayer.addMarker(temp_marker2);

            for(var i = 0; i < typhoon_warning_data.typhoon_data.lat.length; i++) {
                temp_lat = typhoon_warning_data.typhoon_data.lat[i];
                temp_lon = typhoon_warning_data.typhoon_data.lon[i];

                switch (typhoon_warning_data.typhoon_data.level[i].split("(")[0]) {
                    case "热带低压":
                        marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_dy.png", size, offset);
                        break;
                    case "热带风暴":
                        marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_fb.png", size, offset);
                        break;
                    case "强热带风暴":
                        marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_qfb.png", size, offset);
                        break;
                    case "台风":
                        marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_tf.png", size, offset);
                        break;
                    case "强台风":
                        marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_qtf.png", size, offset);
                        break;
                    case "超强台风":
                        marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_cqtf.png", size, offset);
                        break;
                    case "-":
                        marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_wu.png", size, offset);
                        break;
                }
                //实时台风时，最后一个点添加动图
                if (i == typhoon_warning_data.typhoon_data.lat.length - 1 && web_gis.get_realTime_typhone()) {
                    add_typhoon_gif(temp_lon, temp_lat);
					$(".tip_history>ul li:nth-child(1)>span").html(typhoon_warning_data.typhoon_data.RT_max_time);
                     $(".tip_history>ul li:nth-child(4)>span").html(typhoon_warning_data.typhoon_data.lat[i]);
                     $(".tip_history>ul li:nth-child(5)>span").html(typhoon_warning_data.typhoon_data.lon[i]);
                     $(".tip_history>ul li:nth-child(6)>span").html(typhoon_warning_data.typhoon_data.qiya[i]);
                     $(".tip_history>ul li:nth-child(7)>span").html(typhoon_warning_data.typhoon_data.fengsu[i]);
                     $(".tip_history>ul li:nth-child(8)>span").html(typhoon_warning_data.typhoon_data.level[i]);

                     $(".tip_history>ul li:nth-child(9)>span").html((typhoon_warning_data.typhoon_data.distance[i]/1000).toFixed(2));
                }
                if (temp_lon != "-" && temp_lat != "-") {
                    temp_marker = new subframe.contentWindow.zmaps.Marker(
                        new subframe.contentWindow.zmaps.LonLat(temp_lon, temp_lat),
                        marker_icon.clone());
                    marker_vector.push(temp_marker);

                    add_tool_tip_click(temp_marker, temp_lon, temp_lat, ty_name, ty_num, i, ty_en_name);
                    subframe.contentWindow.zmaps.MarkerLayer.addMarker(temp_marker);
                }
            }
        };
        //创建预测台风小圆圈
        var add_forecast_to_map = function (ty_name, ty_num ,forecast_name) {
            if (infoWindow) {
                infoWindow.close();
            }
            var temp_marker;
            // var temp_marker2;
            var temp_lat;
            var temp_lon;
            var marker_icon;


            var size = new subframe.contentWindow.zmaps.Size(18, 18);
            var offset = new subframe.contentWindow.zmaps.Pixel(-9, -9);


            var Temp_level = typhoon_warning_data.typhoon_forecast_data;
                for (var i = 0; i < Temp_level[forecast_name].lat.length; i++) {
                    temp_lat = Temp_level[forecast_name].lat[i];
                    temp_lon = Temp_level[forecast_name].lon[i];

                    switch (Temp_level[forecast_name].powerMax[i].split("(")[0]) {
                        case "热带低压":
                            marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_dy.png", size, offset);
                            break;
                        case "热带风暴":
                            marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_fb.png", size, offset);
                            break;
                        case "强热带风暴":
                            marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_qfb.png", size, offset);
                            break;
                        case "台风":
                            marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_tf.png", size, offset);
                            break;
                        case "强台风":
                            marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_qtf.png", size, offset);
                            break;
                        case "超强台风":
                            marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_cqtf.png", size, offset);
                            break;
                        case "-":
                            marker_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/tf_wu.png", size, offset);
                            break;
                    }

                    if (temp_lon != "-" && temp_lat != "-") {
                        temp_marker = new subframe.contentWindow.zmaps.Marker(
                            new subframe.contentWindow.zmaps.LonLat(temp_lon, temp_lat),
                            marker_icon.clone());
                        forecast_marker_vector[forecast_name].push(temp_marker);

                         forecast_add_tool_tip_click(temp_marker, temp_lon, temp_lat, ty_name, ty_num, i,forecast_name);
                        subframe.contentWindow.zmaps.MarkerLayer.addMarker(temp_marker);
                    }
            }
        };
        //创建默认信息框
        var infowindow_count = [];
        var main_info_window;
        var infoWindow_ty_name;
        var typhoon_forecast_variate={
            click_index :0,
            pathsLeng:"",
            linesLeng:""
        };

        //创建浮标弹出框
        function creat_tool_tip(position, ty_name, ty_num, index, ty_en_name) {
            if (infoWindow) {
                infoWindow.close();
            }
            var ty_data = typhoon_warning_data.typhoon_data;
            infoWindow = new subframe.contentWindow.zmaps.InfoWindow({
                position : position,
                content: '<link rel="stylesheet" href="../../../ocean/css/typhoon_warning/gis_typhoon_path_points_tip.css">\
                <div id="ty_way_tip" style="height:107px; z-index: 999999">\
                <span class="close_off" onclick=close_tip()></span>\
                <div id="triangle"></div>\
                <p>'+ ty_num + ty_name +'（'+ ty_en_name +'）</p>\
                <ul style="list-style: none">\
                <li>时<lable></lable>间：<span>'+ ty_data.time[index] +'</span></li>\
                <li>中心位置：<span>'+ ty_data.lat[index]+'°E '+ty_data.lon[index]+'°N</span></li>\
                <li>风<lable></lable>速：<span>'+ ty_data.fengsu[index] +'m/s</span></li>\
                <li>中心气压：<span>'+ ty_data.qiya[index] +'hPa</span></li>\
                </ul>\
                </div>\
                <script >\
                function close_tip(){$("#ty_way_tip").css("display", "none")}\
                </script>'
            });

            main_info_window = infoWindow;
            infoWindow.show();
        }
        //创建台风预测路径弹出框
        function forecast_creat_tool_tip(position, ty_name, ty_num, index , kew) {
            if (infoWindow) {
                infoWindow.close();
            }
            var ty_data = typhoon_warning_data.typhoon_forecast_data;
            infoWindow = new subframe.contentWindow.zmaps.InfoWindow({
                position : position,
                content: '<link rel="stylesheet" href="../../../ocean/css/typhoon_warning/gis_typhoon_path_points_tip.css">\
                <div id="ty_way_tip" style="height:125px; z-index: 999999">\
                <span class="close_off" onclick=close_tip()></span>\
                <div id="triangle" style="top: 52px"></div>\
                <p>'+ ty_num + ty_name +'</p>\
                <ul style="list-style: none">\
                <li>预测机构：<span>'+ kew+'</span></li>\
                <li>预报时间：<span>'+ ty_data[kew].time[index] +'</span></li>\
                <li>中心位置：<span>'+ ty_data[kew].lat[index]+'°E '+ty_data[kew].lon[index]+'°N</span></li>\
                <li>风<lable></lable>速：<span>'+ ty_data[kew].speedMax[index] +'m/s</span></li>\
                <li>中心气压：<span>'+ ty_data[kew].atmosphericpressure[index] +'hPa</span></li>\
                </ul>\
                </div>\
                <script >\
                function close_tip(){$("#ty_way_tip").css("display", "none")}\
                </script>'
            });

            main_info_window = infoWindow;
            infoWindow.show();
        }
        //绑定浮标点击事件
        var infoWindow_index = 0;
        var Typhoon_color ={"中国":"#72B92B","日本":"#F4C33A","美国":"#241E72","中国台湾":"#E8505D","中国香港":"#CE94E1"}
        //历史台风注册事件
        function add_tool_tip_click(marker, lon, lat, ty_name, ty_num, index, ty_en_name) {		//新建提示框
            var ty_data = typhoon_warning_data.typhoon_data;
            marker.events.register('mouseover', marker, function (evt) {
                    creat_tool_tip(this.position, ty_name, ty_num, index, ty_en_name);
            });
            marker.events.register('click', marker, function (evt) {
                //add_typhoon_gif(lon, lat);
                forecast_clear_points();
                forecast_marker_vector = {
                    中国:[],
                    中国香港:[],
                    美国:[],
                    日本:[],
                    中国台湾:[]
                };
                typhoon_warning_data.typhoon_forecast_fun(ty_name,ty_data.time[index]);
                    line_index = 0;
                var forecast_typhoon_paths =  web_gis_path.Run_paths_fun();
                var forecast_path_lines =  web_gis_path.Run_lines_fun();
                if(typhoon_forecast_variate.click_index == 0){
                    typhoon_forecast_variate.pathsLeng = forecast_typhoon_paths["主线"].length
                    typhoon_forecast_variate.linesLeng = forecast_path_lines["主线"].length;
                    typhoon_forecast_variate.click_index ++;
                }
                    forecast_typhoon_paths["主线"].splice(typhoon_forecast_variate.pathsLeng);
                    forecast_path_lines["主线"].splice(typhoon_forecast_variate.linesLeng);
                for(var kew in forecast_typhoon_paths){
                    if(kew !== "主线"){
                        forecast_typhoon_paths[kew].length = 0
                    }
                }
                for(var kew in forecast_path_lines){
                    if(kew !== "主线"){
                        forecast_path_lines[kew].length = 0
                    }
                }
                var Temp_level = typhoon_warning_data.typhoon_forecast_data;
                var Temp_points = [];
                var forcast_point = [];
                for(var key in typhoon_warning_data.typhoon_historyAll.typhoon_historyTime){
                    //路径点时间等于预测点时间
                    if(typhoon_warning_data.typhoon_historyAll.typhoon_historyTime[key][0] == Temp_level.foreCastTime ){
                        forcast_point = [typhoon_warning_data.typhoon_historyAll.typhoon_historyTime[key][1],
                            typhoon_warning_data.typhoon_historyAll.typhoon_historyTime[key][2]];
                        break;
                    }
                    //路径点时间大于预测点时间
                    if(typhoon_warning_data.typhoon_historyAll.typhoon_historyTime[key][0] > Temp_level.foreCastTime ){
                        forcast_point = [typhoon_warning_data.typhoon_historyAll.typhoon_historyTime[key - 1][1],
                            typhoon_warning_data.typhoon_historyAll.typhoon_historyTime[key - 1][2]];
                        break;
                    }
                }
                for(var kew in Temp_level){
                    if( kew == "foreCastTime"){
                        continue;
                    }
                    if(Temp_level[kew]["lat"].length == 0){
                        continue;
                    }
                    Temp_points = [forcast_point];
                    for(var i= 0;i<Temp_level[kew].lat.length;i++){
                        Temp_points.push([Temp_level[kew].lon[i],Temp_level[kew].lat[i]])
                    }
                    web_gis_path.insert_sub_path(Temp_points, Typhoon_color[kew],kew, 2, "dash");
                    web_gis_path.insert_sub_path(Temp_points, Typhoon_color[kew],"主线", 2, "dash");
                    add_forecast_to_map(ty_name,ty_num,kew);
                }
                //    判断哪个预报机构选中了

                var input_check = $(".prc_show li>input");
                for(var i = 0 ; i<input_check.length ; i++){

                    if(!$(input_check[i]).is(':checked')){
                        line_clear_points($(input_check[i]).val())
                        single_clear_points($(input_check[i]).val())
                    }
                }
                web_gis_path.draw_lines(line_index,"主线");


            });
            marker.events.register('mouseout', marker, function (evt) {
                if (infoWindow) {
                    infoWindow.close();
                }
            });
        }
        //预测台风注册事件
        function forecast_add_tool_tip_click(marker, lon, lat, ty_name, ty_num, index, ty_en_name) {		//新建提示框
            var ty_data = typhoon_warning_data.typhoon_data;
            marker.events.register('mouseover', marker, function (evt) {
                forecast_creat_tool_tip(this.position, ty_name, ty_num, index, ty_en_name);
            });
            marker.events.register('mouseout', marker, function (evt) {
                if (infoWindow) {
                    infoWindow.close();
                }
            });
        }
        /*添加台风名字*/
        function add_ty_name(marker, name){
            creat_ty_name_tip(marker.position, name);
        }
        function creat_ty_name_tip(position, name) {
            infoWindow_ty_name = new subframe.contentWindow.zmaps.InfoWindow({
                position : position,
                content: '<span style="z-index: 9">'+ name +'</span>'
            });
            infoWindow_ty_name.show();
        }

        /*警戒线提示*/
        //延时启动
        if(localStorage.CURRENT_BROWSER_TYPE == "Chrome")
            setTimeout(add_warning_lines,1500);
        else
            setTimeout(add_warning_lines,3000);
        function add_warning_lines(){
            var temp_marker0, temp_marker1, temp_marker2, temp_marker3, temp_marker4, temp_marker5;
            var temp_marker = [temp_marker0, temp_marker1, temp_marker2, temp_marker3, temp_marker4, temp_marker5];
            var size = new subframe.contentWindow.zmaps.Size(30, 30);
            var offset = new subframe.contentWindow.zmaps.Pixel(-15, -15);
            var icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/mini_bouy.png", size, offset);

            for(var i = 0; i < warning_line.length; i++){
                temp_marker[i] = new subframe.contentWindow.zmaps.Marker(
                    new subframe.contentWindow.zmaps.LonLat(warning_line[i][1], warning_line[i][2]),
                    icon.clone());
                marker_vector.push(temp_marker[i]);
                add_warning_tip(temp_marker[i], warning_line[i][0], warning_line[i][3]);
                subframe.contentWindow.zmaps.MarkerLayer.addMarker(temp_marker[i]);
            }
        }
        function creat_warning_tip(position, type, line_type) {
            var infoWindow2;
            var warning_hour;
            var waning_class;
            if(line_type == "warning_line"){
                if(type == "24h警戒线"){
                    warning_hour = 24;
                    waning_class = 'waning_class24';
                }
                if(type == "48h警戒线"){
                    warning_hour = 48;
                    waning_class = 'waning_class48';
                }
                infoWindow2 = new subframe.contentWindow.zmaps.InfoWindow({
                    position : position,
                    content: '<link rel="stylesheet" href="../../../ocean/css/typhoon_warning/gis_warning_tip.css">\
                            <table class='+ waning_class +'>\
                                <tr><td>'+ warning_hour +'</td></tr>\
                                <tr><td>小</td></tr>\
                                <tr><td>时</td></tr>\
                                <tr><td>警</td></tr>\
                                <tr><td>戒</td></tr>\
                                <tr><td>线</td></tr>\
                            </table>'
                });
            }
            if(line_type == "distance_shenzhen"){
                infoWindow2 = new subframe.contentWindow.zmaps.InfoWindow({
                    position : position,
                    content: '<span style="color: #ddd;">'+ type +'</span>'
                });
            }
            infoWindow2.show();
        }
        function add_warning_tip(marker, type, line_type) {		//新建提示框
            creat_warning_tip(marker.position, type, line_type);
        }
        //清除页面所有信息框
        function clear_points() {
            for(var i = 0; i < infowindow_count.length; i++){
                infowindow_count[i].close();
            }
            infowindow_count = [];
            if(main_info_window)
                main_info_window.close();
            if(infoWindow_ty_name)
                infoWindow_ty_name.close();
            for(var i = 0; i < marker_vector.length; i++){
                subframe.contentWindow.zmaps.MarkerLayer.removeMarker(marker_vector[i]);
            }
            delete_typhoon_gif();
        }
        //清楚预测台风路径小圆圈
        function forecast_clear_points() {
            for(var iew in forecast_marker_vector){
                for(var i = 0; i < forecast_marker_vector[iew].length; i++){
                    subframe.contentWindow.zmaps.MarkerLayer.removeMarker(forecast_marker_vector[iew][i]);
                }
            }
        }
        //清除单个台风路径 小圆圈
        function single_clear_points(forecast_name){
            for(var i = 0; i < forecast_marker_vector[forecast_name].length; i++){
                subframe.contentWindow.zmaps.MarkerLayer.removeMarker(forecast_marker_vector[forecast_name][i]);
            }
        }
        //清除单个台风路径 线条
        function line_clear_points(forecast_name) {
            var forecast_typhoon_paths =  web_gis_path.Run_paths_fun();
            var forecast_path_lines =  web_gis_path.Run_lines_fun();
            var predicted_paths_name ;
            var predicted_lines_name ;
            if(forecast_typhoon_paths[forecast_name].length == 0 || forecast_path_lines[forecast_name].length == 0){
                return
            }
                predicted_paths_name =  forecast_typhoon_paths[forecast_name][0]["features"][0]["geometry"]["coordinates"];
                predicted_lines_name =  forecast_path_lines[forecast_name][0]["strokeColor"];


                for(var i= 0;i<forecast_typhoon_paths["主线"].length ; i++){
                    if(forecast_typhoon_paths["主线"][i]["features"][0]["geometry"]["coordinates"].toString() == predicted_paths_name.toString()){
                        forecast_typhoon_paths["主线"].splice(i,1);
                    }
                }

            for(var i= 0;i<forecast_path_lines["主线"].length ; i++){
                if(forecast_path_lines["主线"][i]["strokeColor"] == predicted_lines_name){
                    forecast_path_lines["主线"].splice(i,1);
                }
            }

            web_gis_path.draw_lines(line_index,"主线");
        }
        //添加单个台风路径 线条
        function line_app_ponints (forecast_name){
            var forecast_typhoon_paths =  web_gis_path.Run_paths_fun();
            var forecast_path_lines =  web_gis_path.Run_lines_fun();
            var predicted_paths_name =  forecast_typhoon_paths[forecast_name];
            var predicted_lines_name =  forecast_path_lines[forecast_name];
            if(predicted_paths_name.length == 0 ||　predicted_lines_name.length == 0){
                return
            }
                forecast_typhoon_paths["主线"].push(predicted_paths_name[0]);
                forecast_path_lines["主线"].push(predicted_lines_name[0])
            web_gis_path.draw_lines(line_index,"主线");
        }

        //添加当前台风动图
        var typhoon_marker = "";
        function add_typhoon_gif(lon, lat) {
            if(typhoon_marker != "")
                delete_typhoon_gif();

            var size = new subframe.contentWindow.zmaps.Size(30, 30);
            var offset = new subframe.contentWindow.zmaps.Pixel(-15, -15);
            var icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/typhoon/typhoon.gif", size, offset);

            typhoon_marker = new subframe.contentWindow.zmaps.Marker(
                new subframe.contentWindow.zmaps.LonLat(lon, lat),
                icon.clone());

            //add_tool_tip_click(typhoon_marker, "123", lon, lat, "环境浮标", ty_name, ty_num, i);
            subframe.contentWindow.zmaps.MarkerLayer.addMarker(typhoon_marker);
        }
        //删除当前台风动图
        function delete_typhoon_gif() {
            if(typhoon_marker != "")
                subframe.contentWindow.zmaps.MarkerLayer.removeMarker(typhoon_marker);
            typhoon_marker = "";
        }
        //接口函数
        return{
            add_points_to_map: add_points_to_map,
            typhoon_forecast_variate: typhoon_forecast_variate,
            forecast_clear_points:forecast_clear_points,
            single_clear_points:single_clear_points,
            line_clear_points:line_clear_points,
            line_app_ponints:line_app_ponints,
            add_forecast_to_map:add_forecast_to_map

        }
    });
