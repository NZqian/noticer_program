// pages/createvote/createvote.js
var app = getApp()
let j = 2
Page({
  data: {
    radioItems: [
      { title: '单选', name: 'single', value: '1', checked: 'ture' },
      { title: '多选', name: 'multi', value: '0' },
    ],
    openid : "",
    hidden: false,
    op3condition: false,
    op4condition: false,
    op5condition: false,
    op6condition: false,
    op7condition: false,
    op8condition: false,
    op9condition: false,
    op10condition: false,
    op11condition: false,
    op12condition: false,
    op13condition: false,
    op14condition: false,
    op15condition: false,
    op16condition: false,
    bt3condition: false,
    bt4condition: false,
    bt5condition: false,
    bt6condition: false,
    bt7condition: false,
    bt8condition: false,
    bt9condition: false,
    bt10condition: false,
    bt11condition: false,
    bt12condition: false,
    bt13condition: false,
    bt14condition: false,
    bt15condition: false,
    bt16condition: false,
  },
  radioChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  addOption: function (e) {
    var changed = {}
    if (j < 16) {
      changed['bt' + j + 'condition'] = false
      j++
    }
    if (j <= 16) {
      changed['op' + j + 'condition'] = true
      changed['bt' + j + 'condition'] = true
      this.setData(changed)
      console.log(j)
    }
  },
  delOption: function (e) {
    var changed = {}
    if (j >= 3) {
      changed['op' + j + 'condition'] = false
      j--
      changed['op' + j + 'condition'] = true
      changed['bt' + j + 'condition'] = true
      console.log(j)
      this.setData(changed)
    }
  },
  formSubmit: function (e) {
    var postdata = e.detail.value
    wx.request({
      url: "https://www.ningziqian.club:8000/vote/add",
      data: postdata,
      // data: {
      //   title: postdata.votetitle,
      //   single: postdata.votetype,
      //   openid: 'xxoo',
      //   unionid: postdata.unionid,
      //   item1: postdata.voteopt1,
      //   item2: postdata.voteopt2,
      //   item3: postdata.voteopt3,
      //   item4: postdata.voteopt4,
      //   item5: postdata.voteopt5,
      //   item6: postdata.voteopt6,
      //   item7: postdata.voteopt7,
      //   item8: postdata.voteopt8,
      //   item9: postdata.voteopt9,
      //   item10: postdata.voteopt10,
      //   item11: postdata.voteopt11,
      //   item12: postdata.voteopt12,
      //   item13: postdata.voteopt13,
      //   item14: postdata.voteopt14,
      //   item15: postdata.voteopt15,
      //   item16: postdata.voteopt16
      // },
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
                  url: '../myvote/myvote?openid='+this.openid
                })
              } else {//失败
                console.log(res.data)
              }
            }
          }
        })
        console.log(res.data)
      }
    })
    console.log('form发生了submit事件，携带数据为：', postdata)
    console.log('form发生了submit事件，携带数据为：', postdata.votetitle)
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },

  //  onLoad:function(options){
  // 页面初始化 options为页面跳转所带来的参数
  onLoad: function () {
    j = 2
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
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