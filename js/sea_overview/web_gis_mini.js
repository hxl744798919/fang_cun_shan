define(
    ["jquery", "rdk_url","data_update"],
    function ($, rdk_url, data_update) {
        localStorage.infoWindow_clicked = false;
//波浪浮标
        var wave_marker_1, wave_marker_2, wave_marker_3, wave_marker_4, wave_marker_5, wave_marker_6;
        var wave_marker_1_s, wave_marker_2_s, wave_marker_3_s, wave_marker_4_s, wave_marker_5_s, wave_marker_6_s;//信号动画
//环境浮标
        var env_marker_1, env_marker_2,env_marker_3,env_marker_4,env_marker_5,env_marker_6,env_marker_7,env_marker_8,env_marker_9,
            env_marker_10,env_marker_11,env_marker_12,env_marker_13, env_marker_14;
        var env_marker_1_s, env_marker_2_s,env_marker_3_s,env_marker_4_s,env_marker_5_s,env_marker_6_s,env_marker_7_s,env_marker_8_s,env_marker_9_s,
            env_marker_10_s,env_marker_11_s,env_marker_12_s,env_marker_13_s, env_marker_14_s, env_marker_15_s;//信号动画
        //排污口浮标
        var pw_marker_1;
        var pw_marker_1_s;
//调节因子
        var temp_factor = 0.005;
        var temp_factor_2 = 0.003;
        var temp_factor_3 = 0.02;
        //地图区域ID
        var current_area_id = 0;//默认主地图为0，小地图从1开始

//[浮标名称，经度，纬度，浮标，浮标信号，浮标编号，浮标离线时长，浮标在线时长,地名，浮标类型]
        var env_buoy_position = [["哑呤湾坝光", 114.556 + temp_factor_3, 22.662, env_marker_1, env_marker_1_s, "FBDY1", "--", "--", "--"],
            ["大亚湾长湾", 114.580, 22.608, env_marker_2, env_marker_2_s, "FBDY2", "--", "--", "--"],
            ["大亚湾东山", 114.518, 22.569, env_marker_3, env_marker_3_s, "FBDY3", "--", "--", "--"],
            //["大亚湾杨梅坑", 114.555, 22.6595],//已坏，坐标不准
            ["大亚湾东涌", 114.573 + temp_factor_3, 22.474, env_marker_5, env_marker_5_s, "FBDY5", "--", "--", "--"],
            ["大鹏湾沙头角", 114.241 + temp_factor, 22.553, env_marker_6, env_marker_6_s, "FBDP1", "--", "--", "--"],
            ["大鹏湾大梅沙", 114.314 + temp_factor_3, 22.594, env_marker_7, env_marker_7_s, "FBDP2", "--", "--", "--"],
            ["大鹏湾下沙", 114.454, 22.566, env_marker_8, env_marker_8_s, "FBDP3", "--", "--", "--"],
            ["大鹏湾南澳", 114.478, 22.525, env_marker_9, env_marker_9_s, "FBDP4", "--", "--", "--"],
            ["大鹏湾口门", 114.485, 22.459, env_marker_10, env_marker_10_s, "FBDP5", "--", "--", "--"],
            ["深圳湾蛇口", 113.945, 22.481, env_marker_11, env_marker_11_s, "FBSZ1", "--", "--", "--"],
            ["珠江口沙井", 113.734, 22.690, env_marker_12, env_marker_12_s, "FBZJ1", "--", "--", "--"],
            ["珠江口矾石", 113.806, 22.494, env_marker_13, env_marker_13_s, "FBZJ2", "--", "--", "--"],
            ["珠江口内伶仃南", 113.814,22.346, env_marker_14, env_marker_14_s, "FBZJ3", "--", "--", "--"]
            //["珠江口内伶仃东", 114.555, 22.6595]//未开通，坐标不准
        ];

        var wave_buoy_position = [["大亚湾坝光", 114.556, 22.66, wave_marker_1, wave_marker_1_s, "FB01", "--", "--", "--"],
            ["大亚湾杨梅坑", 114.579, 22.558, wave_marker_2, wave_marker_2_s, "FB02", "--", "--", "--"],
            ["大亚湾东涌", 114.574 - temp_factor_3, 22.474 - temp_factor_3, wave_marker_3, wave_marker_3_s, "FB03", "--", "--", "--"],
            ["大鹏湾下沙", 114.454, 22.564 - temp_factor_3, wave_marker_4, wave_marker_4_s, "FB04", "--", "--", "--"],
            ["大鹏湾大梅沙", 114.312, 22.593 - temp_factor_3, wave_marker_5, wave_marker_5_s, "FB05", "--", "--", "--"],
            ["深圳湾蛇口", 113.946 - temp_factor_3, 22.480 - temp_factor_3, wave_marker_6, wave_marker_6_s, "FB06", "--", "--", "--"]
        ];
        var paiwu_buoy_position = [
            ["新圳河入海口", 113.895,22.540, pw_marker_1, pw_marker_1_s, "FBPW", "--", "--", "--"]
        ];
        //mini地图变量区，对应mini地图area_id
        var area_id_to_lon_lat = [[114.483,22.520], [114.540,22.576],
            [114.356,22.561], [114.356,22.561],
            [113.895,22.540],
            [113.961,22.528], [114.470,22.581],
            [113.888,22.443], [113.994,22.519], [114.572,22.582],

            [113.906,22.601], [114.451,22.586],
            [113.782,22.693], [113.939,22.581], [113.939,22.581],
            [114.309,22.576], [114.443,22.569],
            [113.895,22.540], [113.895,22.540], [113.895,22.540],
            [113.895,22.540], [113.895,22.540], [113.895,22.540], [113.895,22.540], [113.895,22.540]
        ];//area_id 转换小地图放大经纬度
        var area_default_center = ["114.429,22.492,114.548,22.540", "114.473,22.55,114.592,22.609",//增养殖区
            "114.213,22.517,114.452,22.637", "114.213,22.517,114.452,22.637",//海水浴场
            "113.694,22.447,114.172,22.688", "114.290,22.479,114.704,22.590",//航道
            "113.666,22.399,114.144,22.590", "113.916,22.498,114.135,22.558", "114.409,22.439,114.887,22.677",//保护区
            "113.494,22.463,114.129,22.744", "114.192,22.445,114.670,22.684",//用海区
            "113.710,22.635,113.949,22.795", "113.810,22.499,113.927,22.552", "113.854,22.452,114.092,22.554", "114.178,22.537,114.404,22.626", "114.330,22.570,114.449,22.630",
            "114.358,22.466,114.676,22.606", "114.489,22.620,114.608,22.680",//旅游区
            "113.671,22.335,114.144,22.576", "114.278,22.437,114.756,22.677"//渔业区
        ];
        var nan_ao_1, nan_ao_2,nan_ao_3,nan_ao_4,nan_ao_5,nan_ao_6,nan_ao_7,nan_ao_8,nan_ao_9,nan_ao_10,nan_ao_11,nan_ao_12,nan_ao_13,nan_ao_14;
        //增养殖区
        var zeng_yang_zhi_info = [["大鹏湾南澳", 114.475, 22.533, nan_ao_1,"D3N030"],
            ["大鹏湾南澳", 114.470, 22.533, nan_ao_2,"D3N031"],
            ["大鹏湾南澳", 114.465, 22.533, nan_ao_3,"D3N032"],
            ["大鹏湾南澳", 114.470, 22.514, nan_ao_4,"D3N033"],
            ["大鹏湾南澳", 114.460, 22.514, nan_ao_5,"D3N034"],
            ["大鹏湾南澳", 114.450, 22.514, nan_ao_6,"D3N035"],
            ["大鹏湾南澳", 114.440, 22.514, nan_ao_7,"D3N036"],
            ["大鹏湾东山", 114.520, 22.560, nan_ao_8,"D3N023"],
            ["大鹏湾东山", 114.501, 22.556, nan_ao_9,"D3N024"],
            ["大鹏湾东山", 114.501, 22.568, nan_ao_10,"D3N025"],
            ["大鹏湾东山", 114.501, 22.581, nan_ao_11,"D3N026"],
            ["大鹏湾东山", 114.518, 22.587, nan_ao_12,"D3N028"],
            ["大鹏湾东山", 114.534, 22.581, nan_ao_13,"D3N029"],
            ["大鹏湾东山", 114.524, 22.571, nan_ao_14,"D3N026"],
        ];
        //航道用海区
        var hang_dao_yong_hai_1,hang_dao_yong_hai_2,hang_dao_yong_hai_3,hang_dao_yong_hai_4,hang_dao_yong_hai_5,hang_dao_yong_hai_6,hang_dao_yong_hai_7,hang_dao_yong_hai_8,hang_dao_yong_hai_9,hang_dao_yong_hai_10;
        var hang_dao_yong_hai_info =[
            ["航道用海西区", 113.740, 22.689, hang_dao_yong_hai_1,"宝安工业港区"],
            ["航道用海西区", 113.812, 22.59928, hang_dao_yong_hai_2,"深圳机场码头区"],
            ["航道用海西区", 113.843, 22.533405, hang_dao_yong_hai_3,"大铲湾港区"],
            ["航道用海西区", 113.84847, 22.50087, hang_dao_yong_hai_4,"深圳港西部航道"],
            ["航道用海西区", 113.90775, 22.48067, hang_dao_yong_hai_5,"蛇口东角头港区"],
            ["航道用海东区", 114.26466, 22.567186, hang_dao_yong_hai_6,"盐田港区"],
            ["航道用海东区", 114.38608, 22.610001, hang_dao_yong_hai_7,"下洞-沙鱼涌港区"],
            ["航道用海东区", 114.43044, 22.57369, hang_dao_yong_hai_8,"秤头角港区"],
            ["航道用海东区", 114.51877, 22.585, hang_dao_yong_hai_9,"核电站航道"],
            ["航道用海东区", 114.60016, 22.56315, hang_dao_yong_hai_10,"三门航道"]
        ];
        //海洋自然保护区
        var hai_ya_bao_hu_1,hai_ya_bao_hu_2,hai_ya_bao_hu_3;
        var hai_ya_bao_hu_info = [
            ["珠江口中华白海豚自然保护区", 113.79082, 22.40376, hai_ya_bao_hu_1,"珠江口中华白海豚自然保护区"],
            ["福田红树林自然保护区", 114.0000, 22.53051, hai_ya_bao_hu_2,"福田红树林自然保护区"],
            ["大亚湾水产自然保护区",114.59101, 22.56067, hai_ya_bao_hu_3,"大亚湾水产自然保护区"],
        ];
        //重点工程用海区
        var zhong_dian_yong_hai_1,zhong_dian_yong_hai_2,zhong_dian_yong_hai_3,zhong_dian_yong_hai_4;
        var zhong_dian_yong_hai_info = [
            ["大空港工程用海区", 113.71689, 22.69546, zhong_dian_yong_hai_1,"大空港工程用海区"],
            ["前海工程用海区", 113.85852, 22.52385, zhong_dian_yong_hai_2,"前海工程用海区"],
            ["盐田港工程用海区", 114.25706, 22.56565, zhong_dian_yong_hai_3,"盐田港工程用海区"],
            ["坝光工程用海区", 114.51833, 22.64974, zhong_dian_yong_hai_4,"坝光工程用海区"],
        ];
        //渔业资源利用和养护
        var yu_ye_zi_yuan_1,yu_ye_zi_yuan_2,yu_ye_zi_yuan_3;
        var yu_ye_zi_yuan_info = [
            ["伶仃洋经济鱼类繁育场保护区", 113.83469, 22.45844, yu_ye_zi_yuan_1,"伶仃洋经济鱼类繁育场保护区"],
            ["大鹏湾蓝圆鯵和沙丁鱼幼鱼养护区", 114.38032, 22.57773, yu_ye_zi_yuan_2,"大鹏湾蓝圆鯵和沙丁鱼幼鱼养护区"],
            ["杨梅坑人工鱼礁区", 114.56062, 22.565922, yu_ye_zi_yuan_3,"杨梅坑人工鱼礁区"]
        ];
        // 海滨旅游
        var hai_bin_lu_you_1,hai_bin_lu_you_2,hai_bin_lu_you_3,hai_bin_lu_you_4,hai_bin_lu_you_5,hai_bin_lu_you_6,hai_bin_lu_you_7,hai_bin_lu_you_8,hai_bin_lu_you_9,hai_bin_lu_you_10,hai_bin_lu_you_11,hai_bin_lu_you_12,hai_bin_lu_you_13,hai_bin_lu_you_14,hai_bin_lu_you_15;
        var hai_bin_lu_you_info = [
            ["宝安海上田园风光旅游区", 113.74627, 22.70511, hai_bin_lu_you_1,"宝安海上田园风光旅游区"],
            ["前海城市景观旅游区", 113.87999, 22.53, hai_bin_lu_you_2,"前海城市景观旅游区"],
            ["海上世界旅游区", 113.91596, 22.479033, hai_bin_lu_you_3,"海上世界旅游区"],
            ["明斯克航母世界旅游区", 114.260, 22.574, hai_bin_lu_you_3," "],
            ["滨海大道城市景观旅游区", 113.97433, 22.521414, hai_bin_lu_you_4,"滨海大道城市景观旅游区"],
            ["沙头角城市景观旅游区", 114.20094, 22.54869, hai_bin_lu_you_5,"沙头角城市景观旅游区"],
            ["大、小梅沙度假旅游区", 114.3022, 22.595909, hai_bin_lu_you_6,"大、小梅沙度假旅游区"],
            ["溪涌度假旅游区", 114.35883, 22.60829, hai_bin_lu_you_7,"溪涌度假旅游区"],
            ["迭福度假旅游区", 114.42811, 22.58, hai_bin_lu_you_8,"迭福度假旅游区"],
            ["大鹏金海湾度假旅游区", 114.445, 22.565, hai_bin_lu_you_9,"大鹏金海湾度假旅游区"],
            ["下沙度假旅游区", 114.45068, 22.545, hai_bin_lu_you_10,"下沙度假旅游区"],
            ["南澳度假旅游区", 114.475, 22.53, hai_bin_lu_you_11,"南澳度假旅游区"],
            ["西涌度假旅游区", 114.530, 22.478, hai_bin_lu_you_12,"西涌度假旅游区"],
            ["东涌度假旅游区", 114.584,22.499, hai_bin_lu_you_12,"东涌度假旅游区"],
            ["桔钓沙度假旅游区",114.537, 22.563, hai_bin_lu_you_13,"桔钓沙度假旅游区"],
            ["较场尾民宿度假旅游区", 114.47555, 22.58964, hai_bin_lu_you_14,"较场尾民宿度假旅游区"],
            ["坝光银叶树湿地度假旅游区", 114.50002, 22.64807, hai_bin_lu_you_15,"坝光银叶树湿地度假旅游区"],

        ];
//        海水浴场
        var hai_shui_yu_chang_1,hai_shui_yu_chang_2;
        var hai_shui_yu_chang_indo = [
            ["小梅沙海水浴场", 114.3237972222,22.595, hai_shui_yu_chang_1,"小梅沙海水浴场"],
            ["大梅沙海水浴场", 114.2944777778, 22.590, hai_shui_yu_chang_2,"大梅沙海水浴场"]
        ];
//增加端口判断传入不同的数据路径 updated 2016.02.05
        var path = null;
        if (((window.location.port)== 8080) || ((window.location.port)== 8081) || ((window.location.port)== 8082||(window.location.port)== 9999))
        {
            path = "/usr/local/jetty/webapps/webgis";
        }
        else if ((window.location.port)==9953 )
        {
            path = "/home/jetty/webapps/webgis";
        }
        else if ((window.location.port)==8086 )
        {
            path = "/home/tomcat/webapps/webgis";
        }
        else if ((window.location.port)==26180 )
        {
            path = "/home/netnumen/ems/ums-server/procs/ppus/webgis.ppu/webgis-web.pmu/webgis.ear/webgis.war";
        }
        var size2;
        var offset2;

        //封装函数添加地图浮标
        var add_mini_marker = function(marker ,icon ,type){
            //添加浮标
            for(var i = 0; i < marker.length; i++){
                marker[i][4] = new subframe_mini.contentWindow.zmaps.Marker(
                    new subframe_mini.contentWindow.zmaps.LonLat(marker[i][1], marker[i][2]),
                    icon.clone());

                add_mini_marker_click(marker[i][4], marker[i][0], marker[i][1], marker[i][2], type);
                subframe_mini.contentWindow.zmaps.MarkerLayer.addMarker(marker[i][4]);
            }
        };
        //封装函数为小地图添加提示框及提示框对应marker
        var add_mini_tip =function(location, is_marker){
			var mini_size = new subframe_mini.contentWindow.zmaps.Size(5, 5);
			
            if(is_marker){//此时为刷新页面，需添加提示框对应隐藏marker
                var mini_tip_icon = new subframe_mini.contentWindow.zmaps.Icon("../../../ocean/image/mini_bouy.png", mini_size, offset2);
                for(var i = 0; i < location.length; i++){
                    location[i][3] = new subframe_mini.contentWindow.zmaps.Marker(
                        new subframe_mini.contentWindow.zmaps.LonLat(location[i][1], location[i][2]),
                        mini_tip_icon.clone());
                    subframe_mini.contentWindow.zmaps.MarkerLayer.addMarker(location[i][3]);
                }
            }
            else {//此时为点击小地图，显示对应提示框
                for(var i = 0; i < location.length; i++){
                    add_tool_tip_unclick(location[i][3], location[i][4], "波浪浮标提示框");
                }
            }
        };
        //添加主、小地图浮标
        var add_buoy_to_map = function () {
            size2 = new subframe_mini.contentWindow.zmaps.Size(50, 50);
            offset2 = new subframe_mini.contentWindow.zmaps.Pixel(-48, -28);
            //添加浮标
            var mini_env_icon = new subframe_mini.contentWindow.zmaps.Icon("../../../ocean/image/buoy_env.png", size2, offset2);
            var mini_wave_icon = new subframe_mini.contentWindow.zmaps.Icon("../../../ocean/image/buoy_wave.png", size2, offset2);
            var mini_paiwu_icon = new subframe_mini.contentWindow.zmaps.Icon("../../../ocean/image/pwqxiao.png", size2, offset2);
            add_mini_marker(env_buoy_position ,mini_env_icon ,"环境浮标");
            add_mini_marker(wave_buoy_position , mini_wave_icon ,"波浪浮标");
            add_mini_marker(paiwu_buoy_position ,mini_paiwu_icon , "陆源站");
			
			//添加隐藏图标
            add_mini_tip(zeng_yang_zhi_info, true);
            //    海水浴场
            add_mini_tip(hai_shui_yu_chang_indo, true);
            //航道用海区
            add_mini_tip(hang_dao_yong_hai_info, true);
            //海洋自然保护区
            add_mini_tip(hai_ya_bao_hu_info, true);
            //   重点工程用海区
            add_mini_tip(zhong_dian_yong_hai_info, true);
            //滨海度假
            add_mini_tip(hai_bin_lu_you_info, true);
            //    渔业资源利用和养护
            add_mini_tip(yu_ye_zi_yuan_info, true);
        };
        //解决延时传参问题
        var _add_buoy_to_map = function () {
            add_buoy_to_map();
        };
        //延时启动添加浮标函数
        if(localStorage.CURRENT_BROWSER_TYPE == "Chrome")
            setTimeout(_add_buoy_to_map,1500);
        else
            setTimeout(_add_buoy_to_map,3000);
        //小地图更新
        var refresh_mini_map = function (data_areaId) {
            if(data_areaId == "1" || data_areaId == "2"){
                add_mini_tip(zeng_yang_zhi_info, false);
            }
            //    海水浴场
            if(data_areaId == "3" || data_areaId == "4"){
                add_mini_tip(hai_shui_yu_chang_indo, false);
            }
            //航道用海区
            if(data_areaId == "5" || data_areaId == "6"){
                add_mini_tip(hang_dao_yong_hai_info, false);
            }
            //海洋自然保护区
            if(data_areaId == "7" || data_areaId == "8" || data_areaId == "9"){
                add_mini_tip(hai_ya_bao_hu_info, false);
            }

            //   重点工程用海区
            if(data_areaId == "10" || data_areaId == "11"){
                add_mini_tip(zhong_dian_yong_hai_info, false);
            }

            //滨海度假
            if(data_areaId == "12" || data_areaId == "13" || data_areaId == "14" || data_areaId == "15" || data_areaId == "16"
                || data_areaId == "17" || data_areaId == "18"){
                add_mini_tip(hai_bin_lu_you_info, false);
            }
            //    渔业资源利用和养护
            if(data_areaId == "19" || data_areaId == "20"){
                add_mini_tip(yu_ye_zi_yuan_info, false);
            }
            //subframe_mini.contentWindow.Location.ZoomtoLonLat(env_buoy_position[data_areaId - 1][1], env_buoy_position[data_areaId - 1][2],2000);//centerId,xOffset,yOffset,gridSize
            var mini_zoom_lever = area_default_center[data_areaId - 1];
            subframe_mini.contentWindow.SetBounds(mini_zoom_lever);
        };
        //创建默认信息框
        var mini_main_info_window;
        var mini_info_count = [];
        var all_data = data_update.all_data;
        function creat_tool_tip_init(position, name2, type) {
            if(localStorage.infoWindow_clicked == "true") return;
            var img_location = "circle_blue.png";
            if(name2 == "D3N026" || name2 == "D3N027" ||name2 == "D3N028" || name2 == "D3N029" || name2 == "D3N033" || name2 == "D3N034" || name2 == "D3N035" || name2 == "D3N036"){
                img_location = "circle_yellow.png"
            }
            //海洋自然保护区
            if(name2 == "珠江口中华白海豚自然保护区"){img_location = "zhiujianglou.png"}
            if(name2 == "福田红树林自然保护区"){img_location = "hongshuling.png"}
            if(name2 == "大亚湾水产自然保护区"){img_location = "dayawan.png"}

            //滨海度假
            if(name2 == "宝安海上田园风光旅游区"){img_location = "hsty_blue.png"}
            if(name2 == "前海城市景观旅游区" || name2 == "沙头角城市景观旅游区" || name2 == "滨海大道城市景观旅游区") {
                img_location = "csjgly_blue.png"
            }
            if(name2 == "大、小梅沙度假旅游区" || name2 == "溪涌度假旅游区" || name2 == "迭福度假旅游区" || name2 == "大鹏金海湾度假旅游区" || name2 == "下沙度假旅游区" || name2 == "南澳度假旅游区" || name2 == "东涌度假旅游区" || name2 == "桔钓沙度假旅游区" || name2 == "西涌度假旅游区"){
                img_location = "luyoudujia_blue.png"
            }
            if(name2 == "海上世界旅游区"){img_location = "haishang_blue.png"}
            if(name2 == " "){img_location = "hangmu_blue.png"}
            if(name2 == "较场尾民宿度假旅游区"){img_location = "mingshu_blue.png"}
            if(name2 == "坝光银叶树湿地度假旅游区"){img_location = "shidi_blue.png"}
            mini_infoWindow = new subframe_mini.contentWindow.zmaps.InfoWindow({
                position : position,
                content: '<link href="../../../ocean/css/sea_overview/web_gis.css" rel="stylesheet" />\
                    <div class="buoy_num" style="display: inline-block;background: rgba(0,0,0,0);" onselectstart="return false">\
                    <table style="line-height: 8px;font-size: 12px;text-align: center;font-weight: 600;color: #000;background: rgba(0,0,0,0)">\
                    <tr><td>'+ name2 +'</td><td></td></tr>\
                    <tr><td><img src="../../../ocean/image/'+img_location +'"></td></tr>\
                    </table>\
                    </div>'
            });
            mini_info_count.push(mini_infoWindow);
            mini_infoWindow.show();
        }
        //创建浮标弹出框
        function creat_tool_tip(position, name, lon, lat, type, data) {
            if(localStorage.infoWindow_clicked == "true") return;
            if (infoWindow) {
                infoWindow.close();
            }

            var current_qixiang_data = ['--','--','--','--','--','--','--','--'];
            var current_shuidongli_data = ['--','--','--','--','--','--','--','--','--','--','--','--','--','--','--'];
            var current_shuizhi_data = ['--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--','--'];
            var current_time = '-';
            //名字对应值
            var  tip_name ={
                "坝光":"哑呤湾坝光",
                "核电站":"大亚湾长湾",
                "东山":"大亚湾东山",
                "东涌":"大亚湾东涌",
                "沙头角":"大鹏湾沙头角",
                "大梅沙":"大鹏湾大梅沙",
                "下沙":"大鹏湾下沙",
                "南澳":"大鹏湾南澳",
                "大鹏湾口":"大鹏湾口门",
                "深圳湾":"深圳湾蛇口",
                "沙井":"珠江口沙井",
                "矾石":"珠江口矾石",
                "伶仃南":"珠江口内伶仃南",
                "杨梅坑":"大亚湾杨梅坑"
            };
            var current_state = "离线";
            for(var i = 0; i < data.env_data.length; i++){
                if(tip_name[data.env_data[i].name] == name && type == "环境浮标"){
                    current_qixiang_data = data.env_data[i].qixiang_data;
                    current_shuizhi_data = data.env_data[i].shuizhi_data;
                    current_time = data.env_data[i].time;
                    if(data.env_data[i].is_online){
                        current_state = "在线";
                    }
                    break;
                }
            }
            for(var i = 0; i < data.wave_data.length; i++){
                if(tip_name[data.wave_data[i].name] == name && type == "波浪浮标"){
                    current_shuidongli_data = data.wave_data[i].shuidongli_data;
                    current_time = data.wave_data[i].time;
                    if(data.wave_data[i].is_online){
                        current_state = "在线";
                    }
                    break;
                }
            }
            if(type == "环境浮标"){
                infoWindow = new subframe_mini.contentWindow.zmaps.InfoWindow({
                    position : position,
                    content: '<div class="gis_suspension" onselectstart="return false" style="width: 300px;background: url("image/buoy_bakground.png") no-repeat;position: relative;font-family: \'微软雅黑\';">\
                <span class="close_off" onclick=close_tip()></span>\
                <div id="overview_label" style = "height: 381px;">\
                <div class="Over_head" style = "height: 58px;">\
                <p>'+ name+'</p>\
                </div>\
                <div class="colour"></div>\
                <ul class="label_switchover" style = "height: 58px;margin-bottom: 6px;">\
                <li onclick = a(this) class = "li_activation" data-active="geog_parameter">\
                <img src="../../../ocean/image/geog_norm.png" alt="">\
                </li>\
                <li onclick = a(this) data-active="scene_parameter">\
                <img src="../../../ocean/image/scene_down.png" alt="">\
                </li>\
                <li onclick = a(this) data-active="wate_parameter">\
                <img src="../../../ocean/image/wate_down.png" alt="">\
                </li>\
                </ul>\
                <div class="parameter" style="height:324px">\
                <!--地理-->\
                <div class="geog_parameter parameter_active">\
                <p>位置信息</p>\
                <ul>\
                <li>类型<span>环境浮标</span></li>\
                <li>经度<span>'+ Math.round(lon*1000)/1000 +'</span></li>\
                <li>纬度<span>'+ Math.round(lat*1000)/1000 +'</span></li>\
                <li>状态<span>'+ current_state +'</span></li>\
                <li>最近上报时间<div style="display: inline-block;margin-left: 30px;">'+ current_time +'</div></li>\
                </ul>\
                </div>\
                <!--气象-->\
                <div class="scene_parameter ">\
                <p>气象数据</p>\
                <ul>\
                <li>最大风速<span>'+ current_qixiang_data[0]+'</span>m/s</li>\
                <li>风<lable></lable>速<span>'+ current_qixiang_data[1]+'</span>m/s</li>\
                <li>风<lable></lable>向<span>'+ current_qixiang_data[2]+'</span>°</li>\
                <li>气<lable></lable>温<span>'+ current_qixiang_data[3]+'</span>°</li>\
                <li>相对湿度<span>'+ current_qixiang_data[4]+'</span>%</li>\
                <li>气<lable></lable>压<span>'+ current_qixiang_data[5]+'</span>hPa</li>\
                <li>雨<lable></lable>量<span>'+ current_qixiang_data[6]+'</span>mm</li>\
                <li>有效光合<span>'+ current_qixiang_data[7]+'</span></li>\
            </ul>\
            </div>\
            <!--水质-->\
            <div class="wate_parameter">\
                <p>水质数据</p>\
                <ul>\
                <li><lable>水温</lable><span>'+ current_shuizhi_data[0]+'</span>°C</li>\
                <li><lable>叶绿素a</lable><span>'+ current_shuizhi_data[1]+'</span>(μg/L)</li>\
                <li><lable>PH值</lable><span>'+ current_shuizhi_data[2]+'</span></li>\
                <li><lable>溶解氧</lable><span>'+ current_shuizhi_data[3]+'</span>(mg/L)</li>\
                <li><lable>溶解氧饱和度</lable><span>'+ current_shuizhi_data[4]+'</span>(%)</li>\
                <li><lable>浊度</lable><span>'+ current_shuizhi_data[5]+'</span></li>\
                <li><lable>电导率</lable><span>'+ current_shuizhi_data[6]+'</span>(mS/cm)</li>\
                <li><lable>氧化还原电位</lable><span>'+ current_shuizhi_data[7]+'</span>(mV)</li>\
                <li><lable>盐度</lable><span>'+ current_shuizhi_data[8]+'</span>(ppt)</li>\
                <li><lable>总溶解性固体</lable><span>'+ current_shuizhi_data[9]+'</span>(g/L)</li>\
                <li><lable>蓝绿藻</lable><span>'+ current_shuizhi_data[10]+'</span>(uL)</li>\
                <li><lable>化学需氧量</lable><span>'+ current_shuizhi_data[11]+'</span>(mg/L)</li>\
                <li><lable>水中油</lable><span>'+ current_shuizhi_data[12]+'</span></li>\
                <li><lable>表层水温</lable><span>'+ current_shuizhi_data[13]+'</span>(°C)</li>\
                <li><lable>表层电导率</lable><span>'+ current_shuizhi_data[14]+'</span>(mS/cm)</li>\
                <li><lable>表层盐度</lable><span>'+ current_shuizhi_data[15]+'</span>(ppt)</li>\
                <li><lable>钴60(Co)</lable><span>'+ current_shuizhi_data[17]+'</span>(Bq/L)</li>\
                <li><lable>锶89(Sr)</lable><span>'+ current_shuizhi_data[18]+'</span>(Bq/L)</li>\
                <li><lable>铯134(Cs)</lable><span>'+ current_shuizhi_data[19]+'</span>(Bq/L)</li>\
                <li><lable>铯137(Cs)</lable><span>'+ current_shuizhi_data[20]+'</span>(Bq/L)</li>\
                <li><lable>氨氮</lable><span>'+ current_shuizhi_data[21]+'</span>(μg/L)</li>\
                <li><lable>亚硝酸盐</lable><span>'+ current_shuizhi_data[22]+'</span>(μg/L)</li>\
                <li><lable>硝酸盐</lable><span>'+ current_shuizhi_data[23]+'</span>(μg/L)</li>\
                <li><lable>磷酸盐</lable><span>'+ current_shuizhi_data[24]+'</span>(μg/L)</li>\
            </ul>\
            </div>\
            </div>\
            <!--小三角-->\
            <div  class="triangle" style="top: 43%"></div>\
          </div>\
          <link href="../../../ocean/css/sea_overview/gis_lable.css" rel="stylesheet" />\
		<script >\
                function a (th){\
                var data_active = $(th).attr("data-active");\
                $("." + data_active).addClass("parameter_active").siblings(".parameter_active").removeClass("parameter_active");\
                $(th).addClass("li_activation").siblings(".li_activation").removeClass("li_activation");\
                var img_active = $(th).children().attr("src").split("_")[0];\
                var li_sib = $(th).siblings().children();\
                $(th).children().attr("src", img_active + "_norm.png");\
                for (var i = 0; i < li_sib.length; i++) {\
                $(li_sib[i]).attr("src", $(li_sib[i]).attr("src").split("_")[0] + "_down.png")\
        }\
        $(".wate_parameter ul li:odd").css("borderLeft","1px solid #91A3B8")\
            }\
               function close_tip(){$(".gis_suspension").css("display", "none")}\
                </script>\
			</div>'
                });
            }
            else if(type == "陆源站"){
                infoWindow = new subframe_mini.contentWindow.zmaps.InfoWindow({
                    position : position,
                    content: '<div class="gis_suspension" onselectstart="return false" style="width: 300px;background: url("image/buoy_bakground.png") no-repeat;position: relative;font-family: \'微软雅黑\';">\
                    <span class="close_off" onclick=close_tip() ></span>\
                    <div id="overview_label">\
                    <div class="Over_head">\
                    <p>'+ name+'</p>\
                    </div>\
                    <div class="colour"></div>\
                    <ul class="label_switchover" style = "height: 58px;margin-bottom: 6px;">\
                    <li onclick = a(this) class = "li_activation" data-active="geog_parameter" style="width: 150px">\
                    <img src="../../../ocean/image/geog_norm.png" alt="">\
                    </li>\
                    <li onclick = a(this) data-active="wate_parameter" style="width: 150px;margin: 0">\
                    <img src="../../../ocean/image/waterPower_down.png" alt="">\
                    </li>\
                    </ul>\
                    <div class="parameter" style="height: 286px">\
                    <!--地理-->\
                    <div class="geog_parameter parameter_active">\
                    <p>位置信息</p>\
                    <ul>\
                    <li>类型<span>陆源站</span></li>\
                    <li>经度<span>'+ Math.round(lon*1000)/1000 +'</span></li>\
                    <li>纬度<span>'+ Math.round(lat*1000)/1000 +'</span></li>\
                    <li>状态<span>'+ current_state +'</span></li>\
                    <li>最近上报时间<div style="display: inline-block;margin-left: 30px;">'+ current_time +'</div></li>\
                    </ul>\
                    </div>\
                    <!--水动力-->\
                    <div class="wate_parameter">\
                    <p style="padding-top:15px"></p>\
                    <ul style="margin-top: 10px;font-size: 13px">\
                    <li style="height: 28px;line-height: 28px "><lable>浊度</lable><span>'+current_shuidongli_data[0]+'</span>(NTU)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>PH值</lable><span>'+current_shuidongli_data[1]+'</span></li>\
                    <li style="height: 28px;line-height: 28px "><lable>水温</lable><span>'+current_shuidongli_data[2]+'</span>(℃)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>盐度</lable><span>'+current_shuidongli_data[4]+'</span></li>\
                    <li style="height: 28px;line-height: 28px "><lable>溶解氧</lable><span>'+current_shuidongli_data[5]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>挥发酚</lable><span>'+current_shuidongli_data[6]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>硫化物</lable><span>'+current_shuidongli_data[7]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>总氮</lable><span>'+current_shuidongli_data[8]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>硝酸盐</lable><span>'+current_shuidongli_data[9]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>COD</lable><span>'+current_shuidongli_data[10]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>TOC</lable><span>'+current_shuidongli_data[11]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>磷酸盐</lable><span>'+current_shuidongli_data[12]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>氨氮</lable><span>'+current_shuidongli_data[13]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable></lable>亚硝酸盐</lable><span>'+current_shuidongli_data[14]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>铜</lable><span>'+current_shuidongli_data[12]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>铬</lable><span>'+current_shuidongli_data[13]+'</span>(mg/L)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>流量</lable><span>'+current_shuidongli_data[12]+'</span>(m³/s)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>总磷</lable><span>'+current_shuidongli_data[13]+'</span>(mg/L)</li>\
                </ul>\
                </div>\
                </div>\
                <!--小三角-->\
                <div class="triangle" style="top: 37%"></div>\
                </div>\
		<link href="../../../ocean/css/sea_overview/gis_lable.css" rel="stylesheet" />\
		<script >\
                function a (th){\
                var data_active = $(th).attr("data-active");\
                $("." + data_active).addClass("parameter_active").siblings(".parameter_active").removeClass("parameter_active");\
                $(th).addClass("li_activation").siblings(".li_activation").removeClass("li_activation");\
                var img_active = $(th).children().attr("src").split("_")[0];\
                var li_sib = $(th).siblings().children();\
                $(th).children().attr("src", img_active + "_norm.png");\
                for (var i = 0; i < li_sib.length; i++) {\
                $(li_sib[i]).attr("src", $(li_sib[i]).attr("src").split("_")[0] + "_down.png")\
        }\
        $(".wate_parameter ul li:odd").css("borderLeft","1px solid #91A3B8")\
            }\
            function close_tip(){$(".gis_suspension").css("display", "none")}\
                </script>\
			</div>'
                });
            }
            else if(type == "波浪浮标") {
                infoWindow = new subframe_mini.contentWindow.zmaps.InfoWindow({
                    position : position,
                    content: '<div class="gis_suspension" onselectstart="return false" style="width: 300px;background: url("image/buoy_bakground.png") no-repeat;position: relative;font-family: \'微软雅黑\';">\
                    <span class="close_off" onclick=close_tip()></span>\
                    <div id="overview_label">\
                    <div class="Over_head">\
                    <p>'+ name+'</p>\
                    </div>\
                    <div class="colour"></div>\
                    <ul class="label_switchover" style = "height: 58px;margin-bottom: 6px;">\
                    <li onclick = a(this) class = "li_activation" data-active="geog_parameter" style="width: 150px">\
                    <img src="../../../ocean/image/geog_norm.png" alt="">\
                    </li>\
                    <li onclick = a(this) data-active="wate_parameter" style="width: 150px;margin: 0">\
                    <img src="../../../ocean/image/waterPower_down.png" alt="">\
                    </li>\
                    </ul>\
                    <div class="parameter" style="height: 252px">\
                    <!--地理-->\
                    <div class="geog_parameter parameter_active">\
                    <p>位置信息</p>\
                    <ul>\
                    <li>类型<span>'+ type +'</span></li>\
                    <li>经度<span>'+ Math.round(lon*1000)/1000 +'</span></li>\
                    <li>纬度<span>'+ Math.round(lat*1000)/1000 +'</span></li>\
                    <li>状态<span>'+ current_state +'</span></li>\
                    <li>最近上报时间<div style="display: inline-block;margin-left: 30px;">'+ current_time +'</div></li>\
                    </ul>\
                    </div>\
                    <!--水动力-->\
                    <div class="wate_parameter">\
                    <p style="padding-top: 15px">水动力数据</p>\
                    <ul style="margin-top: 10px;font-size: 13px">\
                    <li style="height: 28px;line-height: 28px "><lable>流速</lable><span>'+current_shuidongli_data[0]+'</span>(cm/s)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>流向</lable><span>'+current_shuidongli_data[1]+'</span>(°)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>波向</lable><span>'+current_shuidongli_data[2]+'</span>(°)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>最大波高</lable><span>'+current_shuidongli_data[4]+'</span>(m)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>最大波周期</lable><span>'+current_shuidongli_data[5]+'</span>(s)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>1/10波高</lable><span>'+current_shuidongli_data[6]+'</span>(m)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>1/10波周期</lable><span>'+current_shuidongli_data[7]+'</span>(s)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>有效波高</lable><span>'+current_shuidongli_data[8]+'</span>(m)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>有效波周期</lable><span>'+current_shuidongli_data[9]+'</span>(s)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>平均波高</lable><span>'+current_shuidongli_data[10]+'</span>(m)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>平均波周期</lable><span>'+current_shuidongli_data[11]+'</span>(s)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>波浪个数</lable><span>'+current_shuidongli_data[12]+'</span>(个)</li>\
                    <li style="height: 28px;line-height: 28px "><lable>主波向</lable><span>'+current_shuidongli_data[13]+'</span>(°)</li>\
                <li style="height: 28px;line-height: 28px "><lable>方位</lable><span>'+current_shuidongli_data[14]+'</span>(°)</li>\
                </ul>\
                </div>\
                </div>\
                <!--小三角-->\
                <div class="triangle" style="top: 37%"></div>\
                </div>\
		<link href="../../../ocean/css/sea_overview/gis_lable.css" rel="stylesheet" />\
		<script >\
                function a (th){\
                var data_active = $(th).attr("data-active");\
                $("." + data_active).addClass("parameter_active").siblings(".parameter_active").removeClass("parameter_active");\
                $(th).addClass("li_activation").siblings(".li_activation").removeClass("li_activation");\
                var img_active = $(th).children().attr("src").split("_")[0];\
                var li_sib = $(th).siblings().children();\
                $(th).children().attr("src", img_active + "_norm.png");\
                for (var i = 0; i < li_sib.length; i++) {\
                $(li_sib[i]).attr("src", $(li_sib[i]).attr("src").split("_")[0] + "_down.png")\
        }\
        $(".wate_parameter ul li:odd").css("borderLeft","1px solid #91A3B8")\
            }\
            function close_tip(){$(".gis_suspension").css("display", "none")}\
                </script>\
			</div>'
                });
            }
            mini_main_info_window = infoWindow;
            infoWindow.show();
        }
        //调用创建信息框
        function add_tool_tip_unclick(marker, name, type) {		//新建提示框
            creat_tool_tip_init(marker.position, name, type);
        }
        //绑定mini地图浮标点击事件
        function add_mini_marker_click(marker, name, lon, lat, type) {		//新建提示框
            marker.events.register('click', marker, function (evt) {
                localStorage.infoWindow_clicked = false;
                //subframe_mini.contentWindow.Location.ZoomtoLonLat(lon, lat,2000);//centerId,xOffset,yOffset,gridSize
                creat_tool_tip(this.position, name, lon, lat, type,data_update.all_data);
            });
        }
        //清除页面所有信息框
        var clear_all_tip = function () {
            for(var i = 0; i < mini_info_count.length; i++){
                mini_info_count[i].close();
            }
            mini_info_count = [];
            current_area_id = 0;
            if(mini_main_info_window)
                mini_main_info_window.close();
        };
        //接口函数
        return{
            add_buoy_to_map: _add_buoy_to_map,
            clear_all_tip: clear_all_tip,
            refresh_mini_map: refresh_mini_map
        }
    });
