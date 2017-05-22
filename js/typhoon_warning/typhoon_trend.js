define(["jquery", "echarts", "typhoon_warning_data"],function($, ec, typhoon_warning_data){
    var trend_init_data = {
        legendselected: {
            "深圳湾": true,
            "沙井": true,
            "矾石": true,
            "伶仃南": true,
            "沙头角": true,
            "大梅沙":true,
            "下沙": true,
            "南澳": true,
            "大鹏湾口": true,
            "东涌": true,
            "东山": true,
            "核电站": true,
            "坝光": true
        }
    }
    function show_trend(){
        var trend = ec.init(document.getElementById("trend"));

        var list_data = typhoon_warning_data.typhoon_historyAll.typhoon_historyTime;  //表数据
        var colors = ['#FF7F50','#87CEFA','#DA70D6','#32CD32','#6495ED','#FF69B4','#BA55D3','#CD5C5C','#FFA500','#40E0D0','#1E90FF','#FF6246','#7B68EE'];

        var name_arr = ['深圳湾','沙井','矾石','伶仃南','沙头角','大梅沙','下沙','南澳','大鹏湾口','东涌','东山','核电站','坝光'];
        var series_data = [];
        var typhoon_data = typhoon_warning_data.typhoon_data;
        var timeData = typhoon_data.time;                                        //横轴
        var speed_wind_data = typhoon_data.speed_wind_data;                              //风速数据
        var atmosphericpressure_data = typhoon_data.atmosphericpressure_data;           //气压数据
        var rainfall_data = typhoon_data.rainfall_data;                                  //雨量数据
        var significantwaveheight_data = typhoon_data.significantwaveheight_data;      //有效波高数据

        /*表数据填充*/
        var tab_distance = [];
        for(var i = 0; i < typhoon_data.distance.length; i++){
            var tmp_data = parseInt(parseInt(typhoon_data.distance[i])/1000);
            if(isNaN(tmp_data)){
                tmp_data = '-';
            }
            tab_distance.push(tmp_data);
        }
        var tab_air = typhoon_data.qiya;
        var tab_move = typhoon_data.yisu;
        var tab_wind = typhoon_data.fengsu;

        get_series_data(speed_wind_data, 0);
        get_series_data(atmosphericpressure_data, 1);
        get_series_data(rainfall_data, 2);
        get_series_data(significantwaveheight_data, 3);

        function get_series_data(arr, n){
            var connectNulls = false;
            if(n == 3) connectNulls = true;//当为有效波高时，空数据连接
            for(var i = 0; i < 13; i++){
                series_data.push({
                    name: name_arr[i],
                    type:'line',
                    connectNulls: connectNulls,
                    symbolSize: 8,
                    xAxisIndex: n,
                    yAxisIndex: n,
                    hoverAnimation: false,
                    smooth: true,
                    data: arr[i],
                    index: i,
                    symbolSize: [4,4]
                })
            }
        }

        timeData = timeData.map(function (str) {
            var temp_date = str.split(" ")[0];
            var temp_time = str.split(" ")[1];
            var month = temp_date.split("-")[1];//月
            var day = temp_date.split("-")[2];//日
            var hour = temp_time.split(":")[0];//小时
            var min = temp_time.split(":")[1];//分

            return month + "/" + day + "\n" + hour + ":" + min;
        });

        var xAxis_data = [];
        for(var i = 0; i < timeData.length; i++){
            xAxis_data.push({
                value: timeData[i],
                textStyle:{
                    fontWeight: 'bold'
                }
            })
        }
        option = {
            noDataLoadingOption: {
                effect: 'bubble',
                effectOption: {
                    backgroundColor:"rgba(0,0,0,0)",
                    effect: {
                        n: 0
                    }
                }
            },
            color: colors,
            title: {
                text: '站点监测数据',
                x: 'center',
                y: 35,
                textStyle:{
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    fontSize: 13
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                },
                formatter: function (params){
                    var param0, param1, param2, param3, name, value, res;
                    var res0 = [];
                    var res1 = [];
                    var res2 = [];
                    var res3 = [];
					
					var res0_1 = [];
                    var res1_1 = [];
                    var res2_1 = [];
                    var res3_1 = [];
					
                    res = '<p style="text-align:center;font-weight: bold; color:yellow;margin-bottom:5px;line-height: 10px">' + params[0].axisValue + '</p>';
                    for (var i = 0; i < params.length; i++){
                        name = params[i].seriesName;
                        value = params[i].value == undefined ? "-" : params[i].value;
						
                        if(params[i].axisIndex == 0){
                            param0 = '<span style="color:greenyellow">风速</span>';
							
							res0_1.push(value);
                            res0.push(name + ":" + value + "&nbsp;&nbsp;");
                        }
                        if(params[i].axisIndex == 1){
							res1_1.push(value);
                            param1 = '<span style="color:greenyellow">气压</span>';
                            res1.push(name + ":" + value + "&nbsp;&nbsp;");
                        }
                        if(params[i].axisIndex == 2){
							res2_1.push(value);
                            param2 = '<span style="color:greenyellow">雨量</span>';
                            res2.push(name + ":" + value + "&nbsp;&nbsp;");
                        }
                        if(params[i].axisIndex == 3){
							res3_1.push(value);
                            param3 = '<span style="color:greenyellow">有效波高</span>';
                            res3.push(name + ":" + value + "&nbsp;&nbsp;");
                        }
                    }
					sort_value(res0_1, res0);
					sort_value(res1_1, res1);
					sort_value(res2_1, res2);
					sort_value(res3_1, res3);
					
					//$.unique(res0) 数组去重
					var temp_name = "";
					var count = 0;
					res += param0 + ':<p style="white-space: normal;">';
					for(var i = 0; i < res0.length; i++){ 
						if(temp_name == res0[i]) continue;
						if(count >= 13) break;
						count++;
						res += res0[i].toString().replace(/[,]/g, "");
						temp_name = res0[i];
					}
					res += '</p><div style="height:5px"></div>';
					
					count = 0;
					res += param1 + ':<p style="white-space: normal;">';
					for(var i = 0; i < res1.length; i++){
						if(temp_name == res1[i]) continue;
						if(count >= 13) break;
						count++;
						res += res1[i].toString().replace(/[,]/g, "");
						temp_name = res1[i];
					}
					res += '</p><div style="height:5px"></div>';
					
					count = 0;
					res += param2 + ':<p style="white-space: normal;">';
					for(var i = 0; i < res2.length; i++){
						if(temp_name == res2[i]) continue;
						if(count >= 13) break;
						count++;
						res += res2[i].toString().replace(/[,]/g, "");
						temp_name = res2[i];
					}
					res += '</p><div style="height:5px"></div>';
					
					count = 0;
					res += param3 + ':<p style="white-space: normal;">';
					for(var i = 0; i < res3.length; i++){
						if(temp_name == res3[i]) continue;
						if(count >= 13) break;
						count++;
						res += res3[i].toString().replace(/[,]/g, "");
						temp_name = res3[i];
					}
					res += '</div>';
					
                    /*res += param0 + ':<p style="white-space: normal;">' + $.unique(res0).toString().replace(/[,]/g, "") + '</p><div style="height:5px"></div>' +
                        param1 + ':<p style="white-space: normal;">' + $.unique(res1).toString().replace(/[,]/g, "") + '</p><div style="height:5px"></div>' +
                        param2 + ':<p style="white-space: normal;">' + $.unique(res2).toString().replace(/[,]/g, "") + '</p><div style="height:5px"></div>' +
                        param3 + ':<p style="white-space: normal;">' + $.unique(res3).toString().replace(/[,]/g, "") + "</p>";*/
                    return '<div style="line-height: 15px;max-width: 500px">' + res + '</div>';
                }
            },
            legend: {
                data: name_arr,
                x: 'left',
                y:60,
                itemGap: 5,
                left: 35,
                selected: trend_init_data.legendselected,
            },
            axisPointer: {
                link: {xAxisIndex: 'all'},
                lineStyle:{
                    width:0
                }
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    xAxisIndex: [0, 1,2,3],
                    y: 0,
                    startValue: 0,
                    endValue: 29,
                    zoomLock: true,
                    left: 50
                },
                {
                    type: 'inside',
                    disabled: true,
                    realtime: true,
                    xAxisIndex: [0, 1,2,3]
                }
            ],
            grid: [{
                show: true,
                left: 65,
                top: 110,
                right: 70,
                width: '92%',
                height: '13%'
            }, {
                left: 65,
                right: 70,
                top: '37%',
                width: '92%',
                height: '13%'
            },{
                left: 65,
                right: 70,
                top: '57%',
                width: '92%',
                height: '13%'
            },{
                left: 65,
                right: 70,
                top: '77%',
                width: '92%',
                height: '13%'
            }],
            xAxis : [
                {
                    type : 'category',
                    show: false,
                    boundaryGap : false,
                    axisLine: {onZero: true},
                    data: timeData
                },
                {
                    gridIndex: 1,
                    show: false,
                    type : 'category',
                    boundaryGap : false,
                    axisLine: {onZero: true},
                    data: timeData
                },
                {
                    gridIndex: 2,
                    show: false,
                    type : 'category',
                    boundaryGap : false,
                    axisLine: {onZero: true},
                    data: timeData
                },
                {
                    gridIndex: 3,
                    type : 'category',
                    boundaryGap : false,
                    axisLine: {onZero: true},
                    data: xAxis_data
                }
            ],
            yAxis : [
                {
                    name : '风速(m/s)',
                    type : 'value',
                    scale: true,
                    splitNumber: 4,
                    splitArea: {           // 分隔区域
                        show: true,       // 默认不显示，属性show控制显示与否
                        areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                            color: ['rgba(214,235,255,0.6)', 'rgba(255,255,255,0.6)']
                        }
                    }
                },
                {
                    gridIndex: 1,
                    name : '气压(hPa)',
                    scale: true,
                    splitNumber: 4,
                    splitArea: {           // 分隔区域
                        show: true,       // 默认不显示，属性show控制显示与否
                        areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                            color: ['rgba(214,235,255,0.6)', 'rgba(255,255,255,0.6)']
                        }
                    },
                    type : 'value'
                },
                {
                    gridIndex: 2,
                    name : '雨量(mm)',
                    scale: true,
                    splitNumber: 4,
                    type : 'value',
                    splitArea: {           // 分隔区域
                        show: true,       // 默认不显示，属性show控制显示与否
                        areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                            color: ['rgba(214,235,255,0.6)', 'rgba(255,255,255,0.6)']
                        }
                    }
                },
                {
                    gridIndex: 3,
                    name : '有效波高(m)',
                    scale: true,
                    splitNumber: 4,
                    splitArea: {           // 分隔区域
                        show: true,       // 默认不显示，属性show控制显示与否
                        areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                            color: ['rgba(214,235,255,0.6)', 'rgba(255,255,255,0.6)']
                        }
                    },
                    type : 'value'
                }
            ],
            series : series_data
        };
        trend.setOption(option);

        trend.on("datazoom", function(params){
            var startValue = trend.getOption().dataZoom[0].startValue;
            endValue = trend.getOption().dataZoom[0].endValue;
            add_td_time(".tr_time", "#typoon_time", startValue);
            add_td(".tr_distance", "#typoon_distance", startValue, tab_distance);
            add_td(".tr_air", "#typoon_air", startValue, tab_air);
            add_td(".tr_move", "#typoon_move", startValue, tab_move);
            add_td(".tr_wind", "#typoon_wind", startValue, tab_wind);
        });

        function add_td_time(element_class, element_id, value){  //tr class ,行头id， 起止时间
            $(element_class +" td:not("+ element_id + ")").remove();
            for(var i = 29; i >= 0; i--){
                var res;
                var index = value + i;
                if(timeData[index] == undefined){
                    res = '-';
                }else{
                    var tab_time = timeData[index].split("\n");
                    res = tab_time[0] + "<br />"+ tab_time[1];
                }
                $(element_id).after("<td>" + res + "</td>");
            }
        }
        function add_td(element_class, element_id, value, data){  //tr class ,行头id， 起止时间， 数据
            $(element_class +" td:not("+ element_id + ")").remove();
            for(var i = 29; i >= 0; i--){
                var res;
                var index = value + i;
                if(data[index] == undefined){
                    res = '-';
                }else{
                    res = data[index];
                }
                $(element_id).after("<td>" + res + "</td>");
            }
        }
        add_td_time(".tr_time", "#typoon_time", 0);
        add_td(".tr_distance", "#typoon_distance", 0, tab_distance);
        add_td(".tr_air", "#typoon_air", 0, tab_air);
        add_td(".tr_move", "#typoon_move", 0, tab_move);
        add_td(".tr_wind", "#typoon_wind", 0, tab_wind);

        /*trend.on("mouseover", function(params){
            var x_data = params.name.replace("\n","");
            $(".tr_time td").each(function(index){
                var td = $(this).html().replace("<br>", "");
                var ind = index + 1;
                if(x_data == td){
                    $(".typhoon_path_tab tr td:nth-child(" + ind + ")").addClass("bg_td").siblings("td").removeClass("bg_td");
                }
            })
        });*/
        trend.on("mouseout", function(){
            $(".typhoon_path_tab tr td").removeClass("bg_td");

        });
        trend.on("legendselectchanged", function(param){
            var name = param.target;
            var value = param.selected;
            var is_true = [];
            for(var name in value){
                if(value[name] ==true){
                    is_true.push(value[name]);
                }
            }
            if(is_true.length == 13){
                $(".all_check").children("#ck").prop("checked", true);
                $(".all_check").children("label").html("取消");
            }else{
                $(".all_check").children("#ck").prop("checked", false);
                $(".all_check").children("label").html("全选");
            }
        });

        /*滑块左右点击*/
        $(".btn_right").click(function(){
            var my_option = trend.getOption();
            var start = my_option.dataZoom[0].startValue + 1;
            var end = my_option.dataZoom[0].endValue + 1;
            if(end < timeData.length){
                trend.dispatchAction({
                    type: 'dataZoom',
                    // 可选，dataZoom 组件的 index，多个 dataZoom 组件时有用，默认为 0
                    //dataZoomIndex: number,
                    // 开始位置的数值
                    startValue: start,
                    // 结束位置的数值
                    endValue: end
                })
            }
        });
        $(".btn_left").click(function(){
            var my_option = trend.getOption();
            var start = my_option.dataZoom[0].startValue - 1;
            var end = my_option.dataZoom[0].endValue - 1;
            if(start >= 0){
                trend.dispatchAction({
                    type: 'dataZoom',
                    // 可选，dataZoom 组件的 index，多个 dataZoom 组件时有用，默认为 0
                    //dataZoomIndex: number,
                    // 开始位置的数值
                    startValue: start,
                    // 结束位置的数值
                    endValue: end
                })
            }
        });
    }


	function sort_value(src, dest){
		for(var i = 0; i < src.length; i++){
			for(var j= i + 1; j < src.length; j++){
			if(src[i] =="-"){
                                    src[i] = -1;
                                }
			if(parseFloat(src[i]) < parseFloat(src[j])){
                                    var null_value = src[i];
                                    src[i] = src[j];
                                    src[j] = null_value;
									
									var null_string = dest[i]
                                    dest[i] = dest[j];
                                    dest[j] = null_string;
                                }
			}
		}
	}
    return{
        trend_init_data: trend_init_data,
        show_trend: show_trend
    }
});

