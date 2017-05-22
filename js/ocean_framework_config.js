require.config({
    paths: {
        jquery: "../thirdparty/jquery-1.8.3.min",
        jquery_ui: "../thirdparty/jquery-ui.min",
        jquery_cookie: "../thirdparty/jquery.cokie.min",
        date: "common/date",
        static: "common/static",
        rdk_url: "common/rdkUrl",		//rdk
        data: "common/homepage_data"
    },
    //指定模块依赖关系
    shim:{
        "jquery_ui": ["jquery"]
    }
});
//设备状态饼图
require(["jquery", "date", "data", "jquery_cookie"], function ($, date, data) {
    var u = window.location.href.split("=")[1];
    location_replace(u);

    function location_replace(url){
        $("#iframe").attr("src", url);
        //点击进入响应页面后对应的图片选中
        $(".active .page_url").css("backgroundImage", "");
        $(".active .page_url").parent().css("backgroundColor", "");
        if(url == "sea_env.html"){
            $(".sea_env_a").css("backgroundImage", "url(image/ocean_framework/sea_env.png)");
            $(".sea_env_a").parent().css("backgroundColor", "rgba(76,108,129,0.7)");
        }
        else if(url == "sea_forecast.html"){
            $(".sea_forecast_a").css("backgroundImage", "url(image/ocean_framework/sea_forecast.png)");
            $(".sea_forecast_a").parent().css("backgroundColor", "rgba(76,108,129,0.7)");
        }
        else if(url == "sea_space.html"){
            $(".sea_space_a").css("backgroundImage", "url(image/ocean_framework/sea_space.png)");
            $(".sea_space_a").parent().css("backgroundColor", "rgba(76,108,129,0.7)");
        }
        else if(url == "sea_economy.html"){
            $(".sea_economy_a").css("backgroundImage", "url(image/ocean_framework/sea_economy.png)");
            $(".sea_economy_a").parent().css("backgroundColor", "rgba(76,108,129,0.7)");
        }
        else if(url == "sea_monitor.html"){
            $(".sea_monitor_a").css("backgroundImage", "url(image/ocean_framework/sea_monitor.png)");
            $(".sea_monitor_a").parent().css("backgroundColor", "rgba(76,108,129,0.7)");
            $("#iframe").attr("src", "http://192.168.8.15:8080/SZHY/space/Video/videoMonitor.jsp")
        }
        else if(url == "sea_data.html"){
            $(".sea_data_a").css("backgroundImage", "url(image/ocean_framework/sea_data.png)");
            $(".sea_data_a").parent().css("backgroundColor", "rgba(76,108,129,0.7)");
        }
    }
    function resize(){
        var wid = document.body.clientWidth;
        var hei = document.body.clientHeight;
        $(".main").css("height", hei - 50 + "px");
        var wh = $("#nav-index").width();
        $("#mainContent").css("width", wid - wh - 10 + "px");
    };
    resize();
    window.onresize = function(){
        resize();
    };
    var is_hover = true;
    $(".on_off").click(function(){
        $("#nav-index").toggleClass("nav_width");
        $(".span_show").toggle();
        if($("#nav-index").width() == 135){
            is_hover = false;
        }else{
            is_hover = true;
        }
        resize();
    });
    $(".nav_stacked li a").on("mouseover", function() {
        if(is_hover){
            var wh = $("#nav-index").width()+ 7;
            var on_off_text = $(".on_off").text();
            if(on_off_text == " "){
                $(this).next(".out_div").addClass("out_show");
                $(".out_div").css({"margin-left": wh + "px"});
            }
        }
    });
    $(".nav_stacked li a").mouseout(function(){
        $(this).next(".out_div").removeClass("out_show");
    });

    $("li.active").click(function(){
        var index = $(this).index();
        //初始化所有图标及颜色
        $(".sea_env_a").css("backgroundImage", "url(image/ocean_framework/sea_env_no.png)");
        $(".sea_forecast_a").css("backgroundImage", "url(image/ocean_framework/sea_forecast_no.png)");
        $(".sea_space_a").css("backgroundImage", "url(image/ocean_framework/sea_space_no.png)");
        $(".sea_economy_a").css("backgroundImage", "url(image/ocean_framework/sea_economy_no.png)");
        $(".sea_monitor_a").css("backgroundImage", "url(image/ocean_framework/sea_monitor_no.png)");
        $(".sea_data_a").css("backgroundImage", "url(image/ocean_framework/sea_data_no.png)");
        $(".page_url").parent().css("backgroundColor", "");

        //点击换成高亮图片
        var img_url = {
            2: "image/ocean_framework/sea_env.png",
            4: "image/ocean_framework/sea_forecast.png",
            6: "image/ocean_framework/sea_space.png",
            8: "image/ocean_framework/sea_economy.png",
            10: "image/ocean_framework/sea_monitor.png",
            12: "image/ocean_framework/sea_data.png"
        };
        $(this).find(".page_url").css("backgroundImage", "url("+ img_url[index] +")");
        $(this).siblings(".bak").removeClass("bak1");
        $(this).prev(".bak").addClass("bak1");


    });

    //退出登录按钮
    $(".optionBox").mouseover(function(){
        $(".log_out").show();
    });
    $(".optionBox").mouseout(function(){
        $(".log_out").hide();
    });
    //左上角时间显示及维护本地时间
    var count_num = 0;
    setInterval(function () {
        var cur_date = date.get_date(new Date());
        //获取最新半小时间隔时间，并保存在本地，该时间用在所有查询中
        var loc_time = date.add_half_hour((new Date()).getTime(), -30);
        var year_month_day = loc_time.split(" ")[0];
        var hour_min_seconds = loc_time.split(" ")[1];
        var hour = hour_min_seconds.split(":")[0];
        var min = hour_min_seconds.split(":")[1];
        //和数据库最新上报时间比较，每1分钟比较一次
        if(count_num > (1 * 60 * 100) || count_num == 0){
            if(min <30){
                localStorage.CURRENT_TIME = year_month_day + " " + hour + ":" + "00";
            }
            else
            {
                localStorage.CURRENT_TIME = year_month_day + " " + hour + ":" + "30";
            }
            data.update_query_time();
            count_num = 0;
        }
        $("#time").html(cur_date);
        count_num++;
    },10);
    //时间测试窗口，默认隐藏
    var current_time_temp = localStorage.CURRENT_TIME;
    $("#test_flag_button").click(function () {
        if($("#test_flag_checkbox")[0].checked) {
            localStorage.CURRENT_TIME = $("#test_flag_text").val();
        }
        else {
            localStorage.CURRENT_TIME = current_time_temp;
        }
    });
    //退出登录
    $("#login_out").click(function () {
        $.cookie("JSESSIONID", "", { expires: -1,path: '/'});
        window.location.replace("/vmaxsystem/web-framework/login.jsp");
    });
});




