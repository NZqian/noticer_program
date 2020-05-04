const app = getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

function getClasses() {
  let type = app.globalData.userdata['type']
  const db = wx.cloud.database()
  if (type === "student") {
    db.collection('Classes').where({
      students: app.globalData.userdata['name'],
      type: "class"
    }).get({
      success: function(res) {
        app.globalData.classes = res.data
      }
    })
    db.collection('Classes').where({
      students: app.globalData.userdata['name'],
      type: "academy"
    }).get({
      success: function (res) {
        app.globalData.academyGroup = res.data[0]
        console.log(app.globalData.academyGroup)
      }
    })
  } else {
    wx.cloud.callFunction({
      name: 'getList20',
      complete: res => {
        console.log(res)
        app.globalData.classes = res.result.data
      }
    })
  }
}

module.exports = {
  getClasses: getClasses
}