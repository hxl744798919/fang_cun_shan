define(
    ["jquery", "data", "map", "static", "single", "multi", "list", "common"],
    function ($, data, map, static_params, single, multi) {
        /*变量*/
        if (localStorage.CURRENT_TIME == undefined)
            localStorage.CURRENT_TIME = "2016-09-22 12:00";//默认时间

        if (sessionStorage.id == undefined) {
            sessionStorage.id = "24";//默认水温
        }
        if (sessionStorage.current_select == undefined) {
            sessionStorage.current_select = "bar";//默认单指标选中柱状图
        }
        //默认趋势图显示大梅沙
        if (sessionStorage.legend == undefined) {
            var legend_selected = {
                "深圳湾": false,
                    "沙井": false,
                    "矾石": false,
                    "伶仃南": false,
                    "沙头角": false,
                    "大梅沙": true,
                    "下沙": false,
                    "南澳": false,
                    "大鹏湾口": false,
                    "东涌": false,
                    "东山": false,
                    "核电站": false,
                    "坝光": false
            };
            //通过JSON对象提供的parse和stringify将其他数据类型转化成字符串，再存储到storage中
            legend_selected = JSON.stringify(legend_selected);
            //存入
            sessionStorage.legend = legend_selected;
        }
        CURRENT_SELECT_PARA = sessionStorage.id;//参数为营养盐时，趋势图连线用

        //获取后台数据
        var para_type = static_params.abnormalRes(sessionStorage.id);
        var time_current = localStorage.CURRENT_TIME + ":00";
        data.bar_data_update(time_current, para_type, sessionStorage.id);//如有参数记忆，则查询所记忆参数
        data.trend_data_update(para_type, sessionStorage.id, localStorage.CURRENT_TIME.split(" ")[0], localStorage.CURRENT_TIME.split(" ")[0]);
        data.list_data_update(localStorage.CURRENT_TIME + ":00", 5);//侧边默认加载大梅沙参数

        //引入map
        map.init_map();
        map.update_data.map_default("大梅沙");//由地图联动右侧，默认深圳湾
        map.set_min_max_value();
        //引入单指标
        single.single_init();
        /*方法*/

        /*事件*/
        //窗口自适应
        window.onresize = function () {				//浏览器放大缩小时执行
            var leftHeight = $("#overview").outerHeight(true);									//获取内嵌页面的高度  outerHeight(true)所有高度包括padding、border、margin
            var rightHeight = $("#flashing").outerHeight(true);		             				//获取内嵌页面左侧的高度
            var bodyWidth = $("#overview").outerWidth(true);
            var leftWidth = $("#flashing").outerWidth(true);
            if ($(".maximize").css("display") == 'none') {
                document.getElementById("overview_left").style.height = rightHeight - 220 + "px";		//内嵌页面减柱状图容器高度获得的高度赋值给地图容器
            } else {
                document.getElementById("overview_left").style.height = rightHeight - 0 + "px";		//内嵌页面减柱状图容器高度获得的高度赋值给地图容器
            }
            document.getElementById("ocean_list").style.height = rightHeight - 60 + "px";		//左侧总高度减多指标容器高度等于列表容器的高度
            document.getElementById("overview_left").style.width = bodyWidth - leftWidth - 10 + "px";
            document.getElementById("overview_btm").style.width = bodyWidth - leftWidth - 10 + "px";
            document.getElementById("statistics").style.width = bodyWidth - leftWidth - 10 + "px";		//多指標最大容器自適應

            leftWidth = $(".statistics").outerWidth(true);								//多指标中的实时统计和历史统计width
            document.getElementById("bar_statistics").style.width = leftWidth - 10 + "px";	//防止柱状图数量增多出现滚动条导致显示移位、减去出现滚动条宽度
            document.getElementById("trend_statistics").style.width = leftWidth - 10 + "px";	//防止趋势图数量增多出现滚动条导致显示移位、减去出现滚动条宽度

            single.bar_trend_resize();
            multi.bar_trend_resize();
            // multi.trend_resize();
            map.update_data.my_map.resize();
        };
    });