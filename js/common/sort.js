define(function(){
    return{
        //data.js里面的时间排序的方法
        //data为多维数组
        //time为data里保存时间的数组名
        //value为data里保存对应值的数组名
        sort_trenddata:function(dataTtime,dataValue){
            for (var i = 0; i < dataTtime.length; i++)
            {
                for (var j = i + 1; j < dataTtime.length; j++){
                    if(dataTtime[i] > dataTtime[j])
                    {
                        var time_temp = dataTtime[i];
                        dataTtime[i] = dataTtime[j];
                        dataTtime[j] = time_temp;
                        var value_temp = dataValue[i];
                        dataValue[i] = dataValue[j];
                        dataValue[j] = value_temp;
                    }
                }
            }
        }
    }
})
