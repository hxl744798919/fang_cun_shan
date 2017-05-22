define(
    ["jquery", "data", "bar", "trend", "static", "date", "map", "compass"],
    function ($, data, bar, trend, static_params, date, map, compass) {
        /*变量*/
        var bar_trend_object = {
            bar_object: "",
            trend_object: ""
        }
        //新建单指标日期
        $("#dateStart").val(localStorage.CURRENT_TIME.split(" ")[0]);
        $("#dateEnd").val(localStorage.CURRENT_TIME.split(" ")[0]);
        date.new_date("dateStart", "dateEnd");
        //单指标日期改变时确定按钮颜色改变
        var datestart = document.getElementById("dateStart");
        var dateend = document.getElementById("dateEnd");
        datestart.onchange = dateend.onchange = function () {
            $("#confirm_btn").css({
                "backgroundColor": "#333",
                "color": "#fff"
            })
        };

        //全选、取消全选
        var trendLegendselected = {
            "深圳湾": "",
            "沙井": "",
            "矾石": "",
            "伶仃南": "",
            "沙头角": "",
            "大梅沙":"",
            "下沙": "",
            "南澳": "",
            "大鹏湾口": "",
            "东涌": "",
            "东山": "",
            "核电站": "",
            "坝光": ""
        };

        //柱状图，趋势图resize事件
        var bar_trend_resize = function () {
            bar_trend_object.bar_object.resize(); //bar适应
            bar_trend_object.trend_object.resize(); //bar适应
        };
        /*方法*/
        //单指标趋势图全选、取消
        $("#isAllCheck").click(function () {
            for (var key in trendLegendselected) {
                if (this.checked) {
                    trendLegendselected[key] = true;
                    $(this).siblings("label").html("取消");
                } else {
                    trendLegendselected[key] = false;
                    $(this).siblings("label").html("全选");
                }
            }
            sessionStorage.legend = JSON.stringify(trendLegendselected);
            trend.refresh_trend(bar_trend_object.trend_object);
        });
        //点击确定按钮
        $("#confirm_btn").click(function () {
            //获取选中时间
            var dateStart = $("#dateStart").val();
            var dateEnd = $("#dateEnd").val();
            //判断是否有历史记忆，更新趋势图数据
            if (sessionStorage.id != undefined) {
                var para_type = static_params.abnormalRes(sessionStorage.id);
                //判断是否为方向类参数
                if (para_type == "direction_wind" ||
                    para_type == "flowdirection" ||
                    para_type == "wavedirection" ||
                    para_type == "direction" ||
                    para_type == "dominantwavedirection") {
                    var day = $("#dateStart").val();
                    var hour = $("#select_hour option:selected").text();
                    var minute = $("#select_minute option:selected").text();

                    var compass_time = day + " " + hour + ":" + minute + ":00";
                    data.bar_data_update(compass_time, para_type, sessionStorage.id);//如有参数记忆，则查询所记忆参数
                    bar.update_data.data = data.bardata[para_type];
                    if (hour == "小时" || minute == "分钟") {
                        alert("请选择正确时间");
                    } else {
                        //alert("您选择的时间是：" + compass_time);
                        compass.buildChart();
                        compass.show_compass(bar.update_data.data);
                    }
                }
                else {
                    data.trend_data_update(para_type, sessionStorage.id, dateStart, dateEnd);

                }

            }
            else {
                data.trend_data_update("temperature_water", "24", dateStart, dateEnd);//如无记忆，则默认参数为水温（24）
            }
            $(this).css({
                "backgroundColor": "#eee",
                "color": "#666"
            });

            trend.update_data.xAxisData = data.trend_data_value.time;
            trend.update_data.data = data.trend_data_value.value;
            trend.refresh_trend(bar_trend_object.trend_object);
			$("#time_trend").html(trend.update_data.xAxisData[trend.update_data.xAxisData.length - 1]);		//测试用例中用  获取趋势图最后一个时间
			//由当前起始时间、截止时间，计算时间粒度
			var startTime = new Date(dateStart);
			var endTime = new Date(dateEnd);
			var date = new Date();										//获取当前时间
			var hours = date.getHours();								//获取当前小时
			var minutes = date.getMinutes();							//获取当前分钟
			var nubor = (Math.abs(date.getTime() - endTime.getTime()))/(1000*60*60*24);
			var dates = (Math.abs((startTime.getTime() - endTime.getTime()))/(1000*60*60*24)) + 1;
			if (dates == 1){											//1.选择的日期起止为同一天时，以上报间隔做趋势图呈现；
				if(nubor > 1){
					$("#time_control").html("23:30");
				}else{
					if(minutes > 30){
						$("#time_control").html(hours + ":00");
					}else{
						$("#time_control").html((hours-1) + ":30");
					}
				}
			}
			else if ((dates > 1) && (dates <= 3)){						//2.选择的日期起止间隔大于1天小于等于3天时，以1小时间隔做趋势图呈现；TABLENAME[ocean_param][3] 1h;
				if(nubor > 1){
					$("#time_control").html(dateEnd.substring(5,10).replace(/-/g,"/") + " 23:00");
				}else{
					if(minutes > 30){
						$("#time_control").html(dateEnd.substring(5,10).replace(/-/g,"/") + " " + hours + ":00");
					}else{
						$("#time_control").html(dateEnd.substring(5,10).replace(/-/g,"/") + " " + (hours-1) + ":00");
					}
				}
			}
			else if ((dates > 3) && (dates < 64)){						//3.选择的日期起止间隔大于3天小于61天时，以1天间隔做趋势图呈现；TABLENAME[ocean_param][4] 1day;
				$("#time_control").html(dateEnd.replace(/-/g,"/"));		//获取每日时间对比
			}
			else if ((dates >= 64) && (dates <= 365)){					//4.选择的日期起止间隔大于61天小于365天时，以1周间隔做趋势图呈现；TABLENAME[ocean_param][5] 1week;
				var timeEnd = $("#dateEnd").val();
				var endTime = new Date(timeEnd);
				var checkDate = new Date(new Date());					//当前时间
				var time_end = endTime.getTime();						//結束時間
				checkDate = endTime;								
                checkDate.setMonth(0);
                checkDate.setDate(1);
				var endTime_week = Math.floor(Math.round((time_end - checkDate) / 86400000) / 7) + 1;
				$("#time_control").html(timeEnd.substring(0,5)+ endTime_week + "周");
			}
			else if ( dates > 365){										//5.选择的日期起止间隔大于365天时，以1月间隔做趋势图呈现。TABLENAME[ocean_param][6] 1month;
				$("#time_control").html(dateEnd.substring(0,7) + "月");	//获取时间月份对比
			}
        });
        $("ul.bar_nav li").click(function () {
            $(this).addClass("time").siblings(".time").removeClass("time");
            var id = $(this).attr("data-id");
            $(id).removeClass("opacity").siblings().addClass("opacity");
            var para_type = static_params.abnormalRes(sessionStorage.id);
            if (id === "#datashowbar") {
                //單指標切換重新查詢羅盤(實時統計)
                if (sessionStorage.id == "03" || sessionStorage.id == "10" || sessionStorage.id == "11" || sessionStorage.id == "22" || sessionStorage.id == "23") {
                    var compass_time = localStorage.CURRENT_TIME + ":00";
                    data.bar_data_update(compass_time, para_type, sessionStorage.id);//如有参数记忆，则查询所记忆参数
                    bar.update_data.data = data.bardata[para_type];
                    compass.buildChart();
                    compass.show_compass(bar.update_data.data);
                }
                $("div.single_index").hide();
                sessionStorage.current_select = "bar";
                if ($("#datashowbar").css("left") == '-9999px') {
                    $("#data_compass").show();
                    $("#data_compass").removeClass("opacity");
                }
            }
            else {
                //單指標切換重新查詢羅盤(歷史記錄)
                if (sessionStorage.id == "03" || sessionStorage.id == "10" || sessionStorage.id == "11" || sessionStorage.id == "22" || sessionStorage.id == "23") {
                    $(".AllCheck").addClass("noShow");  //点击多指标综合对比单指标页面全选消失
                    $("#dateEnd").hide();
                    $(".select_data").show();
                    var date = $("#dateStart").val();
                    var hour = $("#select_hour option:selected").text();
                    var minute = $("#select_minute option:selected").text();
                    var compass_time = date + " " + hour + ":" + minute + ":00";
                    data.bar_data_update(compass_time, para_type, sessionStorage.id);//如有参数记忆，则查询所记忆参数
                    bar.update_data.data = data.bardata[para_type];
                    compass.buildChart();
                    compass.show_compass(bar.update_data.data);
                } else {
                    $(".AllCheck").removeClass("noShow");  //点击多指标综合对比单指标页面全选消失
                    $("#dateEnd").show();
                    $(".select_data").hide();
                }
                $("div.single_index").show();
                $("#data_compass").hide();
                sessionStorage.current_select = "trend";
            }

            if (sessionStorage.id == "03" || sessionStorage.id == "10" || sessionStorage.id == "11" || sessionStorage.id == "22" || sessionStorage.id == "23") {

                $(".AllCheck").addClass("noShow");  //点击多指标综合对比单指标页面全选消失
                $("#data_compass").show();
                $("#datashowbar").addClass("opacity");
                $("#data_compass").removeClass("opacity");
                compass.buildChart();
                compass.show_compass(bar.update_data.data);
            }
            else {
                if (sessionStorage.current_select == "bar") {
                    $("#data_compass").addClass("opacity");
                    $("#datashowbar").removeClass("opacity");
                }
                else {
                    $("#data_compass").addClass("opacity");
                    $("#trend_show").removeClass("opacity");
                }
            }
        });
        //单指标图标最小、最大化
        $(".minimize").click(function () {
            $(".maximize").show();
            $(".overview_bottom").hide();
            $("#overview_left").css({"height": "100%"});
            map.update_data.my_map.resize(); //map适应
            compass.buildChart();
            compass.show_compass(bar.update_data.data);
        });
        $(".maximize").click(function () {
            $(".maximize").hide();
            $(".overview_bottom").show();
            var rightHeight = $("#flashing").outerHeight(true);
            document.getElementById("overview_left").style.height = rightHeight - 220 + "px";
            map.update_data.my_map.resize(); //使第一个图表适应
            bar_trend_resize();

            compass.buildChart();
            compass.show_compass(bar.update_data.data);
        });

        /*返回*/
        return {
            single_init: function () {
                //刷新时，需要显示内容
                if (sessionStorage.current_select == "bar") {
                    //实时统计与历史统计切换
                    $("div.wrapper").hide();
                    $(".bar_content").removeClass("opacity");
                    $(".trend_content").addClass("opacity");
                    $("[data-id='#trend_show']").removeClass("time");
                    $("[data-id='#datashowbar']").addClass("time");

                }
                else if (sessionStorage.current_select == "trend") {
                    $("#data_compass").show();
                    $("div.single_index").show();
                    $(".trend_content").removeClass("opacity");
                    $(".bar_content").addClass("opacity");
                    $("[data-id='#datashowbar']").removeClass("time");
                    $("[data-id='#trend_show']").addClass("time");
                }
                //全选、取消记忆
                var true_or_false = eval("(" + sessionStorage.legend + ")");
                for (var key in true_or_false) {
                    if (true_or_false[key] == true) {
                        document.getElementById("isAllCheck").checked = true;
                        $("#isAllCheck").siblings("label").html("取消");
                    } else {
                        document.getElementById("isAllCheck").checked = false;
                        $("#isAllCheck").siblings("label").html("全选");
                    }
                }
                //读取sessionStorage，重新转换为对象
                bar.update_data.element_id = "datashowbar";
                bar.update_data.title_flag = true;
                bar.update_data.data = data.bardata[static_params.abnormalRes(sessionStorage.id)];
                bar.update_data.name = static_params.abnormalRes_ch(sessionStorage.id);

                trend.update_data.data = data.trend_data_value.value;//深圳湾
                trend.update_data.xAxisData = data.trend_data_value.time;
                trend.update_data.name = static_params.abnormalRes_ch(sessionStorage.id);
                trend.update_data.element_id = "trend_show";
                trend.update_data.title_flag = true;
                trend.update_data.legend_flag = true;
                //单指标罗盘显示
                if (sessionStorage.id == "03" || sessionStorage.id == "10" || sessionStorage.id == "11" || sessionStorage.id == "22" || sessionStorage.id == "23") {
                    $(".AllCheck").addClass("noShow");  //点击多指标综合对比单指标页面全选消失
                    $(".compass_name").text(trend.update_data.name);
                    $("#dateEnd").hide();
                    $(".select_data").show();
                    $(".line").hide();
                    $("#data_compass").show();
                    $("#data_compass").removeClass("opacity");
                    compass.buildChart();
                    compass.show_compass(bar.update_data.data);
                }
                else {
                    $("#data_compass").addClass("opacity");
                }
                //显示柱状图和趋势图
                bar_trend_object.bar_object = bar.new_bar();
                bar_trend_object.trend_object = trend.new_trend();
                trend.legend_click_event(bar_trend_object.trend_object);
                trend.update_data.single_trend = bar_trend_object.trend_object;
            },
            bar_trend_resize: bar_trend_resize,
            bar_trend_object: bar_trend_object
        }
    });