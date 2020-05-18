// pages/voteitem/voteitem.js
const app = getApp();
Page({
  data: {
    voteType: 0,
    title: "",
    items: [],
    received: [],
    name: "",
    choice:"",
    vote:"",
    thisGroup:"",
    namelist:"",
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }
    this.setData({
      items
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items,
      choice:e.detail.value,
    })
  },

  formSubmit: function (e) {
    const db = wx.cloud.database()
    const _ = db.command

    let vote=this.data.vote
    let thisGroup = this.data.thisGroup
    let name = app.globalData.userdata['name']
    for (var i = 0; i < vote.length; i++) {
      if (vote[i]['votetitle'] == this.data.title) {
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
        namelist: Object.keys(received),
        votetype:avote['votetype'],
        title: avote['votetitle'],
        thisGroup: thisGroup,
        vote:vote,
        items:[
          {value:avote.voteopt1,name:avote.voteopt1},
          {value:avote.voteopt2,name:avote.voteopt2},
          {value:avote.voteopt3,name:avote.voteopt3},
          {value:avote.voteopt4,name:avote.voteopt4},
          {value:avote.voteopt5,name:avote.voteopt5},
          {value:avote.voteopt6,name:avote.voteopt6},
        ]
    })
    console.log("test:::::::::::::::::",this.data.items)
    //changed['title'] = v.title
    //changed['voteType'] = v.single_select
    // changed['items'] = vi
   // that.setData(changed)
      },
      onShow: function(options) {}
    })