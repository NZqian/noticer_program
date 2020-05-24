const app = getApp();
const db = wx.cloud.database()
const _ = db.command
import { formatTime, formatDate, TODOList } from "../../utils/util.js";
import { BMapWX } from './bmap-wx.js';

Page({
  data:{
    time: ' ',
    date: ' ',
    weatherData: ' ',
    val: ' ',
    list: [],
  },

  onLoad: function(options){
    var TIME = formatTime(new Date());
    var DATE = formatDate(new Date());
    this.setData({
      time: TIME,
      date: DATE,
    });

    var that = this; 
    // 新建百度地图对象 
    var BMap = new BMapWX({ 
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
    
    db.collection("Users").where({_id: app.globalData.userdata['_id']}).get().then(res => {
      console.log(res)
      if(res.data[0].TODOList != undefined){
        this.setData({list:res.data[0].TODOList})
      }
    })
  },

  
  getval(e){
    this.setData({ val: e.detail.value.replace(/^\s+|\s+$/g,"")})
  },
    
  add(){
    var new_data = this.data.list;
    new_data.push(this.data.val)
    this.setData({list:new_data,val:''})
    app.globalData.userdata['list'] = this.data.list
    TODOList()
  },
    
  del(e){
    var i = e.target.dataset.index;
    var del_data = this.data.list;
    del_data.splice(i,1)
    this.setData({list:del_data})
    app.globalData.userdata['list'] = this.data.list
    TODOList()
  },

  complete(e){
    var i = e.target.dataset.index;
    var com_data = this.data.list;
    com_data.splice(i,1)
    this.setData({list:com_data})
    app.globalData.userdata['list'] = this.data.list
    TODOList()
  },
})

