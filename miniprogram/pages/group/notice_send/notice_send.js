/*未设置返参动作
 */
/*返回至首页，而不是notice界面，需解决
 */
const app = getApp();
const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    /*课程序号list
     */
    classes: [],
    time: '12:00',
    date: '2020-4-15',
    textareaAInput(e) {
      this.setData({
        textareaAValue: e.detail.value
      })
    },
    title: "",
    content: "",
    classID: "",
  },
  classChange: function(e){
    var classIndex = e.detail.value
    //console.log(classIndex)
    this.setData({
      classIndex: classIndex,
      classID: this.data.classes[classIndex]['_id']
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
  addNoticeintoDB: function(title, content, time, date, classID) {
    var receiveStatus = {}
    var nameList = []
    db.collection('Classes').doc(classID).get().then(res => {
      //console.log(res.data.students)
      nameList = res.data.students
      //console.log(nameList)
      for (var i = 0; i < nameList.length; i++) {
        receiveStatus[nameList[i]] = 0
      }
      db.collection('Classes').doc(classID).update({
        data: {
          notices: _.push({
            title: title,
            content: content,
            time: time,
            date: date,
            received: receiveStatus
          })
        },
        success: res=>{
          
          wx.showToast({
            title: '发布成功',
            duration: 2000,
            success: function () {
              var util = require("../../../../utils/util.js")
              util.getClasses()
              setTimeout(function () {
                
                console.log("add success")
                wx.navigateBack()
              }, 2000);
            }
          });
        }
      })
    })
  },
  submit: function() {
    console.log(this.data.title)
    console.log(this.data.classID)
    console.log(this.data.time)
    console.log(this.data.date)
    console.log(this.data.content)
    this.addNoticeintoDB(this.data.title, this.data.content, this.data.time, this.data.date, this.data.classID)
  },
  onLoad() {
    this.setData({
      classes: app.globalData.classes
    })
  },
})