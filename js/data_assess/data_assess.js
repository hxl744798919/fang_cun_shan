define(function () {
    return {
        //右上角地区选择
        isChecked: function () {
          $(".rightTop .checkBox li").click(function () {
              $(".tooltip").remove();          //当点击切换的时候把提示框清空
              var src = $(this).find(".icon").children().attr("src");
                  $(this).find(".icon").children().attr("src","image/radio-select.png");
                  $(this).siblings().find(".icon").children().attr("src","image/radio-deselect.png");
                  $(this).addClass("checkColor").siblings().removeClass("checkColor");


          });
          $(".rightTop div.toggle").click(function () {
              $(this).parent().hide();
              $(".minRightTop").show();
          });
          $(".minRightTop").click(function () {
            $(".minRightTop").hide();
            $(".rightTop").show();
         })
        },
        //底部趋势图缩放
        windowScale: function () {
            $(".scale").click(function () {
                $(".miniPlace").html($(this).parents(".bottomTrendNav").find(".place").text());
                $(".bottomTrend").hide("slide",800,function(){
                    $(".miniTrend").show();
                });

            });
            $(".bigTrend").click(function () {
                $(".miniTrend").fadeOut(function(){
                    $(".bottomTrend").show("slide",800);
					$("#area_parameter div div:eq(0)").click();
                });
            })
        }
    }

});