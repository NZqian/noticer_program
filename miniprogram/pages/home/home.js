const app = getApp();
var util = require("../../utils/util.js")
var bmap = require('./bmap-wx.js')

Page({
  data:{
    time: ' ',
    date: ' ',
    weatherData: ' ',
  },

  onLoad: function(options){
    var TIME = util.formatTime(new Date());
    var DATE = util.formatDate(new Date());
    var that = this; 
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({ 
        ak: 'jGNUvvX5Xujv1pTlCZLUkwHaiNGfi1PY' 
    }); 
    var fail = function(data) { 
        console.log(data) 
    }; 
    var success = function(data) { 
        var weatherData = data.currentWeather[0]; 
        weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' +'日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n'; 
        that.setData({ 
            weatherData: weatherData 
        }); 
    } 
    // 发起weather请求 
    BMap.weather({ 
        fail: fail, 
        success: success 
    }); 
    this.setData({
      time: TIME,
      date: DATE,
    });
  }

})