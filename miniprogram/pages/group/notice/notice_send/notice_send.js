/*未设置返参动作
 */
/*返回至首页，而不是notice界面，需解决
 */
const app = getApp();
const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    fileName: "选择文件",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    time: '12:00',
    date: '2020-4-15',
    textareaAInput(e) {
      this.setData({
        textareaAValue: e.detail.value
      })
    },
    title: "",
    content: "",
    groupID: "",
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
  titleInput: function(e) {
    let title = e.detail.value
    this.setData({
      title: title
    })
  },
  contentInput: function(e) {
    let content = e.detail.value
    this.setData({
      content: content
    })
  },
  //将通知内容写入数据库
  addNoticeintoDB: function(title, content, time, date, groupID, fileID, fileName) {
    var receiveStatus = {}
    var nameList = []
    db.collection('Groups').doc(groupID).get().then(res => {
      //console.log(res.data.students)
      nameList = res.data.students
      //console.log(nameList)
      for (var i = 0; i < nameList.length; i++) {
        receiveStatus[nameList[i]] = 0
      }
      var notices = this.data.notices
      notices.push({
        title: title,
        content: content,
        time: time,
        date: date,
        received: receiveStatus,
        fileID: fileID,
        fileName: fileName})
      db.collection('Groups').doc(groupID).update({
        data: {
          notices: _.push({
            title: title,
            content: content,
            time: time,
            date: date,
            received: receiveStatus,
            fileID: fileID,
            fileName: fileName
          })
        },
        success: res=>{
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
                  notices: notices
                })
                wx.navigateBack()
              }, 2000);
            }
          });
        }
      })
    })
  },

  chooseFile: function(){
    let that = this
    wx.chooseMessageFile({
      count: 1,
      success(res){
        that.setData({
          fileName: res.tempFiles[0].name,
          filePath: res.tempFiles[0].path
        })
        console.log(that.data.fileName)
        console.log(that.data.filePath)
      }
    })
  },

  submit: function() {
    console.log(this.data.title)
    console.log(this.data.groupID)
    console.log(this.data.time)
    console.log(this.data.date)
    console.log(this.data.content)

    let that = this
    wx.cloud.uploadFile({
      cloudPath: that.data.fileName,
      filePath: that.data.filePath,
      success: res => {
        that.setData({
          fileID: res.fileID
        })
        that.addNoticeintoDB(that.data.title, that.data.content, that.data.time, that.data.date, that.data.groupID, that.data.fileID, that.data.fileName)
        console.log(that.data.fileID)
      }
    })
    
  },
  onLoad: function(options) {
    console.log(options)
    this.setData({
      groupID: JSON.parse(options.groupID),
      notices: JSON.parse(options.notices)
    })
  },
})
