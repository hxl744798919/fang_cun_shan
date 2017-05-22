var OCEAN_PARAMS = {
    "01": "maxspeed_wind",//最大风速
    "02": "speed_wind",
    "03": "direction_wind",
    "04": "temperature_air",
    "05": "relativehumidity",
    "06": "atmosphericpressure",
    "07": "rainfall",
    "08": "photosyntheticallyactiveradiation",//有效光合

    "09": "flowvelocity",//流速
    "10": "flowdirection",
    "11": "wavedirection",
    "12": "surfacetemperature",
    "13": "waveheight_max",
    "14": "waveperiod_max",
    "15": "waveheight_tenth",
    "16": "waveperiod_tenth",
    "17": "significantwaveheight",
    "18": "significantwaveperiod",
    "19": "meanwaveheight",
    "20": "meanwaveperiod",
    "21": "wavenumber",
    "22": "dominantwavedirection",
    "23": "direction",//方位

    "24": "temperature_water",//水温
    "25": "chlorophyll_a",
    "26": "potentialhgdrogen",
    "27": "dissolvedoxygen",
    "28": "dissolvedoxygensaturation",
    "29": "turbidity",
    "30": "electricconductivity",
    "31": "oxidation_reductionpotential",
    "32": "salinity",
    "33": "totaldissolvedsolids",
    "34": "blue_greenalgae",
    "35": "chemicaloxygendemand",
    "36": "oilinwater",
    "37": "temperature_under10meter",
    "38": "electricconductivity_under10meter",
    "39": "salinity_under10meter",
    "40": "deepth_under10meter",//水深
    "41": "radioactiveparameters_Co60",
    "42": "radioactiveparameters_Sr89",
    "43": "radioactiveparameters_Cs134",
    "44": "radioactiveparameters_Cs137",
    "45": "nutritivesalt_NH3_N",
    "46": "nutritivesalt_NO2_N",
    "47": "nutritivesalt_NO3_N",
    "48": "nutritivesalt_PO4_P"
};

var DESTRICT_ID = ["深圳湾_方向",
    "沙井_方向",
    "矾石_方向",
    "伶仃南_方向",
    "沙头角_方向",
    "大梅沙_方向",
    "下沙_方向",
    "南澳_方向",
    "大鹏湾口_方向",
    "东涌_方向",
    "东山_方向",
    "核电站_方向",
    "坝光_方向"];

var DESTRICT_NAME = ['深圳湾','沙井','矾石','伶仃南','沙头角','大梅沙','下沙','南澳','大鹏湾口','东涌','东山','核电站','坝光'];

var OCEAN_PARAMS_CH = {
    "01": "最大风速(m/s)",
    "02": "风速(m/s)",
    "03": "风向(°)",
    "04": "气温(°C)",
    "05": "相对湿度(%)",
    "06": "气压(hPa)",
    "07": "雨量(mm)",
    "08": "有效光合(μmol/（㎡*s）)",
    "09": "流速(cm/s)",
    "10": "流向(°)",
    "11": "波向(°)",
    "12": "表层水温(°C)",
    "13": "最大波高(m)",
    "14": "最大波周期(s)",
    "15": "1/10波高(m)",
    "16": "1/10波周期(s)",
    "17": "有效波高(m)",
    "18": "有效波周期(s)",
    "19": "平均波高(m)",
    "20": "平均波周期(s)",
    "21": "波浪个数(个)",
    "22": "主波向(°)",
    "23": "方位(°)",
    "24": "水温(°C)",
    "25": "叶绿素a(μg/L)",
    "26": "PH值",
    "27": "溶解氧(mg/L)",
    "28": "溶解氧饱和度(%)",
    "29": "浊度",
    "30": "电导率(mS/cm)",
    "31": "氧化还原电位(mV)",
    "32": "盐度(ppt)",
    "33": "总溶解性固体(g/L)",
    "34": "蓝绿藻(uL)",
    "35": "化学需氧量(mg/L)",
    "36": "水中油",
    "37": "表层水温(°C)",
    "38": "表层电导率(mS/cm)",
    "39": "表层盐度(ppt)",
    "40": "水下10米:水深(m)",
    "41": "钴60(Co)(Bq/L)",
    "42": "锶89(Sr)(Bq/L)",
    "43": "铯134(Cs)(Bq/L)",
    "44": "铯137(Cs)(Bq/L)",
    "45": "氨氮(μg/L)",
    "46": "亚硝酸盐(μg/L)",
    "47": "硝酸盐(μg/L)",
    "48": "磷酸盐(μg/L)"
};
//booy position
var BUOY_POSITION = [
    {
        siteName: "哑呤湾坝光",
        siteNumber: "FBDY1",
        latitude: "114.555",
        longitude: "22.6595",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "大亚湾长湾",
        siteNumber: "FBDY2",
        latitude: "114.580276",
        longitude: "22.609562",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
   {
        siteName: "大亚湾东山",
       siteNumber: "FBDY3",
       latitude: "114.518167",
       longitude: "22.569833",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    //不要删除掉，未启用
    // {
    //     siteName: "大亚湾杨梅坑",
    //     siteNumber: "FBDY4",
    //     latitude: "114.555",
    //     longitude: "22.6595",
    //     type: "环境浮标",
    //     about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    // },
    {
        siteName: "大亚湾东涌",
        siteNumber: "FBDY5",
        latitude: "114.5715",
        longitude: "22.474167",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "大鹏湾沙头角",
        siteNumber: "FBDP1",
        latitude: "114.241833333333",
        longitude: "22.5538333333333",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "大鹏湾大梅沙",
        siteNumber: "FBDP2",
        latitude: "114.312833333333",
        longitude: "22.5941666666667",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "大鹏湾下沙",
        siteNumber: "FBDP3",
        latitude: "114.45583333333",
        longitude: "22.566667",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "大鹏湾南澳",
        siteNumber: "FBDP4",
        latitude: "114.478",
        longitude: "22.525667",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "大鹏湾口门",
        siteNumber: "FBDP5",
        latitude: "114.485",
        longitude: "22.459",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "深圳湾蛇口",
        siteNumber: "FBSZ1",
        latitude: "114.94593",
        longitude: "22.48162",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "珠江口沙井",
        siteNumber: "FBZJ1",
        latitude: "114.734775",
        longitude: "22.690257",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "珠江口矾石",
        siteNumber: "FBZJ2",
        latitude: "114.806",
        longitude: "22.494",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "珠江口内伶仃南",
        siteNumber: "FBZJ3",
        latitude: "114.81473",
        longitude: "22.34653",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "珠江口伶仃东",
        siteNumber: "FBZJ4",
        latitude: "0",
        longitude: "0",
        type: "环境浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "大亚湾坝光",//大亚湾深圳近岸北部的哑呤湾坝光海域
        siteNumber: "FB01",
        latitude: "114.5552",
        longitude: "22.66",
        type: "波浪浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "大亚湾杨梅坑",//大亚湾深圳近岸中部的杨梅坑海域
        siteNumber: "FB02",
        latitude: "114.5784",
        longitude: "22.558",
        type: "波浪浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "大亚湾东涌",//大亚湾深圳近岸南部的东冲—西冲海域
        siteNumber: "FB03",
        latitude: "114.5722",
        longitude: "22.474",
        type: "波浪浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "大鹏湾下沙",//大鹏湾中部的下沙—下沙海域
        siteNumber: "FB04",
        latitude: "114.453475",
        longitude: "22.566487",
        type: "波浪浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "大鹏湾大梅沙",//大鹏湾中部的梅沙湾
        siteNumber: "FB05",
        latitude: "114.31183",
        longitude: "22.5924517",
        type: "波浪浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    },
    {
        siteName: "深圳湾蛇口",//深圳湾中部的后海湾海域
        siteNumber: "FB06",
        latitude: "114.946758",
        longitude: "22.480923",
        type: "波浪浮标",
        about: "深圳湾中部的后台湾海域：今年以来，深圳湾主要入湾河流水质持续改善，进入深圳湾河深圳河干流的排污口陆续得到整治。"
    }
];

//地点对应经纬度
var longitude_latitude = [
     [113.94593,22.48162],   //"深圳湾":
     [113.734775,22.690257],  //"沙井":
     [113.806,22.494],  //"矾石":
     [113.81473,22.34653],  //"伶仃南":
     [114.241833333333,22.5538333333333],   //"沙头角":
     [114.312833333333,22.5941666666667],  //"大梅沙":
     [114.45583333333,22.566667],   //"下沙":
     [114.478,22.525667],   //"南澳":
     [114.485,22.459],   //"大鹏湾口":
     [114.5715,22.474167],   //"东涌":
     [114.518167,22.569833],    //"东山":
     [114.580276,22.609562],    //"核电站":
     [114.555,22.6595]          //"坝光":
];

define(["static"], function (){
    var abnormalRes = function (id){
        return OCEAN_PARAMS[id];
    };
    var abnormalRes_ch = function (id) {
        return OCEAN_PARAMS_CH[id];
    };
    return {
        abnormalRes: abnormalRes,
        abnormalRes_ch: abnormalRes_ch,
        buoy_position:BUOY_POSITION,
        longitude_latitude: longitude_latitude,
        district_id: DESTRICT_ID,
        district_name: DESTRICT_NAME
    };
});