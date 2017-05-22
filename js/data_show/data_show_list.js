function comparative(obj) {
    var contrast = (obj.innerHTML)
    if (contrast == "对比") {
        (obj.innerHTML) = "取消";
    }
    else {
        (obj.innerHTML) = "对比";
    }
}

/*关闭按钮*/
define(["jquery", "static", "compass", "data", "trend", "bar", "map", "single"],
    function ($, static_params, compass, data, trend, bar, map, single) {
        /*变量*/
        var current_click_tab;
        /*事件*/
        //右侧一级菜单点击触发事件
        $("#tree_div_1").on("click", function () {
            current_click_tab = 1;
            showhide_obj(current_click_tab)
        });
        $("#tree_div_2").on("click", function () {
            current_click_tab = 2;
            showhide_obj(current_click_tab)
        });
        $("#tree_div_3").on("click", function () {
            current_click_tab = 3;
            showhide_obj(current_click_tab)
        });
        //点击侧边各条目改变颜色
        $(".abnormal_list").click(function () {
            $(this).addClass("abnormal_list_sz").siblings().removeClass("abnormal_list_sz");
            $(this).next().addClass("abnormal_list_bg").siblings().removeClass("abnormal_list_bg");
            $(this).parent().siblings().children(".abnormal_list").removeClass("abnormal_list_sz");
            $(this).parent().siblings().children(".abnormal_list_lucency").removeClass("abnormal_list_bg");
        });
        //侧边点击
        $("div.title > div").on("click", function () {
            var id = $(this).attr("id");
            var type = static_params.abnormalRes(id);
            var name = static_params.abnormalRes_ch(id);
            if ($(".statistics").css("left") !== "0px") {
                $(".compass_name").text(name);
                CURRENT_SELECT_PARA = id;//当该ID为营养盐时，断点连线
                //侧边点击，查询柱状图 & 趋势图
                var time_current = localStorage.CURRENT_TIME + ":00";
                data.bar_data_update(time_current, type, id);//点击查询柱状图数据
                var start_time = $("#dateStart").val();
                var end_time = $("#dateEnd").val();
                data.trend_data_update(type, id, start_time, end_time);//点击查询趋势图数据
                //更新地图数据
                map.update_data.markPoint_name = name;
                map.update_data.data = data.bardata[type];
                //设置水温热力图
                if (((sessionStorage.id == undefined || sessionStorage.id == 24) && id != 24) ||
                    (sessionStorage.id == 10 && id != 10) ||
                    (sessionStorage.id == 09 && id != 09)) {//由水温向非水温参数切换，取消热力地图
                    map.set_map_color(false);
                    map.set_map_arrows(false);
                }
                if ((id == 24 && sessionStorage.id != 24) ||
                    (id == 10 && sessionStorage.id != 10) ||
                    (id == 09 && sessionStorage.id != 09)) {//由非水温向水温参数切换，添加热力地图
                    map.update_data.refresh_average_flag = true;

                    data.bar_data_update(time_current, "flowvelocity", "09");//查询流速数据
                    data.bar_data_update(time_current, "flowdirection", "10");//查询流向数据
                    data.bar_data_update(time_current, "temperature_water", "24");//查询水温数据

                    map.update_data.sub_data = data.bardata["flowdirection"];
                    map.update_data.sub_data_2 = data.bardata["flowvelocity"];
                    map.update_data.sub_data_3 = data.bardata["temperature_water"];

                    map.set_map_color(true);
                    map.set_map_arrows(true);
                }
                //设置气温热力图
                if (((sessionStorage.id == undefined || sessionStorage.id == 04) && id != 04) ||
                    (sessionStorage.id == 02 && id != 02) ||
                    (sessionStorage.id == 03 && id != 03)) {//由水温向非水温参数切换，取消热力地图
                    map.set_map_color(false);
                    map.set_map_arrows(false);
                }
                if ((id == 04 && sessionStorage.id != 04) ||
                    (id == 02 && sessionStorage.id != 02) ||
                    (id == 03 && sessionStorage.id != 03)) {//由非水温向水温参数切换，添加热力地图
                    map.update_data.refresh_average_flag = true;

                    data.bar_data_update(time_current, "speed_wind", "02");//点击查询柱状图数据
                    data.bar_data_update(time_current, "direction_wind", "03");//点击查询柱状图数据
                    data.bar_data_update(time_current, "temperature_air", "04");//点击查询柱状图数据

                    map.update_data.sub_data = data.bardata["direction_wind"];
                    map.update_data.sub_data_2 = data.bardata["speed_wind"];
                    map.update_data.sub_data_3 = data.bardata["temperature_air"];
                    map.set_map_color(true);
                    map.set_map_arrows(true);
                }
                //存入sessionStorage
                sessionStorage.id = id;
                //设置地图中间最大最小值
                map.set_min_max_value();
                map.refresh_map();

                //更新柱状图数据
                bar.update_data.element_id = "datashowbar";
                bar.update_data.title_flag = true;
                bar.update_data.data = data.bardata[type];
                bar.update_data.name = name;

                /*测试柱状图title*/
                $("#test_title").html(name);

                bar.refresh_bar(single.bar_trend_object.bar_object);
                //判断是否显示罗盘
                if (id == "03" || id == "10" || id == "11" || id == "22" || id == "23") {
                    $(".AllCheck").addClass("noShow");  //点击多指标综合对比单指标页面全选消失
                    $("#dateEnd").hide();
                    $(".select_data").show();
                    $(".line").hide();
                    $("#data_compass").show();
                    $("#datashowbar").addClass("opacity");
                    $("#data_compass").removeClass("opacity");
                    compass.buildChart();
                    compass.show_compass(bar.update_data.data);
                }
                else {
                    $(".line").show();
                    $(".AllCheck").removeClass("noShow");
                    if (sessionStorage.current_select == "bar" || sessionStorage.current_select == undefined) {
                        $("#data_compass").addClass("opacity");
                        $("#datashowbar").removeClass("opacity");
                    }
                    else {
                        $("#dateEnd").show();
                        $(".select_data").hide();
                        $(".line").show();
                        $("#data_compass").addClass("opacity");
                        $("#trend_show").removeClass("opacity");
                    }
                    $(".line").show();
                }
                //更新趋势图数据
                trend.update_data.element_id = "trend_show";
                trend.update_data.title_flag = true;
                trend.update_data.data = data.trend_data_value.value;
                trend.update_data.xAxisData = data.trend_data_value.time;
                trend.update_data.legend_flag = true;
                trend.update_data.name = name;
                trend.refresh_trend(single.bar_trend_object.trend_object);
            }
        });
        /*方法*/


        function showhide_obj(current_click_tab) {
            obj = document.getElementById("title" + current_click_tab);
            icon = document.getElementById("icon" + current_click_tab);
            if (obj.style.display == "none") {
                $("#ocean_parameters_lucency").hide();
                //指定文档中的对象为div,仅适用于IE;
                div_list = document.getElementsByTagName("div");
                for (i = 0; i < div_list.length; i++) {
                    thisDiv = div_list[i];
                    if (thisDiv.id.indexOf("title") != -1)//当文档div中的id含有list时,与charAt类似;
                    {
                        //循环把所有菜单链接都隐躲起来
                        thisDiv.style.display = "none";
                    }
                }
                myfont = document.getElementsByTagName("font");
                for (i = 0; i < myfont.length; i++) {
                    thisfont = myfont[i];
                    myfont[i].innerHTML = '<i class="fa icon_bottom_right"></i>';
                }
                icon.innerHTML = '<i class="fa icon_right_down"></i>';
                obj.style.display = ""; //只显示当前链接
            } else {
                //当前对象是打开的，就封闭它;
                icon.innerHTML = '<i class="fa icon_bottom_right"></i>';
                obj.style.display = "none";
                $("#ocean_parameters_lucency").show();
            }
        }

        return {};
    });
