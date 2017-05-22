define(["jquery"],function($){
        //点击侧边栏
        $(".video_right_minName").click(function(){
            $(this).addClass("active").parent().siblings().children("span").removeClass("active");//颜色字体变化
            $(this).next().addClass("active_img").parent().siblings().children("img").removeClass("active_img")
        });
        $(".video_right_min>ul>li:gt(21)").hide();
        var isshow=false;
        $(".video_right_bot>img").click(function(){
            if(!isshow){
                $(this).attr("src","image/shanglai.png");
                $(".video_right_min>ul>li:gt(21)").show();
                isshow=true;
            }else {
                $(this).attr("src", "image/xialai.png");
                $(".video_right_min>ul>li:gt(21)").hide();
                isshow = false;
            }
        });
        //获取系统时间
        var week_day = ["日", "一", "二", "三", "四", "五", "六"];
        function setDate(t) {          //对小于或等于9的数进行补0操作
            t = t <=9 ? "0" + t : t;
            return t;
        }
        function getDate(date) {       //从时间戳中获取时间
            var year = date.getFullYear();
            var month = setDate(date.getMonth() + 1);
            var day = setDate(date.getDate());
            var hour = setDate(date.getHours());
            var minutes = setDate(date.getMinutes());
            var week = week_day[date.getUTCDay()];
            return year + "年" + month + "月" + day + "日 星期" + week +" " + hour + ":" + minutes;
        }
        setInterval(function () {
            var date = getDate(new Date());
            $(".videoTime").html(date);
        },10)

        //全屏
        $(".full_screen").click(function () {
            $(".video_left").css("display", "none");
            $("#fullScreen_video").css("display", "block");
            var name = $(this).parents(".video_box").find(".videoName").html();
            var time = $(this).parents(".video_box").find(".videoTime").html();
            var video_src = $(this).siblings("video").attr("src");
            $(".full_videoName").html(name);
            $(".full_videoTime").html(time);
            $(".full_video video").attr("src", video_src);

        })
        //Esc快捷键退出全屏
        $(".full_screen2").click(function () {
            $(".video_left").css("display", "block");
            $("#fullScreen_video").css("display", "none");
        })
        window.onkeydown = function (e) {
            if(e.keyCode == 27){
                $(".video_left").css("display", "block");
                $("#fullScreen_video").css("display", "none");
            }
        }

    });






