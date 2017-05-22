define(
    ["jquery", "rdk_url","typhoon_warning_data"],
    function ($, rdk_url,typhoon_warning_data) {
        var real_time_data = typhoon_warning_data.typhoon_data.realtime_data;
        //名字对应值
        var  tip_name ={
            "哑呤湾坝光":"坝光",
            "大亚湾长湾":"核电站",
            "大亚湾东山":"东山",
            "大亚湾东涌":"东涌",
            "大鹏湾沙头角":"沙头角",
            "大鹏湾大梅沙":"大梅沙",
            "大鹏湾下沙":"下沙",
            "大鹏湾南澳":"南澳",
            "大鹏湾口门":"大鹏湾口",
            "深圳湾蛇口":"深圳湾",
            "珠江口沙井":"沙井",
            "珠江口矾石":"矾石",
            "珠江口内伶仃南":"伶仃南",
            "大亚湾杨梅坑":"杨梅坑"
        };
        //存储单个实时台风数据
        var site_typhoon_data = {
            name: "--",
            fengsu: "--",
            fengxiang:"--" ,
            qiya:"--",
            yuliang:"--" ,
            youxiao_bogao:"--"
        };
//环境浮标
        var env_marker_1, env_marker_2,env_marker_3,env_marker_4,env_marker_5,env_marker_6,env_marker_7,env_marker_8,env_marker_9,
            env_marker_10,env_marker_11,env_marker_12,env_marker_13, env_marker_14;
        var env_marker_1_s, env_marker_2_s,env_marker_3_s,env_marker_4_s,env_marker_5_s,env_marker_6_s,env_marker_7_s,env_marker_8_s,env_marker_9_s,
            env_marker_10_s,env_marker_11_s,env_marker_12_s,env_marker_13_s, env_marker_14_s, env_marker_15_s;//信号动画
//调节因子
        var temp_factor = 0.005;
        var temp_factor_2 = 0.003;
        var temp_factor_3 = 0.02;
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

        var size;
        var offset;
        var marker_vector = [];
		//添加浮标
        var add_buoy_to_map = function () {
            if (infoWindow) {
                infoWindow.close();
            }
            size = new subframe.contentWindow.zmaps.Size(50, 50);
            offset = new subframe.contentWindow.zmaps.Pixel(-48, -28);
            
            //添加浮标
            var env_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/buoy_env.png", size, offset);
            for(var i = 0; i < env_buoy_position.length; i++){
                env_buoy_position[i][3] = new subframe.contentWindow.zmaps.Marker(
                    new subframe.contentWindow.zmaps.LonLat(env_buoy_position[i][1], env_buoy_position[i][2]),
                    env_icon.clone());
                add_tool_tip_click(env_buoy_position[i][3], env_buoy_position[i][0],env_buoy_position[i][1], env_buoy_position[i][2]);
                subframe.contentWindow.zmaps.MarkerLayer.addMarker(env_buoy_position[i][3]);

                marker_vector.push(env_buoy_position[i][3]);
            }
        };
		//添加深圳市图标
        var add_shenzhentubiao_map = function () {
            var temp_marker;

            if (infoWindow) {
                infoWindow.close();
            }
            size = new subframe.contentWindow.zmaps.Size(70, 70);
            offset = new subframe.contentWindow.zmaps.Pixel(-28, -38);
            
            //深圳市图标
            var env_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/shenzhentubiao.png", size, offset);
            temp_marker = new subframe.contentWindow.zmaps.Marker(
                new subframe.contentWindow.zmaps.LonLat(114.0595442861,22.5428388201),
                env_icon.clone());
            subframe.contentWindow.zmaps.MarkerLayer.addMarker(temp_marker);
        };
        //添加透明图标
        var add_hide_buoy_to_map = function () {
            size = new subframe.contentWindow.zmaps.Size(2, 2);
            offset = new subframe.contentWindow.zmaps.Pixel(-1, -1);

            //添加浮标，复用环境浮标信号变量
            var env_icon = new subframe.contentWindow.zmaps.Icon("../../../ocean/image/shenzhenshi.png", size, offset);
            for(var i = 0; i < env_buoy_position.length; i++){
                env_buoy_position[i][4] = new subframe.contentWindow.zmaps.Marker(
                    new subframe.contentWindow.zmaps.LonLat(env_buoy_position[i][1], env_buoy_position[i][2]),
                    env_icon.clone());
                creat_tool_tip_default(env_buoy_position[i][4], env_buoy_position[i][0]);
                subframe.contentWindow.zmaps.MarkerLayer.addMarker(env_buoy_position[i][4]);
                marker_vector.push(env_buoy_position[i][4]);
            }
        };
        //解决延时传参问题
        var _add_buoy_to_map = function () {
            add_shenzhentubiao_map();//深圳图标
        };
        //延时启动添加浮标函数
        if(localStorage.CURRENT_BROWSER_TYPE == "Chrome")
            setTimeout(_add_buoy_to_map,1500);
        else
            setTimeout(_add_buoy_to_map,3000);

        //创建浮标弹出框
        var infoWindow;
        function creat_tool_tip(position, name, data) {
            if(localStorage.infoWindow_clicked == "true") return;
            if (infoWindow) {
                infoWindow.close();
            }

            for(var i= 0 ;i<data.length ; i++){
                if(data[i]["name"] == tip_name[name]){
                    site_typhoon_data = data[i];
                    break;
                }
            }
            infoWindow = new subframe.contentWindow.zmaps.InfoWindow({
                    position : position,
                    content: '<div id="ty_tip" style="height: 210px">\
            <p>'+ name+'</p>\
            <ul class="ty_tip_details clearfix">\
                <li>\
                    <div>\
                        <img src="../../../ocean/image/typhoon/fs_yes.png" alt=""><br>\
                        <span>风速</span>\
                    </div>\
                    <div class="details_data"><span>'+site_typhoon_data.fengsu +'</span>m/s</div>\
                </li>\
                <li>\
                    <div>\
                        <img src="../../../ocean/image/typhoon/qy_yes.png" alt=""><br>\
                        <span>气压</span>\
                    </div>\
                    <div class="details_data"><span>'+site_typhoon_data.qiya +'</span>pa</div>\
                </li>\
                <li>\
                    <div>\
                        <img src="../../../ocean/image/typhoon/fx_yes.png" alt=""><br>\
                        <span>风向</span>\
                    </div>\
                    <div class="details_data"><span>'+site_typhoon_data.fengxiang+'</span>°</div>\
                </li>\
                <li>\
                    <div>\
                        <img src="../../../ocean/image/typhoon/jyl_yes.png" alt=""><br>\
                        <span>雨量</span>\
                    </div>\
                    <div class="details_data"><span>'+site_typhoon_data.yuliang +'</span>mm</div>\
                </li>\
                <li>\
                    <div>\
                        <img src="../../../ocean/image/typhoon/lang_yes.png" alt=""><br>\
                        <span>有效波高</span>\
                    </div>\
                    <div class="details_data"><span>'+site_typhoon_data.youxiao_bogao +'</span>m</div>\
                </li>\
            </ul>\
			<link href="../../../ocean/css/typhoon_warning/gis_typhoon_tip.css" rel="stylesheet" />\
        </div>'
                    });
            infoWindow.show();
        }
        //创建默认透明浮标弹出框
        var infowindow_count = [];
        function creat_tool_tip_default(marker, name) {
            //获取风速、有效波高
            for(var i= 0 ;i< real_time_data.length ; i++){
                if(real_time_data[i]["name"] == tip_name[name]){
                    site_typhoon_data = real_time_data[i];
                    break;
                }
            }
            //获取风力图片
            var image_path = "../../../ocean/image/shenzhenshi.png";
            var feng_su = site_typhoon_data.fengsu;
            
            if (feng_su == "--" || feng_su == 0) {
                image_path = "../../../ocean/image/shenzhenshi.png";
            } else if(Number(feng_su) < 1.6){
                image_path = "../../../ocean/image/wind_power1.png";
            }else if(Number(feng_su) >= 1.6 && Number(feng_su) < 3.4){
                image_path = "../../../ocean/image/wind_power2.png";
            }else if(Number(feng_su) >= 3.4 && Number(feng_su) < 5.5){
                image_path = "../../../ocean/image/wind_power3.png";
            }else if(Number(feng_su) >= 5.5 && Number(feng_su) < 8){
                image_path = "../../../ocean/image/wind_power4.png";
            }else if(Number(feng_su) >= 8 && Number(feng_su) < 10.8){
                image_path = "../../../ocean/image/wind_power5.png";
            }else if(Number(feng_su) >= 10.8 && Number(feng_su) < 13.9){
                image_path = "../../../ocean/image/wind_power6.png";
            }else if(Number(feng_su) >= 13.9 && Number(feng_su) < 17.2){
                image_path = "../../../ocean/image/wind_power7.png";
            }else if(Number(feng_su) >= 17.2 && Number(feng_su) < 37){
                image_path = "../../../ocean/image/wind_power8_12.png";
            }else if(Number(feng_su) > 37){
                image_path = "../../../ocean/image/typhoon.png";
            }
            
            var temp_infoWindow = new subframe.contentWindow.zmaps.InfoWindow({
                position : marker.position,
                content: '<div style="font-weight: bold;position: absolute;left: -63px;top: -49px;width: 100px;height: 25px">\
                    <p>风速：<span>'+ site_typhoon_data.fengsu +'</span>m/s</p>\
                    <p>波高：<span>'+ site_typhoon_data.youxiao_bogao +'</span>m</p>\
                    <img style="float: left" src="'+ image_path +'" alt="" width="10px">\
                </div>'
            });
            infowindow_count.push(temp_infoWindow);
            temp_infoWindow.show();
        }
        //绑定浮标点击事件
        function add_tool_tip_click(marker, name, lon, lat) {		//新建提示框
            marker.events.register('click', marker, function (evt) {
                //subframe.contentWindow.Location.ZoomtoLonLat(lon, lat,22000);//centerId,xOffset,yOffset,gridSize
                creat_tool_tip(this.position, name, real_time_data);
            });
        }
        //获取当前缩放级别，确定是否显示浮标
        var is_buoy_display = false;
        var is_realTime_typhone = false;

        //延时启动添加浮标函数
        setInterval(function () {
            if(!is_buoy_display && is_realTime_typhone && subframe.contentWindow.getMap().map.zoom >= 10){
                infowindow_count = [];
                marker_vector = [];
                add_hide_buoy_to_map(); //透明隐藏浮标
                add_buoy_to_map();		//13个环境浮标

                is_buoy_display = true;
            }

            if(is_buoy_display && subframe.contentWindow.getMap().map.zoom < 10){
                clear_markers_tips();
                is_buoy_display = false;
            }
        },1000);
        //清除页面所有信息框及浮标
        function clear_markers_tips() {
            for(var i = 0; i < infowindow_count.length; i++){
                infowindow_count[i].close();
            }
            infowindow_count = [];

            if (infoWindow) {
                infoWindow.close();
            }

            for(var i = 0; i < marker_vector.length; i++){
                subframe.contentWindow.zmaps.MarkerLayer.removeMarker(marker_vector[i]);
            }
            marker_vector = [];
        }

        //接口函数
        return{
            set_realTime_typhone: function(flag){
                is_realTime_typhone = flag;
            },
            get_realTime_typhone: function(){
                return is_realTime_typhone;
            }
        }
    });
