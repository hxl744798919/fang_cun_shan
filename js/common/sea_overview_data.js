define(["rdk_url", "jquery", "static", "date"], function (rdk, $, static, date) {
    var all_data = {
        wave_data: [],
        env_data: [],
        ajax_count: []
    };
    var equip_data = {
        online_equip:[],     //在线设备[[名称，类型],[名称，类型]]
        offline_equip: []    //离线设备[[名称，类型][名称，类型]]
    };

    var wave_params = [
        {
            name: "坝光",
            buoy_num: "FB01"
        },
        {
            name: "杨梅坑",
            buoy_num: "FBO2"
        },
        {
            name: "东涌",
            buoy_num: "FB03"
        },
        {
            name: "下沙",
            buoy_num: "FBO4"
        },
        {
            name: "大梅沙",
            buoy_num: "FB05"
        },
        {
            name: "深圳湾",
            buoy_num: "FBO6"
        }
    ];
    var env_params = [
        {
            name: "坝光",
            buoy_num: "FBDY1"
        },
        {
            name: "核电站",
            buoy_num: "FBDY2"
        },
        {
            name: "东山",
            buoy_num: "FBDY3"
        },
        {
            name: "东涌",
            buoy_num: "FBDY5"
        },
        {
            name: "沙头角",
            buoy_num: "FBDP1"
        },
        {
            name: "大梅沙",
            buoy_num: "FBDP2"
        },
        {
            name: "下沙",
            buoy_num: "FBDP3"
        },
        {
            name: "南澳",
            buoy_num: "FBDP4"
        },
        {
            name: "大鹏湾口",
            buoy_num: "FBDP5"
        },
        {
            name: "深圳湾",
            buoy_num: "FBSZ4"
        },
        {
            name: "沙井",
            buoy_num: "FBZJ1"
        },
        {
            name: "矾石",
            buoy_num: "FBZJ2"
        },
        {
            name: "伶仃南",
            buoy_num: "FBZJ3"
        }
    ];
    return {
        all_data: all_data,
        equip_data: equip_data,
        list_data_update: function () {
            var time_current = localStorage.CURRENT_TIME + ":00";
            for(var n = 0; n < wave_params.length; n++){
                var param = [
                    {"name": "time_current", "value": time_current},
                    {"name": "buoy_name", "value": encodeURI(wave_params[n].name)},
                    {"name": "buoy_num", "value": wave_params[n].buoy_num}
                ];
                $.ajax({
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    url: rdk.rdkUrl('seaOverviewData.js',"homePage"),
                    data: rdk.rdkData(param),
                    async: true,
                    success: function(data){
                        var res = eval("("+ data.result + ")");
                        if(res.length == 0){
                            return;
                        }
                        for(var i = 0; i < res.length; i++){
                            var is_online = false;
                            for(var j = 0; j < res[i].length; j++){
                                if(res[i][j] == "null"){
                                    res[i][j] = "--";
                                }
                                else if(j != 48 || j != 49){
                                    is_online = true;
                                }
                            }
                            all_data.wave_data.push({
                                name: res[i][48],
                                shuidongli_data: [res[i][8],res[i][9],res[i][10],res[i][11],res[i][12],res[i][13],res[i][14],res[i][15],res[i][16],res[i][17],res[i][18],res[i][19],res[i][20],res[i][21],res[i][22]],
                                time: res[i][49],
                                is_online: is_online
                            });
                        }
                    }
                });
                all_data.ajax_count.push("ajax_success");
            }
            for(n = 0; n < env_params.length; n++){
                var param = [
                    {"name": "time_current", "value": time_current},
                    {"name": "buoy_name", "value": encodeURI(env_params[n].name)},
                    {"name": "buoy_num", "value": env_params[n].buoy_num}
                ];
                $.ajax({
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    url: rdk.rdkUrl('seaOverviewData.js',"homePage"),
                    data: rdk.rdkData(param),
                    async: true,
                    success: function(data){
                        var res = eval("("+ data.result + ")");
                        if(res.length == 0){
                            return;
                        }
                        for(var i = 0; i < res.length; i++){
                            var is_online = false;
                            for(var j = 0; j < res[i].length; j++){
                                if(res[i][j] == "null"){
                                    res[i][j] = "--";
                                }
                                else if(j != 48 || j != 49){
                                    is_online = true;
                                }
                            }

                            all_data.env_data.push({
                                name: res[i][48],
                                qixiang_data: [res[i][0],res[i][1],res[i][2],res[i][3],res[i][4],res[i][5],res[i][6],res[i][7]],
                                shuizhi_data: [res[i][23],res[i][24],res[i][25],res[i][26],res[i][27],res[i][28],res[i][29],res[i][30],res[i][31],res[i][32],res[i][33],res[i][34],res[i][35],res[i][36],res[i][37],
                                 res[i][38],res[i][39],res[i][40],res[i][41],res[i][42],res[i][43],res[i][44],res[i][45],res[i][46],res[i][47]
                                 ],
                                time: res[i][49],
                                is_online: is_online
                            });
                        }
                    }
                });
                all_data.ajax_count.push("ajax_success");
            }
        }
    }
});