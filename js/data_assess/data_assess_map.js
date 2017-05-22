define(
    ["echarts", "assess_data", "trend","data_assess_tooltip" ,"jquery_ui","echarts/chart/map"],
    function(ec ,assess_data,trend,data_assess_tooltip) {
        var map_data = {
            my_map: "",
            my_option:"",
            mouseX:"",
            mouseY:"",
            //地图地理位置方法
            map_location:function(map_name){
                switch (map_name){
                    case "鱼礁区":
                        if(!flag){
                            map_data.my_option.series[0].mapLocation.x="-1750.0001";
                            map_data.my_option.series[0].mapLocation.y="-650.00000001";
                            map_data.my_option.series[0].mapLocation.width="3500.000001";;
                            map_data.my_option.series[0].mapLocation.height="3000.000001";
                            flag= !flag;
                        }
                        else{
                            map_data.my_option.series[0].mapLocation.x="-1750";
                            map_data.my_option.series[0].mapLocation.y="-650";
                            map_data.my_option.series[0].mapLocation.width="3500";
                            map_data.my_option.series[0].mapLocation.height="3000";
                            flag= !flag;
                        }
                        break;
                    case "排污区":
                        if(!flag){
                            map_data.my_option.series[0].mapLocation.y="-310.000001";
                            map_data.my_option.series[0].mapLocation.x="-340.00000001";
                            map_data.my_option.series[0].mapLocation.width="4000.00001";
                            map_data.my_option.series[0].mapLocation.height="1800.000001";
                            flag= !flag;
                        }
                        else{
                            map_data.my_option.series[0].mapLocation.y="-310";
                            map_data.my_option.series[0].mapLocation.x="-340";
                            map_data.my_option.series[0].mapLocation.width="4000";
                            map_data.my_option.series[0].mapLocation.height="1800";
                            flag= !flag;
                        }
                        break;
                    case "增养殖区":
                        if(!flag){
                            map_data.my_option.series[0].mapLocation.x="-270.0001";
                            map_data.my_option.series[0].mapLocation.y="-295.000001";
                            map_data.my_option.series[0].mapLocation.width="4500.0001";
                            map_data.my_option.series[0].mapLocation.height="1500.0001";

                            flag= !flag;
                        }
                        else{
                            map_data.my_option.series[0].mapLocation.x="-270";
                            map_data.my_option.series[0].mapLocation.y="-295";
                            map_data.my_option.series[0].mapLocation.width="4500";
                            map_data.my_option.series[0].mapLocation.height="1500";
                            flag= !flag;
                        }
                        break;
                    case "海水浴场":
                        if(!flag){
                            map_data.my_option.series[0].mapLocation.x="-2000.0001";
                            map_data.my_option.series[0].mapLocation.y="-900.000001";
                            map_data.my_option.series[0].mapLocation.width="4500.00001";
                            map_data.my_option.series[0].mapLocation.height="3500.00001";
                            flag= !flag;
                        }
                        else{
                            map_data.my_option.series[0].mapLocation.x="-2000";
                            map_data.my_option.series[0].mapLocation.y="-900";
                            map_data.my_option.series[0].mapLocation.width="4500";
                            map_data.my_option.series[0].mapLocation.height="3500";

                            flag= !flag;
                        }
                        break;
                    case "旅游区":
                        if(!flag){
                            map_data.my_option.series[0].mapLocation.x="65.000001";
                            map_data.my_option.series[0].mapLocation.y="0.00000001";
                            map_data.my_option.series[0].mapLocation.width="2025";
                            map_data.my_option.series[0].mapLocation.height="1220";
                            flag= !flag;
                        }
                        else{
                            map_data.my_option.series[0].mapLocation.x="65";
                            map_data.my_option.series[0].mapLocation.y="0";
                            map_data.my_option.series[0].mapLocation.width="2025";
                            map_data.my_option.series[0].mapLocation.height="1220";
                            flag= !flag;
                        }
                        break;
                }


                map_data.my_map.setOption(map_data.my_option);
                if(slide ===true){
                    map_data.my_map.restore();
                    slide=false;
                }

            }
        };
        // 基于准备好的dom，初始化echarts图表
        map_data.my_map = ec.init(document.getElementById('assess_map'));
        var cityMap = {
            "深圳海岸线": "sz_coastline_geo"
        };
        var curIndx = 0;
        var mapType = [];
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
        };
         map_data.my_option = {
            backgroundColor: "#E5E5E5",
            series : [
                {
                    name: "",
                    clickable: false,
                    type: "map",
                    radius : "50%",
                    center: ["100%", "100%"],
                    mapType: "深圳海岸线",
                    hoverable: false,
                    selectedMode : false,
                    tooltip : {
                    },
                    itemStyle:{
                        normal:{
                            color: "#5A7AA1",
                            label: {
                                show: true,
                                textStyle:{
                                    color: "transparent"
                                }
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    roam: true,
                    scaleLimit:{min:1,max:10},
                    //显示主地图的位置及其大小
                    mapLocation: {
                        x: "110",
                        y: "",
                        width: 2025,
                        height: 1220
                    },
                    data : [],
                    //地理气泡
                    markPoint: {
                        symbol: "",
                        symbolSize: 16,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                        itemStyle: {
                            normal: {
                                borderWidth: "5",
                                label: {
                                    show: true,
                                    position: "bottom",
                                    formatter: function(param){
                                        return param.name
                                    },
                                    textStyle: {
                                        color: "#000",
                                        baseline:"left"
                                    }
                                }
                            },
                            emphasis: {
                                borderWidth: 40,
                                label: {
                                    show: false
                                }
                            }
                        },
                        data :[
                        ],
                    },
                    geoCoord: {
                        "小梅沙浴场": [114.3257972,22.60395556],
                        "大梅沙浴场": [114.3044778,22.59466111],
                        "西涌海水浴场": [114.53994,22.476257],
                        "东涌海水浴场": [114.59697,22.496329],
                        "七星湾帆船运动区": [114.5377,22.57228],
                        "宝安海上田园风光旅游区": [113.75627,22.70511],
                        "前海城市景观旅游区": [113.87899,22.534128],
                        "海上世界旅游用海区": [113.91596,22.479033],
                        "滨海大道城市景观旅游区": [113.97433,22.521414],
                        "沙头角城市景观旅游区": [114.23294,22.54969],
                        "溪涌度假旅游区": [114.35883,22.60829],//不出图标
                        "迭福度假旅游区": [114.42811,22.591322],
                        "下沙度假旅游区": [114.45068,22.566645],
                        "南澳度假旅游区": [114.47606,22.546246],
                        "西涌度假旅游区": [114.54058,22.473974],
                        "大鹏金海湾度假旅游区": [114.51706,22.585251],
                        "大、小梅沙度假旅游区": [114.31272,22.595909],
                        "东宝河口排污区": [113.74631,22.736729],
                        "西乡排污区": [113.83862,22.561003],
                        "妈湾排污区": [113.84827,22.46679],
                        "蛇口—赤湾排污区": [113.90467,22.47400],
                        "盐田—沙头角排污区": [114.2403,22.55284],
                        "乌泥涌排污区": [114.41721,22.602341],
                        "核电站热排水区": [114.55589,22.597998],
                        "杨梅坑人工鱼礁区": [114.56062,22.565922],
                        "矾石贝类护养增殖区": [113.75659,22.50631],
                        "南澳浅海养殖区": [114.48103,22.525999],
                        "鹅公湾浅海养殖区": [114.47792,22.488426],
                        "大鹏半岛西南浅海增养殖区": [114.48999,22.461149],
                        "大鹏半岛东部浅海增养殖区": [114.61006,22.534309],
                        "东山浅海养殖区": [114.5145,22.55942],
                        "虎头门浅海增养殖区": [114.58689,22.636192],
                        "宝安工业湾区": [113.67214,22.677796],
                        "蛇口—大铲湾港区": [113.83268,22.533405],
                        "蛇口东角头湾区": [113.93775,22.47867],
                        "盐田港区": [114.26466,22.567186],
                        "下洞—沙鱼涌港区": [114.38608,22.610001],
                        "秤头角港口和电厂用海区": [114.43044,22.57369],
                        "": [114.06005859375,  23.77026416023979],
                    }
                }
            ]
        };
        var ecConfig = require('echarts/config');
        var slide=false;
        var flag = false;//这个变量用来判断地图什么时候位置什么时候不移动
        map_data.my_map.on(ecConfig.EVENT.MAP_ROAM, function () {
            slide=true;
        });
        map_data.my_map.on('click', function (params) {
            $(this).css("cursor","move");
            $(".place").text(params.name);
            $(".miniPlace").text(params.name);
            if(params.name !== undefined){
				$("#area_parameter div div:eq(0)").click();
                var imgs = $("div.rightTop ul.checkBox img");
                var checkBoxText ;
                var zero = 0;
                var click_toparea = $(".place").text().replace(/[—、]/g,"_");			//获取点击默地区
                var trend_data = assess_data.district_name;
                var funcareatype = $(".checkBox .checkColor").text();
                var update_trend_data = assess_data.district_name[funcareatype][click_toparea].district_value;
                var trend_data_y = [];
                trend.update_trend.data = [];
                trend.update_trend.element_id = "trend";
                trend.update_trend.title_flag = true;
                trend.update_trend.xAxisData = assess_data.district_name[funcareatype][click_toparea].district_time;
                for(var i = 0; i < update_trend_data.length; i++){
                    if(update_trend_data[i][zero] == undefined){
                        trend_data_y.push("-");
                    }else{
                        trend_data_y.push(update_trend_data[i][zero]);
                    }
                }
                trend.update_trend.data[0] = trend_data_y;	//Y軸
                trend.update_trend.legend_flag = true;
                trend.update_trend.name = funcareatype;
                trend.show_trend();
                //循环看选中的是哪个区
                for(var i = 0; i < imgs.length; i++){
                    if($(imgs[i]).attr("src") === "image/radio-select.png"){
                        checkBoxText =  $(imgs[i]).parent().parent().text();
                        break;
                    }
                }
                //判断tooplips里面有没有当前点击的提示框有
                var  isTooplips = function (name){
                    var thisToolips= $(".tooltip_head>p");

                    for(var i = 0;i<thisToolips.length ;i++){
                        if($(thisToolips[i]).text() == name){
                            whereToopips = false;
                            break;
                        }
                        else{
                            whereToopips = true;
                        }
                    }
                }
                var paramsName = params.name.replace(/[—、]/g,"_");//改变点击名的方式以便下面在data里面取值
                switch (checkBoxText){
                    case "鱼礁区":
                        map_data.map_location("鱼礁区");//地图定位
                        var whereToopips = true;
                        isTooplips(params.name);
                        if(whereToopips){
                            data_assess_tooltip.yjq_apptoop(params.name,checkBoxText,paramsName);
                        }
                        break;
                    case "港湾区":
                        var whereToopips = true;
                        isTooplips(params.name);
                        if(whereToopips){
                            $("#tooltips").append('<div class = "tooltip"  style="position: absolute;left: 555px ;top: 255px;">\
                                            <div class="tooltip_head" >\
                                            <p>'+params.name+'</p>\
                                            <span>（良）</span>\
                                        <span class="close"></span>\
                                        </div>\
                                        <div class="tooltop_details">\
                                            <div class="outer details" style="text-align: center">\
                                            <div class="tooltop_print outer" style="display: inline-block;float: none">\
                                            <img src="image/OWemulsion_yes.png" alt="">\
                                            <div>\
                                            <span class="szy">32ml</span>\
                                        <p>水中油</p>\
                                        </div>\
                                        <span class="fa fa-long-arrow-down"></span>\
                                            </div>\
                                            </div>\
                                            <p class="text_description" style="border-top: 1px solid #6fb7ef">大梅沙海滨公园于1999年6月18日建成，建设总投入高达1.2亿元，是广东省5A级旅游景区。位于深圳特区东部、风光旖旎。这里三面环</p>\
                                        </div>\
                                        </div>');
                        }
                        data_assess_tooltip.tradeImgs(params.name);
                        setTimeout(function(){$(".tooltip_head>p:contains("+params.name+")").parents(".tooltip").css({left:map_data.mouseX+"px",top:map_data.mouseY+"px"})},100)
                        $(".tooltip_head>p:contains("+params.name+")").parents().css("background","#cdccec");
                        break;
                    case "排污区":
                        map_data.map_location("排污区");
                        var whereToopips = true;
                        isTooplips(params.name);
                        if(whereToopips){
                            data_assess_tooltip.pwq_apptoop(params.name,checkBoxText,paramsName);
                        }


                        break;
                    case "增养殖区":
                        map_data.map_location("增养殖区");
                        var whereToopips = true;
                        isTooplips(params.name);
                        if(whereToopips){
                            data_assess_tooltip.zyzq_apptoop(params.name,checkBoxText,paramsName);
                        }
                        break;
                    case "海水浴场":
                        map_data.map_location("海水浴场");
                        var whereToopips = true;
                        isTooplips(params.name);
                        if(whereToopips) {
                            data_assess_tooltip.hsyc_apptoop(params.name,checkBoxText,paramsName);
                        }
                        break;
                    case "旅游区":
                        map_data.map_location("旅游区");
                        var whereToopips = true;
                        isTooplips(params.name);

                        if(whereToopips) {
                            data_assess_tooltip.nyq_apptoop(params.name,checkBoxText,paramsName);
                        }
                        break;
                }
            }

        })
        return {
            update_data: map_data,
            show_map:
                function () {
                    // 为echarts对象加载数据
                    map_data.my_map.setOption(map_data.my_option);
                }
        }
    });
