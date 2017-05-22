define(
    ["jquery", "jquery_ui"], function ($) {
        var day_ms = 24 * 3600 * 1000;
        var hour_ms = 60 * 60 * 1000;
        var min_ms = 60 * 1000;

        //对小于或等于9的数进行补0操作
        var set_date = function set_date(t) {
            t = t <= 9 ? "0" + t : t;
            return t;
        };

        var get_date = function (d) {
            var year = d.getFullYear();
            var month = set_date(d.getMonth() + 1);
            var day = set_date(d.getDate());
            var hour = set_date(d.getHours());
            var minutes = set_date(d.getMinutes());
            var seconds = set_date(d.getSeconds());
            return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        };

        return {
            //按毫秒计算天、小时、半小时，用于日期加减
            day_ms: day_ms,
            hour_ms: hour_ms,
            min_ms: min_ms,
            //单个时间控件
            new_date: function (container_1, container_2) {
                //配置项检查
                if (container_1 == "" || container_1 == undefined)
                    alert("容器错误");
                if (container_2 == "" || container_2 == undefined) {
                    $("#" + container_1).datepicker({
                        default_date: "+1w",
                        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                        monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        dateFormat: 'yy-mm-dd',
                        changeMonth: true,
                        prevBigText: '<<',
                        changeYear: true,
                        numberOfMonths: 1,
                        minDate: new Date("2015/01/01"),
                        maxDate: new Date(localStorage.CURRENT_TIME),
                    });
                    return;
                }

                $("#" + container_1).datepicker({
                    default_date: "+1w",
                    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    dateFormat: 'yy-mm-dd',
                    changeMonth: true,
                    prevBigText: '<<',
                    changeYear: true,
                    numberOfMonths: 1,
                    minDate: new Date("2015/01/01"),
                    maxDate: new Date(localStorage.CURRENT_TIME),
                    onClose: function (selectedDate) {
                        $("#" + container_2).datepicker("option", "minDate", selectedDate);
                    }
                });
                $("#" + container_2).datepicker({
                    default_date: "+1w",
                    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    dateFormat: 'yy-mm-dd',
                    changeMonth: true,
                    prevBigText: '<<',
                    changeYear: true,
                    numberOfMonths: 1,
                    minDate: new Date("2015/01/01"),
                    maxDate: new Date(localStorage.CURRENT_TIME),
                    onClose: function (selectedDate) {
                        $("#" + container_1).datepicker("option", "maxDate", selectedDate);
                    }
                });
            },
            //从时间戳 d 中获取时间
            get_date: get_date,
            //在时间戳 d 基础上增加 n 分钟, n 可为负数
            add_half_hour: function (d, n) {
                return get_date(new Date(d + n * min_ms));
            },
            set_date: set_date
        };
    });