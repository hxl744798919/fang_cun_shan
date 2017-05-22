/**
 * Created by Administrator on 2017/3/14.
 */
define(["web_gis", "web_gis_mini", "jquery","jquery_ui"] , function(web_gis, web_gis_mini){
    var current_tab = "海域全景";
    $(".rightTop .checkBox li").click(function () {
        $(".tooltip").remove();          //当点击切换的时候把提示框清空
        var src = $(this).find(".icon").children().attr("src");
        $(this).find(".icon").children().attr("src","image/radio-select.png");
        $(this).siblings().find(".icon").children().attr("src","image/radio-deselect.png");
        $(this).addClass("checkColor").siblings().removeClass("checkColor");

    //    小地图的切换
        var btn_status = true;
        var map_text = $(this).text();
        if( map_text != "海域全景"){
            $("#map_shrink").show();
            btn_status = false;
        }else{
            $("#map_shrink").hide();
            btn_status = true;
        }
        if(btn_status){
            web_gis.clear_all_tip();
            web_gis_mini.clear_all_tip();

            web_gis.add_all_tip(false);
        }else{
            web_gis.clear_all_tip();
            web_gis_mini.clear_all_tip();
        }
    //正方形提示框切换
        var class_area = $(this).attr("data-area");
       $(class_area).addClass("area_active").siblings(".area_active").removeClass("area_active");

    });
    //点击小地图方形提示框
    $(".hover").click(function () {
        $("#map_magnify").animate({left:"0%",top:"0%"},800);
        var data_areaId = $(this).attr("data-areaId");
        web_gis_mini.clear_all_tip();
        web_gis_mini.refresh_mini_map(data_areaId);
    });
    $("#map_magnify img").click(function () {
        web_gis.clear_all_tip();
        $("#map_magnify").animate({left:"100%",top:"100%"},800);
    })
    //按下键盘Esc退出大地图
    $(document).keydown(function (even) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && event.keyCode == 27){
            $("#map_magnify").animate({left:"100%",top:"100%"},800);
        }
    })
    $(document.getElementById('ocean_map_2')
        .contentWindow.document).keydown(function (even) {
        var e = event || window.event;
        if( even.keyCode == 27){
            $("#map_magnify").animate({left:"100%",top:"100%"},800);
        }
    })
    //三角箭头点击伸缩功能
    $(".rightTop div.toggle").click(function () {
        $(this).parent().hide();
        $(".minRightTop").show();
    });
    $(".minRightTop").click(function () {
        $(".minRightTop").hide();
        $(".rightTop").show();
    });
});