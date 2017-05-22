define(["web_gis_path_points", "web_gis_path", "web_gis", "typhoon_trend", "typhoon_warning_data", "jquery","jquery_ui"],
    function (web_gis_path_points, web_gis_path, web_gis, typhoon_trend, typhoon_warning_data, $) {
        var RT_number = "-"; //实时台风编号判断是否添加动态小台风
		if(localStorage.CURRENT_INDEX == undefined)
             localStorage.CURRENT_INDEX = 0;
    // 点击观测指标弹出台风详情
    typhoon_warning_data.typhoon_historyAll_fun(new Date().getFullYear(),"01");
    var tcbut_active =true;
    $(".tc_but").click(function () {
        if(tcbut_active == true){
            $("#typhoon_details").stop().animate({left:"0%"},800);
            $(this).text("台风路径信息");
            tcbut_active =false;
            typhoon_trend.show_trend();
        }else{
            $("#typhoon_details").stop().animate({left:"100%"},800);
            $(".tc_but").text("近海观测指标");
            tcbut_active =true;
        }

    });
    window.onresize = function(){
        typhoon_trend.show_trend();
    };
// 台风详情点击关闭按钮
    $("#typhoon_details>img").click(function () {
        $("#typhoon_details").stop().animate({left:"100%"},800);
        $(".tc_but").text("近海观测指标");
        tcbut_active =true;
    });

// 右边侧边栏点击伸缩
    var tc_flexible = true;
    $(".tc_flexible").click(function(){
        if( tc_flexible == true){
            $("#typhoon_broadside").animate({right:'-20%'});
            $("#typhoon_details").css({width:"100%"});
            $(".tc_flexible").css("backgroundImage","url('image/typhoon/tc_flexible_c.png')");
            tc_flexible = false;
        }else{
            $("#typhoon_broadside").animate({right:'0'});
            $("#typhoon_details").css({width:"80%"});
            $(".tc_flexible").css("backgroundImage","url('image/typhoon/tc_flexible_j.png')");
            tc_flexible = true;
        }
        typhoon_trend.show_trend();
    });
//    台风列表点击Ul勾选功能
        var year_name="00000";
        var typhoon_name,typhoon_enname,typhoon_num;
    $(".th_details").on("click","ul",function () {
        year_name = $(this).find("li:nth-child(2)").text();
         typhoon_name = $(this).children().eq(2).html();
        typhoon_enname = $(this).children().eq(3).html();
         typhoon_num = $(this).children().eq(1).html();
        if(typhoon_num == RT_number){
            web_gis.set_realTime_typhone(true);
	     $(".tip_history").show();
	     	      $(".tip_current").hide();
        }else{
            web_gis.set_realTime_typhone(false);
            $(".tip_history").hide();
            $(".tip_current").show();
        
             
        }
        var img_url= $(this).find("span").css("backgroundImage").split("_")[1].slice(0,-2);
        if(img_url == "no.png"){
            $(this).find("span").css("backgroundImage","url('image/typhoon/checked_yes.png')");
            $(this).siblings().find("span").css("backgroundImage","url('image/typhoon/checked_no.png')");
            // $(".tip_history").hide();
            // $(".tip_current").show();
            //有无台风时的切换
            $(".tc_details").show();
            $(".no_tc_details").hide();
        //    显示具体信息
            typhoon_warning_data.typhoon_historyDetails_fun($(this).find("li:nth-child(2)").text(),"02");
            $(".tc_details table>tbody").html(" ");
            typhoon_warning_data.typhoon_historyTime_fun($(this).find("li:nth-child(2)").text(),"03");
            web_gis_path.generate_typhoon_path();
            web_gis_path_points.add_points_to_map(typhoon_name, typhoon_num, typhoon_enname);
            web_gis_path_points.forecast_clear_points();
            //默认加载台风
            if(typhoon_name == "海马"){
                $(".tip_current>ul>li:nth-child(3)>span").text("汕尾");
                $(".tip_current>ul>li:nth-child(4)>span").text("2016.10.21 13:00");
                $(".tip_current>ul>li:nth-child(5)>span").text("强台风");
                $(".tip_current>ul>li:nth-child(6)>span").text("42米/秒");
                $(".tip_current>ul>li:nth-child(7)>span").text("17.5米/秒 坝光");
                $(".tip_current>ul>li:nth-child(8)>span").text("5.4 东涌");
            }else if(typhoon_name == "妮妲"){
                $(".tip_current>ul>li:nth-child(3)>span").text("东涌（深圳）");
                $(".tip_current>ul>li:nth-child(4)>span").text("2016.08.02 04:00");
                $(".tip_current>ul>li:nth-child(5)>span").text("台风");
                $(".tip_current>ul>li:nth-child(6)>span").text("40米/秒 14级");
                $(".tip_current>ul>li:nth-child(7)>span").text("23米/秒 南澳");
                $(".tip_current>ul>li:nth-child(8)>span").text("23米 南澳");
            }else{
                $(".tip_current>ul>li:nth-child(3)>span").text("--");
                $(".tip_current>ul>li:nth-child(4)>span").text("--");
                $(".tip_current>ul>li:nth-child(5)>span").text("--");
                $(".tip_current>ul>li:nth-child(6)>span").text("--");
                $(".tip_current>ul>li:nth-child(7)>span").text("--");
                $(".tip_current>ul>li:nth-child(8)>span").text("--");
            }

            web_gis_path_points.typhoon_forecast_variate.click_index = 0;
            web_gis_path_points.typhoon_forecast_variate.pathsLeng = 0;
            web_gis_path_points.typhoon_forecast_variate.linesLeng = 0;
        }

        //左下角图例开关显示出来
        $(".tyc_but>span").removeClass().addClass("triangle_right");
        $( ".tyc_show" ).stop().show( "fold", 500);
        istyc_but = false;
        typhoon_trend.show_trend();
    });

//    左下角台风强度图例开关
    var istyc_but = true;
    $(".tyc_but").click(function () {
        if(istyc_but == true){
            $(".tyc_but>span").removeClass().addClass("triangle_right");
            $( ".tyc_show" ).stop().show( "fold", 500);
            istyc_but = false;
        }else{
            $(".tyc_but>span").removeClass().addClass("triangle_left");
            $( ".tyc_show" ).stop().hide( "fold", 500);
            istyc_but = true;
        }

    });
//    左下角预报机构图例开关
        var isprc_but = true;
        $(".prc_but").click(function () {
            if(isprc_but == true){
                $(".prc_but>span").removeClass().addClass("triangle_right");
                $( ".prc_show" ).stop().show( "fold", 500);
                isprc_but = false;
            }else{
                $(".prc_but>span").removeClass().addClass("triangle_left");
                $( ".prc_show" ).stop().hide( "fold", 500);
                isprc_but = true;
            }

        });

//    台风路径信息滚动条头部固定
    $(".tc_details").scroll(function(){
        $(".tc_details tr:first-child>th").css("top",$(this).scrollTop()+"px")
    });
    //    点击路径信息下的table下的tr变色
    $(".tc_details>table tbody tr").click(function () {
        $(this).addClass("tr_background").siblings(".tr_background").removeClass("tr_background");

    });

//    循环添加历史列表的时间控件的年份
    var th_time_max = new Date().getFullYear();   //获取当前年份
    var th_time_min = 1949;  //最小年份
    for(var i = th_time_max ; i >= th_time_min;i--){
        $("#cboxyear").append("<option value="+i+"><span>"+i+"</span>年</option>")
    }
    $("#cboxyear").find("option")[1].selected = true ;

    //点击年份添加全年的台风信息
    $(".no_tc_details").show();
    $(".tc_details").hide();
    //默认加载的时候显示无台风状态
    $("#cboxyear").change(function(){
        $(".th_details").html("");
        typhoon_warning_data.typhoon_historyAll_fun($(this).val(),"01");
	setTimeout(function () {
            $(".th_details ul li:contains("+year_name+")").prev().find("span").css("backgroundImage","url('image/typhoon/checked_yes.png')");
        },250)

    });

    /*趋势图全选、取消*/
    $("#ck").click(function(){
        var status = $(this).prop("checked");
        var legend = typhoon_trend.trend_init_data.legendselected;
        if(status){
            for(var i in legend){
                legend[i] = status;
            }
            $(".all_check").children("#ck").prop("checked", true);
            $(".all_check").children("label").html("取消");
        }else{
            for(var i in legend){
                legend[i] = status;
            }
            $(".all_check").children("#ck").prop("checked", false);
            $(".all_check").children("label").html("全选");
        }
        typhoon_trend.show_trend();
    });

    /*台风路径信息表格和趋势图画线*/
        $(".mous_box").on("mousemove",  function(e){
        $(".line").css("display", "block");
        var offsetX = e.clientX -5 + "px";
        $(".line1").css("left", offsetX);
        $(".line2").css("left", offsetX);
            if(e.clientX <= 65){
                $(".line").css("display", "none");
            }
    });

//        预报机构的勾选预测台风功能
        $(".prc_show li>input").click(function(){
            var forecast_name=$(this).val();
            if($(this).is(':checked')){
                web_gis_path_points.add_forecast_to_map(typhoon_name,typhoon_num,forecast_name);
                web_gis_path_points.line_app_ponints(forecast_name)

            }else{
                web_gis_path_points.single_clear_points(forecast_name);
                web_gis_path_points.line_clear_points(forecast_name);
            }

        });
        //右侧台风列表和相似路径的切换
        $(".th_head>p").click(function () {
            $(this).addClass("th_head_active").siblings(".th_head_active").removeClass("th_head_active");
            $($(this).attr("data-th")).addClass("BoxSimi_active").siblings(".BoxSimi_active").removeClass("BoxSimi_active");
        });

        //判断当前是否有台风
        setTimeout(function(){
            typhoon_warning_data.typhoon_historyTime_fun($(".th_details>ul:first-child li:nth-child(2)").text(),"03");
            //获取当前时间
            var RT_new_time = new Date().getTime();
			localStorage.IS_REAL_TYPHONY = false;
            if(RT_new_time - new Date(typhoon_warning_data.typhoon_data.RT_max_time).getTime()  <1000*60*60*24){
                web_gis.set_realTime_typhone(true);
				localStorage.CURRENT_INDEX = localStorage.CURRENT_INDEX + 1;
				localStorage.IS_REAL_TYPHONY = true;
                RT_number = $(".th_details>ul:first-child li:nth-child(2)").text()
                $(".th_details>ul:first-child").click();
                $(".tip_history").show();
                $(".tip_current").hide();
                $(".tip_history>ul li:nth-child(2)>span").html(RT_number);
                $(".tip_history>ul li:nth-child(3)>span").html(typhoon_name+"(" +typhoon_enname +")");
            }
        },500)

});