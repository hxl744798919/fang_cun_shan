define(["jquery", "data", "pie", "date", "jquery_cookie"],function ($, data, pie, date) {
    var query_flag = true;//需要查询后台数据标志

    localStorage.CURRENT_BROWSER_TYPE = get_browser_type();


    $(".click_grade").click(function () {
        var index = $(this).index();
        $(".grade_tab").eq(index).css("display","block").siblings(".grade_tab").css("display","none");
        //    字体颜色切换
        $(this).find("span").addClass("active");
        $(this).siblings().find("span").removeClass("active")
    });

    var count_num = 0;//计时本地时间更新时间
    //首页时间显示及本地时间更新
    setInterval(function () {
        var new_date = date.get_date(new Date());
        $("#now_time").html(new_date);
        //获取最新半小时间隔时间，并保存在本地，该时间用在所有查询中
        var loc_time = date.add_half_hour((new Date()).getTime(), -30);
        var year_month_day = loc_time.split(" ")[0];
        var hour_min_seconds = loc_time.split(" ")[1];
        var hour = hour_min_seconds.split(":")[0];
        var min = hour_min_seconds.split(":")[1];
        //首次进入或刷新时，获取查询时间，后续每1分钟比较一次
        if(count_num > (1 * 60 * 100) || count_num == 0){
            if(min <30){
                localStorage.CURRENT_TIME = year_month_day + " " + hour + ":" + "00";
            }
            else
            {
                localStorage.CURRENT_TIME = year_month_day + " " + hour + ":" + "30";
            }
            data.update_query_time();
            count_num = 1;
        }
        count_num++;
        if(query_flag){
            query_flag = false;
            //向后台请求数据
            data.data_update();
        }
        //数据请求成功
        if(data.get_query_flag())
        {
            data.reset_query_flag();
            query_success();
        }

    },10);
    //退出登录
    $(".exit").click(function () {
        $.cookie("JSESSIONID", "", { expires: -1,path: '/'});
        window.location.replace("/vmaxsystem/web-framework/login.jsp");
    });

    //版本信息
    $(".edition_box").click(function () {
        $(".edition").css("transform", "translateY(0px)");
    });
    $(".edition_box").mouseleave(function () {
        $(".edition").css("transform", "translateY(-300px)");
    });
    //查询版本信息
    $.get("../../../ocean/versioninfo.json", function (version_data) {
        var data_json =JSON.parse(version_data);
        $("#edition").html(data_json.versionnumber);
        $("#edition_time").html(data_json.madetime);

    });

    //根据最大、最小值需要，对数据进行转换，当全为空数据时返回false
    function transform_data(flag, arr) {
        var count = 0;//计算空数据个数
        //当为最大值时
        if(flag == "max"){
            for(var i = 0; i < arr.length; i++){
                if(arr[i] == "null" || arr[i] == null || arr[i] == 9999){
                    arr[i] = null;
                    count++;
                }
            }
        }
        if(flag == "min"){
            for(var i = 0; i < arr.length; i++){
                if(arr[i] == "null" || arr[i] == null){
                    arr[i] = 9999;
                    count++;
                }
            }
        }
        if(count == arr.length){
            return false;
        }
        return true;
    }
    //后台数据查询成功，更新页面数据
    function query_success() {
        {
            var data_json = data.datas;                   //一天的数据
            //值对应地点、时间
            function value_name_time(arr, value) {
                var index = null;
                for(var i = 0; i < arr.length; i++){
                    if(arr[i] == value){
                        index = i;
                        break;
                    }
                }
                return [data_json.districtname[index],data_json.acquisitiontime[index]];
            }
            //最高水温
            if(transform_data("max", data_json.temperature_water)){
                var max_temperature_water = Math.max.apply(null,data_json.temperature_water);
                $(".max_temp_water_time").html(value_name_time(data_json.temperature_water, max_temperature_water)[1].split(" ")[1]);
                $(".max_temp_water_name").html(value_name_time(data_json.temperature_water, max_temperature_water)[0]);
                $(".max_temp_water_val").html(Number(max_temperature_water).toFixed(2));
            }
            if(transform_data("min", data_json.temperature_water)){
                //最低水温
                var min_temperature_water = Math.min.apply(null,data_json.temperature_water);
                $(".min_temp_water_time").html(value_name_time(data_json.temperature_water, min_temperature_water)[1].split(" ")[1]);
                $(".min_temp_water_name").html(value_name_time(data_json.temperature_water, min_temperature_water)[0]);
                $(".min_temp_water_val").html(Number(min_temperature_water).toFixed(2));
            }
            //最高气温
            if(transform_data("max", data_json.temperature_air)){
                var max_temperature_air = Math.max.apply(null,data_json.temperature_air);
                $(".max_temp_air_time").html(value_name_time(data_json.temperature_air, max_temperature_air)[1].split(" ")[1]);
                $(".max_temp_air_name").html(value_name_time(data_json.temperature_air, max_temperature_air)[0]);
                $(".max_temp_air_val").html(Number(max_temperature_air).toFixed(2));

            }
            if(transform_data("min", data_json.temperature_air)){
                //最低气温
                var min_temperature_air = Math.min.apply(null,data_json.temperature_air);
                $(".min_temp_air_time").html(value_name_time(data_json.temperature_air, min_temperature_air)[1].split(" ")[1]);
                $(".min_temp_air_name").html(value_name_time(data_json.temperature_air, min_temperature_air)[0]);
                $(".min_temp_air_val").html(Number(min_temperature_air).toFixed(2));
            }

            //最大波高
            if(transform_data("max", data_json.waveheight_tenth)){
                var max_waveheight = Math.max.apply(null,data_json.waveheight_tenth);
                $(".max_waveheight_time").html(value_name_time(data_json.waveheight_tenth, max_waveheight)[1].split(" ")[1]);
                $(".max_waveheight_name").html(value_name_time(data_json.waveheight_tenth, max_waveheight)[0]);
                $(".max_waveheight_val").html(Number(max_waveheight).toFixed(2));
            }
            if(transform_data("max", data_json.speed_wind)){
                //最大风速
                var max_speed_wind = Math.max.apply(null,data_json.speed_wind);
                $(".max_speed_wind_time").html(value_name_time(data_json.speed_wind, max_speed_wind)[1].split(" ")[1]);
                $(".max_speed_wind_name").html(value_name_time(data_json.speed_wind, max_speed_wind)[0]);
                $(".max_speed_wind_val").html(Number(max_speed_wind).toFixed(2));
            }
            //最大雨量
            if(transform_data("max", data_json.rainfall)){
                var max_rainfall = Math.max.apply(null,data_json.rainfall);
                $(".max_rainfall_time").html(value_name_time(data_json.rainfall, max_rainfall)[1].split(" ")[1]);
                $(".max_rainfall_name").html(value_name_time(data_json.rainfall, max_rainfall)[0]);
                $(".max_rainfall_val").html(Number(max_rainfall).toFixed(2));
            }

            //水中油
            var oilinwater_json = data.oilinwater;
            var status_zjk = $.inArray(1, oilinwater_json["珠江口"]);  //判断该数组中是否存在1
            var status_dyw = $.inArray(1, oilinwater_json["大亚湾"]);

            if(status_zjk >= 0 && status_dyw >= 0){
                $(".oilinwater").html("珠江口、大亚湾存在原油泄露");
            }
            else if(status_zjk < 0 && status_dyw < 0){
                $(".oilinwater").html("全海域未监测到原油泄露，相关污染风险等级低");
            }
            else if(status_zjk >= 0 && status_dyw < 0){
                $(".oilinwater").html("珠江口存在原油泄露");
            }
            else if(status_zjk < 0 && status_dyw >= 0){
                $(".oilinwater").html("大亚湾存在原油泄露");
            }
            //截取返回的值
            var capture_page;//页面要呈现的值
            var capture_name=function(capture_name){
                if(capture_name == "七星湾帆船运动区"){
                    capture_page = capture_name.slice(0,3)
                }else if(capture_name == "小梅沙浴场"||capture_name == "大梅沙浴场") {
                    capture_page = capture_name.slice(0,-2)
                }else{
                    capture_page = capture_name.slice(0,-4)
                }
                switch (capture_name){
                    case "宝安海上田园风光旅游区":
                        capture_page = "海上田园";
                        break;
                    case "前海城市景观旅游区":
                        capture_page = "前海";
                        break;
                    case "海上世界旅游用海区":
                        capture_page = "海上世界";
                        break;
                    case "滨海大道城市景观旅游区":
                        capture_page = "滨海大道";
                        break;
                    case "沙头角城市景观旅游区":
                        capture_page ="沙头角";
                        break;
                    case "溪涌度假旅游区":
                        capture_page ="溪涌";
                        break;
                    case "迭福度假旅游区":
                        capture_page ="迭福";
                        break;
                    case "下沙度假旅游区":
                        capture_page ="下沙";
                        break;
                    case "南澳度假旅游区":
                        capture_page ="南澳";
                        break;
                    case "西涌度假旅游区":
                        capture_page ="西涌";
                        break;
                    case "大鹏金海湾度假旅游区":
                        capture_page ="大鹏金海湾";
                        break;
                    case "大_小梅沙度假旅游区":
                        capture_page ="大小梅沙";
                        break;
                }


            }


            //海滨浴场
            for(var kew in data.hone_page_data["海水浴场"]){
                //判断水质是优还是良
                var sw = data.hone_page_data["海水浴场"][kew][0];
                var yxbg = data.hone_page_data["海水浴场"][kew][1];
                var rjy = data.hone_page_data["海水浴场"][kew][2];
                var sw_str = "0";
                var rjy_str = "0";
                var yxbg_str = "0";
                //水温
                if(sw >= 23 && sw <= 28)
                    sw_str = "1";
                else if((sw >= 20 && sw <= 23) || (sw >= 28 && sw <= 33))
                    sw_str = "2";
                else if(sw < 20 )
                    sw_str = "3";
                else if(sw > 33 )
                    sw_str = "3";
                //溶解氧
                if(rjy > 6)
                    rjy_str = "1";
                else if(rjy >= 5 && rjy <= 6)
                    rjy_str = "2";
                else if(rjy < 5 )
                    rjy_str = "3";
                //有效波高
                if(yxbg > 1.5)
                    yxbg_str = "3";
                else if(yxbg > 1 && yxbg <= 1.5)
                    yxbg_str = "2";
                else if(yxbg <= 1 )
                    yxbg_str = "1";

                var pingjia = sw_str;
                if(pingjia < rjy_str)
                    pingjia = rjy_str;
                if(pingjia < yxbg_str)
                    pingjia = yxbg_str;


                if(pingjia == "1"){
                    capture_name(kew)
                    $(".beach_tab tr td:contains("+ capture_page+")").next().text("适合游憩")
                }

                if(pingjia == "2"){
                    capture_name(kew)
                    $(".beach_tab tr td:contains("+ capture_page+")").next().text("较适合游憩")
                }

                if(pingjia == "3"){
                    capture_name(kew)
                    $(".beach_tab tr td:contains("+ capture_page+")").next().text("不适合游憩")
                }

                if(pingjia == "0"){
                    capture_name(kew)
                    $(".beach_tab tr td:contains("+ capture_page+")").next().text("--")
                }
            }
            //旅游区
            for(var kew in data.hone_page_data["旅游区"]){
                var qw = data.hone_page_data["旅游区"][kew][0];
                var sw = data.hone_page_data["旅游区"][kew][1];
                var rjy = data.hone_page_data["旅游区"][kew][3];
                var fs = data.hone_page_data["旅游区"][kew][2];
                var sw_str = "0";
                var rjy_str = "0";
                var qw_str = "0";
                var fs_str = "0";
                //水温
                if(sw >= 23 )
                    sw_str = "1";
                else if(sw >= 18 && sw <= 23)
                    sw_str = "2";
                else if(sw < 18 )
                    sw_str = "3";
                //溶解氧
                if(rjy > 6)
                    rjy_str = "1";
                else if(rjy >= 5 && rjy <= 6)
                    rjy_str = "2";
                else if(rjy < 5 )
                    rjy_str = "3";
                //气温
                if(qw >= 15&& qw <= 35)
                    qw_str = "1";
                else if((qw >= 10 && qw <= 15)||(qw>= 25 && qw <= 38))
                    qw_str = "2";
                else if(qw < 10)
                    qw_str = "3";
                else if(qw > 38)
                    qw_str = "3";
                //风速
                if(fs < 3.3)
                    fs_str = "1";
                else if(fs >= 3.3 && fs <= 5.5)
                    fs_str = "2";
                else if(fs > 5.5 )
                    fs_str = "3";

                //评价
                var pingjia = sw_str;
                if(pingjia < rjy_str)
                    pingjia = rjy_str;
                if(pingjia < qw_str)
                    pingjia = qw_str;
                if(pingjia< fs_str)
                    pingjia = fs_str;
                if( kew == "宝安海上田园风光旅游区"||kew == "前海城市景观旅游区"||kew == "海上世界旅游用海区"||kew == "滨海大道城市景观旅游区"){
                    capture_name(kew)
                    if(pingjia == "1")
                        $(".west_seaarea").append(" <tr><td>"+ capture_page+"</td><td>适宜观光</td></tr>")
                    if(pingjia == "2")
                        $(".west_seaarea").append(" <tr><td>"+ capture_page+"</td><td>较适宜观光</td></tr>")
                    if(pingjia == "3")
                        $(".west_seaarea").append(" <tr><td>"+ capture_page+"</td><td>不适宜观光</td></tr>")
                    if(pingjia == "0")
                        $(".west_seaarea").append(" <tr><td>"+ capture_page+"</td><td>--</td></tr>")
                }else if(kew == "沙头角城市景观旅游区"||kew == "溪涌度假旅游区"||kew == "迭福度假旅游区"||kew == "大_小梅沙度假旅游区"){
                    capture_name(kew)
                    if(pingjia == "1")
                        $(".roc").append(" <tr><td>"+ capture_page+"</td><td>适宜观光</td></tr>")
                    if(pingjia == "2")
                        $(".roc").append(" <tr><td>"+ capture_page+"</td><td>较适宜观光</td></tr>")
                    if(pingjia == "3")
                        $(".roc").append(" <tr><td>"+ capture_page+"</td><td>不适宜观光</td></tr>")
                    if(pingjia == "0")
                        $(".roc").append(" <tr><td>"+ capture_page+"</td><td>--</td></tr>")
                }else{
                    capture_name(kew)
                    if(pingjia == "1")
                        $(".roc_peninsula").append(" <tr><td>"+ capture_page+"</td><td>适宜观光</td></tr>")
                    if(pingjia == "2")
                        $(".roc_peninsula").append(" <tr><td>"+ capture_page+"</td><td>较适宜观光</td></tr>")
                    if(pingjia == "3")
                        $(".roc_peninsula").append(" <tr><td>"+ capture_page+"</td><td>不适宜观光</td></tr>")
                    if(pingjia == "0")
                        $(".roc_peninsula").append(" <tr><td>"+ capture_page+"</td><td>--</td></tr>")
                }


            }

            pie.show_pie();
        }
    }
    //判断浏览器版本
    function get_browser_type(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera";
        } //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1){
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器

        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        if (isIE) {
            var IE5 = IE55 = IE6 = IE7 = IE8 = false;
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            IE55 = fIEVersion == 5.5;
            IE6 = fIEVersion == 6.0;
            IE7 = fIEVersion == 7.0;
            IE8 = fIEVersion == 8.0;
            IE9 = fIEVersion == 9.0;
            IE10 = fIEVersion == 10.0;
            IE11 = fIEVersion == 11.0;
            if (IE55) {
                return "IE55";
            }
            if (IE6) {
                return "IE6";
            }
            if (IE7) {
                return "IE7";
            }
            if (IE8) {
                return "IE8";
            }
            if (IE9) {
                return "IE9";
            }
            if (IE10) {
                return "IE10";
            }
            if (IE11) {
                return "IE11";
            }
        }//isIE end
    }//myBrowser() end
    return{


    }
})