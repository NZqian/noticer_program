// pages/createvote/createvote.js
const app = getApp()
const db=wx.cloud.database()
let j = 2
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    radioItems: [
      { title: '单选', name: 'single', value: '1', checked: 'ture' },
      { title: '多选', name: 'multi', value: '0' },
    ],
    groups:[],

    openid:"",
    time:'00:00',
    date:'2020-4-15',
    groupID:"",
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
  groupChange: function(e){
    var groupIndex = e.detail.value
    //console.log(classIndex)
    this.setData({
      groupIndex: groupIndex,
      groupID: this.data.groups[groupIndex]['_id']
    })
  },
  TimeChange: function(e) {
    var time = e.detail.value;
    //console.log("当前选择时间" + time);
    this.setData({
      time: time
    })
  },
  DateChange: function(e) {
    let date = e.detail.value
    //console.log(date)
    this.setData({
      date: date
    })
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
    var nameList = []
    db.collection('Groups').doc(groupID).get().then(res => {
      nameList = res.data.students
      for (var i = 0; i < nameList.length; i++) {
        receiveStatus[nameList[i]] = 0
      }
      db.collection('Groups').doc(groupID).update({
        data:postdata,
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