define(
    ["jquery", "echarts", "data", "trend", "date", "static",
        "echarts/chart/map"
    ],
    function ($, ec, data, trend, date, static_params) {
        /*变量*/
        var option = "";
        var Average_temperature_water = 19;
        var all_data = data.bardata;
        var old_data = data.latelydata;
        var place = ["shenzhenwan_map_", "shajing_map_", "fanshi_map_", "lingdingnan_map_", "shatoujiao_map_",
            "dameisha_map_", "chengtoujiao_map_", "nanao_map_", "modaokeng_map_", "chuanbiyan_map_", "hutoushan_map_",
            "changshanwei_map_", "liaogejiao_map_"];
        var SZ_place = ["南山区", "宝安区", "盐田区", "福田区", "罗湖区", "龙岗区"];

        var qw_color_data = ["#1B5100","#2E6900","#529600","#70BB00","#8EDD00","#A5EB1A","#C6F87B","#CEFEAC","#F8F49B","#FFF45C","#FFB83A","#FF5C1B","#FF0000"]
        var sw_color_data = ['#03004C',"#02296E","#025894","#0288BB","#02B2DC","#1BD3F6","#88E5F8","#C5E9F8","#FFF45C","#FFB83A","#FFB83A","#FF5C1B","#FF0000"]
        var seka_color = function(color_data){
            var bg_colors = $(".bg_color")
           for(var i = 0; i < bg_colors.length ; i++){
               $(bg_colors[i]).css("background",color_data[i])
           }
        };
        //地图中间显示最大和最小值变量名
        var show_size = {
            show_max_name: "",  //最大值名字
            show_max_data: "",   //最大值
            show_min_name: "",  //最小值名字
            show_min_data: ""    //最小值
        };
        var map_data = {
            cursor_flag: false,
            my_map: "",
            markPoint_image: ["image/shenzhenshi.png", "image/shenzhenshi.png", "image/shenzhenshi.png", "image/shenzhenshi.png", "image/shenzhenshi.png", "image/shenzhenshi.png", "image/shenzhenshi.png", "image/shenzhenshi.png", "image/shenzhenshi.png", "image/shenzhenshi.png", "image/shenzhenshi.png", "image/shenzhenshi.png", "image/shenzhenshi.png"],
            markPoint_value: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
            markPoint_name: "水温(°C)",
            data: data.bardata["temperature_water"],
            sub_data: [],//方向渲染数据
            sub_data_2: [],//速度渲染数据
            sub_data_3: [],//温度渲染数据
            map_color: "#96CBF8",
            place_color: [],
            refresh_average_flag: true,
            map_colors: ['#FF0000', '#FF5C1B', '#FFB83A', '#FFF45C', '#F8F49B', '#C5E9F8', '#88E5F8', '#1BD3F6',
                '#02B2DC', '#0288BB', '#025894', '#02296E', '#03004C', '#E0C888'],
            //右侧默认加载深圳湾
            map_default: function (params) {
                var index = 5;
                data.lately_data_update(localStorage.CURRENT_TIME + ":00", index);
                $("#flashing .right_title h3").html(params);
                var this_data = [];
                var lately_data = [];//上一次数据
                var spans = $("span.data_state_font");

                //all_data = data.bardata;
                //old_data = data.latelydata;
                //循环当前最新的数据
                for (var key in all_data) {
                    if (all_data[key][index] === "--") {
                        this_data.push(0);
                    }
                    else {
                        this_data.push(all_data[key][index]);
                        if (all_data["direction_wind"][index] > 360) {
                            all_data["direction_wind"][index] = "--";
                        }
                        if (all_data["flowdirection"][index] > 360) {
                            all_data["flowdirection"][index] = "--";
                        }
                        if (all_data["wavedirection"][index] > 360) {
                            all_data["wavedirection"][index] = "--";
                        }
                        if (all_data["dominantwavedirection"][index] > 360) {
                            all_data["dominantwavedirection"][index] = "--";
                        }
                        if (all_data["direction"][index] > 360) {
                            all_data["direction"][index] = "--";
                        }
                        if (all_data["speed_wind"][index] > 13.8) {			//風速算法
                            $("#02 .data_state_font").addClass("data_state_span");
                        }
                        if (10 > all_data["temperature_air"][index] || all_data["temperature_air"][index] > 35) {		//氣溫算法
                            $("#04 .data_state_font").addClass("data_state_span");
                        }
                        if (all_data["rainfall"][index] > 10) {			//雨量算法
                            $("#07 .data_state_font").addClass("data_state_span");
                        }
                        if (10 > all_data["temperature_water"][index] || all_data["temperature_water"][index] > 33) {		//水溫算法
                            $("#24 .data_state_font").addClass("data_state_span");
                        }
                        if (all_data["chlorophyll_a"][index] > 20) {		//葉綠素算法
                            $("#25 .data_state_font").addClass("data_state_span");
                        }
                        if (6.8 > all_data["potentialhgdrogen"][index] || all_data["potentialhgdrogen"][index] > 8.5) {		//PH值算法
                            $("#26 .data_state_font").addClass("data_state_span");
                        }
                        if (all_data["dissolvedoxygen"][index] < 3) {		//溶解氧算法
                            $("#27 .data_state_font").addClass("data_state_span");
                        }
                        if (all_data["blue_greenalgae"][index] > 30) {		//藍綠藻算法
                            $("#34 .data_state_font").addClass("data_state_span");
                        }
                        if (all_data["oilinwater"][index] == 1) {			//水中油算法
                            $("#36 .data_state_font").addClass("data_state_span");
                        }
                        if (all_data["significantwaveheight"][index] > 2.5) {//有效波高算法
                            $("#17 .data_state_font").addClass("data_state_span");
                        }
                        if (all_data["turbidity"][index] > 30) {			//濁度算法
                            $("#29 .data_state_font").addClass("data_state_span");
                        }
                    }
                }
                ;
                //循环上一次的数据
                for (var key in old_data) {
                    if (old_data[key][index] == "--") {
                        lately_data.push(0);
                    }
                    else {
                        lately_data.push(old_data[key][index]);
                    }

                }
                ;
                for (var j = 0; j < spans.length; j++) {
                    //当前值和上一次的值做比较
                    if (Number(this_data[j]) > Number(lately_data[j])) {

                        if ($("#" + ("00" + (j + 1)).slice(-2)).find(".data_units").text() !== "单位：°") {
                            $("#" + ("00" + (j + 1)).slice(-2)).find(".data_state_font").next().removeClass().addClass("fa fa-long-arrow-up");
                        }
                    }
                    else if (Number(this_data[j]) < Number(lately_data[j])) {
                        if ($("#" + ("00" + (j + 1)).slice(-2)).find(".data_units").text() !== "单位：°") {
                            $("#" + ("00" + (j + 1)).slice(-2)).find(".data_state_font").next().removeClass().addClass("fa fa-long-arrow-down");
                        }
                    }
                    else {
                        $("#" + ("00" + (j + 1)).slice(-2)).find(".data_state_font").next().removeClass();
                    }

                    if (this_data[j] == "0") {
                        spans[j].innerHTML = "--";
                        $("#" + ("00" + (j + 1)).slice(-2)).find(".data_state_font").next().removeClass();
                    }
                    else {
                        spans[j].innerHTML = Number(this_data[j]).toFixed(2)
                    }
                }
                ;
                var abnormal3 = $("#title3 .data_state_span").length;
                var abnormal2 = $("#title2 .data_state_span").length;
                var abnormal1 = $("#title1 .data_state_span").length;
                $(".abnormal_number_1").text(abnormal1);
                $(".abnormal_number_2").text(abnormal2);
                $(".abnormal_number_3").text(abnormal3);
                if (abnormal1 == 0) {
                    $(".abnormal_1").hide();
                } else {
                    $(".abnormal_1").show();
                }
                if (abnormal2 == 0) {
                    $(".abnormal_2").hide();
                } else {
                    $(".abnormal_2").show();
                }
                if (abnormal3 == 0) {
                    $(".abnormal_3").hide();
                } else {
                    $(".abnormal_3").show();
                }
            }
        };
        //刷新地图时，当参数为水温或气温时，读取后台数据，并渲染
        if (sessionStorage.id == "09" || sessionStorage.id == "10"
            || sessionStorage.id == "24" || sessionStorage.id == undefined) {//此时为参数为水温或流速，需填充热力图
            data.bar_data_update(localStorage.CURRENT_TIME + ":00", "temperature_water", "24");//查询水温数据

            map_data.sub_data_3 = data.bardata["temperature_water"];
            map_data.refresh_average_flag = true;
            set_map_color(true);
        }
        else if (sessionStorage.id == "02"|| sessionStorage.id == "03" || sessionStorage.id == "04"){//此时为参数为气温，需填充热力图
            data.bar_data_update(localStorage.CURRENT_TIME + ":00", "temperature_air", "04");//查询气温数据
            map_data.sub_data_3 = data.bardata["temperature_air"];
            map_data.refresh_average_flag = true;
            set_map_color(true);
        }
        else {
            set_map_color(false);
        }
        var init_map = function () {
            var para_type = static_params.abnormalRes(sessionStorage.id);
            var para_name = static_params.abnormalRes_ch(sessionStorage.id);
            map_data.markPoint_name = para_name;
            map_data.data = data.bardata[para_type];
            // 基于准备好的dom，初始化echarts图表
            map_data.my_map = ec.init(document.getElementById('ocean_map'));
            var cityMap = {
                "深圳海岸线": "sz_coastline_geo_HK"
            };
            var mapType = [];
            var lon_factor = -0.015;
            var lan_factor = -0.015;
            var mapGeoData = require('echarts/util/mapData/params');
            for (var city in cityMap) {
                mapType.push(city);
                // 自定义扩展图表类型
                mapGeoData.params[city] = {
                    getGeoJson: (function (c) {
                        var geoJsonName = cityMap[c];
                        return function (callback) {
                            $.getJSON('geoJson/china-main-city/' + geoJsonName + '.json', callback);
                        }
                    })(city)
                }
            }
            option = {
                backgroundColor: "#f6e8d3",
                //显示提示框
                tooltip: {
                    trigger: "item",
                    show: true,
                    showContent: true,
                    backgroundColor: "",
                    showDelay: 0,
                    hideDelay: 0,
                    borderRadius: 4,
                    enterable: true,
                    formatter: function (params) {
                        if (params.name == undefined) {
                            return "";
                        } else {
                            switch (params.name) {
                                case "深圳湾":
                                    map_data.data_value = map_data.data[0];
                                    break;
                                case "沙井":
                                    map_data.data_value = map_data.data[1];
                                    break;
                                case "矾石":
                                    map_data.data_value = map_data.data[2];
                                    break;
                                case "伶仃南":
                                    map_data.data_value = map_data.data[3];
                                    break;
                                case "沙头角":
                                    map_data.data_value = map_data.data[4];
                                    break;
                                case "大梅沙":
                                    map_data.data_value = map_data.data[5];
                                    break;
                                case "下沙":
                                    map_data.data_value = map_data.data[6];
                                    break;
                                case "南澳":
                                    map_data.data_value = map_data.data[7];
                                    break;
                                case "大鹏湾口":
                                    map_data.data_value = map_data.data[8];
                                    break;
                                case "东涌":
                                    map_data.data_value = map_data.data[9];
                                    break;
                                case "东山":
                                    map_data.data_value = map_data.data[10];
                                    break;
                                case "核电站":
                                    map_data.data_value = map_data.data[11];
                                    break;
                                case "坝光":
                                    map_data.data_value = map_data.data[12];
                                    break;

                            }
                            return ' <div style="background:#fff;width:150px;padding:5px;border-radius: 5px;position: relative">' +
                                '<span>' + params.name + '</span>' +
                                '<div style="width: 100%;border-bottom: 1px solid #82b1f1;margin: 5px 0;"></div>' +
                                '<div style="overflow: hidden">' +
                                '<span style="float: left">' + map_data.markPoint_name + '：</span>' +
                                '<span style="float: right">' + map_data.data_value + '</span>' +

                                '</div>' +
                                '<span style="position: absolute;border: 10px solid transparent;border-right:10px solid #fff;left: -18px; top: 18px;"></span>' +
                                '  </div>'
                        }
                    },
                    textStyle: {
                        color: "#000",
                        fontFamily: "微软雅黑"

                    }
                },
                dataRange: {
                    show: false,
                    min: Number(Average_temperature_water) - 3.5,
                    max: Number(Average_temperature_water) + 3,
                    x: "right",
                    y: "bottom",
                    itemHeight: 24,
                    precision: 2,
                    hoverLink: false,
                    backgroundColor: 'rgba(255,255,255,0.35)',
                    orient: "vertical",
                    text: ['High', 'Low'],
                    realtime: false,
                    calculable: true,
                    color: map_data.map_colors
                },
                series: [
                    {
                        name: "深圳海岸线",
                        clickable: false,
                        type: "map",
                        radius: "50%",
                        center: ["100%", "100%"],
                        mapType: "深圳海岸线",
                        hoverable: false,
                        //显示主地图的位置及其大小
                        mapLocation: {
                            x: "80",
                            y: "-4",
                            width: 1800,
                            height: 1005
                        },
                        selectedMode: false,

                        tooltip: {},
                        itemStyle: {
                            normal: {
                                color: "#96cbf8",
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: "transparent",
                                        fontFamily: "微软雅黑"
                                    }
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: "transparent"
                                    }
                                }
                            }
                        },
                        roam: true,
                        scaleLimit: {min: 1, max: 10},
                        // 地理气泡
                        markPoint: {
                            symbol: "image/qipao.png",
                            symbolSize: 20,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                            itemStyle: {
                                normal: {
                                    borderWidth: "5",
                                    label: {
                                        show: true,
                                        position: "bottom",
                                        formatter: function (param) {
                                            return param.name
                                        },
                                        textStyle: {
                                            color: "#333333",
                                            baseline: "left",
                                            fontFamily: "微软雅黑"
                                        }
                                    }
                                },
                                emphasis: {
                                    borderWidth: 13,
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            data: [
                                {name: "深圳湾", value: 19},
                                {name: "沙井", value: 19},
                                {name: "矾石", value: 19},
                                {name: "伶仃南", value: 19},
                                {name: "沙头角", value: 19},
                                {name: "大梅沙", value: 19},
                                {name: "下沙", value: 19},
                                {name: "南澳", value: 19},
                                {name: "大鹏湾口", value: 19},
                                {name: "东涌", value: 19},
                                {name: "东山", value: 19},
                                {name: "核电站", value: 19},
                                {name: "坝光", value: 19}
                            ]
                        },
                        data: map_data.place_color,
                        nameMap: {
                            'coast_line': '深圳海岸线'
                        },
                        geoCoord: {
                            "深圳湾": [113.94593, 22.48162],//不出图标
                            "沙井": [113.734775, 22.690257],
                            "矾石": [113.806, 22.494],
                            "伶仃南": [113.81473, 22.34653],
                            "沙头角": [114.241833333333, 22.5538333333333],
                            "大梅沙": [114.312833333333, 22.5941666666667],
                            "下沙": [114.45583333333, 22.566667],
                            "南澳": [114.478, 22.525667],
                            "大鹏湾口": [114.485, 22.459],
                            "东涌": [114.5715, 22.474167],
                            "东山": [114.518167, 22.569833],
                            "核电站": [114.580276, 22.609562],
                            "坝光": [114.555, 22.6595]
                        }
                    },
                    {
                        name: "深圳市",
                        clickable: false,
                        type: "map",
                        radius: "50%",
                        center: ["100%", "100%"],
                        mapType: "深圳海岸线",
                        hoverable: false,
                        tooltip: {
                            show: false
                        },
                        // 地理气泡
                        markPoint: {
                            symbol: "image/shenzhenshi.png",
                            clickable: false,
                            hoverable: false,
                            symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                            itemStyle: {
                                normal: {
                                    borderWidth: "8",
                                    label: {
                                        show: true,
                                        position: "bottom",
                                        formatter: function (param) {
                                            return param.name
                                        },
                                        textStyle: {
                                            color: "#363636",
                                            fontSize: 13,
                                            baseline: "left",
                                            fontFamily: "微软雅黑"
                                        }
                                    }
                                },
                                emphasis:{
                                    label:{
                                        show:false
                                    }
                                }
                            },
                            data: [
                                {name: "深      圳      市", value: 19},
                                {name: "东  莞  市", value: 19},
                                {name: "惠  州  市", value: 19},
                                {name: "香 港 特 别 行 政 区", value: 19},
                            ]
                        },
                        data: [],
                        geoCoord: {
                            "深      圳      市": [114.14726257324219, 22.639362681056678],
                            "东  莞  市": [113.7167, 22.8986],
                            "惠  州  市": [114.5874, 22.8255],
                            "香 港 特 别 行 政 区": [114.099, 22.442]
                        }
                    },
                    {
                        name: "方向",
                        clickable: false,
                        type: "map",
                        radius: "50%",
                        center: ["100%", "100%"],
                        mapType: "深圳海岸线",
                        hoverable: false,
                        tooltip: {
                            show: false
                        },
                        // 地理气泡
                        markPoint: {
                            symbol: map_data.markPoint_image[2],
                            clickable: false,
                            hoverable: false,
                            symbolRotate: map_data.markPoint_value[0],
                            symbolSize: [5, 10],       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                            itemStyle: {
                                normal: {
                                    borderWidth: "8",
                                    label: {
                                        show: false,
                                        position: "bottom",
                                        formatter: function (param) {
                                            //return param.name
                                        },
                                        textStyle: {
                                            color: "#333333",
                                            baseline: "left",
                                            fontFamily: "微软雅黑"
                                        }
                                    }
                                }
                            },
                            data: [
                                {name: "深圳湾_方向", value: 19},
                                {name: "沙井_方向", value: 19},
                                {name: "矾石_方向", value: 19},
                                {name: "伶仃南_方向", value: 19},
                                {name: "沙头角_方向", value: 19},
                                {name: "大梅沙_方向", value: 19},
                                {name: "下沙_方向", value: 19},
                                {name: "南澳_方向", value: 19},
                                {name: "大鹏湾口_方向", value: 19},
                                {name: "东涌_方向", value: 19},
                                {name: "东山_方向", value: 19},
                                {name: "核电站_方向", value: 19},
                                {name: "坝光_方向", value: 19}
                            ]
                        },
                        data: [],
                        geoCoord: {
                            "深圳湾_方向": [113.94593 - lon_factor, 22.48162 - lan_factor],//不出图标
                            "沙井_方向": [113.734775 - lan_factor, 22.690257 - lan_factor],
                            "矾石_方向": [113.806 - lan_factor, 22.494 - lan_factor],
                            "伶仃南_方向": [113.81473 - lan_factor, 22.34653 - lan_factor],
                            "沙头角_方向": [114.268833, 22.553833],
                            "大梅沙_方向": [114.329833, 22.5841666],
                            "下沙_方向": [114.434833, 22.561667],
                            "南澳_方向": [114.458, 22.514667],
                            "大鹏湾口_方向": [114.485, 22.421],
                            "东涌_方向": [114.5515, 22.468167],
                            "东山_方向": [114.518167 - lan_factor, 22.569833 - lan_factor],
                            "核电站_方向": [114.580276 - lan_factor, 22.609562 - lan_factor],
                            "坝光_方向": [114.555 - lan_factor, 22.6595 - lan_factor]
                        }
                    }
                ]
            };
            // 为echarts对象加载数据
            map_data.my_map.setOption(option);
            // 点击联动
            var ecConfig = require('echarts/config');
            map_data.my_map.on(ecConfig.EVENT.DBLCLICK, function (params) {
                map_data.cursor_flag = true;
            });
            var Last_paramsName = "";
            map_data.my_map.on(ecConfig.EVENT.CLICK, function (params) {
                // option.series[1].markPoint.data[0] = {name: params.name, value: 19};
                // map_data.my_map.setOption(option);
                if (Last_paramsName !== params.name) {
                    if (params.name !== undefined) {
                        //底部联动
                        if (!$("#trend_show").hasClass("opacity")) {
                            var legend = trend.update_data.single_trend.chart['line'].component.legend._selectedMap;
                            trend.update_data.legendselected = legend;
                            trend.update_data.legendselected[params.name] = true;
                            sessionStorage.legend = JSON.stringify(trend.update_data.legendselected);
                            trend.refresh_trend(trend.update_data.single_trend);
                        }
                        //右侧边栏联动
                        var index;
                        var name_value = [
                            {name: "深圳湾", value: 0},
                            {name: "沙井", value: 1},
                            {name: "矾石", value: 2},
                            {name: "伶仃南", value: 3},
                            {name: "沙头角", value: 4},
                            {name: "大梅沙", value: 5},
                            {name: "下沙", value: 6},
                            {name: "南澳", value: 7},
                            {name: "大鹏湾口", value: 8},
                            {name: "东涌", value: 9},
                            {name: "东山", value: 10},
                            {name: "核电站", value: 11},
                            {name: "坝光", value: 12}
                        ];
                        for (var i = 0; i < name_value.length; i++) {
                            if (name_value[i].name == params.name) {
                                index = name_value[i].value;
                            }
                        }
                        data.list_data_update(localStorage.CURRENT_TIME + ":00", index);
                        data.lately_data_update(localStorage.CURRENT_TIME + ":00", index);
                        $("#flashing .right_title h3").html(params.name);
                        var this_data = [];//当前的数据
                        var lately_data = [];//上一次数据
                        var spans = $("span.data_state_font");
                        //循环当前最新的数据
                        $(".abnormal_list .data_state_font").removeClass("data_state_span");

                        //all_data = data.bardata;
                        //old_data = data.latelydata;
                        for (var key in all_data) {
                            if (all_data[key][index] === "--") {
                                this_data.push(0)
                            } else {
                                this_data.push(all_data[key][index]);
                                if (all_data["direction_wind"][index] > 360) {
                                    all_data["direction_wind"][index] = "--";
                                }
                                if (all_data["flowdirection"][index] > 360) {
                                    all_data["flowdirection"][index] = "--";
                                }
                                if (all_data["wavedirection"][index] > 360) {
                                    all_data["wavedirection"][index] = "--";
                                }
                                if (all_data["dominantwavedirection"][index] > 360) {
                                    all_data["dominantwavedirection"][index] = "--";
                                }
                                if (all_data["direction"][index] > 360) {
                                    all_data["direction"][index] = "--";
                                }
                                if (all_data["speed_wind"][index] > 13.8) {			//風速算法
                                    $("#02 .data_state_font").addClass("data_state_span");
                                }
                                if (10 > all_data["temperature_air"][index] || all_data["temperature_air"][index] > 35) {		//氣溫算法
                                    $("#04 .data_state_font").addClass("data_state_span");
                                }
                                if (all_data["rainfall"][index] > 10) {			//雨量算法
                                    $("#07 .data_state_font").addClass("data_state_span");
                                }
                                if (10 > all_data["temperature_water"][index] || all_data["temperature_water"][index] > 33) {		//水溫算法
                                    $("#24 .data_state_font").addClass("data_state_span");
                                }
                                if (all_data["chlorophyll_a"][index] > 20) {		//葉綠素算法
                                    $("#25 .data_state_font").addClass("data_state_span");
                                }
                                if (6.8 > all_data["potentialhgdrogen"][index] || all_data["potentialhgdrogen"][index] > 8.5) {		//PH值算法
                                    $("#26 .data_state_font").addClass("data_state_span");
                                }
                                if (all_data["dissolvedoxygen"][index] < 3) {		//溶解氧算法
                                    $("#27 .data_state_font").addClass("data_state_span");
                                }
                                if (all_data["blue_greenalgae"][index] > 30) {		//藍綠藻算法
                                    $("#34 .data_state_font").addClass("data_state_span");
                                }
                                if (all_data["oilinwater"][index] == 1) {			//水中油算法
                                    $("#36 .data_state_font").addClass("data_state_span");
                                }
                                if (all_data["significantwaveheight"][index] > 2.5) {//有效波高算法
                                    $("#17 .data_state_font").addClass("data_state_span");
                                }
                                if (all_data["turbidity"][index] > 30) {			//濁度算法
                                    $("#29 .data_state_font").addClass("data_state_span");
                                }
                            }

                        }
                        //循环上一次的数据
                        for (var key in old_data) {
                            if (old_data[key][index] == "--") {
                                lately_data.push(0)
                            } else {
                                lately_data.push(old_data[key][index])
                            }

                        }
                        for (var j = 0; j < spans.length; j++) {
                            //当前值和上一次的值做比较
                            if (Number(this_data[j]) > Number(lately_data[j])) {

                                if ($("#" + ("00" + (j + 1)).slice(-2)).find(".data_units").text() !== "单位：°") {
                                    $("#" + ("00" + (j + 1)).slice(-2)).find(".data_state_font").next().removeClass().addClass("fa fa-long-arrow-up");
                                }
                            }
                            else if (Number(this_data[j]) < Number(lately_data[j])) {
                                if ($("#" + ("00" + (j + 1)).slice(-2)).find(".data_units").text() !== "单位：°") {
                                    $("#" + ("00" + (j + 1)).slice(-2)).find(".data_state_font").next().removeClass().addClass("fa fa-long-arrow-down");
                                }
                            }
                            else {
                                $("#" + ("00" + (j + 1)).slice(-2)).find(".data_state_font").next().removeClass();
                            }

                            if (this_data[j] == "0") {
                                spans[j].innerHTML = "--";
                                $("#" + ("00" + (j + 1)).slice(-2)).find(".data_state_font").next().removeClass();
                            }
                            else {
                                spans[j].innerHTML = Number(this_data[j]).toFixed(2)
                            }
                        }
                        var abnormal3 = $("#title3 .data_state_span").length;
                        var abnormal2 = $("#title2 .data_state_span").length;
                        var abnormal1 = $("#title1 .data_state_span").length;
                        $(".abnormal_number_1").text(abnormal1);
                        $(".abnormal_number_2").text(abnormal2);
                        $(".abnormal_number_3").text(abnormal3);
                        if (abnormal1 == 0) {
                            $(".abnormal_1").hide();
                        } else {
                            $(".abnormal_1").show();
                        }
                        if (abnormal2 == 0) {
                            $(".abnormal_2").hide();
                        } else {
                            $(".abnormal_2").show();
                        }
                        if (abnormal3 == 0) {
                            $(".abnormal_3").hide();
                        } else {
                            $(".abnormal_3").show();
                        }
                    }
                    Last_paramsName = params.name;
                }


            });
            start_loop_value();
        };
        //显示地图最大最小值，右下角色卡
        var set_min_max_value = function () {
            //中间倒计时、最大、最小、色卡显示控制
            document.getElementById("showSize").style.visibility = "visible";
            document.getElementById("showSize_min").style.visibility = "visible";
            document.getElementsByClassName("back_time")[0].style.visibility = "hidden";
            document.getElementById("bg_color_box").style.visibility = "hidden";
            //水温、流速、流向时，显示倒计时、色卡
            if (sessionStorage.id == undefined || sessionStorage.id == 24 || sessionStorage.id == 10 || sessionStorage.id == 09
            || sessionStorage.id == 02 || sessionStorage.id == 03 || sessionStorage.id == 04) {
                document.getElementsByClassName("back_time")[0].style.visibility = "visible";
                document.getElementById("bg_color_box").style.visibility = "visible";
            }
            //色卡颜色控制，默认为水温
            map_data.map_colors = ['#FF0000', '#FF5C1B', '#FFB83A', '#FFF45C', '#F8F49B', '#C5E9F8', '#88E5F8', '#1BD3F6',
                '#02B2DC', '#0288BB', '#025894', '#02296E', '#03004C', '#E0C888'];
            seka_color(sw_color_data);
            //当为气温时，需切换色卡
            if (sessionStorage.id == 02 || sessionStorage.id == 03 || sessionStorage.id == 04) {
                map_data.map_colors = ['#FF0000', '#FF5C1B', '#FFB83A', '#FFF45C', '#F8F49B', '#CEFEAC', '#C6F87B', '#A5EB1A',
                    '#8EDD00', '#70BB00', '#529600', '#2E6900', '#1B5100', '#E0C888'];
                seka_color(qw_color_data);
            }
            //下列参数最大、最小均不显示
            if ((sessionStorage.id >= 36 && sessionStorage.id <= 40) ||
                (sessionStorage.id >= 41 && sessionStorage.id <= 44) ||
                (sessionStorage.id >= 10 && sessionStorage.id <= 12) ||
                sessionStorage.id == "22" || sessionStorage.id == "23" ||
                sessionStorage.id == "08" || sessionStorage.id == "03") {
                document.getElementById("showSize").style.visibility = "hidden";
                document.getElementById("showSize_min").style.visibility = "hidden";
            }
            //下列参数只显示最高值
            if (sessionStorage.id == "01" || sessionStorage.id == "02" ||
                sessionStorage.id == "05" || sessionStorage.id == "07" ||
                sessionStorage.id == "13" || sessionStorage.id == "15" ||
                sessionStorage.id == "17" || sessionStorage.id == "19" ||
                sessionStorage.id == "21" || sessionStorage.id == "35") {
                document.getElementById("showSize_min").style.visibility = "hidden";
            }
            set_value();
        };

        /*事件*/
        //双击拖拽地图变鼠标变小手
        $("#ocean_map").on("mousedown dblclick", function () {
            $("#ocean_map").on("mousemove", function () {
                if (!map_data.cursor_flag)
                    document.getElementById("ocean_map").style.cursor = "move";
            })
        });
        $("#ocean_map").on("mouseup", function () {
            map_data.cursor_flag = false;
            $("#ocean_map").off("mousemove");
        });

        return {
            update_data: map_data,
            show_size: show_size,
            init_map: init_map,
            refresh_map: function () {
                refresh_map();
            },
            set_map_color: function (is_water_tempreture) {
                set_map_color(is_water_tempreture);
            },
            set_map_arrows: function (is_water_flowdirection) {
                set_map_arrows(is_water_flowdirection);
            },
            set_min_max_value: set_min_max_value
        };
        //更新地图参数后，刷新地图
        function refresh_map() {

            option.series[2].markPoint.data = [
                {
                    name: static_params.district_id[0],
                    symbol: map_data.markPoint_image[0],
                    symbolRotate: map_data.markPoint_value[0]
                },
                {
                    name: static_params.district_id[1],
                    symbol: map_data.markPoint_image[1],
                    symbolRotate: map_data.markPoint_value[1]
                },
                {
                    name: static_params.district_id[2],
                    symbol: map_data.markPoint_image[2],
                    symbolRotate: map_data.markPoint_value[2]
                },
                {
                    name: static_params.district_id[3],
                    symbol: map_data.markPoint_image[3],
                    symbolRotate: map_data.markPoint_value[3]
                },
                {
                    name: static_params.district_id[4],
                    symbol: map_data.markPoint_image[4],
                    symbolRotate: map_data.markPoint_value[4]
                },
                {
                    name: static_params.district_id[5],
                    symbol: map_data.markPoint_image[5],
                    symbolRotate: map_data.markPoint_value[5]
                },
                {
                    name: static_params.district_id[6],
                    symbol: map_data.markPoint_image[6],
                    symbolRotate: map_data.markPoint_value[6]
                },
                {
                    name: static_params.district_id[7],
                    symbol: map_data.markPoint_image[7],
                    symbolRotate: map_data.markPoint_value[7]
                },
                {
                    name: static_params.district_id[8],
                    symbol: map_data.markPoint_image[8],
                    symbolRotate: map_data.markPoint_value[8]
                },
                {
                    name: static_params.district_id[9],
                    symbol: map_data.markPoint_image[9],
                    symbolRotate: map_data.markPoint_value[9]
                },
                {
                    name: static_params.district_id[10],
                    symbol: map_data.markPoint_image[10],
                    symbolRotate: map_data.markPoint_value[10]
                },
                {
                    name: static_params.district_id[11],
                    symbol: map_data.markPoint_image[11],
                    symbolRotate: map_data.markPoint_value[11]
                },
                {
                    name: static_params.district_id[12],
                    symbol: map_data.markPoint_image[12],
                    symbolRotate: map_data.markPoint_value[12]
                }
            ];
            option.series[0].data = map_data.place_color;
            option.dataRange.color = map_data.map_colors;
            option.dataRange.min = Number(Average_temperature_water) - 3.5;
            option.dataRange.max = Number(Average_temperature_water) + 3;
            set_value();
            map_data.my_map.setOption(option);
        }
        //设置地图渲染颜色
        function set_map_color(is_tempreture) {
            var is_data_null = false;

            map_data.place_color = [];
            //热力图填色
            if (is_tempreture) {
                //是否重复计算平均温度
                if (map_data.refresh_average_flag) {
                    Average_temperature_water = 0;
                    var Current_temperature_water = 0;
                    var count = 0;
                    //计算平均温度
                    for (var i = 0; i < map_data.sub_data_3.length; i++) {
                        if (isNaN(parseFloat(map_data.sub_data_3[i]))) {
                            continue;
                        }
                        Average_temperature_water += Number(map_data.sub_data_3[i]);
                        count++;
                    }
                    //温度参数全为无效值
                    if (count == 0){
                        is_data_null = true;
                        set_map_default_color(is_tempreture, is_data_null);
                        return;
                    }
                    Average_temperature_water = (Average_temperature_water / count).toFixed(1);
                    Average_temperature_water = Math.floor(Number(Average_temperature_water) * 2) / 2;
                    map_data.refresh_average_flag = false;
                }
                //给地图水温色块赋值
                $("#min_tmp").html(Number(Average_temperature_water) - 3);
                $("#min_tmp_1").html(Number(Average_temperature_water) - 2);
                $("#min_tmp_2").html(Number(Average_temperature_water) - 1);
                $("#avg_tmp").html(Average_temperature_water);
                $("#max_tmp_1").html(Number(Average_temperature_water) + 1);
                $("#max_tmp_2").html(Number(Average_temperature_water) + 2);
                $("#max_tmp").html(Number(Average_temperature_water) + 3);
                $("#range").attr("min", Number(Average_temperature_water) - 3);
                $("#range").attr("max", Number(Average_temperature_water) + 3);
                //填充热力图颜色
                for (var i = 0; i < map_data.sub_data_3.length; i++) {
                    Current_temperature_water = Number(map_data.sub_data_3[i]);
                    //对无数据区域温度颜色设置为平均颜色
                    if (isNaN(parseFloat(map_data.sub_data_3[i]))) {
                        var temp = 1;
                        while (temp <= 10) {
                            map_data.place_color.push(
                                {name: place[i] + temp, value: Average_temperature_water}
                            );
                            temp++;
                        }
                        continue;
                    }
                    var step = Number((Current_temperature_water - Average_temperature_water).toFixed(1));
                    //控制色卡范围，色卡显示为正负3,0.5间隔，共12个颜色
                    var fuhao = step / Math.abs(step);
                    if(Math.abs(step) >= 3) Current_temperature_water = Current_temperature_water - (step - 3 * fuhao);
                    var count = 0;//防止死循环
                    //控制圈范围
                    if (Math.abs(step) >= 1) step = step / Math.abs(step);//默认圈表示最大温差为正负1
                    if (Math.abs(step) <= 0.5) {//一个圈
                        var temp = Math.abs(step) * 10 + 5;
                        //当前地图索引开始，序号小的都为同样颜色
                        while (temp > 0 && count < 1000) {
                            map_data.place_color.push(
                                {name: place[i] + temp, value: (Current_temperature_water).toFixed(1)}//加step将温差放大一倍
                            );
                            temp--;
                            count++;
                        }
                        temp = Math.abs(step) * 10 + 5 + 1;
                        //当前地图索引开始，序号大的都为平均颜色
                        while (temp <= 10 && count < 1000) {
                            map_data.place_color.push(
                                {name: place[i] + temp, value: Average_temperature_water}
                            );
                            temp++;
                            count++;
                        }
                    }
                    else {//两个圈
                        var temp_1 = Math.abs(step) * 10;//当前地图索引
                        var temp_2 = temp_1 - 5;//当前地图小圈索引
                        //小圈及小圈以下颜色
                        while (temp_2 > 0 && count < 1000) {
                            map_data.place_color.push(
                                {name: place[i] + temp_2, value: (Current_temperature_water).toFixed(1)}
                            );
                            temp_2--;
                            count++;
                        }
                        //大圈及大圈以下，小圈以上颜色
                        temp_2 = temp_1 - 5;//当前地图小圈索引
                        var factor = step / Math.abs(step) * 0.5;
                        while (temp_1 > temp_2 && count < 1000) {
                            map_data.place_color.push(
                                {name: place[i] + temp_1, value: (Current_temperature_water - factor).toFixed(1)}//当前温度减去0.5
                            );
                            temp_1--;
                            count++;
                        }
                        temp_1 = Math.abs(step) * 10 + 1;//当前地图索引对应的下一个地图
                        //大圈以外为平均颜色
                        while (temp_1 <= 10 && count < 1000) {
                            map_data.place_color.push(
                                {name: place[i] + temp_1, value: Average_temperature_water}
                            );
                            temp_1++;
                            count++;
                        }
                    }
                }
            }
            //加载默认渲染
            set_map_default_color(is_tempreture, is_data_null);
        }
        //设置地图默认渲染颜色
        function set_map_default_color(is_tempreture, is_data_null) {
            //当前参数为非水温 或 水温所有数据均为无效值
            if(!is_tempreture || is_data_null){
                for (var i = 0; i < map_data.data.length; i++) {
                    var temp = 1;
                    while (temp <= 10) {
                        map_data.place_color.push(
                            {name: place[i] + temp, value: Number(Average_temperature_water)}
                        );
                        temp++;
                    }
                }
            }
            //深圳海域填色
            map_data.place_color.push({name: 'haianxian_1', value: Average_temperature_water});
            map_data.place_color.push({name: 'haianxian_2', value: Average_temperature_water});
            map_data.place_color.push({name: 'haianxian_bu_chong', value: Average_temperature_water});
            //深圳地图填色
            for (var i = 0; i < SZ_place.length; i++) {
                map_data.place_color.push(
                    {name: SZ_place[i], value: Number(Average_temperature_water) - 3.5}
                );
            }
        }
        //设置地图箭头
        function set_map_arrows(is_water_flowdirection) {
			//当为风速、风向时
            if (sessionStorage.id == "02" || sessionStorage.id == "03" || sessionStorage.id == "04") {
                //伶仃南
				for (var i = 0; i < map_data.sub_data.length; i++) {
					if (is_water_flowdirection) {
						if (map_data.sub_data[i] == "--" || map_data.sub_data_2[i] == "--" ||
						    map_data.sub_data[i] == 0 || map_data.sub_data_2[i] == 0) {
							map_data.markPoint_image[i] = "image/shenzhenshi.png";
						} else if(Number(map_data.sub_data_2[i]) < 1.6){
							map_data.markPoint_image[i] = "image/wind_power1.png";
							map_data.markPoint_value[i] = "-" + map_data.sub_data[i];
						}else if(Number(map_data.sub_data_2[i]) >= 1.6 && Number(map_data.sub_data_2[i]) < 3.4){
							map_data.markPoint_image[i] = "image/wind_power2.png";
							map_data.markPoint_value[i] = "-" + map_data.sub_data[i];
						}else if(Number(map_data.sub_data_2[i]) >= 3.4 && Number(map_data.sub_data_2[i]) < 5.5){
							map_data.markPoint_image[i] = "image/wind_power3.png";
							map_data.markPoint_value[i] = "-" + map_data.sub_data[i];
						}else if(Number(map_data.sub_data_2[i]) >= 5.5 && Number(map_data.sub_data_2[i]) < 8){
							map_data.markPoint_image[i] = "image/wind_power4.png";
							map_data.markPoint_value[i] = "-" + map_data.sub_data[i];
						}else if(Number(map_data.sub_data_2[i]) >= 8 && Number(map_data.sub_data_2[i]) < 10.8){
							map_data.markPoint_image[i] = "image/wind_power5.png";
							map_data.markPoint_value[i] = "-" + map_data.sub_data[i];
						}else if(Number(map_data.sub_data_2[i]) >= 10.8 && Number(map_data.sub_data_2[i]) < 13.9){
							map_data.markPoint_image[i] = "image/wind_power6.png";
							map_data.markPoint_value[i] = "-" + map_data.sub_data[i];
						}else if(Number(map_data.sub_data_2[i]) >= 13.9 && Number(map_data.sub_data_2[i]) < 17.2){
							map_data.markPoint_image[i] = "image/wind_power7.png";
							map_data.markPoint_value[i] = "-" + map_data.sub_data[i];
						}else if(Number(map_data.sub_data_2[i]) >= 17.2 && Number(map_data.sub_data_2[i]) < 37){
							map_data.markPoint_image[i] = "image/wind_power8_12.png";
							map_data.markPoint_value[i] = "-" + map_data.sub_data[i];
						}else{
							map_data.markPoint_image[i] = "image/typhoon.png";
							map_data.markPoint_value[i] = "-" + map_data.sub_data[i];
						}
					}else{
						map_data.markPoint_image[i] = "image/shenzhenshi.png";
					}
				}
            }
            //当为流速、流向时
            else if (sessionStorage.id == "09" || sessionStorage.id == "10" || sessionStorage.id == "24") {
                //伶仃南
				for (var i = 0; i < map_data.sub_data.length; i++) {
					if (is_water_flowdirection) {
						if (map_data.sub_data[i] == "--") {
							map_data.markPoint_image[i] = "image/shenzhenshi.png";
						} else {
							map_data.markPoint_image[i] = "image/liuxiang.png";
							map_data.markPoint_value[i] = "-" + map_data.sub_data[i];
						}
					}
					else {
						map_data.markPoint_image[i] = "image/shenzhenshi.png";
					}
				}
            }
        }
        //设置地图中间最小、最大值及地点
        function set_value() {
            //地图正正中央显示最大最小值
            var target_name = map_data.markPoint_name.split("(")[0];
            var target_unit = "";
            if (map_data.markPoint_name.split("(").length >= 2) {
                target_unit = map_data.markPoint_name.split("(")[1].substring(0, map_data.markPoint_name.split("(")[1].length - 1);
            }
            //获取最大、最小值，及对应地点
            get_max_min(map_data.data);
            $("#showSize .show_name").html(target_name);
            $("#showSize .show_max_name").html(show_size.show_max_name);
            $("#showSize .show_max_data").html(show_size.show_max_data + target_unit);
            $("#showSize .show_min_name").html(show_size.show_min_name);
            $("#showSize .show_min_data").html(show_size.show_min_data + target_unit);
        }
        //获取当前参数最小、最大值及地点
        function get_max_min(para_data) {
            //计算最大最小地点及对应值
            var min_data = 9999;
            var min_name = "";
            var max_name = "";
            var max_data = 0;
            for (var i = 0; i < para_data.length; i++) {
                if (para_data[i] == "--") continue;
                if (Number(min_data) >= para_data[i]) {
                    min_data = para_data[i];
                    min_name = data.district_name[i]
                }
                if (Number(max_data) <= para_data[i]) {
                    max_data = para_data[i];
                    max_name = data.district_name[i]
                }
            }
            //对无有效值时，进行处理
            if (min_name == "") {
                show_size.show_min_data = "--";
                show_size.show_min_name = "";
            }
            else {
                show_size.show_min_data = min_data;
                show_size.show_min_name = min_name;
            }
            if (max_name == "") {
                show_size.show_max_data = "--";
                show_size.show_max_name = "";
            }
            else {
                show_size.show_max_data = max_data;
                show_size.show_max_name = max_name;
            }
        }
        //倒计循环显示前8小时时间，获取后台数据并保存
        function start_loop_value() {
            $("#back_time").val(localStorage.CURRENT_TIME);
            var back_time = new Date($("#back_time").val().replace(/-/g,"/")).getTime();
            var loop_time = [localStorage.CURRENT_TIME];
            var i = 1;
            while (i < 16) {
                var new_time = date.get_date(new Date(back_time - i * date.min_ms * 30));
                var new_year_day = new_time.split(" ")[0];
                var hour_sec = new_time.split(" ")[1];
                new_time =  new_year_day + " " + hour_sec.split(":")[0] + ":" + hour_sec.split(":")[1];
                loop_time.push(new_time);
                i++;
            }
            var index = loop_time.length - 1;//时间最早处开始
            var history_id = "24";
            var loop_flag = false;
            var mousewheel_status = false;
            var loop_value = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
            var fangxiang_value = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
            var sudu_value = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
            var wendu_value = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
            //当参数为水温时，每隔5秒刷新一次热力图
            setInterval(function () {
                //当为多指标综合对比时，禁止渲染
                if($("#ComprehensiveContrast").text() == "单指标综合对比")
                    mousewheel_status = true;

                var current_param;
                if (sessionStorage.id != history_id) {
                    history_id = sessionStorage.id;
                    loop_flag = false;//说明当前有切换，需重新查询数据
                    index = loop_time.length - 1
                }
                if (sessionStorage.id == undefined)
                    current_param = "temperature_water";
                else
                    current_param = static_params.abnormalRes(sessionStorage.id);
                //流速、水温时查询数据
                if ((sessionStorage.id == undefined || sessionStorage.id == 24
                    || sessionStorage.id == 10 || sessionStorage.id == 09
                    || sessionStorage.id == 02 || sessionStorage.id == 03 || sessionStorage.id == 04)
                    && !mousewheel_status) {
                    //首次进入需查询数据库，将需循环值放入循环数组
                    if (!loop_flag) {
                        if (sessionStorage.id == 02 || sessionStorage.id == 03 || sessionStorage.id == 04) {
                            data.bar_data_update(loop_time[index] + ":00", "speed_wind", "02");
                            data.bar_data_update(loop_time[index] + ":00", "direction_wind", "03");
                            data.bar_data_update(loop_time[index] + ":00", "temperature_air", "04");
                            //刷新地图
                            for (var i = 0; i < data.bardata["speed_wind"].length; i++) {
                                loop_value[index][i] = data.bardata[current_param][i];
                                wendu_value[index][i] = data.bardata["temperature_air"][i];
                                sudu_value[index][i] = data.bardata["speed_wind"][i];
                                fangxiang_value[index][i] = data.bardata["direction_wind"][i];
                            }
                        }
                        if (sessionStorage.id == 10 || sessionStorage.id == 09 || sessionStorage.id == 24) {
                            data.bar_data_update(loop_time[index] + ":00", "temperature_water", "24");
                            data.bar_data_update(loop_time[index] + ":00", "flowdirection", "10");
                            data.bar_data_update(loop_time[index] + ":00", "flowvelocity", "09");

                            //刷新地图
                            for (var i = 0; i < data.bardata["temperature_water"].length; i++) {
                                loop_value[index][i] = data.bardata[current_param][i];
                                wendu_value[index][i] = data.bardata["temperature_water"][i];
                                fangxiang_value[index][i] = data.bardata["flowdirection"][i];
                                sudu_value[index][i] = data.bardata["flowvelocity"][i];
                            }
                        }
                    }

                    map_data.data = loop_value[index];//当前选中参数
                    map_data.sub_data_3 = wendu_value[index];
                    map_data.sub_data = fangxiang_value[index];
                    map_data.sub_data_2 = sudu_value[index];
                    //进行水温、流速、流向渲染
                    set_map_color(true);
                    set_map_arrows(true);
                    refresh_map();
                    $("#back_time").val(loop_time[index]);
                    index--;
                    if (index < 0) {
                        loop_flag = true;
                        index = loop_time.length - 1;//时间最早处开始
                    }
                }
                else
                    mousewheel_status = false;
            }, 1000);
            //鼠标滚动时，禁止地图刷新
            window.onmousewheel = function () {
                mousewheel_status = true;
            };
            //鼠标离开地图提示框消失
            $("#ocean_map").mouseout(function () {
                $(".echarts-tooltip div").hide();
                $(".echarts-tooltip div").css("display", "none");
            });
        }
    });
