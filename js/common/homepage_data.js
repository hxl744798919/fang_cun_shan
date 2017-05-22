define(["jquery", "rdk_url", "static", "date"], function($, rdk, static, date) {
    //数据查询成功标志
    var query_falg = false;
    var query_flag_1 = false;
    var query_flag_2 = false;
    var query_flag_3 = false;
    var query_flag_4 = false;
    //解决IE 浏览器AJAX传中文问题，需与后端查询文件对齐
    var index_to_name = {
        "海水浴场": "01",
        "鱼礁区": "02",
        "排污区": "03",
        "增养殖区": "04",
        "旅游区": "05"
    };
    var datas = {      //一天的数据
        districtname: [],            //地名
        acquisitiontime: [],        //时间
        temperature_water: [],      //水温
        temperature_air: [],        //气温
        waveheight_tenth: [],       //波高
        speed_wind: [],              //风速
        rainfall: [],                //雨量
        dissolvedoxygen: [],        //溶解氧
        potentialhgdrogen: [],      //PH值
        turbidity: []                //浊度
    };
    var oilinwater = {    //一天的水中油
        "珠江口": [],    //核电站
        "大亚湾": []     //伶仃南
    };
    var real_time_data = [];   //实时数据：地名、水温、气温、风速、溶解氧、PH值、浊度、水中油
    var equip_data = {
        online_equip:[],     //在线设备[[名称，类型],[名称，类型]]
        offline_equip: []    //离线设备[[名称，类型][名称，类型]]
    };

    //实时数据保存地方
    var hone_page_data={
        海水浴场 :{
            小梅沙浴场:["--","--","--"],
            大梅沙浴场:["--","--","--"],
            西涌海水浴场:["--","--","--"],
            东涌海水浴场:["--","--","--"],
            七星湾帆船运动区:["--","--","--"]
        },
        旅游区 :{
            宝安海上田园风光旅游区:["--","--","--","--"],
            前海城市景观旅游区:["--","--","--","--"],
            海上世界旅游用海区:["--","--","--","--"],
            滨海大道城市景观旅游区:["--","--","--","--"],
            沙头角城市景观旅游区:["--","--","--","--"],
            溪涌度假旅游区:["--","--","--","--"],
            迭福度假旅游区:["--","--","--","--"],
            下沙度假旅游区:["--","--","--","--"],
            南澳度假旅游区:["--","--","--","--"],
            西涌度假旅游区:["--","--","--","--"],
            大鹏金海湾度假旅游区:["--","--","--","--"],
            大_小梅沙度假旅游区:["--","--","--","--"]
        }
    };

    return {
        data_update: function () {
            var current_time_ms = new Date(localStorage.CURRENT_TIME.replace(/-/g,"/")).getTime();
            var current_time_format = date.get_date(new Date(localStorage.CURRENT_TIME.replace(/-/g,"/")));
            var half_hour = 30 * 60 * 1000; //半小时毫秒数
            var four_hour_before = date.get_date(new Date(current_time_ms - 8 * half_hour));
            //一天的数据
            var param = [
                {"name":"new_time", "value": localStorage.CURRENT_TIME.split(" ")[0]},
                {"name": "flag", "value": "01"}
            ];
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: rdk.rdkUrl('homepage_data.js',"homePage"),
                data: rdk.rdkData(param),
                async: true,
                success: function(data ){
                    query_flag_1 = true;
                    set_query_flag();
                    var res = eval("("+ data.result + ")");
                    if(res.length == 0){
                        return;
                    }
                    for(var i = 0; i< res.length; i++){
                        if(res[i][6] > localStorage.CURRENT_TIME){
                            continue;
                        }
                        datas.districtname.push(res[i][0]);
                        datas.temperature_water.push(res[i][1]);
                        datas.temperature_air.push(res[i][2]);
                        datas.waveheight_tenth.push(res[i][3]);
                        datas.speed_wind.push(res[i][4]);
                        datas.rainfall.push(res[i][5]);
                        datas.acquisitiontime.push(res[i][6].substring(0,16));
                        datas.dissolvedoxygen.push(res[i][7]);
                        datas.potentialhgdrogen.push(res[i][8]);
                        datas.turbidity.push(res[i][9]);
                        if(res[i][0] == "核电站"){
                            oilinwater["珠江口"].push(res[i][10]);
                        }
                        else if(res[i][0] == "伶仃南"){
                            oilinwater["大亚湾"].push(res[i][10]);
                        }
                    }
                }
            });
            //查询海水浴场数据
            param = [
                {"name":"time_current", "value": localStorage.CURRENT_TIME},
                {"name": "funcareatype", "value": index_to_name["海水浴场"]}
            ];
            $.ajax({             //海滨浴场数据
                type: "GET",
                contentType: "application/json",
                url: rdk.rdkUrl('actual_time_data.js',"homePage"),
                data: rdk.rdkData(param),
                async: true,
                success: function(data ){
                    query_flag_2 = true;
                    set_query_flag();
                    var res = eval("("+ data.result + ")");   //数据：[地名、水温、有效波高、溶解氧]
                    if(res.length == 0){
                        return;
                    }
                    for(var i = 0;i < res.length; i++){
                        var actualtimeName = res[i][0].replace(/[—、]/g,"_");
                        for(var j = 1; j< res[i].length; j++){
                            if(res[i][j] === "null"){
                                hone_page_data["海水浴场"][actualtimeName].splice(j-1,1,"--")
                            }
                            else{
                                hone_page_data["海水浴场"][actualtimeName].splice(j-1,1,Number(res[i][j]).toFixed(2));
                            }

                        }
                    }

                }
            });
            //查询旅游区数据
            param = [
                {"name":"time_current", "value": localStorage.CURRENT_TIME},
                {"name": "funcareatype", "value":index_to_name["旅游区"]}
            ];
            $.ajax({             //旅游区场数据
                type: "GET",
                contentType: "application/json",
                url: rdk.rdkUrl('actual_time_data.js',"homePage"),
                data: rdk.rdkData(param),
                async: true,
                success: function(data ){
                    query_flag_3 = true;
                    set_query_flag();
                    var res = eval("("+ data.result + ")");   //数据：[地名、气温、水温、风速、溶解氧]
                    if(res.length == 0){
                        return;
                    }

                    for(var i = 0;i < res.length; i++){
                        var actualtimeName = res[i][0].replace(/[—、]/g,"_");
                        for(var j = 1; j< res[i].length; j++){
                            if(res[i][j] === "null"){
                                hone_page_data["旅游区"][actualtimeName].splice(j-1,1,"--")
                            }
                            else{
                                hone_page_data["旅游区"][actualtimeName].splice(j-1,1,Number(res[i][j]).toFixed(2));
                            }

                        }
                    }

                }
            });
            //查询4小时设备状态
            param = [
                {"name":"buoy_name", "value":""},
                {"name":"ocean_param", "value":""},
                {"name":"unit", "value":""},
                {"name":"time_start", "value":four_hour_before},
                {"name":"time_end", "value":current_time_format},
                {"name":"flag", "value":"01"}
            ];
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: rdk.rdkUrl('equipment_manage.js',"homePage"),
                data: rdk.rdkData(param),
                async: true,
                success: function(data ){
                    query_flag_4 = true;
                    set_query_flag();
                    var res = eval("("+ data.result + ")");
                    if(res.length == 0){
                        return;
                    }
                    for(var i = 0; i < res.length; i++){
                        for(var j = 0; j < static.buoy_position.length; j++){
                            if(res[i][0] == static.buoy_position[j].siteNumber){
                                if(res[i][2] != 0)
                                    equip_data.online_equip.push([static.buoy_position[j].siteName, static.buoy_position[j].type]);//在线浮标
                                else
                                    equip_data.offline_equip.push([static.buoy_position[j].siteName, static.buoy_position[j].type]);//离线浮标
                                break;
                            }
                        }
                    }

                }
            });
        },

        datas: datas,
        oilinwater: oilinwater,
        real_time_data: real_time_data,
        hone_page_data: hone_page_data,
        equip_data: equip_data,
        get_query_flag: function () {
            return query_falg;
        },
        reset_query_flag: function () {
            query_falg = false;
            query_flag_1 = false;
            query_flag_2 = false;
            query_flag_3 = false;
            query_flag_4 = false;
        },
        //最新查询所用时间更新
        update_query_time: function() {
            //获取数据库最新上报时间
            var param = [
                {"name":"flag", "value":"04"}
            ];
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: rdk.rdkUrl('OceanMonitoringInfo.js',"homePage"),
                data: rdk.rdkData(param),
                async: false,
                success: function(data ){
                    var res = eval("("+ data.result + ")");
					/*蛇口以获取的数据最新时间为准
                    if(!window.localStorage){
                        alert("请升级浏览器版本，当前版本太旧，可能会影响正常使用");
                    }else{
                        if(res[0][0] < localStorage.CURRENT_TIME)
                            localStorage.CURRENT_TIME = res[0][0];
                    }*/
					if(res.length > 0)
                        localStorage.CURRENT_TIME = res[0][0];
                }
            });
        }
    };
    function set_query_flag() {
        if(query_flag_1 && query_flag_2 && query_flag_3 && query_flag_4)
            query_falg = true;
    };

});