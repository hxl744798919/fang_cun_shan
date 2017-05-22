define(
    ["jquery", "rdk_url","typhoon_warning_data"],
    function ($, rdk_url, typhoon_warning_data) {

        var typhoon_paths = {
            主线:[],
            中国:[],
            中国香港:[],
            美国:[],
            日本:[],
            中国台湾:[]
        };
        var points_data = [];
        var path_lines = {
            主线:[],
            中国:[],
            中国香港:[],
            美国:[],
            日本:[],
            中国台湾:[]
        };
        var path_nonclusters = [];
        var line_index = 0;

        var typhoon_level = ["热带低压", "热带风暴", "强热带风暴", "台风", "强台风", "超强台风", "-"];
        var typhoon_color = ["#F4F20A", "#F4D300", "#ECBF21", "#FC8C01", "#FB6020", "#FF001B", "#F4F20A"];//对应台风等级 ["热带低压", "热带风暴", "强热带风暴", "台风", "强台风", "超强台风"]
        var line_48_hour = [[132, 34], [132, 15], [120, 0], [105, 0]];
        var line_24_hour = [[127, 34], [127, 22], [119, 18], [119, 11], [113, 4.5], [105, 0]];

        //根据台风等级，插入不通线条及对应颜色
        var insert_sub_path = function(sub_points, sub_color, forecast_name, sub_width, line_style){
            if(sub_width == undefined)  sub_width = 2.5;
            typhoon_paths[forecast_name].push({
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "name": "台风编号",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": sub_points
                        }
                    }
                ]
            });
            path_lines[forecast_name].push(
                {
                    strokeWidth: sub_width,
                    strokeColor: sub_color,
                    strokeOpacity: 0.9,
                    strokeDashstyle: line_style
                }
            )

        };

        var generate_typhoon_path = function () {
            points_data = [];
            typhoon_paths = {
                主线:[],
                中国:[],
                中国香港:[],
                美国:[],
                日本:[],
                中国台湾:[]
            };
            path_lines = {
                主线:[],
                中国:[],
                中国香港:[],
                美国:[],
                日本:[],
                中国台湾:[]
            };
            path_nonclusters = [];
            line_index;

            var temp_level = '';//保存临时风力
            var temp_points = [];//保存临时点
            for(var i = 0; i < typhoon_warning_data.typhoon_data.lat.length; i++){
                if(typhoon_warning_data.typhoon_data.lat[i] != "-" &&
                    typhoon_warning_data.typhoon_data.lon[i] != "-"){
                    //检测当前点台风级别是否发生变化，若发生变化则压入该段，并填入颜色(或者为最后一个数据点时)
                    if(temp_level != typhoon_warning_data.typhoon_data.level[i].split("(")[0] ||
                        i == typhoon_warning_data.typhoon_data.lat.length - 1){
                        if(temp_points.length != 0){
                            for(var j = 0; j < typhoon_level.length; j++){
                                if(temp_level == typhoon_level[j]){
                                    //压入下一个点，保证线段连续
                                    temp_points.push([typhoon_warning_data.typhoon_data.lon[i], typhoon_warning_data.typhoon_data.lat[i]]);
                                    insert_sub_path(temp_points, typhoon_color[j],"主线");
                                }
                            }
                        }
                        temp_points = [];
                    }
                    //压入该点
                    temp_points.push([typhoon_warning_data.typhoon_data.lon[i], typhoon_warning_data.typhoon_data.lat[i]]);
                    //获取该点level
                    temp_level = typhoon_warning_data.typhoon_data.level[i].split("(")[0];

                    points_data.push({
                        x : typhoon_warning_data.typhoon_data.lon[i], //经度
                        y : typhoon_warning_data.typhoon_data.lat[i], //纬度
                        timestamp : i, //时间戳
                        id : i //id唯一标识
                    });
                }
            }
            //24小时警戒线
            typhoon_paths["主线"].push({
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "name": "台风编号",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": line_24_hour
                        }
                    }
                ]
            });
            path_lines["主线"].push(
                {
                    strokeWidth: 1.5,
                    strokeColor: "yellow",
                    strokeOpacity: 0.9
                }
            );
            //48小时警戒线
            typhoon_paths["主线"].push({
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "name": "台风编号",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": line_48_hour
                        }
                    }
                ]
            });
            path_lines["主线"].push(
                {
                    strokeWidth: 1.5,
                    strokeColor: "yellow",
                    strokeOpacity: 0.9
                }
            );

            if(typhoon_paths["主线"].length != 0)
                draw_lines(line_index,"主线");
        };
        //创建台风路径
        function draw_lines(line_index,forecast_name) {
            //if(typhoon_tracks_colors.length == 0 || typhoon_tracks_points.length == 0) return;

            subframe.contentWindow.UserTrack.load({
                enableCluster: false,
                data: points_data,
                customTracklineData: typhoon_paths[forecast_name],
                infoWindow: {
                    formatter: function (e) {
                        return '<div> </div>';
                    }
                },
                styleRule: {
                    point: {
                        clustered: {
                            pointRadius: 0.5,
                            fillColor: 'red',
                            fillOpacity: .5,
                            strokeColor: 'blue',
                            strokeOpacity: 0.5,
                            strokeWidth: 1
                        },
                        nonclustered: {
                            pointRadius: 3.5,
                            fillColor: 'red',
                            fillOpacity: 0,
                            strokeColor: 'blue',
                            strokeOpacity: 0,
                            strokeWidth: 10
                        }
                    },
                    line: path_lines[forecast_name],
                    arrow: {
                        radius: 5,
                        fillColor: '#fff',
                        fillOpacity: 0,
                        repeat: 20
                    }
                }
            }, line_index);
        }
        //添加距深圳范围
        function draw_circles(){
            var circles =[];
            circles.push({
                lon:114.0595442861,
                lat:22.548388201,
                radius : 98500,
                color : "#7B9AFF",
                width : 1
            });
            circles.push({
                lon:114.0595442861,
                lat:22.548388201,
                radius : 295500,
                color : "#7B9AFF",
                width : 1
            });
            circles.push({
                lon:114.0595442861,
                lat:22.548388201,
                radius : 492500,
                color : "#7B9AFF",
                width : 1
            });
            circles.push({
                lon:114.0595442861,
                lat:22.548388201,
                radius : 781699,
                color : "#7B9AFF",
                width : 1
            });
            subframe.contentWindow.HighWayCircle.addHighWayCircle(circles);
        }
        //添加默认圆圈及警戒线
        var add_default_lines = function () {
            line_index = 0;
            //24小时警戒线
            typhoon_paths["主线"].push({
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "name": "台风编号",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": line_24_hour
                        }
                    }
                ]
            });
            path_lines["主线"].push(
                {
                    strokeWidth: 1.5,
                    strokeColor: "yellow",
                    strokeOpacity: 0.9
                }
            );
            //48小时警戒线
            typhoon_paths["主线"].push({
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "name": "台风编号",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": line_48_hour
                        }
                    }
                ]
            });
            path_lines["主线"].push(
                {
                    strokeWidth: 1.5,
                    strokeColor: "yellow",
                    strokeOpacity: 0.9
                }
            );

            draw_lines(line_index,"主线");
            draw_circles();
        };

        //延时启动
        if(localStorage.CURRENT_BROWSER_TYPE == "Chrome")
            setTimeout(add_default_lines,1500);
        else
            setTimeout(add_default_lines,3000);
        //清空数组
        var clone_Arry_fun  = function(){
            typhoon_paths = [];
            path_lines =[] ;
        }
        //返回typhoon_paths
        var Run_paths_fun = function () {
            return typhoon_paths;
        }
        var Run_lines_fun = function () {
            return path_lines;
        }
        //接口函数
        return{
            generate_typhoon_path: generate_typhoon_path,
            insert_sub_path: insert_sub_path,
            draw_lines: draw_lines,
            typhoon_paths: typhoon_paths,
            path_lines: path_lines,
            clone_Arry_fun: clone_Arry_fun,
            Run_paths_fun: Run_paths_fun,
            Run_lines_fun: Run_lines_fun


        }
    });
