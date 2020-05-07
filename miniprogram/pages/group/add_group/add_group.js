// miniprogram/pages/group/add_group/add_group.js
const app = getApp();

Page({
  data: {
    groups: []
  },

  groupChange: function(e) {
    var groupIndex = e.detail.value
    //console.log(classIndex)
    this.setData({
      groupIndex: groupIndex,
      groupID: this.data.groups[groupIndex]['_id']
    })
  },

  confirm: function(e) {
    
    var util = require("../../../utils/util.js")
    util.addAdminIntoDB(this.data.groupID, app.globalData.userdata['name'])
    /*
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('Groups').doc(this.data.groupID).get().then(res => {
      console.log(res.data)
      if (res.data.admins.indexOf(app.globalData.userdata['name']) == -1) {//不在admins中
        db.collection('Groups').doc(this.data.groupID).update({
          data: {
            admins: _.push(app.globalData.userdata['name'])
          }
        })
      }
    })
    */
  },

  onLoad: function(options) {
    this.setData({
      groups: app.globalData.allGroups
    })
    console.log(this.data.groups)
  },
})