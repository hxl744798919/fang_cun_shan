define(["rdk_url", "jquery", "data_show_data", "common_date", "static"], function(rdk, $, data_show_data, common_date, static) {
    var typhoon_data = {
        time: [],//时间
        speed_wind_data: [],                  //风速数据
        atmosphericpressure_data: [],        //气压数据
        rainfall_data: [],                    //雨量数据
        significantwaveheight_data: [],      //有效波高数据

        lat: [],
        lon: [],
        distance: [],
        qiya: [],
        yisu: [],
        fengsu: [],
        fengli: [],
        level: [],
        fengxiang: [],
	RT_max_time:0, //给实时台风最近一次上报时间
        //实时数据
        realtime_data: []
    };
    //台风预测数据表
    var typhoon_forecast_data ={
        foreCastTime:"",
        中国:{
            number:[],//编号
            nameCh:[],//中文名称
            time:[],//预测时间
            lat:[],//经度
            lon:[],//纬度
            atmosphericpressure:[],//气压
            speedMax:[],//最大风速
            powerMax:[]//气压状态

        },
        中国香港:{
            number:[],//编号
            nameCh:[],//中文名称
            time:[],//预测时间
            lat:[],//经度
            lon:[],//纬度
            atmosphericpressure:[],//气压
            speedMax:[],//最大风速
            powerMax:[]//气压状态
        },
        美国:{
            number:[],//编号
            nameCh:[],//中文名称
            time:[],//预测时间
            lat:[],//经度
            lon:[],//纬度
            atmosphericpressure:[],//气压
            speedMax:[],//最大风速
            powerMax:[]//气压状态
        },
        日本:{
            number:[],//编号
            nameCh:[],//中文名称
            time:[],//预测时间
            lat:[],//经度
            lon:[],//纬度
            atmosphericpressure:[],//气压
            speedMax:[],//最大风速
            powerMax:[]//气压状态
        },
        中国台湾:{
            number:[],//编号
            nameCh:[],//中文名称
            time:[],//预测时间
            lat:[],//经度
            lon:[],//纬度
            atmosphericpressure:[],//气压
            speedMax:[],//最大风速
            powerMax:[]//气压状态
        }
    }
    var sz_lat_lon = [22.5428388201, 114.0595442861];


    //清空数组
    var clear_typhoon_data = function () {
        typhoon_data.time.splice(0, typhoon_data.time.length);
        typhoon_data.lat.splice(0, typhoon_data.lat.length);
        typhoon_data.lon.splice(0, typhoon_data.lon.length);
        typhoon_data.distance.splice(0, typhoon_data.distance.length);
        typhoon_data.qiya.splice(0, typhoon_data.qiya.length);
        typhoon_data.yisu.splice(0, typhoon_data.yisu.length);
        typhoon_data.fengsu.splice(0, typhoon_data.fengsu.length);
        typhoon_data.fengli.splice(0, typhoon_data.fengli.length);
        typhoon_data.level.splice(0, typhoon_data.level.length);
        typhoon_data.fengxiang.splice(0, typhoon_data.fengxiang.length);

        typhoon_data.speed_wind_data.splice(0, typhoon_data.speed_wind_data.length);
        typhoon_data.atmosphericpressure_data.splice(0, typhoon_data.atmosphericpressure_data.length);
        typhoon_data.rainfall_data.splice(0, typhoon_data.rainfall_data.length);
        typhoon_data.significantwaveheight_data.splice(0, typhoon_data.significantwaveheight_data.length);
    };
    //初始化数组
    var init_typhoon_data = function () {
        typhoon_data.time = [];//时间
        typhoon_data.speed_wind_data = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];                  //风速数据
        typhoon_data.atmosphericpressure_data = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];        //气压数据
        typhoon_data.rainfall_data = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];                    //雨量数据
        typhoon_data.significantwaveheight_data = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];    //有效波高数据
    };
    //填充表格数据
    var insert_table_data = function () {
        for(var i = 0; i < typhoon_data.time.length; i++){
            typhoon_data.lat[i] = "-";
            typhoon_data.lon[i] = "-";
            typhoon_data.distance[i] = "-";
            typhoon_data.qiya[i] = "-";
            typhoon_data.yisu[i] = "-";
            typhoon_data.fengsu[i] = "-";
            typhoon_data.fengli[i] = "-";
            typhoon_data.level[i] = "-";
            typhoon_data.fengxiang[i] = "-";

            for(var item in typhoon_historyAll.typhoon_historyTime){
                if(typhoon_historyAll.typhoon_historyTime[item][0] == typhoon_data.time[i]){
                    var temp = typhoon_historyAll.typhoon_historyTime;
                    typhoon_data.lat[i] = (temp[item][2] == "null" ? "-" : temp[item][2]);
                    typhoon_data.lon[i] = (temp[item][1] == "null" ? "-" : temp[item][1]);
                    if(typhoon_data.lat[i] == "-")
                        typhoon_data.distance[i] = "-";
                    else
                        typhoon_data.distance[i] = calc_distance_lat_lon(sz_lat_lon[0], sz_lat_lon[1], typhoon_data.lat[i], typhoon_data.lon[i]);
                    typhoon_data.qiya[i] = (temp[item][4] == "null" ? "-" : temp[item][4]);
                    typhoon_data.yisu[i] = (temp[item][5] == "null" ? "-" : temp[item][5]);
                    typhoon_data.fengsu[i] = (temp[item][3] == "null" ? "-" : temp[item][3]);
                    typhoon_data.fengli[i] = (temp[item][6] == "null" ? "-" : temp[item][6]);
                    typhoon_data.level[i] = (temp[item][7] == "null" ? "-" : temp[item][7]);
                    typhoon_data.fengxiang[i] = (temp[item][8] == "null" ? "-" : temp[item][8]);
                }
                if(typhoon_historyAll.typhoon_historyTime[item][0] > typhoon_data.time[i]) break;
            }
        }
    };
    //计算两个经纬度点之间的距离
    function calc_distance_lat_lon(lat1,lng1,lat2,lng2){
        var EARTH_RADIUS = 6378137.0; //单位M
        var PI = Math.PI;

        function getRad(d){
            return d*PI/180.0;
        }

        lat1 = Number(lat1);
        lng1 = Number(lng1);
        lat2 = Number(lat2);
        lng2 = Number(lng2);

        var f = getRad((lat1 + lat2)/2);
        var g = getRad((lat1 - lat2)/2);
        var l = getRad((lng1 - lng2)/2);

        var sg = Math.sin(g);
        var sl = Math.sin(l);
        var sf = Math.sin(f);

        var s,c,w,r,d,h1,h2;
        var a = EARTH_RADIUS;
        var fl = 1/298.257;

        sg = sg*sg;
        sl = sl*sl;
        sf = sf*sf;

        s = sg*(1-sl) + (1-sf)*sl;
        c = (1-sg)*(1-sl) + sf*sl;

        w = Math.atan(Math.sqrt(s/c));
        r = Math.sqrt(s*c)/w;
        d = 2*w*a;
        h1 = (3*r -1)/2/c;
        h2 = (3*r +1)/2/s;

        return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
    }
    //查询站点趋势图数据
    var typhoon_trend_fun = function (start_time, end_time) {
        var param = [
            {"name":"time_start", "value":start_time},
            {"name":"time_end", "value":end_time},
            {"name":"flag", "value":'04'}
        ];
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: rdk.rdkUrl('typhoonManage_data.js',"homePage"),
            data: rdk.rdkData(param),
            async: false,
            success: function(data){
                clear_typhoon_data();
                init_typhoon_data();
                //返回数据格式：[time, districtname, speed_wind, atmosphericpressure, rainfall, significantwaveheight]
                var res = eval("("+ data.result + ")");

                var temp_time = start_time;
                var count = 0;//防止死循环
                var start_date;
                //填充时间轴
                while (1){
                    start_date = new Date(temp_time.replace(/[-]/g,"/"));
                    start_date = start_date.getTime();

                    if(temp_time > end_time || count > 10000) break;
                    typhoon_data.time.push(temp_time);
                    count++;
                    //时间加半小时
                    temp_time = common_date.add_half_hour(start_date, 30)
                }
                //填充风速、气压、雨量、有效波高，各有13维，代表地点，13维里面的维度必须和时间维度对齐
                var index = 0;
                for(var k = 0; k < typhoon_data.time.length; k++){
                    for(; index < res.length; index++){
                        //时间相等，则填入查询数据
                        if(typhoon_data.time[k] == res[index][0]){
                            //寻找该数据对应地点索引
                            for(var j = 0; j < static.district_name.length; j++){
                                //赋值
                                if(static.district_name[j] == res[index][1]){
                                    typhoon_data.speed_wind_data[j][k] = (res[index][2] == 'null' ? '-' : res[index][2]);
                                    typhoon_data.atmosphericpressure_data[j][k] = (res[index][3] == 'null' ? '-' : res[index][3]);
                                    typhoon_data.rainfall_data[j][k] = (res[index][4] == 'null' ? '-' : res[index][4]);
                                    typhoon_data.significantwaveheight_data[j][k] = (res[index][5] == 'null' ? '-' : res[index][5]);
                                }
                            }
                        }
                        //时间轴时间小于查询时间，进入下个时间轴时间点
                        else if(typhoon_data.time[k] < res[index][0]){
                            break;
                        }
                        //时间轴时间大于查询时间，说明异常
                        else{
                            console.log("temp_time: ", typhoon_data.time[k], "res_time: ", res[index][1]);
                        }
                    }
                }

                //补全台风路径表格数据
                insert_table_data();
                //转换数组为字符串
                //typhoon_data = JSON.stringify(typhoon_data);
            }
        });
    };

    //查询登录陆地的某一个时刻的最大分数和波高
    var typhoon_historyMax_fun = function(year,month,day,hour ){
        var param = [
            {"name":"year", "value":year},
            {"name":"month", "value":month},
            {"name":"day", "value":day},
            {"name":"hour", "value":hour},
            {"name":"flag", "value":'05'}
        ];
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: rdk.rdkUrl('typhoonManage_data.js',"homePage"),
            data: rdk.rdkData(param),
            async: true,
            success: function(data){
                var res = eval("("+ data.result + ")");
                if(res.length == 0){
                    return;
                }
               var thMax_time = $(".tip_current>ul>li:nth-child(4)>span").text();//最大风速和波高登陆时间
                $(".tip_current>ul>li:nth-child(7)>span").text(res[0][7]+"米/秒 " +res[0][6]+" " +thMax_time  )
                $(".tip_current>ul>li:nth-child(8)>span").text(res[0][5]+"米 " +res[0][4]+" " +thMax_time  )

            }
        });
    };

    //全年的台风数据
    var typhoon_historyAll = {

    };


    //实时数据查询
    function real_data_fun() {
        var time_current = localStorage.CURRENT_TIME + ":00";
        var param = [
            {"name": "time_current", "value": time_current}
        ];
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: rdk.rdkUrl('typhoonRealTimeData.js',"homePage"),
            data: rdk.rdkData(param),
            async: false,
            success: function(data){
                var res = eval("("+ data.result + ")");
                if(res.length == 0){
                    return;
                }
                for(var i = 0; i < res.length; i++){
                    for(var j = 0; j < res[i].length; j++){
                        if(res[i][j] == "null"){
                            res[i][j] = "--";
                        }
                    }
                    typhoon_data.realtime_data.push({
                        name: res[i][5],
                        fengsu: res[i][0],
                        fengxiang: res[i][1],
                        qiya: res[i][2],
                        yuliang: res[i][3],
                        youxiao_bogao: res[i][4]
                    });
                }
            }
        });
    }
    real_data_fun();
    return{
        typhoon_historyAll:typhoon_historyAll,
        typhoon_forecast_data:typhoon_forecast_data,
        real_data_fun: real_data_fun,
        //查询全年的台风信息
        typhoon_historyAll_fun:function (time_current,flag) {
            var param = [
                {"name":"time_current", "value":time_current},
                {"name":"flag", "value":flag}
            ];
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: rdk.rdkUrl('typhoonManage_data.js',"homePage"),
                data: rdk.rdkData(param),
                async: true,
                success: function(data){
                    var res = eval("("+ data.result + ")");
                    if(res.length == 0){
                        return;
                    }
                    for(var i=res.length-1; i>=0 ;i--){
                        $(".th_details").append(" <ul class='clearfix'>\
                                    <li><span></span></li>\
                                    <li>"+ res[i][0]+"</li>\
                                    <li>"+ res[i][1]+"</li>\
                                    <li>"+ res[i][2]+"</li>\
                            </ul>")
                    }

                }
            });
        },
        //某一次的提示框信息
        typhoon_historyDetails_fun:function (ty_id,flag) {
            var param = [
                {"name":"ty_id", "value":ty_id},
                {"name":"flag", "value":flag}
            ];
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: rdk.rdkUrl('typhoonManage_data.js',"homePage"),
                data: rdk.rdkData(param),
                async: true,
                success: function(data){
                    var res = eval("("+ data.result + ")");
                    if(res.length == 0){
                        return;
                    }
                    $(".tip_current>ul>li:first-child").text(res[0][0]+res[0][1] +" ("+res[0][2]+")");
                    $(".tip_current>ul>li:nth-child(2)>span").text(res[0][3]+" ~ " +res[0][4]);
                    // typhoon_historyMax_fun("2016","8","2","4")
                }
            });
        },
        //某一次的具体信息
        typhoon_historyTime_fun:function (ty_id,flag) {
            var param = [
                {"name":"ty_id", "value":ty_id},
                {"name":"flag", "value":flag}
            ];
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: rdk.rdkUrl('typhoonManage_data.js',"homePage"),
                data: rdk.rdkData(param),
                async: false,
                success: function(data){
                    var res = eval("("+ data.result + ")");
                    if(res.length == 0){
                        return;
                    }
                    typhoon_data.RT_max_time = res[res.length -1][0];//给实时台风最近一次上报时间
                    typhoon_historyAll.typhoon_historyTime = $.extend({},res);
                    for(var i= 0;i<res.length;i++){
                        var timeCur = res[i][0].split(" ");   //分割时间
                        var timeCur_month = timeCur[0].split("-")[1] + timeCur[0].split("-")[2] ;
                        res[i][1] === "null"?res[i][1]="-":res[i][1]=res[i][1];
                        res[i][2] === "null"?res[i][2]="-":res[i][2]=res[i][2];
                        res[i][3] === "null"?res[i][3]="-":res[i][3]=res[i][3];
                        res[i][4] === "null"? res[i][4]="-": res[i][4]=res[i][4];
                        $(".tc_details table").append("<tr>\
                            <td>"+timeCur_month+" <span>"+ timeCur[1].slice(0,2) +"h</span></td>\
                        <td>"+res[i][1]+"</td>\
                        <td>"+res[i][2]+"</td>\
                        <td>"+res[i][3]+"</td>\
                        <td>"+res[i][4]+"</td>\
                        </tr>")

                    }

                    var jsonLength = 0;
                    for(var item in typhoon_historyAll.typhoon_historyTime){
                        jsonLength++;
                    }
                    var start_time = typhoon_historyAll.typhoon_historyTime[0][0];
                    var end_time = typhoon_historyAll.typhoon_historyTime[jsonLength - 1][0];
                    typhoon_trend_fun(start_time, end_time);
                }
            });
        },
        //台风趋势图查询
        typhoon_trend_fun: typhoon_trend_fun,
        //台风预测
        typhoon_forecast_fun:function (nameCh,timePoint) {
            var param = [
                {"name":"nameCh", "value":encodeURI(nameCh)},
                {"name":"timePoint", "value":timePoint},
                {"name":"flag", "value":"06"}
            ];
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: rdk.rdkUrl('typhoonManage_data.js',"homePage"),
                data: rdk.rdkData(param),
                async: false,
                success: function(data){
                    var res = eval("("+ data.result + ")");

                    //进来之前把前一次的数据清空
                    for(var kew in typhoon_forecast_data){
                        for(var jew in typhoon_forecast_data[kew]){
                            typhoon_forecast_data[kew][jew].length = 0;
                        }
                    }
                    if(res.length == 0){
                        return;
                    }
                    typhoon_forecast_data.foreCastTime = res[0][9];
                    for(var i = 0 ;i < res.length ; i ++){
                        typhoon_forecast_data[res[i][2]].number.push(res[i][0] = res[i][0]=="null"?"-": res[i][0]);
                        typhoon_forecast_data[res[i][2]].nameCh.push(res[i][1] = res[i][1] == "null"?"-":res[i][1]);
                        typhoon_forecast_data[res[i][2]].time.push(res[i][3] = res[i][3] == "null"?"-":res[i][3]);
                        typhoon_forecast_data[res[i][2]].lon.push(res[i][4] = res[i][4] == "null"?"-":res[i][4]);
                        typhoon_forecast_data[res[i][2]].lat.push(res[i][5] = res[i][5] == "null"?"-":res[i][5]);
                        typhoon_forecast_data[res[i][2]].atmosphericpressure.push(res[i][6] = res[i][6] == "null"?"-":res[i][6]);
                        typhoon_forecast_data[res[i][2]].speedMax.push(res[i][7] = res[i][7] == "null"?"-":res[i][7]);
                        typhoon_forecast_data[res[i][2]].powerMax.push(res[i][8] = res[i][8] == "null"?"-":res[i][8]);

                    }
                }
            });
        },
        typhoon_data: typhoon_data
    }



});