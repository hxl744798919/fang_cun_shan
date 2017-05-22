/*
 http://localhost:8080/rdk/service/app/08_first_app/server/temperament.js?
 p={"param":{"param":{"beginTime":"2016-06-17+11:00","endTime":"2016-06-17+13:00","paging":{"currentPage":"1","pageSize":"2"}}},"app":"08_first_app"}
 appName:后端服务文件名，appLocal：后端服务目录，para:参数json对象[{"name":"","value":""},{"name":"","value":""}]
 */
define([], function() {
    return {
        rdkUrl: function rdkUrl(appName,appLocal) {
            var url = "";
            url = "/rdk/service/app/" + appLocal + "/server/" + appName;
            return url;
        },
        rdkData: function rdkData(para) {
            var paraData = "";
            for(var i=0;i<para.length;i++) {
                if(i < para.length-1) {
                    paraData = paraData + "%22" + para[i].name + "%22" + ":" + "%22" + para[i].value + "%22" + ",";
                } else {
                    paraData = paraData + "%22" +para[i].name + "%22" + ":" + "%22" + para[i].value + "%22";
                }
            }
            paraData = 'p=%7B%22param%22:%7B%22param%22:%7B' + paraData + '%7D%7D%7D';
            return paraData;
        },
        rdkDataCode: function rdkDataCode(para) {
            var paraData = "";
            for(var i=0;i<para.length;i++) {
                if(i < para.length-1) {
                    paraData = paraData + '"' + para[i].name + '"' + ":" + '"' + para[i].value + '"' + ",";
                } else {
                    paraData = paraData + '"' +para[i].name + '"' + ":" + '"' + para[i].value + '"';
                }
            }
            paraData = 'p={"param":{"param":{' + paraData + '}}}';
            paraData = encodeURIComponent(paraData);
            return paraData;
        }
    }}
);