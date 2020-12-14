// pages/login/login.js
var app = getApp()
Page({
  data: {
    username: '',
    password: ''
  },

  login: function () {
    wx.request({
      url: "https://www.ningziqian.work:8000/login/",
      method: "POST",
      data: {
        username: this.data.username,
        password: this.data.password,
      },
      success: function (res) {
        console.log(res)
        if(res['data'] == "error"){
          wx.showModal({
            title: '错误',  
            content: '用户名或密码错误',      
          })
        } else{
          //wx.setStorageSync('isUserInfoStored', true)
          //wx.setStorageSync('userdata', res.data)
          app.globalData.groups = res['data']['groups']
          app.globalData.userinfo = res['data']['userinfo']
          console.log(res['data']['groups'])
          console.log(app.globalData)
          wx.switchTab({
            url: '../group/group'
          }) 
        }
      },
      fail: function (res) {
        console.log('submit fail');
      },
    })
    /*wx.showToast({
      title: '登录中',
      icon: 'loading',
      duration: 13000
    })*/
  },
  //  获取学号
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  // 获取密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  onLoad: function (options) {
    if (wx.getStorageSync('isUserInfoStored')) {
      app.globalData.userdata = wx.getStorageSync('userdata')
      wx.switchTab({
        url: '../group/group'
      })
    }
  },
})