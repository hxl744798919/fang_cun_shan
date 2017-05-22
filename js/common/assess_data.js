var district_name = {
    鱼礁区: {杨梅坑人工鱼礁区:{district_time:[],district_value:[]}},
    //港湾区: {宝安工业湾区:{district_time:[],district_value:[]}, 蛇口_大铲湾港区:{district_time:[],district_value:[]}, 蛇口东角头湾区:{district_time:[],district_value:[]},盐田港区:{district_time:[],district_value:[]},沙鱼涌港区:{district_time:[],district_value:[]},秤头角港口和电厂用海区:{district_time:[],district_value:[]}},
    排污区: {东宝河口排污区:{district_time:[],district_value:[]},
            西乡排污区:{district_time:[],district_value:[]},
            妈湾排污区:{district_time:[],district_value:[]},
            蛇口_赤湾排污区:{district_time:[],district_value:[]},
            盐田_沙头角排污区:{district_time:[],district_value:[]},
            乌泥涌排污区:{district_time:[],district_value:[]},
            核电站热排水区:{district_time:[],district_value:[]},
		},
    增养殖区: {矾石贝类护养增殖区:{district_time:[],district_value:[]},
            南澳浅海养殖区:{district_time:[],district_value:[]},
            鹅公湾浅海养殖区:{district_time:[],district_value:[]},
            大鹏半岛西南浅海增养殖区:{district_time:[],district_value:[]},
            大鹏半岛东部浅海增养殖区:{district_time:[],district_value:[]},
            东山浅海养殖区:{district_time:[],district_value:[]},
            虎头门浅海增养殖区:{district_time:[],district_value:[]}
        },
    海水浴场: {小梅沙浴场:{district_time:[],district_value:[]},
            大梅沙浴场:{district_time:[],district_value:[]},
            西涌海水浴场:{district_time:[],district_value:[]},
            东涌海水浴场:{district_time:[],district_value:[]},
            七星湾帆船运动区:{district_time:[],district_value:[]}
        },
    旅游区: {宝安海上田园风光旅游区:{district_time:[],district_value:[]},
            前海城市景观旅游区:{district_time:[],district_value:[]},
            海上世界旅游用海区:{district_time:[],district_value:[]},
            滨海大道城市景观旅游区:{district_time:[],district_value:[]},
            沙头角城市景观旅游区:{district_time:[],district_value:[]},
            溪涌度假旅游区:{district_time:[],district_value:[]},
            迭福度假旅游区:{district_time:[],district_value:[]},
            下沙度假旅游区:{district_time:[],district_value:[]},
            南澳度假旅游区:{district_time:[],district_value:[]},
            西涌度假旅游区:{district_time:[],district_value:[]},
            大鹏金海湾度假旅游区:{district_time:[],district_value:[]},
            大_小梅沙度假旅游区:{district_time:[],district_value:[]}
    },
}
var realTime_name = {
    鱼礁区:{   杨梅坑人工鱼礁区:["--","--","--",7.32,3.20]},
    排污区: {  东宝河口排污区:[20,7,0.12,0.45,0.25,2.03],
                西乡排污区:[26,"--",0.38,0.56,0.21,3.03],
                妈湾排污区:[10,4,0.13,0.65,0.35,1.03],
                蛇口_赤湾排污区:[25,3,0.16,0.48,0.25,2.52],
                盐田_沙头角排污区:[32,5,0.62,0.85,0.35,2.03],
                乌泥涌排污区:["--",4.5,1.62,2.85,6.35,8.03],
                核电站热排水区:[32,4.5,0.22,0.95,0.55,2.53],
    },
    增养殖区: {矾石贝类护养增殖区:[10,7,0.22,0.95,0.55,2.53],
            南澳浅海养殖区:["--",6,0.28,0.55,0.65,2.83],
            鹅公湾浅海养殖区:[5,6,0.52,0.65,0.85,2.63],
            大鹏半岛西南浅海增养殖区:[8,"--",0.52,0.65,0.95,2.43],
            大鹏半岛东部浅海增养殖区:[3,5,0.72,0.65,0.25,6.53],
            东山浅海养殖区:[6,"--",0.32,0.65,0.55,2.43],
            虎头门浅海增养殖区:[7.5,6,0.62,0.35,0.85,2.33]
    },
    海水浴场: {小梅沙浴场:["--","--","--"],
                大梅沙浴场:[21.65,0.256,9.31],
                西涌海水浴场:[12,0.3,"--"],
                东涌海水浴场:[22,0.1,5],
                七星湾帆船运动区:[30,1.5,6]
    },
    旅游区: {宝安海上田园风光旅游区:[35,20,3,6],
        前海城市景观旅游区:[10,21,4,3],
        海上世界旅游用海区:[8,22,5,3],
        滨海大道城市景观旅游区:[24,21,5,5],
        沙头角城市景观旅游区:[15,20,5,8],
        溪涌度假旅游区:["--",25,6,5],
        迭福度假旅游区:[24,21,5,5],
        下沙度假旅游区:[33,"--",4,6],
        南澳度假旅游区:[24,21,5,5],
        西涌度假旅游区:[28,"--",6,3],
        大鹏金海湾度假旅游区:[20,19,9,3],
        大_小梅沙度假旅游区:[23,23,2.01,8]
    }
}
define(["rdk_url","jquery","sort"], function(rdk , $,sort) {
	return {
		//点击侧边，查询柱状图数据，FLAG = 01
		bar_data_update: function (funcareatype, time_start, time_end) {
			var param = [
                {"name":"funcareatype", "value": funcareatype},
                {"name":"time_start", "value": time_start},
                {"name":"time_end", "value": time_end},
			];
			$.ajax({
				type: "GET",
				contentType: "application/json",
				url: rdk.rdkUrl('multi_data_assess.js',"homePage"),
				data: rdk.rdkData(param),
				async: false,
				success: function(data ){
                    var res = eval("("+ data.result + ")");
					var DateTime  ;
                    if(res.length == 0){
                        return;
                    }
                    //进来前将数组清空重新填充数据
                    for(var kew in district_name){
                        for(var jew in district_name[kew]){
                            for(var iew in district_name[kew][jew]){
                                district_name[kew][jew][iew].length = 0;
                            }
                        }
                    }
                    for(var i = 0;i < res.length; i++){
                        var districtName = res[i][1].replace(/[—、]/g,"_");
                        var natureDate = [];
                        //循环保存数据
                        for(var k = 2; k < res[i].length;k++){
                            if(res[i][k] === "null"){
                                res[i][k] = "-";

                            }
                            natureDate.push(res[i][k]);
                        }
                        district_name[funcareatype][districtName]["district_value"].push(natureDate);         //将数组压入响应的区域
                        //循环时间保存"2016-09-22 11:00"
                        district_name[funcareatype][districtName]["district_time"].push(res[i][0]);
                    }
                    //为数组添加连续的值
                    for(var kew in district_name[funcareatype]){
                        sort.sort_trenddata(district_name[funcareatype][kew].district_time,district_name[funcareatype][kew].district_value);
                        var district_times =district_name[funcareatype][kew]["district_time"];
                        if(district_times == 0){
                            continue;
                        }
                        var min_time =district_times[0];
                        min_time = new Date(Date.parse(min_time));
                        var max_time = district_times[district_times.length - 1];
                        max_time = new Date(Date.parse(max_time));
                        var min_time_rather= district_times[0].slice(-5);
                        var index = 0;
                        var temp_time = [];
                        var half_hour = 30*60*1000;
                        while (max_time >= min_time && index < 200 && localStorage.CURRENT_TIME.split(" ")[1] >= min_time_rather){
                            min_year = min_time.getFullYear();
                            min_month = min_time.getMonth() + 1;
                            min_day = min_time.getDate();
                            min_hour = min_time.getHours();
                            min_Minutes = min_time.getMinutes();
                            //给temp时间维度赋值，每次循环增加半小时
                            min_time = min_year+"-"+("0"+min_month).slice(-2)+"-"+("0"+min_day).slice(-2)+" "+("0"+min_hour).slice(-2)+":"+("0"+min_Minutes).slice(-2)
                            temp_time[index] = min_time;
                            //为空余的时间对应的值插入连续的值
                            for(var i = 0; i < district_name[funcareatype][kew].district_time.length; i++){
                                if(district_name[funcareatype][kew].district_time[i] == min_time){//如果该时间点，有上报，则保持上报数据不变
                                    break;
                                }
                                if(district_name[funcareatype][kew].district_time[i] > min_time ||
                                    (min_time > district_name[funcareatype][kew].district_time[district_name[funcareatype][kew].district_time.length - 1])){//如果该时间点，没有上报，则赋值为"-"
                                    district_name[funcareatype][kew].district_value.splice(index,0,[]);
                                    break;
                                }
                            }
                            min_time = new Date((new Date(Date.parse(min_time))).getTime() + half_hour);
                            index++;
                            if(max_time > localStorage.CURRENT_TIME.split(" ")[1]){
                            	min_time_rather = district_times[index].slice(-5)
                            }
                        }
                        //    为不连续的时间添加上连续的时间
                        district_name[funcareatype][kew].district_time.length=0;
                        for(var k=0 ; k<temp_time.length ;k++){
                            district_name[funcareatype][kew].district_time.push(temp_time[k])
                        }

                    }






                }
            });
        },
        bar_actual_time:function(funcareatype,time_current){
            var param = [
                {"name":"funcareatype", "value": funcareatype},
                {"name":"time_current", "value": time_current}
            ];
            $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: rdk.rdkUrl('actual_time_data.js',"homePage"),
                    data: rdk.rdkData(param),
                    async: false,
                    success:function(data){
                        var res = eval("("+ data.result + ")");

                        //进来前将数组清空重新填充数据
                        for(var kew in realTime_name[funcareatype]){
                            for(var k = 0; k<realTime_name[funcareatype][kew].length; k++){
                                realTime_name[funcareatype][kew].splice(k,1,"--");
                            }
                        }
                        if(res.length == 0){
                            return;
                        }
                        // for(var kew in realTime_name[funcareatype]){
                        //     realTime_name[funcareatype][kew].length = 0;
                        // }
                        for(var i = 0;i < res.length; i++){
                            var actualtimeName = res[i][0].replace(/[—、]/g,"_");
                            for(var j = 1; j< res[i].length; j++){
                                if(res[i][j] === "null"){
                                    realTime_name[funcareatype][actualtimeName].splice(j-1,1,"--")
                                }
                                else{
                                     realTime_name[funcareatype][actualtimeName].splice(j-1,1,Number(res[i][j]).toFixed(2));
                                }

                            }
                        }


                }
            });
        },
        realTime_name:realTime_name,
        district_name:district_name
    }

})
