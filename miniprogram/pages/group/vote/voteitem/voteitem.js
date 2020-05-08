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
  // radioChange: function (e) {
  //   var v = e.detail.value
  //   var changed = {}
  //   console.log("voteItemId="+v)
  //   changed['voteItemId'] = v
  //   this.setData(changed)
  // },
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
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        var changed = {}
        let v = res.data.data.vote;
        let vi = res.data.data.voteItems;
        changed['title'] = v.title
        changed['voteType'] = v.single_select
        changed['items'] = vi
        // console.log(vi)
        that.setData(changed)
        // that.setData(
        //   {"title":v.title}
        //   )
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
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
  },
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      path: '/page/voteitem/voteitem?id=' + this.data.voteid
    }
  },

  genQrCode: function () {
    var that = this;
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=YourAppId&secret=YourSecretCode',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(that.data.voteid)
        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode',
          data: {
            access_token: res.data.access_token,
            path: '/page/voteitem/voteitem?id=' + that.data.voteid,
            width: 200
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (resQr) {
            let qr = resQr.data.url;
            that.setData({"QRCode":qr})
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }

})