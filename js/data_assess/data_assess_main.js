define(["jquery", "trend", "map", "date", "assess_data","data_assess_tooltip"], function($, trend, map, date, assess_data,data_assess_tooltip){
	//底部趋势图点击宽度变化
	var status = true;
    var bodyWidth = $("#body").outerWidth(true)/2 + "px";
    $(".bottomTrend").css("width", bodyWidth);
    $(".bottomTrendNav .open").click(function () {
        var src = $(this).children().attr("src");
        if(status){
            $(".bottomTrend").css("width", $("#body").outerWidth(true)-20 + "px");
            $(this).children().attr("src", "image/click_left.png");
            status = false;
            trend.update_trend.width = "96%";
        }else{
            $(".bottomTrend").css("width", $("#body").outerWidth(true)/2 + "px");
            $(this).children().attr("src", "image/click_right.png");
            status = true;
            trend.update_trend.width = "93%";
        }
        trend.show_trend();
    });
	//拖拽地图变鼠标小手
    $("#assess_map").on("mousedown dblclick", function(){
        $("#assess_map").on("mousemove", function(){
            document.getElementById("assess_map").style.cursor = "move";
        })
    });
	$("#assess_map").on("mouseup", function(){
		$("#assess_map").off("mousemove");
	});
	var zero;
    //点击确定按钮
    $("#confirm_btn").click(function () {
        var date = $("#dateStart").val();
        var hour = $("#select_hour option:selected").text();
        var minute = $("#select_minute option:selected").text();
        $(this).css({
            "backgroundColor": "#eee",
            "color": "#666"
        });
        var dateStart = $("#dateStart").val();
        var dateEnd = $("#dateEnd").val();
        var startDate = new Date(dateStart).getTime(); //开始时间转化为时间戳
        var endDate = new Date(dateEnd).getTime();  //结束时间转化为时间戳
        var start_time = new Date(startDate);
        var end_time = new Date(endDate);
        //$("#area_parameter div div:eq(0)").click();
		var sRDate = new Date(startDate);
		var eRDate = new Date(endDate);
		//var result = (eRDate-sRDate)/(24*60*60*1000);
		var result = (Math.abs((eRDate.getTime() - sRDate.getTime()))/(1000*60*60*24)) + 1;
		if(result > 3){
			$(".date_prompt").show();
		}else{
			$(".date_prompt").hide();
			//點擊確定按鈕更新趋势图数据
			var funcareatype = $(".checkBox .checkColor").text();
			var time_start = $("#dateStart").val();		//获取时间控件开始时间
			var time_end = $("#dateEnd").val();			//获取时间控件结束时间
			assess_data.bar_data_update(funcareatype, time_start, time_end);
			var funcareatype = $(".checkBox .checkColor").text();
			var click_toparea = $(".place").text().replace(/[—、]/g,"_");			//获取点击默地区
			var trend_data = assess_data.district_name;
			var update_trend_data = assess_data.district_name[funcareatype][click_toparea].district_value;
			var trend_data_y = [];
			trend.update_trend.data = [];
			trend.update_trend.element_id = "trend";
			trend.update_trend.title_flag = true;
			trend.update_trend.xAxisData = assess_data.district_name[funcareatype][click_toparea].district_time;
			for(var i = 0; i < update_trend_data.length; i++){
				if(update_trend_data[i][zero] == undefined){
					trend_data_y.push("-");
				}else{
					trend_data_y.push(update_trend_data[i][zero]);
				}
			}
            if((funcareatype == "海水浴场") && zero == 1){
                var res = one_hour_adjust(trend.update_trend.xAxisData, trend_data_y);
                trend.update_trend.xAxisData = res.time;
                trend_data_y = res.value;
            }
			trend.update_trend.data[0] = trend_data_y;	//Y軸
			trend.update_trend.legend_flag = true;
			trend.update_trend.name = funcareatype;
			trend.show_trend();	
		}
    });
	
	$("#area_parameter").delegate(">div>div", "click", function() {
        var src = $(this).children().children().attr("src");
        //切換
        if(src == "image/radio-deselect.png"){
            $(this).children().children().attr("src","image/radio-select.png");
            $(this).siblings().children().children().attr("src","image/radio-deselect.png");
            $(this).children(".parameter").addClass("checkColor");
            $(this).siblings().children(".parameter").removeClass("checkColor");
        }//else{
//            $(this).children().children().attr("src","image/radio-deselect.png");
//            $(this).children(".parameter").removeClass("checkColor");
//        }
        //查詢
        var funcareatype = $(".checkBox .checkColor").text();
        var click_toparea = $(".place").text().replace(/[—、]/g,"_");			//获取点击默地区
        var trend_data = assess_data.district_name;
        var update_trend_data = assess_data.district_name[funcareatype][click_toparea].district_value;
        var trend_data_y = [];
        trend.update_trend.data = [];
        zero = $(this).index();
        if((funcareatype == "排污区" || funcareatype == "增养殖区") && zero == 2){
            trend.update_trend.area_data = ["氨氮","硝酸盐","亚硝酸盐","磷酸盐"]
            trend.update_trend.element_id = "trend";
            trend.update_trend.title_flag = true;
            trend.update_trend.xAxisData = assess_data.district_name[funcareatype][click_toparea].district_time;

            for(var j = 0; j < 4; j++){
                trend_data_y = [];
                for(var i = 0; i < update_trend_data.length; i++){

                    if(update_trend_data[i][j + 2]== undefined){
                        trend_data_y.push("-");
                    }else{
                        trend_data_y.push(update_trend_data[i][j + 2]);
                    }
                }

                trend.update_trend.data[j] = trend_data_y;	//Y軸
            }

            trend.update_trend.legend_flag = true;
            trend.update_trend.name = funcareatype;
            trend.show_trend();
        }else{
            trend.update_trend.area_data = [];
            trend.update_trend.area_data[0] = $(this).text();
            trend.update_trend.element_id = "trend";
            trend.update_trend.title_flag = true;
            trend.update_trend.xAxisData = assess_data.district_name[funcareatype][click_toparea].district_time;
            for(var i = 0; i < update_trend_data.length; i++){
                if(update_trend_data[i][zero] == undefined){
                    trend_data_y.push("-");
                }else{
					var data=update_trend_data[i][zero] == "-"?update_trend_data[i][zero]:Number(update_trend_data[i][zero]).toFixed(2)
                    trend_data_y.push(data);
                }
            }
            if((funcareatype == "海水浴场") && zero == 1){
                var res = one_hour_adjust(trend.update_trend.xAxisData, trend_data_y);
                trend.update_trend.xAxisData = res.time;
                trend_data_y = res.value;
            }
            trend.update_trend.data[0] = trend_data_y;	//Y軸
            trend.update_trend.legend_flag = true;
            trend.update_trend.name = funcareatype;
            trend.show_trend();
        }
    });
	
	$(".li").click();	//頁面加載默認“海水浴场”
	
	/*循環查詢時間*/
	function one_hour_adjust(time, value) {
        var res = {
            time: [],
            value: []
        };
        for(var i = 0; i < time.length; i++){
            i = i + 1;
            if(i >= time.length) break;
            res.time.push(time[i]);
            res.value.push(value[i]);
        }
        return res;
    }
	return{
		//点击右上角添加浮标
		click_add_buoy: function(){
			var text;
			$(".rightTop .checkBox li").click(function(){
				text= $(this).text();     //获取当前值得内容
				map.update_data.map_location(text);//点击右上角调用地图位置的方法
				var zero = 0;
				var funcareatype =  $(this).text();
				var time_start = $("#dateStart").val();		//获取时间控件开始时间
				var time_end = $("#dateEnd").val();			//获取时间控件结束时间
				assess_data.bar_data_update(funcareatype, time_start, time_end);	//点击查询趋势图数据
				assess_data.bar_actual_time(funcareatype, localStorage.CURRENT_TIME);//点击查询地图实时图数据
				var src = $(this).find(".icon").children().attr("src");  //获取sec的属性
					switch (text) {
						case "鱼礁区":
							if($("#area_parameter>div").hasClass("yujiao") == false){
								$("#area_parameter").append("<div class='yujiao'><div id='yj_temperature'>\
							<span><img src='image/radio-deselect.png'></span><span class='parameter'>水温</span></div>\
							<div id='yj_salinity'><span><img src='image/radio-deselect.png'></span><span class='parameter'>盐度</span></div>\
							<div id='yj_dissolved_oxygen'><span><img src='image/radio-deselect.png'></span><span class='parameter'>溶解氧</span></div>\
							<div id='yj_PHprice'><span><img src='image/radio-deselect.png'></span><span class='parameter'>PH值</span></div>\
							<div id='yj_chlorophyll'><span><img src='image/radio-deselect.png'></span><span class='parameter'>叶绿素</span></div>\
							</div>");
								$(".yujiao").siblings('div').remove();
							}
							$(".place").text("杨梅坑人工鱼礁区");
							$(".miniPlace").text("杨梅坑人工鱼礁区");
							$("#area_parameter div:eq(1)").click();
							map.update_data.my_option.series[0].markPoint.data = [
								{name: "杨梅坑人工鱼礁区",symbol:'image/yujiao.png'},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""}
		
							];
							//默认值
							data_assess_tooltip.yjq_apptoop("杨梅坑人工鱼礁区","鱼礁区","杨梅坑人工鱼礁区");
							break;
						case "港湾区":
							if($("#area_parameter>div").hasClass("ganwanqu") == false) {
								$("#area_parameter").append("<div class='ganwanqu'><div id='gwq_oil_in_water'>\
							<span><img src='image/radio-deselect.png'></span><span class='parameter'>水中油</span></div>\
							</div>");
								$(".gangwanqu").siblings('div').remove();
							}
							$(".place").text("宝安工业湾区");
							$(".miniPlace").text("宝安工业湾区");
							$("#area_parameter div:eq(1)").click();
							map.update_data.my_option.series[0].markPoint.symbol = "image/bay.png";
							map.update_data.my_option.series[0].markPoint.data = [
								{name: "宝安工业湾区"},
								{name: "蛇口—大铲湾港区"},
								{name: "蛇口东角头湾区"},
								{name: "盐田港区"},
								{name: "下洞—沙鱼涌港区"},
								{name: "秤头角港口和电厂用海区"},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""}
							];
							break;
						case "排污区":
							if($("#area_parameter>div").hasClass("paiwuqu") == false) {
								$("#area_parameter").append("<div class='paiwuqu'><div id='pwq_temperature'>\
							<span><img src='image/radio-deselect.png'></span><span class='parameter'>水温</span></div>\
							<div id='pwq_PHprice'><span><img src='image/radio-deselect.png'></span><span class='parameter'>PH值</span></div>\
							<div id='pwq_salinity'><span><img src='image/radio-deselect.png'></span><span class='parameter'>营养盐</span></div>\
							</div>");
								$(".paiwuqu").siblings('div').remove();
							}
							$(".place").text("东宝河口排污区");
							$(".miniPlace").text("东宝河口排污区");
							$("#area_parameter div:eq(1)").click();
							map.update_data.my_option.series[0].markPoint.data =[
								{name: "东宝河口排污区",symbol:'image/paiwuquhuang.png'},
								{name: "西乡排污区",symbol:'image/paiwuquhuang.png'},
								{name: "妈湾排污区",symbol:'image/paiwuquhuang.png'},
								{name: "蛇口—赤湾排污区",symbol:'image/paiwuquhuang.png'},
								{name: "盐田—沙头角排污区",symbol:'image/paiwuquhuang.png'},
								{name: "乌泥涌排污区",symbol:'image/paiwuquhuang.png'},
								{name: "核电站热排水区",symbol:'image/paiwuquhuang.png'},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""}
							];
							data_assess_tooltip.pwq_apptoop("东宝河口排污区","排污区","东宝河口排污区");
							data_assess_tooltip.pwq_apptoop("妈湾排污区","排污区","妈湾排污区");
							data_assess_tooltip.pwq_apptoop("蛇口—赤湾排污区","排污区","蛇口_赤湾排污区");
							data_assess_tooltip.pwq_apptoop("核电站热排水区","排污区","核电站热排水区");
							data_assess_tooltip.pwq_apptoop("西乡排污区","排污区","西乡排污区");
							data_assess_tooltip.pwq_apptoop("乌泥涌排污区","排污区","乌泥涌排污区");
							data_assess_tooltip.pwq_apptoop("盐田—沙头角排污区","排污区","盐田_沙头角排污区");
		
							break;
						case "增养殖区":
							if($("#area_parameter>div").hasClass("yangzhiqu") == false) {
								$("#area_parameter").append("<div class='yangzhiqu'><div id='yzq_dissolved_oxygen'>\
							<span><img src='image/radio-deselect.png'></span><span class='parameter'>溶解氧</span></div>\
							<div id='yzq_PHprice'><span><img src='image/radio-deselect.png'></span><span class='parameter'>PH值</span></div>\
							<div id='yzq_salinity'><span><img src='image/radio-deselect.png'></span><span class='parameter'>营养盐</span></div>\
							</div>");
								$(".yangzhiqu").siblings('div').remove();
							}
							$(".place").text("矾石贝类护养增殖区");
							$(".miniPlace").text("矾石贝类护养增殖区");
							$("#area_parameter div:eq(1)").click();
							map.update_data.my_option.series[0].markPoint.data = [
								{name: "矾石贝类护养增殖区",symbol:'image/yzqxia.png'},
								{name: "南澳浅海养殖区",symbol:'image/yzqxia.png'},
								{name: "鹅公湾浅海养殖区",symbol:'image/yzqxia.png'},
								{name: "大鹏半岛西南浅海增养殖区",symbol:'image/yzqxia.png'},
								{name: "大鹏半岛东部浅海增养殖区",symbol:'image/yzqxia.png'},
								{name: "东山浅海养殖区",symbol:'image/yzqxia.png'},
								{name: "虎头门浅海增养殖区",symbol:'image/yzqxia.png'},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""}
							];
							data_assess_tooltip.zyzq_apptoop("矾石贝类护养增殖区","增养殖区","矾石贝类护养增殖区");
							data_assess_tooltip.zyzq_apptoop("南澳浅海养殖区","增养殖区","南澳浅海养殖区");
							data_assess_tooltip.zyzq_apptoop("虎头门浅海增养殖区","增养殖区","虎头门浅海增养殖区");
							data_assess_tooltip.zyzq_apptoop("大鹏半岛东部浅海增养殖区","增养殖区","大鹏半岛东部浅海增养殖区");
							break;
						case "海水浴场":
							if($("#area_parameter>div").hasClass("haishuiyuchang") == false) {
								$("#area_parameter").append("<div class='haishuiyuchang'><div id='hsyc_temperature'>\
							<span><img src='image/radio-deselect.png'></span><span class='parameter'>水温</span></div>\
							<div id='hsyc_wave_height'><span><img src='image/radio-deselect.png'></span><span class='parameter'>有效波高</span></div>\
							<div id='hsyc_dissolved_oxygen'><span><img src='image/radio-deselect.png'></span><span class='parameter'>溶解氧</span></div>\
							</div>");
								$(".haishuiyuchang").siblings('div').remove();
							}
							$(".place").text("小梅沙浴场");
							$(".miniPlace").text("小梅沙浴场");
							$("#area_parameter div:eq(1)").click();
							// map.update_data.my_option.series[0].markPoint.symbol = "image/youyongxiao.png";
							map.update_data.my_option.series[0].markPoint.data=[
								{name: "小梅沙浴场",symbol:'image/youyongxia.png'},
								{name: "大梅沙浴场",symbol:'image/youyongxia.png'},
								{name: "西涌海水浴场",symbol:'image/youyongxia.png'},
								{name: "东涌海水浴场",symbol:'image/youyongxia.png'},
								{name: "七星湾帆船运动区",symbol:'image/fcxia.png'},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""},
								{name: ""}
							];
							data_assess_tooltip.hsyc_apptoop("小梅沙浴场","海水浴场","小梅沙浴场");
							data_assess_tooltip.hsyc_apptoop("七星湾帆船运动区","海水浴场","七星湾帆船运动区");
							data_assess_tooltip.hsyc_apptoop("西涌海水浴场","海水浴场","西涌海水浴场");
							break;
						case "旅游区":
							if($("#area_parameter>div").hasClass("lvyouqu") == false) {
								$("#area_parameter").append("<div class='lvyouqu'><div id='qw_air_temperature'>\
							<span><img src='image/radio-deselect.png'></span><span class='parameter'>气温</span></div>\
							<div id='qw_temperature'><span><img src='image/radio-deselect.png'></span><span class='parameter'>水温</span></div>\
							<div id='qw_ wind_speed'><span><img src='image/radio-deselect.png'></span><span class='parameter'>风速</span></div>\
							<div id='qw_dissolved_oxygen'><span><img src='image/radio-deselect.png'></span><span class='parameter'>溶解氧</span></div>\
							</div>");
								$(".lvyouqu").siblings('div').remove();
							}
							$(".place").text("宝安海上田园风光旅游区");
							$(".miniPlace").text("宝安海上田园风光旅游区");
							$("#area_parameter div:eq(1)").click();
							map.update_data.my_option.series[0].markPoint.data=[
								{name: "宝安海上田园风光旅游区",symbol:'image/hstyfglyqxia.png'},
								{name: "前海城市景观旅游区",symbol:'image/csjglyqxia.png'},
								{name: "海上世界旅游用海区",symbol:'image/hssjxia.png'},
								{name: "滨海大道城市景观旅游区",symbol:'image/csjglyqxia.png'},
								{name: "沙头角城市景观旅游区",symbol:'image/csjglyqxia.png'},
								{name: "溪涌度假旅游区",symbol:'image/lydjcxia.png'},
								{name: "迭福度假旅游区",symbol:'image/lydjcxia.png'},
								{name: "下沙度假旅游区",symbol:'image/lydjcxia.png'},
								{name: "南澳度假旅游区",symbol:'image/lydjcxia.png'},
								{name: "西涌度假旅游区",symbol:'image/lydjcxia.png'},
								{name: "大鹏金海湾度假旅游区",symbol:'image/lydjcxia.png'},
								{name: "大、小梅沙度假旅游区",symbol:'image/lydjcxia.png'}
							];
							data_assess_tooltip.nyq_apptoop("宝安海上田园风光旅游区","旅游区","宝安海上田园风光旅游区");
							data_assess_tooltip.nyq_apptoop("大、小梅沙度假旅游区","旅游区","大_小梅沙度假旅游区");
							data_assess_tooltip.nyq_apptoop("大鹏金海湾度假旅游区","旅游区","大鹏金海湾度假旅游区");
							data_assess_tooltip.nyq_apptoop("海上世界旅游用海区","旅游区","海上世界旅游用海区");
							break;
					}
				map.show_map();
				//更新趋势图数据(頁面加載)
				var click_toparea = $(".place").text().replace(/[—、]/g,"_");			//获取点击默地区
				var trend_data = assess_data.district_name;
				var update_trend_data = assess_data.district_name[funcareatype][click_toparea].district_value;
				var trend_data_y = [];
				trend.update_trend.data = [];
				trend.update_trend.element_id = "trend";
				trend.update_trend.title_flag = true;
				trend.update_trend.xAxisData = assess_data.district_name[funcareatype][click_toparea].district_time;
				for(var i = 0; i < update_trend_data.length; i++){
					if(update_trend_data[i][zero] == undefined){
						trend_data_y.push("-");
					}else{
						trend_data_y.push(update_trend_data[i][zero]);
					}
				}
				trend.update_trend.data[0] = trend_data_y;	//Y軸
				trend.update_trend.legend_flag = true;
				trend.update_trend.name = funcareatype;
				trend.show_trend();
			});	
		}
	}
})