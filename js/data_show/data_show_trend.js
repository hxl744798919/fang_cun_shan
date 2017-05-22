define(
    ["echarts",
        "echarts/chart/line"],
    function (ec) {
        var get_option = function(){
            return {
                noDataLoadingOption: {
                    effect: 'bubble',
                    effectOption: {
                        backgroundColor:"rgba(0,0,0,0)",
                        effect: {
                            n: 0
                        }
                    }
                },
                backgroundColor: "#D6EBFF",
                title: {
                    show: trend_data.title_flag,
                    text: trend_data.name,
                    textStyle: {
                        color: "#6e818c",
                        fontFamily: "sans-serif",
                        fontSize: 12
                    },
                    padding: [5, 5, 10, 15]
                },
                tooltip: {
                    trigger: "axis",
                    padding:[5, 5, 5, 5],
                    showDelay: 0,
                    hideDelay: 0,
                    transitionDuration: 0,
                    enterable: false,
                    position : function(p) {
                        // 位置回调
                        return [p[0], p[1] - 100];
                    },
                    textStyle:
                        {
                            fontSize: 10
                        },
                    formatter: function (params, ticket, callback) {
                        var res ="";
                        var p1 = "";
                        var p2 = "";
                        //提示框周处理
                        if(params[0].name.substring(params[0].name.length-1,params[0].name.length)=="周"){
                            var year = parseInt(params[0].name.split("-")[0]);
                            var week = parseInt(params[0].name.split("-")[1]);
                            var stime = "";
                            var etime = "";
                            function calcu(){
                                var yearStart = new Date(year,0,1);    //设置该年1.1.
                                var firstDay = yearStart.getDay();    //星期
                                var yearEnd = new Date(year,11,31);    //设置该年12.31.
                                var endDay = yearEnd.getDay();        //星期
                                //判断输入是否超过最大周次.
                                var maxWeek;    //该年最大周次.1.1.在周一到周四,则为该年第一周,否则为上年最后一周.
                                if((firstDay>=1&&firstDay<=4)&&(endDay==0||endDay==4||endDay==5||endDay==6))
                                {
                                    maxWeek = 53;    //1.1.和12.31.都在本年,则该年有53周,否则52周
                                }
                                else
                                {
                                    maxWeek = 52;
                                }

                                //对1.1.所在周的前后几天特殊处理.
                                if(firstDay>=0&&firstDay<=4)  {other = firstDay;}
                                else {other = firstDay - 7}
                                //距离当年1.1.的总天数
                                days = (parseInt(week,10)-1)*7 - other;
                                //转换成Ms.......
                                var oneMinute = 60 * 1000;
                                var oneHour = oneMinute * 60;
                                var oneDay = oneHour * 24;
                                //1.1.至1/1/70的毫秒数
                                var dateInMs = yearStart.getTime();
                                //当前所选周第一天离1/1/70的毫秒数.
                                dateInMs += oneDay * days;
                                //日期调整(设置1/1/70至今的毫秒数)
                                yearStart.setTime(dateInMs);
                                //当前所选周最后一天处理,同上.
                                var weekEnd = new Date(parseInt(year),0,1);
                                var dateInMs1 = weekEnd.getTime ();
                                dateInMs1 += oneDay * (days + 6);
                                weekEnd.setTime(dateInMs1);
                                var month = yearStart.getMonth() + 1;
                                if(month<10) { month = "0" + month;}
                                var day = yearStart.getDate();
                                if(day<10) { day = "0" + day;}
                                var month1 = weekEnd.getMonth() + 1;
                                if(month1<10) { month1 = "0" + month1;}
                                var  day1 = weekEnd.getDate();
                                if(day1<10) { day1 = "0" + day1;}
                                stime = yearStart.getFullYear() + "-" + month + "-" + day;
                                etime = weekEnd.getFullYear() + "-" + month1 + "-" + day1;
                            }
                            calcu();
                            res = "<p style='text-align:center;font-weight: bold; color:yellow;margin-bottom:5px;line-height: 10px'>" + stime +" <span style='display: inline-block;'> ~ </span> "+ etime + "<p>";
                        }else{
                            res = "<p style='text-align: center;font-weight: bold; color:yellow;margin-bottom:5px'>" + params[0].name + "<p>";
                        }
                        for (var i = 0, l = params.length; i < l; i++) {
                            for(var j= i + 1; j < params.length; j++){
                                if(params[i].value =="-"){
                                    params[i].value = -1;
                                }
                                if(parseFloat(params[i].value) < parseFloat(params[j].value)){
                                    var null_value = params[i].value;
                                    params[i].value = params[j].value;
                                    params[j].value = null_value;
                                    var null_name = params[i].seriesName;
                                    params[i].seriesName = params[j].seriesName;
                                    params[j].seriesName = null_name;
                                }
                            }
                            if(params[i].value == -1){
                                params[i].value = "-";
                            }
                            if(i >= 0 && i <= 5){
                                var p ="";
                                p1 += params[i].seriesName + ": "  + params[i].value + " ";
                            }
                            else if(i > 5 && i <= 12){
                                p2 += params[i].seriesName + ": "  + params[i].value + " ";
                            }
                        }
                        res += p1 + "<br>";
                        res += p2;
                        return res;
                    }//修改标签显示格式
                },
                legend: {
                    show: trend_data.legend_flag,
                    data: area_data,
                    selected: JSON.parse(sessionStorage.legend),
                    padding: [5, 5, 5, 15]
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ["line", "bar", "stack", "tiled"]},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: false,
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false,
                        splitArea: {           // 分隔区域
                            show: true,       // 默认不显示，属性show控制显示与否
                            // onGap: null,
                            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                                //color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
                                color: ['rgba(217,223,229,0.6)', 'rgba(217,223,229,0.6)']
                            }
                        },
                        data: trend_data.xAxisData,
                        axisLabel: {
                            textStyle: {
                                color: "#6e818c",
                                fontFamily: "sans-serif",
                                fontSize: 12
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        scale: true
                    }
                ],
                grid: { // 控制图的大小，调整下面这些值就可以，
                    x: "4%",
                    x2: "0%",
                    height: "65%",
                    width: "93%",
                    y: "20%",
                    y2: ""//y2可以控制X轴跟Zoom控件之间的间隔，避免以为倾斜后造成label重叠到zoom上
                },
                series: function () {
                    var serie = [];
                    for (var i = 0; i < area_data.length; i++) {
                        var item = {
                            name: area_data[i],
                            type: "line",
                            smooth: true,
                            data: trend_data.data[i]
                        };
                        serie.push(item);
                    }
                    return serie;
                }()
            }
        };
        //    单指标变量
        var trend_data = {
            single_trend: "",
            type: "temperature_water",
            data: [
                [28.48, 9.35, 13.15, 28.51, 9.38, 29.15, 28.95, 18.48, 19.35, 30.15, 18.51, 29.38, 19.15, 28.95, 18.48, 19.35, 30.15, 18.51, 29.38, 19.15, 28.95, 28.48, 9.35, 13.15, 28.51, 9.38, 29.15, 28.95, 18.48, 19.35, 30.15, 18.51, 29.38, 19.15, 28.95, 18.48, 19.35, 30.15, 18.51, 29.38, 19.15, 28.95],//深圳湾
                [18.48, 19.35, 30.15, 18.51, 29.38, 19.15, 28.95],//沙井
                [2.48, 2.35, 3.15, 2.51, 2.38, 9.15, 8.95],//矾石
                [8.48, 9.35, 3.15, 8.51, 9.38, 9.15, 2.95],//伶仃南
                [1.48, 2.35, 2.15, 28.1, 29.8, 2.15, 2.95],//沙头角
                [2.48, 2.35, 30.1, 2.51, 9.38, 9.1, 2.9],//大梅沙
                [4.48, 3.35, 2.35, 28.51, 29.38, 29.15, 28.95],//秤头角
                [5.48, 7.35, 3.35, 2.35, 29.38, 29.15, 28.95],//南澳
                [6.48, 9.35, 30.15, 3.35, 2.35, 29.15, 28.95],//磨刀坑
                [7.48, 3.35, 5.35, 28.51, 3.35, 2.35, 28.95],//穿鼻岩
                [8.48, 5.35, 30.15, 5.35, 29.38, 3.35, 2.35],//虎头山
                [11.48, 7.35, 5.35, 28.51, 29.38, 29.15, 28.95],//长山尾
                [12.48, 9.35, 30.15, 5.35, 29.38, 5.35, 28.95],//廖哥角
            ],
            name: "水温(°C)",
            legendselected: {
                "深圳湾": false,
                "沙井": false,
                "矾石": false,
                "伶仃南": false,
                "沙头角": false,
                "大梅沙": true,
                "下沙": false,
                "南澳": false,
                "大鹏湾口": false,
                "东涌": false,
                "东山": false,
                "核电站": false,
                "坝光": false
            },
            xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            element_id: "trend_show",
            title_flag: "true",
            legend_flag: "true"
        };
        var area_data = ['深圳湾','沙井','矾石','伶仃南','沙头角','大梅沙','下沙','南澳','大鹏湾口','东涌','东山','核电站','坝光'];
        var ecConfig = require('echarts/config');

        return {
            update_data: trend_data,
            new_trend:function(){
                // 为echarts对象加载数据
                var new_trend = ec.init(document.getElementById(trend_data.element_id));
                var my_option = get_option();
                new_trend.setOption(my_option);
                new_trend.on(ecConfig.EVENT.LEGEND_SELECTED, function (param){
                    sessionStorage.legend = JSON.stringify(param.selected);
                });
                return new_trend;
            },
            refresh_trend: function (trend_object) {
                var my_option = get_option();
                trend_object.clear();
                trend_object.setOption(my_option);
            },
            destroy_trend: function (trend_object) {
                trend_object.dispose();
            },
            legend_click_event: function(trend_object){
                trend_object.on(ecConfig.EVENT.LEGEND_SELECTED, function (param){
                    var name = param.target;
                    var value = param.selected;
                    var is_true = [];
                    for(var name in value){
                        if(value[name] ==true){
                            is_true.push(value[name]);
                        }
                    }
                    if(is_true.length == 13){
                        $(".AllCheck").children("#isAllCheck").prop("checked", true);
                        $(".AllCheck").children("label").html("取消");
                    }else{
                        $(".AllCheck").children("#isAllCheck").prop("checked", false);
                        $(".AllCheck").children("label").html("全选");
                    }
                })
            }

        }
    });