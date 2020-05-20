// pages/login/login.js
var app = getApp()
Page({
  data: {
    username: '',
    password: ''
  },
  addStudentIntoClass: function(group, name) {
    const db = wx.cloud.database()
    db.collection('Groups').where({
        _id: group['groupID']
      }).get()
      .then(res => {
        console.log(res)
        if (res.data.length) {
          console.log("group exist, adding user into class")
          const _ = db.command
          db.collection('Groups').doc(group['groupID']).update({
            data: {
              students: _.push(name)
            }
          })
        } else {
          console.log("adding new group")
          db.collection('Groups').add({
            data: {
              _id: group['groupID'],
              name: group['groupName'],
              students: [name],
              notices: [],
              admins: [],
              vote:[],
              type: group['type']
            }
          })
        }
      })
  },

  login: function() {
    const db = wx.cloud.database()
    let that = this
    console.log("here")
    wx.requestSubscribeMessage({
      tmplIds: ['aZzTkMDanrNDI4XyLGmg2I0-rMme4-IhyH0ws8zNYw8'],
      success(res) {
        console.log(res)
      }
    })
    db.collection("Users").where({
      username: this.data.username
    }).get({
      success: res => {
        if (res.data.length > 0) {
          app.globalData.userdata = res.data[0]
          wx.setStorageSync('isUserInfoStored', true)
          wx.setStorageSync('userdata', res.data[0])
          
          wx.switchTab({
            url: '../home/home'
          })
        } else {
          // 发出请求获取用户翱翔信息
          wx.request({
            url: "https://www.ningziqian.club:8000/login/",
            method: "POST",
            data: {
              username: this.data.username,
              password: this.data.password,
            },
            // 服务器返回信息，将信息存储至本地缓存
            success: function(res) {
              db.collection('Users').add({
                data: res.data,
                success: res => {
                  console.log("add db success")
                }
              })

              if (res.data.type === "student") {
                let academy = {
                  groupID: "Academy"+res.data.academy,
                  groupName: res.data.academy,
                  type: "academy"
                }
                that.addStudentIntoClass(academy, res.data['name'])
                for (var i = 0; i < res.data['groups'].length; i++) {
                  that.addStudentIntoClass(res.data['groups'][i], res.data['name'])
                }
              }

              app.globalData.userdata = res.data
              console.log(res.data);
              wx.setStorageSync('isUserInfoStored', true)
              wx.setStorageSync('userdata', res.data)
              wx.switchTab({
                url: '../home/home'
              })
            },
            fail: function(res) {
              console.log('submit fail');
            },
          })
        }
      }
    })
    wx.showToast({
      title: '登录中',
      icon: 'loading',
      duration: 13000
    })

  },
  //  获取学号
  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  // 获取密码
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  onLoad: function(options) {
    if (wx.getStorageSync('isUserInfoStored')) {
      app.globalData.userdata = wx.getStorageSync('userdata')
      wx.switchTab({
        url: '../home/home'
      })
    }
  },
})