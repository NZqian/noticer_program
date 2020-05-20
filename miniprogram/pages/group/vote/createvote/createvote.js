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
    votetitle:"",
    votetype:0,
    voteopt:[],
    opcondition:[],
    btcondition:[],
    hidden: false,
  },
  
  radioChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
        changed['votetype']=i
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  addOption: function (e) {
    var changed = {}
    if (j < 16) {
      changed['btcondition['+j+']'] = false
      j++
    }
    if (j <= 16) {
      changed['opcondition['+j+']'] = true
      changed['btcondition['+j+']'] = true
      this.setData(changed)
    }
  },
  delOption: function (e) {
    var changed = {}
    if (j >= 3) {
      changed['opcondition['+j+']'] = false
      j--
      changed['opcondition['+j+']']= true
      changed['btcondition['+j+']']= true
      this.setData(changed)
    }
  },
  vote_creat: function () {
    var postdata = this.data
    console.log("test::::::",this.data)
    var nameList = []
    var receiveStatus = {}
    db.collection('Groups').doc(this.data.groupID).get().then(res => {
      nameList = res.data.students
      for (var i = 0; i < nameList.length; i++) {
        receiveStatus[nameList[i]] = 0
      }
      var vote=this.data.vote
      vote.push({
        votetitle: postdata.votetitle,
        voteopt: postdata.voteopt,
        received: receiveStatus,
        votetype: postdata.votetype
      })
      
      db.collection('Groups').doc(this.data.groupID).update({
        data:{
          vote:_.push({
            votetitle: postdata.votetitle,
            voteopt: postdata.voteopt,
            received: receiveStatus,
            votetype: postdata.votetype
          })
        },
       success: function (res) {
        
        wx.showToast({
          title: '发布成功',
          duration: 2000,
          success: res=> {
            var util = require("../../../../utils/util.js")
            util.getGroups()
            setTimeout(function () {
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2];  //上一个页面
             console.log(vote)
              prevPage.setData({
                vote: vote
              })
              wx.navigateBack()
            }, 2000);
          }
        });
       }
    })
  })
},
vote_submit: function(e) {
  var formdata=e.detail.value;
  var changed = {}
  changed['voteopt['+1+']'] = formdata.voteopt1,
  changed['voteopt['+2+']'] = formdata.voteopt2,
  changed['voteopt['+3+']'] = formdata.voteopt3,
  changed['voteopt['+4+']'] = formdata.voteopt4,
  changed['voteopt['+5+']'] = formdata.voteopt5,
  changed['voteopt['+6+']'] = formdata.voteopt6,
  this.setData(changed)
  this.setData({votetitle:formdata.votetitle,})
  
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