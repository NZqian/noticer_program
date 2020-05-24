// pages/voteitem/voteitem.js
const app = getApp();
Page({
  data: {
    title: "",
    items: [],
    received: [],
    name: "",
    choice:"",
    vote:"",
    namelist:"",
    thisGroup:"",
  },
  radioChange(e) {
    console.log('radio::::::::', e.detail.value)
    this.setData({
      choice:e.detail.value,
    })
  },

  formSubmit: function (e) {
    const db = wx.cloud.database()
    const _ = db.command
    let vote=this.data.vote
    let thisGroup = this.data.thisGroup
    let name = app.globalData.userdata['name']
    for (var i = 0; i < vote.length; i++) 
    {
      if (vote[i]['votetitle'] == this.data.title) 
      {
        vote[i]['received'][name] = this.data.choice
        break
      }
    }
    db.collection('Groups').doc(thisGroup['_id']).update({
      data: {
        vote:vote
      }
    })
  },

  onLoad: function (options) {
    if (app.globalData.userdata['type'] === "admin") {
      this.setData({
        userType: 1,
      })
    } else {
      this.setData({
        userType: 0,
      })
    }
    console.log(options)
    let received = JSON.parse(options.received)
    let avote = JSON.parse(options.avote)
    let thisGroup = JSON.parse(options.thisGroup)
    let vote = JSON.parse(options.vote)
    let name = app.globalData.userdata['name']
    this.setData({
        received:received,
        name:name,
        namelist: thisGroup.students,
        title: avote['votetitle'],
        thisGroup: thisGroup,
        vote:vote,
        avote:avote
    })

    var changed = {}
    var temp=this.data.avote['voteopt']
    for (var i = 0; i < temp.length; i++)
    {
     changed['items[' + i+ '].value'] = changed['items[' + i + '].name']=this.data.avote['voteopt'][i];
    }
    this.setData(changed)
    console.log("test:::::::::::::::::",this.data.items)
      },
      onShow: function(options) {}
    })