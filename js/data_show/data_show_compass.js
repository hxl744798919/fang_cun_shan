define(
    ["echarts", "echarts/chart/gauge"],
    function(ec) {
    return {
		buildChart: function() {  
		$("#data_com").empty();
			var chart = "";  
			for(var i=0;i<13;i++)  
			{  
				chart += "<div id='data_compass"+i+"' class='chart'></div>";   
			}  
			$("#data_com").append(chart);
		},
		show_compass: function(values) {
			var toponymy = ['深圳湾','沙井','矾石','伶仃南','沙头角','大梅沙','下沙','南澳','大鹏湾口','东涌','东山','核电站','坝光'];
			for(i = 0; i < values.length; i++) {
				if(values[i] > 360) {
					  values[i] = "--";
				} 
			}
			var wind_values = values;
			for(var i=0;i<13;i++)  
            {
				myChart = ec.init(document.getElementById("data_compass" + i));
				option = {
					tooltip : {
						formatter: "{a} <br/>{b} : {c}°"
					},
					toolbox: {
						show : false,
						feature : {
							mark : {show: true},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					series : [
						{
							name:'风向罗盘',
							max:360,
							center : ['50%', '50%'],
							radius : '75%',
							endAngle:-270,
							startAngle:90,
							type:'gauge',
							splitNumber: 4,       // 分割段数，默认为5
							axisLine: {            // 坐标轴线
								lineStyle: {       // 属性lineStyle控制线条样式
									color: [[1, '#48b'],[1, '#48b']], 
									width:2
								}
							},
							axisTick: {            // 坐标轴小标记
								splitNumber: 5,   // 每份split细分多少段
								length :3,        // 属性length控制线长
								lineStyle: {       // 属性lineStyle控制线条样式
									color: 'auto'
								}
							},
							axisLabel: {       
								formatter:function(v){
									  switch (v + '') {
										  case '0' : return '0°';
										  case '90' : return '90°';
										  case '180' : return '180°';
										  case '270' : return '270°';
										  case '360' : return '';
									  }
								  }
							},
							splitLine: {           // 分隔线
								show: true,        // 默认显示，属性show控制显示与否
								length :6,         // 属性length控制线长
								lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
									color: 'auto'
								}
							},
							pointer : {
								width : 3
							},
							title : {
								show : true,
								offsetCenter: [0, '-120%'],       // x, y，单位px
								textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontWeight: 'bolder',
									fontSize:12
								}
							},
							detail : {
								formatter:'{value}',
								offsetCenter: [0, '80%'],
								textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									color: 'red',
									fontSize: 13,
									fontWeight: 'bolder'
								}
							},
							data:[{name: toponymy[i],value: wind_values[i]}]
						}
					]
				};
			
			//clearInterval(timeTicket);
			//timeTicket = setInterval(function (){
			//	option.series[0].data[0].value = (Math.random()*360).toFixed(2) - 0;
				myChart.setOption(option);
			//},2000)
			}
		}
    }
});

