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
  },

  onLoad: function(options) {
    this.setData({
      groups: app.globalData.allGroups
    })
    console.log(this.data.groups)
  },
})