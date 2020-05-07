//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: '(c)Copyright 2017',
    userInfo: {},
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    appname: '微投票',
    functionbtn1: '扫码参与投票',
    functionbtn2: '创建我的投票',
    functionbtn3: '我的投票主题',
  },

  setDisabled: function (e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain: function (e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function (e) {
    this.setData({
      loading: !this.data.loading
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },

  attendvote: function () {
    wx.scanCode({
      success: function (res) {
        wx.navigateTo({
          url: res.data.path
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  createvote: function () {
    wx.navigateTo({
      url: '../createvote/createvote'
    })
  },
  myvote: function () {
    wx.navigateTo({
      url: '../myvote/myvote'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

  }
})
