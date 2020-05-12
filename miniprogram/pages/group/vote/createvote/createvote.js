// pages/createvote/createvote.js
const app = getApp()
const db=wx.cloud.database()
const _ = db.command
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
    votetitle:"",
    voteopt1:"",
    voteopt2:"",
    voteopt3:"",
    voteopt4:"",
    voteopt5:"",
    voteopt6:"",
    groupID:"",
    hidden: false,
    op3condition: false,
    op4condition: false,
    op5condition: false,
    op6condition: false,
    bt3condition: false,
    bt4condition: false,
    bt5condition: false,
    bt6condition: false,
  },
  groupChange: function(e){
    var groupIndex = e.detail.value
    this.setData({
      groupIndex: groupIndex,
      groupID: this.data.groups[groupIndex]['_id']
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
    }
  },
  delOption: function (e) {
    var changed = {}
    if (j >= 3) {
      changed['op' + j + 'condition'] = false
      j--
      changed['op' + j + 'condition'] = true
      changed['bt' + j + 'condition'] = true
      this.setData(changed)
    }
  },
  vote_creat: function () {
    var postdata = this.data
    var nameList = []
    var receiveStatus = {}
    console.log(this.data.groupID)
    db.collection('Groups').doc(this.data.groupID).get().then(res => {
      
      nameList = res.data.students
      for (var i = 0; i < nameList.length; i++) {
        receiveStatus[nameList[i]] = 0
      }
      db.collection('Groups').doc(this.data.groupID).update({
        data:{
          vote:_.push({
            radioItems:postdata.radioItems,
            votetitle:postdata.votetitle,
            voteopt1:postdata.voteopt1,
            voteopt2:postdata.voteopt2,
            voteopt3:postdata.voteopt3,
            voteopt4:postdata.voteopt4,
            voteopt5:postdata.voteopt5,
            voteopt6:postdata.voteopt6,
            received:receiveStatus
          })
        },
       success: function (res) {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          success: function (resSM) {
            console.log(res)
            wx.showToast({
              title: '发布成功',
              duration: 2000,
              success: res=> {
                var util = require("../../../../utils/util.js")
                util.getGroups()
                setTimeout(function () {
                  var pages = getCurrentPages();
                  var prevPage = pages[pages.length - 2];  //上一个页面
                  console.log(notices)
                  prevPage.setData({
                    vote: vote
                  })
                  wx.navigateBack()
                }, 2000);
              }
            });
          }
        });
      }
    })
  })
},
vote_submit: function(e) {
  var formdata=e.detail.value;
  this.setData({
    votetitle:formdata.votetitle,
    voteopt1:formdata.voteopt1,
    voteopt2:formdata.voteopt2,
    voteopt3:formdata.voteopt3,
    voteopt4:formdata.voteopt4,
    voteopt5:formdata.voteopt5,
    voteopt6:formdata.voteopt6,
    radioItems:formdata.radioItems,
 }   
  )
  this.vote_creat()
},

  onLoad: function(options) {
    j=2
    this.setData({
      groupID: JSON.parse(options.groupID),
      vote: JSON.parse(options.vote)
    })
  },
})