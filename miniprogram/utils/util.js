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

function getGroups() {
  wx.cloud.callFunction({
    name: 'getGroups',
    data: {
      type: app.globalData.userdata['type'],
      name: app.globalData.userdata['name']
    },
    complete: res=>{
      console.log(res)
      app.globalData.groups = res.result.data
    }
  })
}

function getAllGroups() {
  wx.cloud.callFunction({
    name: 'getAllGroups',
    complete: res => {
      console.log(res)
      app.globalData.allGroups = res.result.data
    }
  })
}

function addAdminIntoDB(_id, name){
  console.log(_id)
  console.log(name)
  wx.cloud.callFunction({
    name: 'addAdminIntoDB',
    data: {
      _id: _id,
      name: name
    }
  })
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

module.exports = {
  getGroups: getGroups,
  getAllGroups: getAllGroups,
  addAdminIntoDB: addAdminIntoDB,
  formatTime: formatTime,
  formatDate: formatDate
}