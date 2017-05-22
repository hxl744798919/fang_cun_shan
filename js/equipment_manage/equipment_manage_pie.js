define(
    ["echarts", "echarts/chart/pie"],
    function(ec) {
        // 使用刚指定的配置项和数据显示图表。
        //自定义信息
        var dataStyle_1 = {
            normal: {
                color: '#B6A2DE',
                label: {
                    show:false
                },
                labelLine: {show:false}
            }
        };
        var dataStyle_2 = {
            normal: {
                color: '#2EC7C9',
                label: {
                    show:false
                },
                labelLine: {show:false}
            }
        };
        var placeHolderStyle = {
            normal : {
                color: 'rgba(0,0,0,0)',
                label: {show:false},
                labelLine: {show:false}
            },
            emphasis : {
                color: 'rgba(0,0,0,0)'
            }
        };
        return{
            creat_pie: function (buoy_name, offline_num, online_num) {
                offline_num = Number(offline_num);
                online_num = Number(online_num);
                var online_percent = Math.round(((online_num/(online_num + offline_num)) * 100));
                var space_num;
                if(buoy_name.length == 4){
                    space_num = "      ";
                    online_percent = Math.round((((online_num * 2)/(online_num + offline_num)) * 100));
                }
                else space_num = "    ";
                var offline_percent = 100 - online_percent;
                var echartDiv = subframe.contentWindow.document.getElementById('pie_content');
                if(!echartDiv){
                    return;
                }

                var myChart = ec.init(echartDiv);

                option = {
                    title: {
                        text: '设备状态',
                        subtext: space_num + buoy_name,
                        x: 35,
                        y: 'center',
                        itemGap: 8,
                        textStyle : {
                            color : 'rgba(30,144,255,0.8)',
                            fontFamily : '微软雅黑',
                            fontSize : 15,
                            fontWeight : 'bolder'
                        },
                        subtextStyle:{
                            color: "#90896D"
                        }
                    },
                    tooltip : {
                        show: false,
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient : 'vertical',
                        x : 125,
                        y : 10,
                        itemGap:8,
                        data:[online_percent + '%时长在线', offline_percent +　'%时长失联']
                    },
                    series : [
                        {
                            name:'在线设备',
                            type:'pie',
                            clickable: false,
                            clockWise:false,
                            center: [66,'50%'],
                            radius : [50, 65],
                            itemStyle : dataStyle_1,
                            data:[
                                {
                                    value: online_percent,
                                    name: online_percent + '%时长在线'
                                },
                                {
                                    value: offline_percent,
                                    name:'invisible',
                                    itemStyle : placeHolderStyle
                                }
                            ]
                        },
                        {
                            name:'2',
                            type:'pie',
                            clickable: false,
                            clockWise:false,
                            center: [66,'50%'],
                            radius : [35, 50],
                            itemStyle : dataStyle_2,
                            data:[
                                {
                                    value: offline_percent,
                                    name: offline_percent + '%时长失联'
                                },
                                {
                                    value: online_percent,
                                    name:'invisible',
                                    itemStyle : placeHolderStyle
                                }
                            ]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        }
    });