// pages/voteitem/voteitem.js
Page({
  data: {
    voteid: 0,
    voteType: 0,
    // voteItemId: 0,
    title: "",
    items: {},
    QRCode:""
  },

  formSubmit: function (e) {
    var postdata = e.detail.value
    wx.request({
      url: 'https://www.ningziqian.club:8000/vote/vote',
      data: postdata,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          success: function (resSM) {
            if (resSM.confirm) {
              if (res.data.code == 1) { //成功
                wx.navigateTo({
                  url: '../voteresult/voteresult?id=' + postdata.voteid
                })
              } else {//失败
                wx.navigateTo({
                  url: '../myvote/myvote?openid=xxoo'
                })
              }
            }
          }
        })
        console.log(res.data)
      }
    })
    console.log('form发生了submit事件，携带数据为：', postdata)
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that = this
    that.setData({ "voteid": options.id })

    wx.request({
      url: 'https://www.ningziqian.club:8000/vote/detail',
      data: { voteid: options.id },
      method: 'GET', 
      success: function (res) {
        var changed = {}
        let v = res.data.data.vote;
        let vi = res.data.data.voteItems;
        changed['title'] = v.title
        changed['voteType'] = v.single_select
        changed['items'] = vi
        that.setData(changed)
      },
    })
  },
})