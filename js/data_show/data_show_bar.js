define(
    ["echarts", "data", "echarts/chart/bar", "static"],
    function(ec, data) {
    var bar_data = {
        type: "temperature_water",
        data: data.bardata["temperature_water"],//[28.48, 29.35, 30.15, 28.51,29.38, 29.15,28.95, 28.16,28.49,28.93,29.51,31.98,28.83],
        name: "水温(°C)",
        element_id: "datashowbar",
        title_flag: "true"
	};
    var get_option = function () {
        return {
            backgroundColor: "#D6EBFF",

            title: {
                show: bar_data.title_flag,
                text: bar_data.name,
                textStyle:
                    {
                        color: "#6e818c",
                        fontFamily: "sans-serif",
                        fontSize: 12
                    },
                padding: [5, 5, 10, 15]
            },
            tooltip: {
                trigger: 'item',
                formatter: "{c}"
            },
            calculable: false,
            xAxis: [
                {
                    type: "category",
                    splitLine: {show: false},//去掉网格线
                    splitArea: {           // 分隔区域
                        show: true,       // 默认不显示，属性show控制显示与否
                        // onGap: null,
                        areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                            //color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
                            color: ['rgba(216,216,254,0.6)','rgba(216,216,254,0.6)']
                        }
                    },
                    data: ['深圳湾','沙井','矾石','伶仃南','沙头角','大梅沙','下沙','南澳','大鹏湾口','东涌','东山','核电站','坝光'],
                    axisLabel: {
                        show: true,
                        interval: 0,    // {number}
                        rotate: 0, /*角度*/
                        formatter: function(params){
                            var newParamsName = "";// 最终拼接成的字符串
                            var paramsNameNumber = params.length;// 实际标签的个数
                            var provideNumber = 6;// 每行能显示的字的个数
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                            //换行的话，需要显示几行，向上取整
                            /**
                             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                             */
                            // 条件等同于rowNumber>1
                            if (paramsNameNumber > provideNumber) {
                                /** 循环每一行,p表示行 */
                                for (var p = 0; p < rowNumber; p++) {
                                    var tempStr = "";// 表示每一次截取的字符串
                                    var start = p * provideNumber;// 开始截取的位置
                                    var end = start + provideNumber;// 结束截取的位置
                                    // 此处特殊处理最后一行的索引值
                                    if (p == rowNumber - 1) {
                                        // 最后一次不换行
                                        tempStr = params.substring(start, paramsNameNumber);
                                    }
                                    else {
                                        // 每一次拼接字符串并换行
                                        tempStr = params.substring(start, end) + "\n";
                                    }
                                    newParamsName += tempStr;// 最终拼成的字符串
                                }
                            }
                            else {
                                // 将旧标签的值赋给新标签
                                newParamsName = params;
                            }
                            //将最终的字符串返回
                            return newParamsName;
                        },
                        textStyle: {
                            color: '#6e818c',
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        }
                    }
                }
            ],
            grid: { // 控制图的大小，调整下面这些值就可以，
                x: "3%",
                x2: "0%",
                height:'65%',
                width:'94%',
                y: "20%",
                y2: "5%"//y2可以控制X轴跟Zoom控件之间的间隔，避免以为倾斜后造成label重叠到zoom上
            },
            yAxis: [
                {
                    //name:bar_data.name,
                    type : "value",
                    splitNumber: 4, //设置y轴间隔个数
                    axisLabel: {
                        formatter: "{value}"
                    }
                }
            ],
            series: [
                {
                    //name:bar_data.name,
                    type: "bar",
                    barWidth: 21,
                    data: bar_data.data,
                    itemStyle: {
                        normal: {
                            color: "#8383F7",
                            label: {
                                show: false,
                                textStyle: {
                                    color: "#800080"
                                }
                            }
                        }
                    }//设置柱子颜色
                }
            ]
        };
    };

    return {
	    update_data: bar_data,
		//新增柱状图，返回柱状图对象
        new_bar: function() {
			// 基于准备好的dom，初始化echarts图表
            var new_bar = ec.init(document.getElementById(bar_data.element_id));
			// 为echarts对象加载数据
            var my_option = get_option();
            new_bar.setOption(my_option);
            return new_bar;
		},
		refresh_bar: function (bar_object) {
            // 为echarts对象加载数据
            // var option = {
            //     backgroundColor: "#D6EBFF",
            //
            //     title: {
            //         show: bar_data.title_flag,
            //         text: bar_data.name,
            //         textStyle:
            //             {
            //                 color: "#6e818c",
            //                 fontFamily: "sans-serif",
            //                 fontSize: 12
            //             },
            //         padding: [5, 5, 10, 15]
            //     },
            //     tooltip: {
            //         trigger: 'item',
            //         formatter: "{c}"
            //     },
            //     calculable: false,
            //     xAxis: [
            //         {
            //             type: "category",
            //             splitLine: {show: false},//去掉网格线
            //             splitArea: {           // 分隔区域
            //                 show: true,       // 默认不显示，属性show控制显示与否
            //                 // onGap: null,
            //                 areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
            //                     //color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
            //                     color: ['rgba(216,216,254,0.6)','rgba(216,216,254,0.6)']
            //                 }
            //             },
            //             data: ['深圳湾','沙井','矾石','伶仃南','沙头角','大梅沙','秤头角','南澳','磨刀坑','穿鼻岩','虎头山','长山尾','廖哥角'],
            //             axisLabel: {
            //                 show: true,
            //                 interval: 0,    // {number}
            //                 rotate: 0, /*角度*/
            //                 formatter: function(params){
            //                     var newParamsName = "";// 最终拼接成的字符串
            //                     var paramsNameNumber = params.length;// 实际标签的个数
            //                     var provideNumber = 6;// 每行能显示的字的个数
            //                     var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
            //                     //换行的话，需要显示几行，向上取整
            //                     /**
            //                      * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
            //                      */
            //                     // 条件等同于rowNumber>1
            //                     if (paramsNameNumber > provideNumber) {
            //                         /** 循环每一行,p表示行 */
            //                         for (var p = 0; p < rowNumber; p++) {
            //                             var tempStr = "";// 表示每一次截取的字符串
            //                             var start = p * provideNumber;// 开始截取的位置
            //                             var end = start + provideNumber;// 结束截取的位置
            //                             // 此处特殊处理最后一行的索引值
            //                             if (p == rowNumber - 1) {
            //                                 // 最后一次不换行
            //                                 tempStr = params.substring(start, paramsNameNumber);
            //                             }
            //                             else {
            //                                 // 每一次拼接字符串并换行
            //                                 tempStr = params.substring(start, end) + "\n";
            //                             }
            //                             newParamsName += tempStr;// 最终拼成的字符串
            //                         }
            //                     }
            //                     else {
            //                         // 将旧标签的值赋给新标签
            //                         newParamsName = params;
            //                     }
            //                     //将最终的字符串返回
            //                     return newParamsName;
            //                 },
            //                 textStyle: {
            //                     color: '#6e818c',
            //                     fontFamily: "sans-serif",
            //                     fontSize: 12,
            //                     formatter: "{a} <br/>{b} : {c} ({d}%)"
            //                 }
            //             }
            //         }
            //     ],
            //     grid: { // 控制图的大小，调整下面这些值就可以，
            //         x: "3%",
            //         x2: "0%",
            //         height:'65%',
            //         width:'94%',
            //         y: "20%",
            //         y2: "5%"//y2可以控制X轴跟Zoom控件之间的间隔，避免以为倾斜后造成label重叠到zoom上
            //     },
            //     yAxis: [
            //         {
            //             //name:bar_data.name,
            //             type : "value",
            //             splitNumber: 4, //设置y轴间隔个数
            //             axisLabel: {
            //                 formatter: "{value}"
            //             }
            //         }
            //     ],
            //     series: [
            //         {
            //             //name:bar_data.name,
            //             type: "bar",
            //             barWidth: 21,
            //             data: bar_data.data,
            //             itemStyle: {
            //                 normal: {
            //                     color: "#8383F7",
            //                     label: {
            //                         show: false,
            //                         textStyle: {
            //                             color: "#800080"
            //                         }
            //                     }
            //                 }
            //             }//设置柱子颜色
            //         }
            //     ]
            // };
            var my_option = get_option();
            bar_object.setOption(my_option);
        },
        destroy_bar: function (bar_object) {
            bar_object.dispose();
        }
    }
});

