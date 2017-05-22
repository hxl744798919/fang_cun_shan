
define(["assess_data"],function(assess_data){
    //点击提示款的X提示框消失
    $("#tooltips").on("click","span.close",function(event){
        event.stopPropagation();
        var target=event.target;
        $(target).parents(".tooltip").fadeOut(500,function(){
            $(target).parents(".tooltip").remove();
        });
    });
    $("#tooltips").on("mousedown","span.close",function(){
        $(this).css("background","url('image/close-red.png')");
    })
    $("#tooltips").on("mouseup","span.close",function(){
        $(this).css("background","url('image/close-grey.png')");
    })
    $("#tooltips").on("mouseover","span.close",function(){
        $(this).css("background","url('image/close-blue.png')");
    })
    $("#tooltips").on("mouseout","span.close",function(){
        $(this).css("background","url('image/close-grey.png')");
    })
    //提示框拖拽效果
    $("#tooltips").on("mousedown",".tooltip",function(event){
        $(this).css("z-index","999");
        $(this).siblings().css("z-index","50")


    })
    var tradeImgs=function(name){
        var tooltop_printS = $(".tooltip_head>p:contains("+name+")").parents(".tooltip").find(".tooltop_print ");
        for(var i = 0;i<tooltop_printS.length; i++){
            var   tooltop_printName = $(tooltop_printS[i]).find("div>p").text();
            var   tooltop_printValue = $(tooltop_printS[i]).find("div>span").text();
            var   tooltop_printImg = $(tooltop_printS[i]).find("img");
            switch (tooltop_printName){
                case "水温":
                    if(tooltop_printValue == "--"){
                        tooltop_printImg.attr("src","image/water_no.png");
                    }
                    else if(tooltop_printValue<15){
                        tooltop_printImg.attr("src","image/water_low.png");
                    }
                    else if(tooltop_printValue>=15&&tooltop_printValue<25){
                        tooltop_printImg.attr("src","image/water_middle.png");
                    }
                    else if(tooltop_printValue>=25&&tooltop_printValue<30){
                        tooltop_printImg.attr("src","image/water_tall.png");
                    }
                    else if(tooltop_printValue>=30){
                        tooltop_printImg.attr("src","image/water_ultrahigh.png");
                    }
                    break;
                case "PH":
                    if(tooltop_printValue == "--"){
                        tooltop_printImg.attr("src","image/ph_1_no.png");
                    }
                    else if(tooltop_printValue>1&&tooltop_printValue<3){
                        tooltop_printImg.attr("src","image/ph_1.png");
                    }
                    else if(tooltop_printValue>=3&&tooltop_printValue<5){
                        tooltop_printImg.attr("src","image/ph_2.png");
                    }
                    else if(tooltop_printValue>=5&&tooltop_printValue<7){
                        tooltop_printImg.attr("src","image/ph_3.png");
                    }
                    else if(tooltop_printValue>=7&&tooltop_printValue<9){
                        tooltop_printImg.attr("src","image/ph_4.png");
                    }
                    else if(tooltop_printValue>=9&&tooltop_printValue<11){
                        tooltop_printImg.attr("src","image/ph_5.png");
                    }
                    else if(tooltop_printValue>=11){
                        tooltop_printImg.attr("src","image/ph_6.png");
                    }
                    break;
                case "有效波高":
                    if(tooltop_printValue == "--"){
                        tooltop_printImg.attr("src","image/wave_no.png");
                    }
                    else if(tooltop_printValue>0 && tooltop_printValue<0.5){
                        tooltop_printImg.attr("src","image/wave_height_low.png");
                    }
                    else if(tooltop_printValue>=0.5&&tooltop_printValue<1.0){
                        tooltop_printImg.attr("src","image/wave_height_middle.png");
                    }
                    else if(tooltop_printValue>=1.0&&tooltop_printValue<1.5){
                        tooltop_printImg.attr("src","image/wave_height_tall.png");
                    }
                    else if(tooltop_printValue>=1.5){
                        tooltop_printImg.attr("src","image/wave_height_ultrahigh.png");
                    }
                    break;
                case "气温":
                    if(tooltop_printValue == "--"){
                        tooltop_printImg.attr("src","image/air_no.png");
                    }
                    else if(tooltop_printValue<10){
                        tooltop_printImg.attr("src","image/air_low.png");
                    }
                    else if(tooltop_printValue>=10&&tooltop_printValue<25){
                        tooltop_printImg.attr("src","image/air_middle.png");
                    }
                    else if(tooltop_printValue>=25&&tooltop_printValue<33){
                        tooltop_printImg.attr("src","image/air_tall.png");
                    }
                    else if(tooltop_printValue>=33){
                        tooltop_printImg.attr("src","image/air_ultrahigh.png");
                    }
                    break;
                case "溶解氧":
                    if(tooltop_printValue == "--"){
                        tooltop_printImg.parent().css("background","url('image/DO_no.png') no-repeat");
                    }
                    else if(tooltop_printValue<3){
                        tooltop_printImg.css("transform","rotate(-100deg)");
                    }
                    else if(tooltop_printValue>=3&&tooltop_printValue<6){
                        tooltop_printImg.css("transform","rotate(-45deg)");
                    }
                    else if(tooltop_printValue>=6&&tooltop_printValue<10){
                        tooltop_printImg.css("transform","rotate(45deg)");
                    }
                    else if(tooltop_printValue>=10){
                        tooltop_printImg.css("transform","rotate(100deg)");
                    }
                    break;
                case "风速":
                    if(tooltop_printValue == "--"){
                        tooltop_printImg.attr("src","image/wind_wu.png");
                    }else{
                        tooltop_printImg.attr("src","image/wind.png");
                    }
                    break;
            }
        }
    } ;//根据不同的值切换图片方法

    return{
        yjq_apptoop:function(params_name,checkBoxText,paramsName){
            $("#tooltips").append('<div class="tooltip">\
											<div class="tooltip_head" >\
												<p>'+params_name+'</p>\
												<span></span>\
												<span class="close"></span>\
											</div>\
											<div class="tooltop_details">\
												<div class="outer details">\
													<div class="tooltop_print outer">\
														<img src="image/water.png" alt="">\
														<div>\
															<span class="sw">'+assess_data.realTime_name[checkBoxText][paramsName][0]+'</span>°C\
															<p>水温</p>\
														</div>\
													</div>\
													<div class="tooltop_print outer">\
														<span class="DO"><img src="image/DO_pointer.png" alt=""></span>\
														<div>\
															<span class="rjy">'+assess_data.realTime_name[checkBoxText][paramsName][2]+'</span>mg/L\
															<p>溶解氧</p>\
														</div>\
													</div>\
													<div class="tooltop_print outer">\
														<img src="image/ph_6.png" alt="">\
														<div>\
															<span class="PH">'+assess_data.realTime_name[checkBoxText][paramsName][3]+'</span>\
															<p>PH</p>\
														</div>\
													</div>\
												</div>\
												<div class="tooltop_num outer">\
													<p>盐度<span class="color_b"><span>'+assess_data.realTime_name[checkBoxText][paramsName][1]+'</span>PPt</span></p>\
													<p>叶绿素<span class="color_b"><span>'+assess_data.realTime_name[checkBoxText][paramsName][4]+'</span>ml</span></p>\
												</div>\
												<p class="text_description">大梅沙海滨公园于1999年6月18日建成，建设总投入高达1.2亿元，是广东省5A级旅游景区。位于深圳特区东部、风光旖旎。这里三面环</p>\
											</div>\
										</div>');
            tradeImgs(params_name);
            setTimeout(function(){$(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"51vw",top:"33vh"});},100)
            $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#b8e070");
            //分析当前地方是优还是良
            var rjy = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("span.rjy").text();
            var PH = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("span.PH").text();
            var offerText = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("p.text_description");
            if(rjy >4 ||rjy === "--"){
                if(( PH >= 7.8 && PH <= 8.5) || PH==="--"){
                    if(rjy === "--"&& PH === "--"){
                        offerText.text("--")
                    }else {
                        offerText.text("满足人工鱼礁水质的要求（第三类水质要求）")
                    }
                }else{
                    offerText.text("不满足人工鱼礁水质的要求（第三类水质要求）")
                }
            }else{
                offerText.text("不满足人工鱼礁水质的要求（第三类水质要求）")
            }
            $(".tooltip").draggable({ containment: "#body", scroll: false });     //t提示框拖拽功能
            $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").fadeIn(500)       //延迟加载让坐标先于这个加载
        },
        pwq_apptoop:function(params_name,checkBoxText,paramsName){
            $("#tooltips").append('<div class="tooltip">\
                                            <div class="tooltip_head" >\
                                            <p>'+params_name+'</p>\
                                            <span></span>\
                                        <span class="close"></span>\
                                        </div>\
                                        <div class="tooltop_details">\
                                            <div class="outer details" style="display: block">\
                                            <div class="tooltop_print outer">\
                                            <img src="image/water.png" alt="">\
                                            <div>\
                                            <span class="sw">'+assess_data.realTime_name[checkBoxText][paramsName][0]+'</span>°C\
                                        <p>水温</p>\
                                        </div>\
                                            </div>\
                                            <div class="tooltop_print outer" style="float: right;margin: 0">\
                                            <img src="image/ph-6.png" alt="">\
                                            <div>\
                                            <span class="PH">'+assess_data.realTime_name[checkBoxText][paramsName][1]+'</span>\
                                            <p>PH</p>\
                                            </div>\
                                            </div>\
                                            </div>\
                                            <div class="tooltop_num outer" style="padding: 5px 20px 5px">\
                                            <div class="outer">\
                                                <p>氨氮<span class="color_b"><span>'+assess_data.realTime_name[checkBoxText][paramsName][2]+'</span>ug/L</span></p>\
                                                <p>硝酸盐<span class="color_b"><span>'+assess_data.realTime_name[checkBoxText][paramsName][3]+'</span>ug/L</span></p>\
                                            </div>\
                                            <div class="outer">\
                                            <p>磷酸<span class="color_b"><span>'+assess_data.realTime_name[checkBoxText][paramsName][5]+'</span>ug/L</span></p>\
                                            <p >亚硝硝酸盐<span class="color_b"><span>'+assess_data.realTime_name[checkBoxText][paramsName][4]+'</span>ug/L</span></p>\
                                            </div>\
                                        </div>\
                                        <p class="text_description">大梅沙海滨公园于1999年6月18日建成，建设总投入高达1.2亿元，是广东省5A级旅游景区。位于深圳特区东部、风光旖旎。这里三面环</p>\
                                        </div>\
                                        </div>');
      tradeImgs(params_name);
            //分析当前地方是优还是良
            var PH = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("span.PH").text();
            var offerText = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("p.text_description");
            if(PH >= 6.8 && PH <= 8.8){
                offerText.text("满足排污区水质的要求（第四类水质要求），对周边生态无严重影响")
            }else if(PH === "--"){
                offerText.text("--")
            }
            else{
                offerText.text("不满足排污区水质的要求（第四类水质要求），可能对周边生态造成一定影响")
            }
            //各个提示框的的位置
            switch (params_name){
                case "东宝河口排污区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"12vw",top:"0"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#cdccec");
                    break
                case "西乡排污区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"20vw",top:"30vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#eee680");
                    break
                case "妈湾排污区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"0vw",top:"68.5vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#bccbe0");
                    break
                case "蛇口—赤湾排污区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"28vw",top:"60vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#c1d915");
                    break
                case "盐田—沙头角排污区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"59vw",top:"55vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#b8e070");
                    break
                case "乌泥涌排污区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"50vw",top:"0vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#9dcae1");
                    break
                case "核电站热排水区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"76vw",top:"5vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#ccff66");
                    break
            }
            $(".tooltip").draggable({ containment: "#body", scroll: false });     //t提示框拖拽功能
            $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").fadeIn(500)       //延迟加载让坐标先于这个加载
        },
        zyzq_apptoop:function(params_name,checkBoxText,paramsName){
            $("#tooltips").append('<div class = "tooltip">\
                                            <div class="tooltip_head" >\
                                            <p>'+params_name+'</p>\
                                            <span></span>\
                                        <span class="close"></span>\
                                        </div>\
                                        <div class="tooltop_details">\
                                            <div class="outer details" style="display: block">\
                                            <div class="tooltop_print outer">\
                                            <span class="DO"><img src="image/DO_pointer.png" alt=""></span>\
                                            <div>\
                                            <span class="rjy">'+assess_data.realTime_name[checkBoxText][paramsName][0]+'</span>mg/L\
                                        <p>溶解氧</p>\
                                        </div>\
                                            </div>\
                                            <div class="tooltop_print outer" style="float: right;margin: 0">\
                                            <img src="image/ph-6.png" alt="">\
                                            <div>\
                                            <span class="PH">'+assess_data.realTime_name[checkBoxText][paramsName][1]+'</span>\
                                            <p>PH</p>\
                                            </div>\
                                            </div>\
                                            </div>\
                                            <div class="tooltop_num outer" style="padding: 5px 20px 5px">\
                                            <div class="outer">\
                                                <p>氨氮<span class="color_b"><span>'+assess_data.realTime_name[checkBoxText][paramsName][2]+'</span>ug/L</span></p>\
                                                <p>硝酸盐<span class="color_b"><span>'+assess_data.realTime_name[checkBoxText][paramsName][3]+'</span>ug/L</span></p>\
                                            </div>\
                                          <div class="outer">\
                                                 <p>磷酸<span class="color_b"><span class="color_b"><span>'+assess_data.realTime_name[checkBoxText][paramsName][5]+'</span>ug/L</span></span></p>\
                                                <p>亚硝硝酸盐<span class="color_b"><span>'+assess_data.realTime_name[checkBoxText][paramsName][4]+'</span>ug/L</span></p>\
                                            </div>\
                                        </div>\
                                        <p class="text_description">大梅沙海滨公园于1999年6月18日建成，建设总投入高达1.2亿元，是广东省5A级旅游景区。位于深圳特区东部、风光旖旎。这里三面环</p>\
                                        </div>\
                                        </div>');
            tradeImgs(params_name);
            //各个提示框的的位置
            switch (params_name){
                case "矾石贝类护养增殖区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"5vw",top:"8vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#ccff66");
                    break
                case "东山浅海养殖区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"53vw",top:"3vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#ee68b0");
                    break
                case "鹅公湾浅海养殖区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"41vw",top:"47.3vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#cdccec");
                    break
                case "南澳浅海养殖区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"49vw",top:"9vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#d7d2d2");
                    break
                case "虎头门浅海增养殖区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"80vw",top:"6vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#c2ded8");
                    break
                case "大鹏半岛东部浅海增养殖区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"78vw",top:"41vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#cdcce3");
                    break
                case "大鹏半岛西南浅海增养殖区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"59vw",top:"55vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#e6d6e3");
                    break
            };
            //分析当前地方是优还是良
            var rjy = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("span.rjy").text();
            var PH = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("span.PH").text();
            var offerText = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("p.text_description");
            if((rjy >= 6 && rjy<= 12) ||rjy === "--"){
                if(( PH >= 7.8 && PH <= 8.5) || PH==="--"){
                    if(rjy === "--"&& PH === "--"){
                        offerText.text("--")
                    }else {
                        offerText.text("满足增养殖区水质要求（第二类水质要求）")
                    }
                }else{
                    offerText.text("不满足增养殖区水质要求（第二类水质要求）")
                }
            }else{
                offerText.text("不满足增养殖区水质要求（第二类水质要求）")
            }
            $(".tooltip").draggable({ containment: "#body", scroll: false });     //t提示框拖拽功能
            $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").fadeIn(500)       //延迟加载让坐标先于这个加载
        },
        hsyc_apptoop:function(params_name,checkBoxText,paramsName){
            $("#tooltips").append('  <div class = "tooltip">\
                                        <div class="tooltip_head" >\
                                    <p>' + params_name + '</p>\
                                    <span></span>\
                                <span class="close"></span>\
                                </div>\
                                <div class="tooltop_details">\
                                    <div class="outer details" style="border-bottom: 1px solid #6fb7ef">\
                                    <div class="tooltop_print outer">\
                                    <img src="image/water.png" alt="">\
                                    <div>\
                                    <span class="sw">'+assess_data.realTime_name[checkBoxText][paramsName][0]+'</span>°C\
                                <p>水温</p>\
                                </div>\
                                    </div>\
                                    <div class="tooltop_print outer">\
                                    <img src="image/wave_height_middle.png" alt="">\
                                    <div>\
                                    <span class="yxbg">'+assess_data.realTime_name[checkBoxText][paramsName][1]+'</span>m\
                                <p>有效波高</p>\
                                </div>\
                                    </div>\
                                    <div class="tooltop_print outer">\
                                    <span class="DO"><img src="image/DO_pointer.png" alt=""></span>\
                                    <div>\
                                    <span class="rjy">'+assess_data.realTime_name[checkBoxText][paramsName][2]+'</span>mg/L\
                                <p>溶解氧</p>\
                                </div>\
                                    </div>\
                                    </div>\
                                    <p class="text_description">大梅沙海滨公园于1999年6月18日建成，建设总投入高达1.2亿元，是广东省5A级旅游景区。位于深圳特区东部、风光旖旎。这里三面环</p>\
                                </div>\
                                </div>');
            tradeImgs(params_name);
            //各个提示框的的位置
            switch (params_name){
                case "小梅沙浴场":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"495px",top:"0"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#bbe070");
                    break
                case "大梅沙浴场":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"0vw",top:"32vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#d8e4ec");
                    break
                case "西涌海水浴场":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"36vw",top:"47.3vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#c1d9e5");
                    break
                case "东涌海水浴场":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"70vw",top:"68vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#bccbe0");
                    break
                case "七星湾帆船运动区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"68vw",top:"23vh"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#c6dbf0");
                    break
            }
            //分析当前地方是优还是良
            var rjy = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("span.rjy").text();
            var sw = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("span.sw").text();
            var yxbg = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("span.yxbg").text();
            var offerText = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("p.text_description");
            var sw_str = "_0";
            var rjy_str = "_0";
            var yxbg_str = "_0";
            //水温
            if(sw >= 23 && sw <= 28)
                sw_str = "水温适宜_1";
            else if((sw >= 20 && sw <= 23) || (sw >= 28 && sw <= 33))
                sw_str = "水温较适宜_2";
            else if(sw < 20 )
                sw_str = "水温过低_3";
            else if(sw > 33 )
                sw_str = "水温过高_3";
            //溶解氧
            if(rjy > 6)
                rjy_str = "水质优良_1";
            else if(rjy >= 5 && rjy <= 6)
                rjy_str = "水质良好_2";
            else if(rjy < 5 )
                rjy_str = "水质较差_3";
            //有效波高
            if(yxbg > 1.5)
                yxbg_str = "风浪较大_3";
            else if(yxbg > 1 && yxbg <= 1.5)
                yxbg_str = "风浪较平和_2";
            else if(yxbg <= 1 )
                yxbg_str = "风浪平和_1";
            var  sw_str_bak =sw_str.substring(0,sw_str.length-2) === ""?"":sw_str.substring(0,sw_str.length-2)+"、";
            var  rjy_str_bak =rjy_str.substring(0,rjy_str.length-2) === ""?"":rjy_str.substring(0,rjy_str.length-2)+"、";
            var  yxbg_str_bak =yxbg_str.substring(0,yxbg_str.length-2) === ""?"":yxbg_str.substring(0,yxbg_str.length-2)+"、";
            var res_str = sw_str_bak +  yxbg_str_bak + rjy_str_bak ;
            //评价
            var pingjia = sw_str.slice(-1);
            if(pingjia < rjy_str.slice(-1))
                pingjia = rjy_str.slice(-1);
            if(pingjia < yxbg_str.slice(-1))
                pingjia = yxbg_str.slice(-1);

            if(pingjia == "1")
                pingjia = "对人体健康、人体安全风险低，令人感觉舒适，具有很高的游憩价值";
            if(pingjia == "2")
                pingjia = "对人体健康、人体安全风险较低，令人感觉较舒适，具有一定的游憩价值";
            if(pingjia == "3"){
                pingjia = "对人体健康、人体安全风险较高，令人感觉不舒适，不具游憩价值";
                sw_str_bak = sw_str.slice(-1) == 3 ? sw_str.substring(0,sw_str.length-2)+"、":"";
                rjy_str_bak = rjy_str.slice(-1) == 3 ? rjy_str.substring(0,rjy_str.length-2)+"、":"";
                yxbg_str_bak = yxbg_str.slice(-1) == 3 ? yxbg_str.substring(0,yxbg_str.length-2)+"、":"";
                res_str = sw_str_bak +  yxbg_str_bak + rjy_str_bak ;
            }

            if(pingjia == "0")
                res_str = "--";

            else
                res_str = res_str + pingjia;
            offerText.text(res_str);
            $(".tooltip").draggable({ containment: "#body", scroll: false });     //t提示框拖拽功能
            $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").fadeIn(500)       //延迟加载让坐标先于这个加载
        },
        nyq_apptoop:function(params_name,checkBoxText,paramsName){
            var lyq_html=' <div class = "tooltip">\
                                        <div class="tooltip_head" style="min-width: 238px;">\
                                    <p>' + params_name + '</p>\
                                    <span></span>\
                                <span class="close"></span>\
                                </div>\
                                <div class="tooltop_details" style="min-width: 238px">\
                                    <div class="outer details" style="display: block;padding: 5px 20px">\
                                    <div class="tooltop_print outer">\
                                    <img src="image/temperature_tall.png" alt="">\
                                    <div>\
                                    <span class="qw">'+assess_data.realTime_name[checkBoxText][paramsName][0]+'</span>°C\
                                <p>气温</p>\
                                </div>\
                                    </div>\
                                    <div class="tooltop_print outer" style="margin: 0 10px;float: right">\
                                    <img src="image/water.png" alt="">\
                                    <div>\
                                    <span class="sw">'+assess_data.realTime_name[checkBoxText][paramsName][1]+'</span>°C\
                                <p>水温</p>\
                                </div>\
                                    </div>\
                                    </div>\
                                     <div class="outer details" style="display:block;border-bottom: 1px solid #6fb7ef;padding: 5px 20px">\
                                    <div class="tooltop_print outer">\
                                    <span class="DO"><img src="image/DO_pointer.png" alt=""></span>\
                                    <div>\
                                    <span class="rjy">'+assess_data.realTime_name[checkBoxText][paramsName][3]+'</span>mg/L\
                                <p>溶解氧</p>\
                                </div>\
                                    </div>\
                                      <div class="tooltop_print outer" style="float: right;margin: 0 10px">\
                                    <img src="image/wind_wu.png" alt="">\
                                    <div>\
                                    <span class="fs">'+assess_data.realTime_name[checkBoxText][paramsName][2]+'</span>m/s\
                                <p>风速</p>\
                                </div>\
                                    </div>\
                                    </div>\
                                <p class="text_description" style="max-width: 238px;padding: 5px 20px">大梅沙海滨公园于1999年6月18日建成，建设总投入高达1.2亿元，是广东省5A级旅游景区。位于深圳特区东部、风光旖旎。这里三面环</p>\
                                </div>\
                                </div>'
            $("#tooltips").append(lyq_html);
            tradeImgs(params_name);
            //各个提示框的的位置
            switch (params_name){
                case "宝安海上田园风光旅游区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"96px",top:"48px"});
                    // $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css("z-index","1");
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#ccc");

                    break
                case "前海城市景观旅游区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"185px",top:"357px"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#cf6");
                    break
                case "滨海大道城市景观旅游区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"631px",top:"604px"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#fff");
                    break
                case "海上世界旅游用海区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"228px",top:"634px"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#eee680");
                    break
                case "沙头角城市景观旅游区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"596px",top:"298px"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#c6dbf0");
                    break
                case "大、小梅沙度假旅游区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"696px",top:"217px"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#9dcae1");
                    break
                case "溪涌度假旅游区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"1058px",top:"212px"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#bccbe0");
                    break
                case "迭福度假旅游区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"1150px",top:"215px"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#c1d9e5");
                    break
                    break
                case "大鹏金海湾度假旅游区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"1299px",top:"438px"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#d7d2d2");
                    break
                case "下沙度假旅游区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"912px",top:"571px"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#b8e070");
                    break
                case "南澳度假旅游区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"912px",top:"627px"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#c2ded8");
                    break
                case "西涌度假旅游区":
                    $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").css({left:"1194px",top:"681px"});
                    $(".tooltip_head>p:contains("+params_name+")").parents().css("background","#cdcce3");
                    break
            }
            //判断是优良
            var fs = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("span.fs").text();
            var qw = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("span.qw").text();
            var sw = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("span.sw").text();
            var rjy = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("span.rjy").text();
            var offerText = $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").find("p.text_description");
            var sw_str = "_0";
            var rjy_str = "_0";
            var qw_str = "_0";
            var fs_str = "_0";
            //水温
            if(sw >= 23 )
                sw_str = "水温适宜_1";
            else if(sw >= 18 && sw <= 23)
                sw_str = "水温较适宜_2";
            else if(sw < 18 )
                sw_str = "水温过低_3";
            //溶解氧
            if(rjy > 6)
                rjy_str = "水质优良_1";
            else if(rjy >= 5 && rjy <= 6)
                rjy_str = "水质良好_2";
            else if(rjy < 5 )
                rjy_str = "水质较差_3";
            //气温
            if(qw >= 15&& qw <= 35)
                qw_str = "气温适宜_1";
            else if((qw >= 10 && qw <= 15)||(qw>= 25 && qw <= 38))
                qw_str = "气温较适宜_2";
            else if(qw < 10)
                qw_str = "气温寒冷_3";
            else if(qw > 38)
                qw_str = "气温酷热_3";
            //风速
            if(fs < 3.3)
                fs_str = "风速较小_1";
            else if(fs >= 3.3 && fs <= 5.5)
                fs_str = "风速较大_2";
            else if(fs > 5.5 )
                fs_str = "风速很大_3";
            var  sw_str_bak =sw_str.substring(0,sw_str.length-2) === ""?"":sw_str.substring(0,sw_str.length-2)+"、";
            var  rjy_str_bak =rjy_str.substring(0,rjy_str.length-2) === ""?"":rjy_str.substring(0,rjy_str.length-2)+"、";
            var  qw_str_bak =qw_str.substring(0,qw_str.length-2) === ""?"":qw_str.substring(0,qw_str.length-2)+"、";
            var  fs_str_bak = fs_str.substring(0,fs_str.length-2) === ""?"":fs_str.substring(0,fs_str.length-2)+"、";
            var res_str =qw_str_bak + sw_str_bak + rjy_str_bak + fs_str_bak;
            //评价
            var pingjia = sw_str.slice(-1);
            if(pingjia < rjy_str.slice(-1))
                pingjia = rjy_str.slice(-1);
            if(pingjia < qw_str.slice(-1))
                pingjia = qw_str.slice(-1);
            if(pingjia< fs_str.slice(-1))
                pingjia = fs_str.slice(-1);
            if(pingjia == "1")
                pingjia = "海滨环境状况优良，适宜开展滨海休闲观光活动";
            if(pingjia == "2")
                pingjia = "海滨环境状况良好，较适宜开展滨海休闲观光活动";
            if(pingjia == "3"){
                pingjia = "海滨环境状况较差，不适宜开展滨海休闲观光活动";
                sw_str_bak = sw_str.slice(-1) == 3 ? sw_str.substring(0,sw_str.length-2)+"、":"";
                rjy_str_bak = rjy_str.slice(-1) == 3 ? rjy_str.substring(0,rjy_str.length-2)+"、":"";
                qw_str_bak = qw_str.slice(-1) == 3 ? qw_str.substring(0,qw_str.length-2)+"、":"";
                fs_str_bak = fs_str.slice(-1) == 3 ? fs_str.substring(0,fs_str.length-2)+"、":"";
                res_str =qw_str_bak + sw_str_bak + rjy_str_bak + fs_str_bak;
            }

            if(pingjia == "0")
                res_str = "--";

            else
                res_str = res_str + pingjia;
            offerText.text(res_str);
            $(".tooltip").draggable({ containment: "#body", scroll: false });     //t提示框拖拽功能
            $(".tooltip_head>p:contains("+params_name+")").parents(".tooltip").fadeIn(500)       //延迟加载让坐标先于这个加载
        },

    }
})