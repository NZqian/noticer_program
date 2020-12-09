// miniprogram/pages/group/add_group/add_group.js
const app = getApp();

Page({
  data: {
    groups: []
  },

  groupChange: function(e) {
    var groupIndex = e.detail.value
    console.log(groupIndex)
    this.setData({
      groupIndex: groupIndex,
      groupID: this.data.groups[groupIndex]['groupID']
    })
  },

  confirm: function(e) {
    console.log(e)
    wx.request({
      url: "https://www.ningziqian.work:8000/add_admin_into_group/",
      method: "POST",
      data: {
        user_no: app.globalData.userinfo['username'],
        group_no: this.data.groupID
      },
      // 服务器返回信息，将信息存储至本地缓存
      success: function (res) {
        app.globalData.notice_detail = res['data']
        console.log(app.globalData.notice_detail)
        wx.request({
          url: "https://www.ningziqian.work:8000/query_user_group/",
          method: "POST",
          data: {
            user_no: app.globalData.userinfo['username']
          },
          success: function (res) {
            app.globalData.groups = res['data']
            wx.navigateBack({
              complete: (res) => {},
            })
          }
        })
      },
      fail: function (res) {
        console.log('submit fail');
      },
    })
  },

  onLoad: function(options) {
    this.setData({
      groups: app.globalData.allGroups
    })
    console.log(this.data.groups)
  },
})
