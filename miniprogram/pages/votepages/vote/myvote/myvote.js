// pages/myvote/myvote.js
var app = getApp()
let j = 2
Page({
  data: {
    votes: {}
  },

  voteItem: function (e) {
    wx.navigateTo({
      url: '../voteitem/voteitem?id='+e.currentTarget.dataset.id
    })
  },

  shareVote: function (e) {
    wx.navigateTo({
      url: '../sharevote/sharevote?id='+e.currentTarget.dataset.id
    })
  },
  
  voteResult: function (e) {
    wx.navigateTo({
      url: '../voteresult/voteresult?id='+e.currentTarget.dataset.id
    })
  },

  //  onLoad:function(options){
  // 页面初始化 options为页面跳转所带来的参数
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    wx.request({
      url: 'https://www.ningziqian.club:8000/vote/list',
      data: {
        openid: 'xxoo',
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          votes: res.data.data.votes
        })
        console.log(res.data.data.votes)
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})