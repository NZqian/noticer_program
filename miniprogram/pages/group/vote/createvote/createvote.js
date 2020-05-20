// pages/createvote/createvote.js
const app = getApp()
const db=wx.cloud.database()
const _ = db.command
Page({
  data: 
  {
    tempopt:"",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    votetitle:"",
    voteopt:[],
    hidden: false,
  },
  getTitle: function(e)
  {
    var title= e.detail.value;
    this.setData({
        votetitle: title,
    });
    console.log(this.data.votetitle)
  },

  addOption: function (e) 
  {
      var voteopt=this.data.voteopt;
      voteopt.push(e.detail.value.inputopt)
      this.setData
      ({
        voteopt: voteopt,
        tempopt: "",
      });
      e.detail.value.inputopt=""
      console.log(this.data.voteopt);
  },
  delOption: function (e) 
  {
      var opt=this.data.voteopt;
      opt.pop();
      this.setData
      ({
        voteopt: opt,
      });
      console.log(this.data.voteopt);
  },
  clrOption: function (e)
  {
    this.setData
    ({
      voteopt: {},
    });
    console.log(this.data.voteopt);
  },
  vote_submit: function(e)
  {
    console.log(this.data.votetitle,this.data.voteopt)
    var postdata = this.data
    console.log("test::::::",this.data)
    var nameList = []
    var receiveStatus = {}
    db.collection('Groups').doc(this.data.groupID).get().then(res => {
      nameList = res.data.students
      for (var i = 0; i < nameList.length; i++) 
      {
        receiveStatus[nameList[i]] = 0
      }
      var vote=this.data.vote
      vote.push({
        votetitle: postdata.votetitle,
        voteopt: postdata.voteopt,
        received: receiveStatus,
      })
      db.collection('Groups').doc(this.data.groupID).update({
        data:{
          vote:_.push({
            votetitle: postdata.votetitle,
            voteopt: postdata.voteopt,
            received: receiveStatus
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
  onLoad: function(options) {
      this.setData({
      groupID: JSON.parse(options.groupID),
      vote: JSON.parse(options.vote)
    })
  },
})