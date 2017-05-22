define(["echarts", "echarts/chart/line"], function (echarts) {
    var resizeContainer = window.onresize = function () {
        var bodyWidth = $("#body").outerWidth(true)/2 + "px";
        $(".bottomTrend").css("width", bodyWidth);
    };
    var trend_data = {
        area_data: ["水温"],
        //area_data: ["氨氮","硝酸盐","亚硝酸盐","磷酸盐"],
        my_bar: "",
        element_id: "trend",
        title_flag: "true",
        xAxisData:['周一','周二','周三','周四','周五','周六','周日'],
        //data: [
//            [19.15,28.95,18.48, 19.35, 30.15, 18.51,29.38],//深圳湾
//        ],
        data:[
            [19.15,28.95,18.48, 19.35, 30.15, 18.51,29.38],
            [19.15,28.95,18.48, 19.35, 30.15, 18.51,29.38],
            [19.15,28.95,18.48, 19.35, 30.15, 18.51,29.38],
            [19.15,28.95,18.48, 19.35, 30.15, 18.51,29.38]
        ],
    };
    resizeContainer();
    //area_data = trend_data.area_data;
    return {
        update_trend: trend_data,
        show_trend: function () {
            //var my_trend = echarts.init(document.getElementsByClassName("trend")[0]);
            trend_data.my_bar = echarts.init(document.getElementsByClassName(trend_data.element_id)[0]);
            option = {
                backgroundColor: "#D6EBFF",
                title : {
                    text: "",
                    textStyle:
                    {
                        color: "#6e818c",
                        fontFamily: "sans-serif",
                        fontSize: 12
                    },
                    padding: [5, 5, 10, 35]
                },
				noDataLoadingOption :{
					text: '暂无数据',
					effect:'bubble',
					effectOption : {
						effect: {
							n: 0 //气泡个数为0 
						}
					}
				},
                tooltip : {
                    trigger: "axis",
                    padding:[5, 5, 5, 5],
                    textStyle:
                    {
                        fontSize: 10
                    },
                    //formatter: function (params) {
                    //return (params[0].name +" : " + params[0].value +"%");
                    //}//修改标签显示格式
                },
                grid: { // 控制图的大小，调整下面这些值就可以，
                    height: "70%",
                    width: "93%",
                    x: "48px",
                    y: "13%"
                },
                toolbox: {
                    show : false
                },
                calculable : false,
                xAxis : [
                    {
                        type : 'category',
                        data : trend_data.xAxisData,
                        offset: 30,
                        boundaryGap: false,
                        splitArea: {           // 分隔区域
                        show: true,       // 默认不显示，属性show控制显示与否
                        // onGap: null,
                        areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                            //color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
                            color: 'rgba(217,223,229,0.6)'
                                    }
                    },
                    }
                    
                ],
                yAxis : [
                    {
                        type : 'value',
                        scale: true,
                        //axisLabel : {
//                           formatter: '{value}%'
//                       }
                    }
                ],
                series:function(){
                    var serie = [];
                    for(var i = 0; i < trend_data.area_data.length; i++){
                        var item = {
                            name: trend_data.area_data[i],
                            type: "line",
                            smooth: true,
                            itemStyle:{
                                normal:{
                                    lineStyle:{
                                        color:"#32b16c"
                                    }
                                }
                            },
                            data: trend_data.data[i]
                        };
                        serie.push(item);
                    }
                    return serie;
                }()
            };
            trend_data.my_bar.setOption(option);
            window.onresize = function () {
                //重置容器高宽
                resizeContainer();
                trend_data.my_bar.resize();
            };
        }
    }
});