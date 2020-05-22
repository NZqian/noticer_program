const app = getApp();
var util = require("../../utils/util.js")

Page({
  data:{
    date: ' ',
  },

  onLoad: function(options){
    var DATE = util.formatDate(new Date());
    this.setData({
      date: DATE,
    });
  }
})