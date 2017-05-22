//入参 
//1.ocean_district; 默认深圳湾
//2.ocean_param; 默认水温，取值1-50
//3.timestart; 起始时间用于曲线图查询
//4.timeend; 起始时间用于曲线图查询
//5.flag; 数据源标识：地图/柱状图=01; 曲线图=02;侧边栏=03；上侧时间栏=04；侧边栏箭头前一时刻数据=05；


//查询方法，Ajax请求数据
define(["rdk_url", "jquery"], function(rdk, $) {
        var district_name =
            ['深圳湾','沙井','矾石','伶仃南','沙头角','大梅沙','下沙','南澳','大鹏湾口','东涌','东山','核电站','坝光'];
        var latelydata = {
            maxspeed_wind: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//最大风速 ,虚构
            speed_wind: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//风速
            direction_wind: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//风向
            temperature_air: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//气温，虚构
            relativehumidity: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//相对湿度
            atmosphericpressure: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//气压
            rainfall: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//雨量
            photosyntheticallyactiveradiation: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//有效光合（PAR）
            flowvelocity: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//流速
            flowdirection: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//流向
            wavedirection: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//波向
            //以下数据取杨梅坑
            surfacetemperature: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//表层水温
            waveheight_max: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//最大波高
            waveperiod_max: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//最大波周期
            waveheight_tenth: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//1/10波高
            waveperiod_tenth: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//1/10波周期
            significantwaveheight: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//有效波高
            significantwaveperiod: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//有效波周期
            meanwaveheight: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//平均波高
            meanwaveperiod: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//平均波周期
            wavenumber: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//波浪个数
            dominantwavedirection: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//主波向
            direction: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//方位

            temperature_water: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//水温
            chlorophyll_a: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//叶绿素a
            potentialhgdrogen: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//PH值
            dissolvedoxygen: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//溶解氧
            dissolvedoxygensaturation: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//溶解氧饱和度
            turbidity: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//浊度
            electricconductivity: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//电导率
            oxidation_reductionpotential: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//氧化还原电位
            salinity: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//盐度
            totaldissolvedsolids: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//总溶解性固体
            blue_greenalgae: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//蓝绿藻
            chemicaloxygendemand: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//化学需氧量
            oilinwater: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//水中油
            temperature_under10meter: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//水下10米:水温
            electricconductivity_under10meter: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//水下10米:电导率
            salinity_under10meter: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//水下10米:盐度
            deepth_under10meter: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//水下10米:水深
            //以下取大亚湾-2数据
            radioactiveparameters_Co60: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//放射性参数:钴60
            radioactiveparameters_Sr89: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//放射性参数:锶89
            radioactiveparameters_Cs134: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//放射性参数:铯134
            radioactiveparameters_Cs137: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//放射性参数:铯137
            //以下取大亚湾-3
            nutritivesalt_NH3_N: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//营养盐参数:NH3-N
            nutritivesalt_NO2_N: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//营养盐参数:NO2-N
            nutritivesalt_NO3_N: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//营养盐参数:NO3-N
            nutritivesalt_PO4_P: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"]//营养盐参数:PO4-P
        };
        //查询实时数据
        var bardata = {
            maxspeed_wind: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//最大风速 ,虚构
            speed_wind: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//风速
            direction_wind: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//风向
            temperature_air: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//气温，虚构
            relativehumidity: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//相对湿度
            atmosphericpressure: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//气压
            rainfall: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//雨量
            photosyntheticallyactiveradiation: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//有效光合（PAR）
            flowvelocity: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//流速
            flowdirection: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//流向
            wavedirection: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//波向
            //以下数据取杨梅坑
            surfacetemperature: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//表层水温
            waveheight_max: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//最大波高
            waveperiod_max: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//最大波周期
            waveheight_tenth: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//1/10波高
            waveperiod_tenth: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//1/10波周期
            significantwaveheight: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//有效波高
            significantwaveperiod: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//有效波周期
            meanwaveheight: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//平均波高
            meanwaveperiod: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//平均波周期
            wavenumber: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//波浪个数
            dominantwavedirection: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//主波向
            direction: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//方位

            temperature_water: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//水温
            chlorophyll_a: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//叶绿素a
            potentialhgdrogen: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//PH值
            dissolvedoxygen: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//溶解氧
            dissolvedoxygensaturation: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//溶解氧饱和度
            turbidity: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//浊度
            electricconductivity: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//电导率
            oxidation_reductionpotential: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//氧化还原电位
            salinity: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//盐度
            totaldissolvedsolids: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//总溶解性固体
            blue_greenalgae: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//蓝绿藻
            chemicaloxygendemand: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//化学需氧量
            oilinwater: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//水中油
            temperature_under10meter: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//水下10米:水温
            electricconductivity_under10meter: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//水下10米:电导率
            salinity_under10meter: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//水下10米:盐度
            deepth_under10meter: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//水下10米:水深
            //以下取大亚湾-2数据
            radioactiveparameters_Co60: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//放射性参数:钴60
            radioactiveparameters_Sr89: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//放射性参数:锶89
            radioactiveparameters_Cs134: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//放射性参数:铯134
            radioactiveparameters_Cs137: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//放射性参数:铯137
            //以下取大亚湾-3
            nutritivesalt_NH3_N: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//营养盐参数:NH3-N
            nutritivesalt_NO2_N: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//营养盐参数:NO2-N
            nutritivesalt_NO3_N: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],//营养盐参数:NO3-N
            nutritivesalt_PO4_P: ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"]//营养盐参数:PO4-P
        };
//查询历史数据
        var trenddata = {
            "深圳湾": {
                time: [],
                para_value: []
            },
            "沙井": {
                time: [],
                para_value: []
            },
            "矾石": {
                time: [],
                para_value: []
            },
            "伶仃南": {
                time: [],
                para_value: []
            },
            "沙头角": {
                time: [],
                para_value: []
            },
            "大梅沙": {
                time: [],
                para_value: []
            },
            "下沙": {
                time: [],
                para_value: []
            },
            "南澳": {
                time: [],
                para_value: []
            },
            "大鹏湾口": {
                time: [],
                para_value: []
            },
            "东涌": {
                time: [],
                para_value: []
            },
            "东山": {
                time: [],
                para_value: []
            },
            "核电站": {
                time: [],
                para_value: []
            },
            "坝光": {
                time: [],
                para_value: []
            }
        };
        var trend_data_value = {value: [],
            time: []};
//保存复选框的数据
        var checkbox_value = {

        };

        var trenddata_2 = {
            maxspeed_wind:[15.2, 15.3535, 16.156, 15.516,15.38, 14.15,14.95],//最大风速 ,虚构
            speed_wind:[14.3,14.3535, 5.156, 14.516,4.38, 56.15,4.95],//风速
            direction_wind:[131,130, 130, 170,132, 67,139],//风向
            temperature_air:[18.48, 19.3535, 30.156, 28.516,29.38, 76.15,28.95],//气温，虚构
            relativehumidity:[29.10,70.3535, 65.156, 64.516,98.38, 65.15,64.95],//相对湿度
            atmosphericpressure:[1000,1535, 1156, 1516,2456, 1515,1495],//气压
            rainfall:[0,10.3535, 5.156, 4.516,4.38, 15.15,4.95],//雨量
            photosyntheticallyactiveradiation:[0,14.3535, 5.156, 4.516,14.38, 5.15,4.95],//有效光合（PAR）
            temperature_water:[18.8,27.5, 25.56, 25.16,24.38, 15.15,24.95],//水温
            chlorophyll_a:[132.5,34.3535, 35.156, 34.516,34.38, 25.15,34.95],//叶绿素a
            potentialhgdrogen:[9.96,4.3535, 5.156, 4.516,14.38, 5.15,4.95],//PH值
            dissolvedoxygen:[3.46,4.3535, 5.156, 4.516,4.38, 15.15,4.95],//溶解氧
            dissolvedoxygensaturation:[30.40,114.3535, 115.156, 114.516,114.38, 115.15,114.95],//溶解氧饱和度
            turbidity:[0.8,14.3535, 5.156, 4.516,4.38, 15.15,4.95],//浊度
            electricconductivity:[151.84,54.3535, 55.156, 54.516,54.38, 55.15,54.95],//电导率
            oxidation_reductionpotential:[22.84,254.3535, 255.156, 254.516,54.38, 255.15,254.95],//氧化还原电位
            salinity:[131.39,154.3535, 155.156, 54.516,54.38, 155.15,54.95],//盐度
            totaldissolvedsolids:[131.4,54.3535, 155.156, 54.516,154.38, 55.15,54.95],//总溶解性固体
            blue_greenalgae:[11.835,11.3535, 11.156, 11.516,11.38, 111.15,11.95],//蓝绿藻
            chemicaloxygendemand:[0,34.3535, 15.156, 32.516,54.38, 155.15,54.95],//化学需氧量
            oilinwater:[0,44.3535, 23.156, 54.516,514.38, 55.15,54.95],//水中油
            temperature_under10meter:[0,43.3535, 55.156, 54.516,154.38, 55.15,54.95],//水下10米:水温
            electricconductivity_under10meter:[0,67.3535, 155.156, 54.516,54.38, 55.15,54.95],//水下10米:电导率
            salinity_under10meter:[0,98.3535, 55.156, 514.516,54.38, 55.15,54.95],//水下10米:盐度
            deepth_under10meter:[0,57.3535, 55.156, 54.516,54.38, 55.15,54.95],//水下10米:水深
			/*以下取大亚湾-2数据*/
            radioactiveparameters_Co60:[0.63972,0.543535, 0.55156, 10.54516,0.5438, 0.5515,0.5495],//放射性参数:钴60
            radioactiveparameters_Sr89:[17.4958801, 5.3535, 6.156, 15.516,5.38, 4.15,4.95],//放射性参数:锶89
            radioactiveparameters_Cs134:[10.0166016, 5.3535, 16.156, 5.516,5.38, 4.15,4.95],//放射性参数:铯134
            radioactiveparameters_Cs137:[10.0192261, 5.3535, 16.156, 5.516,5.38, 4.15,4.95],//放射性参数:铯137
			/*以下取大亚湾-3*/
            nutritivesalt_NH3_N:[10.212, 5.3535, 6.156, 15.516,5.38, 4.15,4.95],//营养盐参数:NH3-N
            nutritivesalt_NO2_N:[110.37, 5.3535, 6.156, 15.516,5.38, 4.15,4.95],//营养盐参数:NO2-N
            nutritivesalt_NO3_N:[120.69, 5.3535, 6.156, 11.516,5.38, 4.15,4.95],//营养盐参数:NO3-N
            nutritivesalt_PO4_P:[11.11, 5.3535, 6.156,15.516,5.38, 4.15,4.95],//营养盐参数:PO4-P
			/*以下取大鹏-5*/
            flowvelocity:[10.101, 5.3535, 6.156, 15.516,5.38, 4.15,4.95],//流速
            flowdirection:[121.094, 15.3535, 16.156, 51.516,15.38, 24.15,14.95],//流向
            wavedirection:[153.281, 115.3535, 161.156, 51.516,151.38, 124.15,141.95],//波向
			/*以下数据取杨梅坑*/
            surfacetemperature:[129.1,27.5, 25.56, 20.16,24.38, 25.15,24.95],//表层水温
            waveheight_max:[10.7,27.5, 25.56, 25.16,74.38, 25.15,24.95],//最大波高
            waveperiod_max:[15,6, 7, 18,9, 10,2],//最大波周期
            waveheight_tenth:[10.06,0.543535, 0.55156, 10.54516,0.5438, 0.5515,0.5495],//1/10波高
            waveperiod_tenth:[14.5, 5.3535, 6.156, 5.516,15.38, 4.15,4.95],//1/10波周期
            significantwaveheight:[10.5, 5.3535, 6.156, 15.516,5.38, 4.15,4.95],//有效波高
            significantwaveperiod:[14.5, 5.3535, 6.156, 15.516,5.38, 4.15,4.95],//有效波周期
            meanwaveheight:[10.3, 5.3535, 6.156, 5.516,15.38, 4.15,4.95],//平均波高
            meanwaveperiod:[13.9, 5.3535, 6.156, 5.516,15.38, 4.15,4.95],//平均波周期
            wavenumber:[62,146, 147, 128,119, 1110,132],//波浪个数
            dominantwavedirection:[14,146, 147, 128,119, 1110,132],//主波向
            direction:[78,146, 147, 128,119, 1110,132]//方位
        };

	return {
	    //点击侧边，查询柱状图数据，FLAG = 01
		bar_data_update: function (time_current, ocean_param_type, ocean_param_id) {
			var param = [
                {"name":"time_current", "value":time_current},
				{"name":"ocean_param", "value":ocean_param_id},
				{"name":"flag", "value":"01"}
			];
			$.ajax({
				type: "GET",
				contentType: "application/json; charset=utf-8",
				url: rdk.rdkUrl('OceanMonitoringInfo.js',"homePage"),
				data: rdk.rdkData(param),
				async: false,
				success: function(data ){
                    var res = eval("("+ data.result + ")");
                    if(res.length == 0){
						//清空当前参数柱状图数据
                        bardata[ocean_param_type] = ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"];
                        return;
                    }
                    //侧边点数据测试
                    /*for(var i = 0; i < res.length; i++){
                        if(res[i][0] == "大梅沙"){
                            if(res[i][1] == "null"){
                                res[i][1] = "--";
                            }
                            $("#test_data").html(res[i][1]);
                        }
                    }*/
                    //清空当前参数柱状图数据
                    bardata[ocean_param_type] = ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"];
                    for(var i = 0; i < res.length; i++){
                        for (var j = 0 ; j < district_name.length; j++){
                            if(res[i][0] == district_name[j] && res[i][1] != "null"){
                                bardata[ocean_param_type][j] = res[i][1];
                                break;
                            }
                        }
                    }
				}
			});
		},
        //点击地图，查询侧边栏数据，FLAG = 03
		list_data_update: function (time_current, ocean_district_index) {
            var param = [
                {"name":"time_current", "value":time_current},
                {"name":"ocean_district", "value":encodeURI(district_name[ocean_district_index])},
                {"name":"flag", "value":"03"}
            ];
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=UTF-8",
                url: rdk.rdkUrl('OceanMonitoringInfo.js',"homePage"),
                data: rdk.rdkData(param),
                async: false,
                success: function(data ){
                    var index = 0;
                    var res = eval("("+ data.result + ")");
					if(res.length == 0){
						return;
					}
                    for(var key in bardata){
                        if(res[0][index] != "null"){
                            bardata[key][ocean_district_index] = res[0][index];
                        }
                        index++;
                    }
                }
            });
		},
        //点击查找上一次的数据
		lately_data_update: function (time_current, ocean_district_index) {
			var param = [
				{"name":"time_current", "value":time_current},
				{"name":"ocean_district", "value":encodeURI(district_name[ocean_district_index])},
				{"name":"flag", "value":"05"}
			];
			$.ajax({
				type: "GET",
				contentType: "application/json; charset=UTF-8",
				url: rdk.rdkUrl('OceanMonitoringInfo.js',"homePage"),
				data: rdk.rdkData(param),
				async: false,
				success: function(data ){
					var index = 0;
					var res = eval("("+ data.result + ")");
					if(res.length == 0){
						return;
					}
					for(var key in latelydata){
						if(res[0][index] != "null"){
							latelydata[key][ocean_district_index] = res[0][index];
						}
						index++;
					}
				}
			});
		},
        //刷新/加载页面/时间控件选择，查询趋势图数据，FLAG = 02
		trend_data_update: function (ocean_param_type, ocean_param_id, start_time, end_time) {
		    var start_time_temp = start_time + " 00:00:00";
		    var end_time_temp = end_time + " 23:59:59";

			var param = [
				{"name":"ocean_param",    "value": ocean_param_id},
				{"name":"time_start",     "value": start_time_temp},
				{"name":"time_end",       "value": end_time_temp},
				{"name":"flag",           "value": "02"}
			];
			$.ajax({
				type: "GET",
				contentType: "application/json; charset=utf-8",
				url: rdk.rdkUrl('OceanMonitoringInfo.js',"homePage"),
				data: rdk.rdkData(param),
				async: false,
				success: function(data ){
					var res = eval("("+ data.result + ")");
                    if(res.length == 0) {
                        trend_data_value.time = [0];
                        trend_data_value.value = [["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"]];
                        return 0;
                    }
                    trend_data_value.time = [];
                    trend_data_value.value = [];
                    //判断时间粒度
                    var unit = caculate_unit(start_time_temp, end_time_temp);
                    update_trend_data(res, ocean_param_id,unit, end_time);
					//侧边点数据测试
					/*var tendency_length = trend_data_value.time.length-1;
                    for(var i = 0; i < res.length; i++){
                        if(res[i][6] == "大梅沙"){
                            if(res[i][7] == "null"){
                                res[i][7] = "--";
                            }
							if(trend_data_value.value[5][tendency_length] == "-"){
								trend_data_value.value[5][tendency_length] = "--";
							}
							$("#tendency_data").html(trend_data_value.value[5][tendency_length]);
                        }
						if(res[i][5] == "大梅沙"){
                            if(res[i][6] == "null"){
                                res[i][6] = "--";
                            }
							if(trend_data_value.value[5][tendency_length] == "-"){
								trend_data_value.value[5][tendency_length] = "--";
							}
							$("#tendency_data").html(trend_data_value.value[5][tendency_length]);
                        }
                    }*/
                    return 1;
				}
			});
		},
        district_name: district_name,
		bardata: bardata,
        trend_data_value: trend_data_value,
		trenddata_2: trenddata_2,
		latelydata: latelydata,
		checkbox_value: checkbox_value
	};
	//对trenddata按其时间进行排序
	function sort_trenddata(data) {
        for (var i = 0; i < data.time.length; i++)
        {
            for (var j = i + 1; j < data.time.length; j++){
                if(data.time[i] > data.time[j])
                {
                    var time_temp = data.time[i];
                    data.time[i] = data.time[j];
                    data.time[j] = time_temp;
                    var value_temp = data.para_value[i];
                    data.para_value[i] = data.para_value[j];
                    data.para_value[j] = value_temp;
                }
            }
        }
    }
    //去除重复时间
    function delete_same_time(data) {
	    if(data.time.length == 0) return;

        for(var i = 0; i < data.time.length - 1; i++){
            if(data.time[i] == data.time[i + 1]){
                console.log("[waring]: the same time at " + data.time[i]);
                //保留较大值
                if(data.para_value[i] < data.para_value[i + 1]){
                    data.time.splice(i,1);
                    data.para_value.splice(i,1);
                }
                else {
                    data.time.splice(i + 1,1);
                    data.para_value.splice(i + 1,1);
                }
            }
        }
    }
    //由当前起始时间、截止时间，计算时间粒度
    function caculate_unit(start_time, end_time) {
        var startTime = new Date(start_time.replace(/-/g,"/"));
        var endTime = new Date(end_time.replace(/-/g,"/"));
        var dates = Math.abs((startTime.getTime() - endTime.getTime()))/(1000*60*60*24);
        if (dates <= 1){//1.	选择的日期起止为同一天时，以上报间隔做趋势图呈现；
             return "min";
        }
        else if ((dates > 1) && (dates <= 3)){//2.	选择的日期起止间隔大于1天小于等于3天时，以1小时间隔做趋势图呈现；TABLENAME[ocean_param][3] 1h;
            return "hour";
        }
        else if ((dates > 3) && (dates < 64)){//3.	选择的日期起止间隔大于3天小于61天时，以1天间隔做趋势图呈现；TABLENAME[ocean_param][4] 1day;
            return "day";
        }
        else if ((dates >= 64) && (dates <= 365)){//4.	选择的日期起止间隔大于61天小于365天时，以1周间隔做趋势图呈现；TABLENAME[ocean_param][5] 1week;
            return "week";
        }
        else if ( dates > 365){//5.	选择的日期起止间隔大于365天时，以1月间隔做趋势图呈现。TABLENAME[ocean_param][6] 1month;
            return "month";
        }
    }
    //更新趋势图数据
    function update_trend_data(res, ocean_param_id, unit, end_time) {
    	var min_time = 0;
        var max_time = 0;
        for(var key in trenddata){
            trenddata[key].para_value = [];
            trenddata[key].time = [];
            if(res.length == 0){
                trenddata[key].para_value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
            var count = 0;
            for(var i = 0; i < res.length; i ++){
                if(Number(ocean_param_id) == 22 || 23 == Number(ocean_param_id)){
					trend_data_value.time = [0];
					trend_data_value.value = [["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"]];
					return;
                }
                switch (unit){
                    case "min":
                        if(Number(ocean_param_id) <= 11 || (24 <= Number(ocean_param_id) && Number(ocean_param_id)<= 40)){
                            if(key != res[i][6]) continue;
                            (res[i][7] != "null") ?
                                trenddata[key].para_value[count] = res[i][7]:
                                trenddata[key].para_value[count] = "-";
                            hour = Number(res[i][4]) >= 10 ? res[i][4] : ("0" + res[i][4]);
                            min = Number(res[i][5]) >= 10 ? res[i][5] : ("0" + res[i][5]);
                            trenddata[key].time[count] = hour + ":" + min;
                        }
                        else {//小时上报，字段有7个
                            for(var i = 0; i < res.length; i ++){
                                if(key != res[i][5]) continue;
                                (res[i][6] != "null") ?
                                    trenddata[key].para_value[count] = res[i][6]:
                                    trenddata[key].para_value[count] = "-";
                                hour = Number(res[i][4]) >= 10 ? res[i][4] : ("0" + res[i][4]);
                                trenddata[key].time[count] = hour + ":" + "00";
                                count++;
                            }
                        }
                        break;
                    case "hour":
                        if(key != res[i][2]) continue;
                        (res[i][3] != "null") ?
                            trenddata[key].para_value[count] = res[i][3] :
                            trenddata[key].para_value[count] = "-";
                        date = res[i][0].replace(/\-/g, "/");
                        hour = Number(res[i][1]) >= 10 ? res[i][1] : ("0" + res[i][1]);
                        trenddata[key].time[count] = date + " " + hour + ":00";
                        break;
                    case "day":
                        if(key != res[i][1]) continue;
                        (res[i][2] != "null") ?
                            trenddata[key].para_value[count] = res[i][2]:
                            trenddata[key].para_value[count] = "-";
						var date = res[i][0].replace(/\-/g, "/");
                        trenddata[key].time[count] = date;
                        break;
                    case "week":
                        if(key != res[i][3]) continue;
                        (res[i][4] != "null") ?
                            trenddata[key].para_value[count] = res[i][4]:
                            trenddata[key].para_value[count] = "-";
                        week = Number(res[i][2]) >= 10 ? res[i][2] : ("0" + res[i][2]);
							year = Number(res[i][0]);
                            trenddata[key].time[count] =year+ "-" + week;
                        break;
                    case "month":
                        if(key != res[i][1]) continue;
                        (res[i][2] != "null") ?
                            trenddata[key].para_value[count] = res[i][2]:
                            trenddata[key].para_value[count] = "-";
                        trenddata[key].time[count] = res[i][0];
                        break;
                }
                count++;
            }
            //按时间由小到大排序，值联动
            sort_trenddata(trenddata[key]);
            //去除重复时间
            delete_same_time(trenddata[key]);
            //取本次时间段所上报的最小时间，最大时间
            time_length = trenddata[key].time.length;
            if(min_time == 0 && time_length > 0){//此时为第一次循环
                min_time = trenddata[key].time[0];
                max_time = trenddata[key].time[time_length - 1];
            }
            else{
                if(min_time > trenddata[key].time[0])//此时为非第一次循环
                    min_time = trenddata[key].time[0];
                if(max_time < trenddata[key].time[time_length - 1])
                    max_time = trenddata[key].time[time_length - 1];
            }
        }
        //对齐趋势图不同地点时间，最小时间及最大时间为所有地点最小时间及最大时间
        time_range_adjust(min_time, max_time, unit, ocean_param_id, end_time);
    }
    function time_range_adjust(min_time, max_time, unit, ocean_param_id, end_time) {
        if(max_time == 0) return;
        //按毫秒计算半小时，小时
        var half_hour = 30*60*1000;
        var hour = 2 * half_hour;
        var day = 24 * hour;

        var temp_time = [];
        switch (unit){
            case "min":// "12:00, 12:30"
                var index = 0;
                while (max_time >= min_time && index < 48 &&
                localStorage.CURRENT_TIME >= (end_time + " " + min_time)){//分钟粒度是仅为一天时间，增加判断历史时间与当前时间
                    var min_hour = min_time.split(":")[0];
                    var min_min = min_time.split(":")[1];
                    //给temp时间维度赋值，每次循环增加半小时
                    temp_time[index] = min_time;
                    //trenddata插入数据
                    insert_one_value(index, min_time);
                    if((Number(ocean_param_id) <= 11 || (24 <= Number(ocean_param_id) && Number(ocean_param_id)<= 40)) &&
                        (min_min == "00")){//该参数为半小时，且此时最小分钟为"00"
                        min_min = "30";//小时不变，分钟加30
                    }
                    else{//min_min == "30"，小时加1，分钟变为00
                        min_hour = Number(min_hour) + 1;
                        min_hour = min_hour >= 10 ? min_hour : ("0" + min_hour);
                        min_min = "00";
                    }
                    min_time = min_hour + ":" + min_min;
                    index++;
                }
                break;
            case "hour":// "2016-09-22 11:00"
                min_time = min_time.replace(/\-/g, "/");
                max_time = max_time.replace(/\-/g, "/");
                min_date = new Date(Date.parse(min_time));
                max_date = new Date(Date.parse(max_time));
                max_year = max_date.getFullYear();
                max_month = max_date.getMonth() + 1;
                max_day = max_date.getDate();
                max_hour = max_date.getHours();

                var index = 0;
                while (1){
                    min_year = min_date.getFullYear();
                    min_month = min_date.getMonth() + 1;
                    min_day = min_date.getDate();
                    min_hour = min_date.getHours();

                    //给temp时间维度赋值，每次循环增加一小时
                    min_month = min_month >= 10 ? min_month : ("0" + min_month);
                    min_day = min_day >= 10 ? min_day : ("0" + min_day);
                    min_hour = min_hour >= 10 ? min_hour : ("0" + min_hour);
                    //当大于本地时间时，返回
                    var current_time = min_year + "-" + min_month + "-" + min_day + " " + min_hour + ":00";
                    if(current_time > localStorage.CURRENT_TIME) break;
					temp_time[index] = min_month + "/" + min_day + " " + min_hour + ":00";
					//trenddata插入数据
					min_time =  min_year + "/" + temp_time[index];
                    insert_one_value(index, min_time);
                    //当最小时间按小时粒度增加到最大时间时，终端循环，index防止死循环
                    if((min_year  == max_year  &&
                        min_month == max_month &&
                        min_day   == max_day   &&
                        min_hour  >= max_hour) ||//等于该小时时，仍有效
                        index > 10000)
                        break;
                    //最小时间增加一小时
                    index++;
                    min_date = new Date(min_date.getTime() + hour);
                }
                break;
            case "day":// "2016-07-08 2016-07-09"
                min_time = min_time.replace(/\-/g, "/");
                max_time = max_time.replace(/\-/g, "/");
                min_date = new Date(Date.parse(min_time));
                max_date = new Date(Date.parse(max_time));
                max_month = max_date.getMonth() + 1;
                max_day = max_date.getDate();
				max_month = max_month >= 10 ? max_month : ("0" + max_month);
				max_day = max_day >= 10 ? max_day : ("0" + max_day);

                var index = 0;
                while (1){
                    min_year = min_date.getFullYear();
                    min_month = min_date.getMonth() + 1;
                    min_day = min_date.getDate();
                    //给temp时间维度赋值，每次循环增加一小时
                    min_month = min_month >= 10 ? min_month : ("0" + min_month);
                    min_day = min_day >= 10 ? min_day : ("0" + min_day);
                    temp_time[index] = min_year + "/" + min_month + "/" + min_day;
                    //trenddata插入数据
                    min_time = temp_time[index];
                    insert_one_value(index, min_time);
					//当最小时间按小时粒度增加到最大时间时，终端循环，index防止死循环
					if((min_month == max_month &&
						min_day   >= max_day ) ||
						index > 10000)
						break;
                    //最小时间增加一小时
                    index++;
                    min_date = new Date(min_date.getTime() + day);
                }
                break;
            case "week":// "01周 02周"
				 var min_week=  min_time.slice(-2);
				 var max_week=  max_time.slice(-2);
				var min_year = min_time.slice(0,4);
				var max_year = max_time.slice(0,4);
                var gap_year= max_year - min_year ;
                var index = 0; //时间数组的变量
                var month_index = 0;//增加月份的变量
				if( min_year=== max_year){
					for(var i=Number(min_week) ;i<=Number(max_week);i++){
						temp_time[index]=min_year +'-'+('0'+(Number(min_week)+index+'周')).slice(-3);
						min_time=min_year +'-'+('0'+(Number(min_week)+index)).slice(-2);
						insert_one_value(index,min_time)
						index ++;

					}
				}else{
                    for(var j=0; j<= gap_year; j++){
                        if(min_year<max_year){
                            for(var i=Number(min_week) ;i<= 52;i ++){
                                temp_time[index]=min_year +'-'+('0'+(Number(min_week)+index+'周')).slice(-3);
                                min_time=min_year +'-'+('0'+(Number(min_week)+index)).slice(-2);
                                insert_one_value(index,min_time);
                                index ++;
                            }
                            min_year++;
                            min_week = 1;
                            month_index = 0;
                        }else{
                            for(var i=1;i<=Number(max_week);i++){
                                temp_time[index]=max_year +'-'+('0'+(i+'周')).slice(-3);
                                min_time=max_year +'-'+('0'+i).slice(-2);
                                insert_one_value(index,min_time);
                                index ++;
                            }
                        }

                    }
				}
                break;
            case "month":// "2015-01 2015-02"
				var min_month=  min_time.slice(-2);
				var max_month=  max_time.slice(-2);
				var min_year = min_time.slice(0,4);
				var max_year = max_time.slice(0,4);
				var gap_year= max_year - min_year ;
				var index = 0; //时间数组的变量
                var month_index = 0;//增加月份的变量
				if( min_year=== max_year){
					for(var i = Number(min_month) ;i <= Number(max_month); i++){
						temp_time[index] = min_year +'-'+('0'+(Number(min_month)+index+'月')).slice(-3);
						min_time = min_year +'-'+('0'+(Number(min_month)+index)).slice(-2);
						insert_one_value(index,min_time);
						index ++;
					}
				}else{
					for(var j=0; j<= gap_year; j++){
						if(min_year<max_year){
							for(var i=Number(min_month) ;i <= 12; i++){
								temp_time[index] = min_year +'-'+('0'+i+'月').slice(-3);
								min_time = min_year +'-'+('0'+(Number(min_month)+month_index)).slice(-2);
								insert_one_value(index,min_time);
								index ++;
							}
							min_year++;
							min_month = 1;
                            month_index = 0;
						}else{
							for(var i=1;i<=Number(max_month);i++){
								temp_time[index] = max_year +'-'+('0'+(i+'月')).slice(-3);
								min_time = max_year +'-'+('0'+i).slice(-2);
								insert_one_value(index,min_time);
								index ++;
							}
						}

					}
				}
                break;
        }
        //给trend_data_value重新赋值，该值用于趋势图X,Y轴
        trend_data_value.time = temp_time;
        trend_data_value.value = [
            trenddata["深圳湾"].para_value,
            trenddata["沙井"].para_value,
            trenddata["矾石"].para_value,
            trenddata["伶仃南"].para_value,
            trenddata["沙头角"].para_value,
            trenddata["大梅沙"].para_value,
            trenddata["下沙"].para_value,
            trenddata["南澳"].para_value,
            trenddata["大鹏湾口"].para_value,
            trenddata["东涌"].para_value,
            trenddata["东山"].para_value,
            trenddata["核电站"].para_value,
            trenddata["坝光"].para_value
        ];
    }
    //对未上报时间点进行值及时间点插入。如果index位置有上报，则插入真实上报数据，如无上报，则插入"-"
    function insert_one_value(index, min_time) {
        for(var key in trenddata){
            for(var i = 0; i < trenddata[key].time.length; i++){
                if(trenddata[key].time[i] == min_time){//如果该时间点，有上报，则保持上报数据不变
                    break;
                }
                if(trenddata[key].time[i] > min_time ||
                    (min_time > trenddata[key].time[trenddata[key].time.length - 1])){//如果该时间点，没有上报，则赋值为"-"
                    trenddata[key].para_value.splice(index,0,"-");
                    break;
                }
            }
        }
    }
}
);