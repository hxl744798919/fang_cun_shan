define(
    ["bar", "jquery", "data", "trend", "static", "date"],
    function (bar, $, data, trend, static_params, date) {
        /*变量*/
        var bar_object = [];//多指标柱状图对象存放数组
        var trend_object = [];
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

        var click_num = 0;//当前对比个数统计
        var rightHeight = $("#flashing").outerHeight(true);
        document.getElementById("overview_left").style.height = rightHeight - 0 + "px";		//内嵌页面减柱状图容器高度获得的高度赋值给地图容器
        document.getElementById("ocean_list").style.height = rightHeight - 60 + "px";
        document.getElementById("ocean_parameters_lucency").style.height = rightHeight - 304 + "px";	//右侧菜单全部收起下方空白高度
        var bodyWidth = $("#overview").outerWidth(true);
        var leftWidth = $("#flashing").outerWidth(true);
        document.getElementById("overview_left").style.width = bodyWidth - leftWidth - 10 + "px";
        document.getElementById("overview_btm").style.width = bodyWidth - leftWidth - 10 + "px";
        document.getElementById("statistics").style.width = bodyWidth - leftWidth - 10 + "px";		//多指標最大容器自適應
        var leftWidth = $(".statistics").outerWidth(true);								//多指标中的实时统计和历史统计width
        document.getElementById("bar_statistics").style.width = leftWidth - 10 + "px";	//防止柱状图数量增多出现滚动条导致显示移位、减去出现滚动条宽度
        document.getElementById("trend_statistics").style.width = leftWidth - 10 + "px";	//防止趋势图数量增多出现滚动条导致显示移位、减去出现滚动条宽度

        if (localStorage.CURRENT_TIME == undefined)
            localStorage.CURRENT_TIME = "2016-09-22 12:00";
        $("#dateStart_two").val(localStorage.CURRENT_TIME.split(" ")[0]);
        $("#dateEnd_two").val(localStorage.CURRENT_TIME.split(" ")[0]);
        /*方法*/
        //柱状图函数
        var bar_add = function (list_id, list_name) {
            $("#bar_statistics").append('<div id="list_bar' + list_id + '" class="columnar_list">\
                <div class="columnar_list_top">\
                <span class="columnar_name">' + list_name + '</span>\
			    <span class="cancel_ratio">取消对比</span></div>\
			    <div id="bar_add_list' + list_id + '" style="width: 100%; height: 220px;"></div>\
			    </div>');
            //显示柱状图
            bar.update_data.element_id = "bar_add_list" + list_id;
            bar.update_data.title_flag = false;
            var type = static_params.abnormalRes(list_id);
            var time_current = localStorage.CURRENT_TIME + ":00";
            data.bar_data_update(time_current, type, list_id);
            bar.update_data.data = data.bardata[type];
            bar_object[list_id] = bar.new_bar(); //为柱状图添加对象
        };
        //折线图函数
        var line = function (list_id, list_name) {
            $("#trend_statistics").append('<div id="list_trend' + list_id + '" class="columnar_list">\
			    <div class="columnar_list_top">\
			    <span class="columnar_name">' + list_name + '</span>\
			    <span class="cancel_ratio2">取消对比</span></div>\
			    <div id="history_list' + list_id + '" style="width: 100%; height: 220px;"></div>\
			    </div>');
            //显示趋势图
            trend.update_data.legend_flag = false;
            trend.update_data.element_id = "history_list" + list_id;
            var type = static_params.abnormalRes(list_id);
            data.trend_data_update(type, list_id, localStorage.CURRENT_TIME.split(" ")[0], localStorage.CURRENT_TIME.split(" ")[0]);
            data.checkbox_value[type] = data.trend_data_value.value;
            trend.update_data.xAxisData = data.trend_data_value.time;
            trend.update_data.data = data.trend_data_value.value;
            trend.update_data.title_flag = false;
            var inputs = $("div.checkbox input:not('#allck')");                                //获得input的所以值
            for (var j = 0; j < inputs.length; j++) {
                trendLegendselected[inputs[j].value] = inputs[j].checked;
            }
            sessionStorage.legend = JSON.stringify(trendLegendselected);
            trend_object[list_id] = trend.new_trend(); //为折线图添加对象
            // trend.multiIndex_trend();
            $("#" + list_id).find("span.contrast").text("取消");
            $("div.checkbox").removeClass("opacity");

        };

        //柱状图与趋势图切换，复选框显示与隐藏
        function show() {
            if ($("#trend_statistics").children().length > 2) {
                $("div.checkbox").removeClass("opacity");
            } else {
                $("div.checkbox").addClass("opacity");
            }
        }

        //多指标时间控件, new_date(container, default_date, min_max)
        date.new_date("dateStart_two", "dateEnd_two");
        var datestart = document.getElementById("dateStart_two");
        var dateend = document.getElementById("dateEnd_two");
        datestart.onchange = dateend.onchange = function () {
            $("#confirm_btn_two").css({
                "backgroundColor": "#333",
                "color": "#fff"
            })
        };
        /*事件*/
        //多指标中线随鼠标移动
        $("div.statistics_chart").on("mousemove", function (event) {
            $("div.indicatrix").css("left", event.clientX + "px");
        });
        //多指标点击复选款增加选项
        $("div.checkbox input").on("click", function () {
            //点击字体变色
            if (this.checked) {
                $(this).parent().css("color", "#000");
            } else {
                $(this).parent().css("color", "rgb(192,204,208)");
            }
            var lists = $("#trend_statistics").find("[id^=history_list]");        //获得折线图的所有容器
            var inputs = $("div.checkbox input:not('#allck')");                                //获得input的所以值
            for (var i = 0; i < lists.length; i++) {
                trend. update_data.element_id = $(lists[i]).attr("id");
                var id = $(lists[i]).attr("id").slice(-2);
                var type = static_params.abnormalRes(id);
                trend.update_data.data = data.checkbox_value[type];
                trend.update_data.legend_flag = false;
                trend.update_data.title_flag = false;
                for (var j = 0; j < inputs.length; j++) {
                    trendLegendselected[inputs[j].value] = inputs[j].checked;
                }
                sessionStorage.legend = JSON.stringify(trendLegendselected);
                trend.refresh_trend(trend_object[id]);
            }

        });
        //点击多指标，默认加载柱状图、趋势图
        $("#ComprehensiveContrast").one("click", function () {
            var ContrastText = document.getElementById('ComprehensiveContrast').innerHTML;
            if (ContrastText == "多指标综合对比") {
                //  多指标打开后默认值
                //  柱状图
                bar_add("02", "风速(m/s)");
                bar_add("24", "水温(℃)");
                bar_add("26", "PH值");

                //折线图
                line("02", "风速(m/s)");
                line("24", "水温(℃)");
                line("26", "PH值");

            }
        });
        //多指标、单指标页面切换
        $("#ComprehensiveContrast").on("click", function () {
            setTimeout(function () {
                $(".AllCheck").toggleClass("noShow");  //点击多指标综合对比单指标页面全选消失
            }, 150)
            var ContrastText = document.getElementById('ComprehensiveContrast').innerHTML;
            if (ContrastText == "多指标综合对比") {
                $(".data_state").css({"margin": "0", "line-height": "60px"});
                $("#ComprehensiveContrast").text("单指标综合对比");
                $(".contrast").show();
                $(".right_title h3").hide();
                $(".abnormal_number").hide();
                $(".data_state_font, .data_units, .fa-long-arrow-up, .fa-long-arrow-down").hide();
                $(".statistics").animate({
                    left: '0',
                    height: '100%',
                    width: ' 83%'
                });
            }
            else {
                trend.update_data.legend_flag = true;
                $(".statistics").animate({
                    left: '9999px',
                    height: '98%',
                    width: '83%'
                });
                $(".data_state").css({"margin": "-35px 8px 0 0", "line-height": "48px"});
                $(".data_state_font, .data_units, .fa-long-arrow-up, .fa-long-arrow-down").show();
                $("#ComprehensiveContrast").text("多指标综合对比");
                $(".contrast").hide();
                $(".right_title h3").show();
                var abnormal3 = $("#title3 .data_state_span").length;
                var abnormal2 = $("#title2 .data_state_span").length;
                var abnormal1 = $("#title1 .data_state_span").length;
                $(".abnormal_number_1").text(abnormal1);
                $(".abnormal_number_2").text(abnormal2);
                $(".abnormal_number_3").text(abnormal3);
                if (abnormal1 == 0) {
                    $(".abnormal_1").hide();
                } else {
                    $(".abnormal_1").show();
                }
                if (abnormal2 == 0) {
                    $(".abnormal_2").hide();
                } else {
                    $(".abnormal_2").show();
                }
                if (abnormal3 == 0) {
                    $(".abnormal_3").hide();
                } else {
                    $(".abnormal_3").show();
                }
            }

        });
        //多指标对比点击复选框显示和隐藏函数
        $("ul.statistics_nav li").click(function () {
            $(this).addClass("time").siblings(".time").removeClass("time");
            var id = $(this).attr("temp_id");
            $(id).removeClass("opacity").siblings().addClass("opacity");
            if (id === "#bar_statistics") {
                $("div.multi_index").hide();
                current_flag = "bar_statistics";
                // $(this).addClass("bar_statistics_color").siblings().removeClass("bar_statistics_color");
            }
            else {
                $("div.multi_index").show();
                current_flag = "trend_statistics";
            }
        });
        //对比&取消点击响应
        $(".contrast").click(function (event) {
            event.stopPropagation();             //阻止事件触发父元素的点击事件
            $(this).parents(".abnormal_list").siblings(".abnormal_list_bg").removeClass("abnormal_list_bg");//点击取消和对比的时候添加遮罩层
            $(this).parents(".abnormal_list").next().addClass("abnormal_list_bg");
            $(this).parents(".abnormal_list").addClass("abnormal_list_sz").siblings().removeClass("abnormal_list_sz");
            var text_name = $(this).html();			//获取当前点击中的内容
            var columnar_id = $(".columnar_list").prop("id");
            var list_id = $(this).parent().parent().prop("id");//获取当前点击父级父级中的ID
            var list_type = static_params.abnormalRes(list_id);
            var list_name = static_params.abnormalRes_ch(list_id);
            if (text_name == "取消")//点击对比会变为取消
            {
                click_num = click_num + 1;
                //柱状图对比
                $("#bar_statistics").append('<div id="list_bar' + list_id + '" class="columnar_list">\
                <div class="columnar_list_top">\
                <span class="columnar_name">' + list_name + '</span>\
			    <span class="cancel_ratio">取消对比</span></div>\
			    <div id="bar_add_list' + list_id + '" style="width: 100%; height: 220px;"></div>\
			    </div>');
                //显示柱状图

                bar.update_data.element_id = "bar_add_list" + list_id;
                bar.update_data.title_flag = false;
                var id = $(this).parents(".abnormal_list").attr("id");
                var type = static_params.abnormalRes(id);
                var time_current = localStorage.CURRENT_TIME + ":00";
                CURRENT_SELECT_PARA = id;//当该ID为营养盐时，趋势图断点连线
                data.bar_data_update(time_current, type, id);
                bar.update_data.data = data.bardata[type];
                bar_object[list_id] = bar.new_bar();
                //趋势图对比
                $("#trend_statistics").append('<div id="list_trend' + list_id + '" class="columnar_list">\
			    <div class="columnar_list_top">\
			    <span class="columnar_name">' + list_name + '</span>\
			    <span class="cancel_ratio2">取消对比</span></div>\
			    <div id="history_list' + list_id + '" style="width: 100%; height: 220px;"></div>\
			    </div>');
                //显示趋势图
                trend.update_data.legend_flag = false;
                trend.update_data.element_id = "history_list" + list_id;
                var dateStart = $("#dateStart_two").val();  //从时间控件获取到的起始时间
                var dateEnd = $("#dateEnd_two").val();       //从时间控件获取到的结束时间
                data.trend_data_update(type, id, dateStart, dateEnd);        //查询数据
                trend.update_data.data = data.trend_data_value.value;              //将查询的数据赋值给trend.multiIndex.data
                data.checkbox_value[type] = data.trend_data_value.value;          //另外将查到的数据保存在 data.checkbox_value在下面复选框查询时使用
                trend.update_data.xAxisData = data.trend_data_value.time;        //将查询到的时间值赋给X轴
                trend.update_data.title_flag = false;
                var inputs = $("div.checkbox input:not('#allck')");                                //获得input的所以值
                for (var j = 0; j < inputs.length; j++) {
                    trendLegendselected[inputs[j].value] = inputs[j].checked;
                }
                sessionStorage.legend = JSON.stringify(trendLegendselected);
                trend_object[list_id] = trend.new_trend() ; //为折线图添加对象
            }
            else {//点击取消会变为对比
                click_num = click_num - 1;
                if (click_num == 0)
                    trend.update_data.legend_flag = true;
                var type = $("#list_bar" + list_id).prop("id");
                $("#" + type).remove();
                var type = $("#list_trend" + list_id).prop("id");
                $("#" + type).remove();
                var id = $(this).parents(".abnormal_list").attr("id");
                var type = static_params.abnormalRes(id);
                data.checkbox_value[type].length = 0;
                bar.destroy_bar(bar_object[list_id]);//取消时销毁该柱状图对象
                trend.destroy_trend(trend_object[list_id]);//取消时销毁该折线图对象
            }
            //多指标对比点击复选框显示和隐藏
            show()
        });
        //多指标柱状图，实时统计→取消对比
        $(".statistics_single").delegate(".cancel_ratio", "click", function () {	//delegate方法为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序
            var type_id = ($(this).parent().parent().prop("id").substr(-2));//获得当前父级的父级中的ID截取第5、6个数
            var html = $(".contrast").prop("class");							//获取到class名称
            var x = document.getElementsByClassName(html);						//根据class名称获取HTML内容
            x[type_id - 1].innerHTML = "对比";										//根据下标改变HTML中的内容
            $(this).parent().parent().remove();                                  //删除当前父级的父级容器
            $("#trend_statistics").children("#list_trend" + type_id).remove();  //多指标对比点击复选框显示和隐藏
            var type = static_params.abnormalRes(type_id);
            data.checkbox_value[type].length = 0;
            bar.destroy_bar(bar_object[type_id]);//取消时销毁该柱状图对象
            trend.destroy_trend(trend_object[type_id]);//取消时销毁该折线图对象
            show();

        });
        //多指标趋势图，实时统计→取消对比
        $(".statistics_more").delegate(".cancel_ratio2", "click", function () {//delegate方法为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序
            var type_id = ($(this).parent().parent().prop("id").substr(-2));	//获得当前父级的父级中的ID截取第5、6个数
            var html = $(".contrast").prop("class");							//获取到class名称
            var x = document.getElementsByClassName(html);						//根据class名称获取HTML内容
            x[type_id - 1].innerHTML = "对比";										//根据下标改变HTML中的内容
            $(this).parent().parent().remove();                             	//删除当前父级的父级容器
            $("#bar_statistics").children("#list_bar" + type_id).remove();
            var type = static_params.abnormalRes(type_id);
            data.checkbox_value[type].length = 0;
            show();                                                             //多指标对比点击复选框显示和隐藏
        });
        //点击确定按钮
        $("#confirm_btn_two").click(function () {
            $(this).css({
                "backgroundColor": "#eee",
                "color": "#666"
            });
            trend.update_data.legend_flag = false;  //隐藏掉echarts默认的头部横轴
            trend.update_data.title_flag = false;   //隐藏掉echarts默认的头部标签值

            var dateStart = $("#dateStart_two").val();  //从时间控件获取到的起始时间
            var dateEnd = $("#dateEnd_two").val();       //从时间控件获取到的结束时间

            var lists = $("#trend_statistics").find("[id^=history_list]");       //获得折线图的所有容器
            for (var i = 0; i < lists.length; i++) {
                trend.update_data.element_id = $(lists[i]).attr("id");
                var id = $(lists[i]).attr("id").slice(-2);
                var type = static_params.abnormalRes(id);
                data.trend_data_update(type, id, dateStart, dateEnd);
                trend.update_data.data = data.trend_data_value.value;
                trend.update_data.xAxisData = data.trend_data_value.time;
                data.checkbox_value[type] = data.trend_data_value.value;
                trend.refresh_trend(trend_object[id]);
            }
        });
        //多指标点击关闭按钮
        $(".statistics_close").click(function () {
            trend.update_data.legend_flag = true;
            setTimeout(function () {
                $(".AllCheck").toggleClass("noShow");  //点击多指标综合对比单指标页面全选消失
            }, 150);
            $(".statistics").animate({
                left: '9999px',
                height: '98%',
                width: '83%'
            });
            $(".data_state_font, .data_units, .fa-long-arrow-up, .fa-long-arrow-down").show();
            $("#ComprehensiveContrast").text("多指标综合对比");
            $(".contrast").hide();
            $(".data_state").css({"margin": "-35px 8px 0 0", "line-height": "48px"});
            $(".right_title h3").show();
            var abnormal3 = $("#title3 .data_state_span").length;
            var abnormal2 = $("#title2 .data_state_span").length;
            var abnormal1 = $("#title1 .data_state_span").length;
            $(".abnormal_number_1").text(abnormal1);
            $(".abnormal_number_2").text(abnormal2);
            $(".abnormal_number_3").text(abnormal3);
            if (abnormal1 == 0) {
                $(".abnormal_1").hide();
            } else {
                $(".abnormal_1").show();
            }
            if (abnormal2 == 0) {
                $(".abnormal_2").hide();
            } else {
                $(".abnormal_2").show();
            }
            if (abnormal3 == 0) {
                $(".abnormal_3").hide();
            } else {
                $(".abnormal_3").show();
            }
        });
        //ESC快捷键
        window.onkeydown = function (event) {
            if (event.keyCode == 27) {
                $(".statistics").animate({
                    left: '9999px',
                    height: '98%',
                    width: '83%'
                });
                $(".data_state_font, .data_units, .fa-long-arrow-up, .fa-long-arrow-down").show();
                $("#ComprehensiveContrast").text("多指标综合对比");
                $(".contrast").hide();
                $(".data_state").css({"margin": "-35px 8px 0 0", "line-height": "48px"});
            }
        };
        //多指标趋势图全选、取消
        $("#allckBox").click(function () {
            var true_or_false = $(this).children("#allck").prop("checked");
            if (true_or_false) {
                $(".ck").prop("checked", true);
                $(".ck").siblings("label").css("color", "#000");
                $(this).children("#allck").siblings().html("取消");
            } else {
                $(".ck").prop("checked", false);
                $(".ck").siblings("label").css("color", "rgb(192,204,208)");
                $(this).children("#allck").siblings().html("全选");
            }
            var lists = $("#trend_statistics").find("[id^=history_list]");        //获得折线图的所有容器
            var inputs = $("div.checkbox input:not('#allck')");                                //获得input的所以值
            for (var i = 0; i < lists.length; i++) {
                trend.update_data.element_id = $(lists[i]).attr("id");
                var id = $(lists[i]).attr("id").slice(-2);
                var type = static_params.abnormalRes(id);
                trend.update_data.data = data.checkbox_value[type];
                trend.update_data.legend_flag = false;
                trend.update_data.title_flag = false;

                for (var j = 0; j < inputs.length; j++) {
                    trendLegendselected[inputs[j].value] = inputs[j].checked;
                }
                sessionStorage.legend = JSON.stringify(trendLegendselected);
                trend.refresh_trend(trend_object[id]);
            }
        });
        //多指标点击复选框的时候判断什么时候全选和取消
        $(".checkbox ul li:not(#allckBox)").click(function () {
            var is_true = [];
            $(".ck").each(function () {
                if($(this).prop("checked")){
                    is_true.push($(this).prop("checked"));
                }
            });
            if(is_true.length == 13){
                $("#allckBox").children("input#allck").prop("checked",true);
                $("#allckBox").children("label").html("取消");
            }
            else{
                $("#allckBox").children("input#allck").prop("checked",false);
                $("#allckBox").children("label").html("全选");
            }
        });
        /*返回*/
        return {
            //bar 与 trend resize
            bar_trend_resize: function () {
                for(var key in bar_object){
                    if(bar_object[key] != "" && bar_object[key] != undefined)
                        bar_object[key].resize(); //bar适应
                }
                for(var key in trend_object){
                    if(trend_object[key] != "" && trend_object[key] != undefined)
                        trend_object[key].resize(); //bar适应
                }
            }
        }
    });