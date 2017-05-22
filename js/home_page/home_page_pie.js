define(["echarts","data", "echarts/chart/pie"], function (ec, data) {

    return {
        show_pie: function () {
            var data_online = data.equip_data.online_equip;
            var data_offline = data.equip_data.offline_equip;
            var pie_data_online = [];
            var pie_data_offline = [];
            var dataStyle_1 = {
                normal: {
                    color: '#B5BE53',
                    label: {
                        show:false
                    },
                    labelLine: {show:false}
                }
            };
            var dataStyle_2 = {
                normal: {
                    color: '#FCCE10',
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
            function get_len(len) {
                var leng = null;
                if(len >= 9){
                    leng = 9;
                }else{
                    leng = len;
                }
                return leng;
            }
            for(var i = 0; i < get_len(data_online.length); i++){
                $(".status_online").append('<p><span class="left">' + data_online[i][0] + '</span><span class="right">' + data_online[i][1] + '</span></p><div style="clear: both"></div>');
            }
            for(var i = 0; i < get_len(data_offline.length); i++){
                $(".status_offline").append('<p><span class="left">' + data_offline[i][0] + '</span><span class="right">' + data_offline[i][1] + '</span></p><div style="clear: both"></div>');
            }
            if(data_online.length > 0){
                pie_data_online.push({value:data_online.length, name:'在线'},{value:data_offline.length, name:'失联', itemStyle: placeHolderStyle});
            }
            if(data_offline.length > 0){
                pie_data_offline.push({value:data_offline.length, name:'失联'}, {value:data_online.length, name:'在线', itemStyle: placeHolderStyle});
            }

            var ecConfig = require('echarts/config');
            var pie = ec.init(document.getElementById("pie"));
            var option = {
                noDataLoadingOption: {
                    effect: 'bubble',
                    effectOption: {
                        backgroundColor:"rgba(0,0,0,0)",
                        effect: {
                            n: 0
                        }
                    }
                },
                title: {
                    text: '设备状态',
                    x: 35,
                    y: 'center',
                    itemGap: 8,
                    textStyle : {
                        color : 'rgba(255,255,255,0.8)',
                        fontFamily : '微软雅黑',
                        fontSize : 15,
                        fontWeight : 'bolder'
                    },
                    subtextStyle:{
                        color: "#90896D"
                    }
                },
                calculable : false,
                series : [
                    {
                        name:'在线设备',
                        type:'pie',
                        clockWise:false,
                        center: [66,'50%'],
                        radius : [35, 50],
                        itemStyle : dataStyle_1,
                        data: pie_data_online
                    },
                    {
                        name:'2',
                        type:'pie',
                        clockWise:false,
                        center: [66,'50%'],
                        radius : [20, 35],
                        itemStyle : dataStyle_2,
                        data: pie_data_offline
                    }
                ]
            };

            pie.setOption(option);
            pie.on(ecConfig.EVENT.CLICK, function (params) {
                if(params.name == "失联"){
                    $(".offline").css("display","block").siblings(".online").css("display","none");
                }
                else if(params.name == "在线"){
                    $(".online").css("display","block").siblings(".offline").css("display","none");
                }
            })
        }
    }
})