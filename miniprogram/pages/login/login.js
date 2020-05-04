// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },
  addStudentIntoClass: function(class_, name_) {
    //console.log(class_)
    const db = wx.cloud.database()
    db.collection('Classes').where({
        _id: class_['classID']
      }).get()
      .then(res => {
        console.log(res)
        if (res.data.length) {
          console.log("class exist, adding student into class")
          const _ = db.command
          db.collection('Classes').doc(class_['classID']).update({
            data: {
              students: _.push(name_)
            }
          })
        } else {
          console.log("adding new class")
          db.collection('Classes').add({
            data: {
              _id: class_['classID'],
              name: class_['className'],
              students: [name_],
              notices: [],
              type: class_['type']
            }
          })
        }
      })
  },
  login: function() {
    const db = wx.cloud.database()
    let that = this

    db.collection("Users").where({
      username: app.globalData.username
    }).get({
      success: res => {
        console.log(res)
        console.log(res.data.length)
        if (res.data.length > 0) {
          app.globalData.userdata = res.data[0]
          wx.setStorageSync('judge', true)
          wx.setStorageSync('userdata', res.data[0])
          
          let storeddata = wx.getStorageSync('userdata')
          console.log(storeddata)
          /*
          wx.redirectTo({
            url: '../home/home',
          })
          */
          wx.switchTab({
            url: '../home/home'
          })
        } else {
          // 发出请求获取用户翱翔信息
          wx.request({
            url: "https://www.ningziqian.club:8000/login/",
            method: "POST",
            data: {
              username: app.globalData.username,
              password: app.globalData.password,
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
                  classID: res.data.academy,
                  className: res.data.academy,
                  type: "academy"
                }
                that.addStudentIntoClass(academy, res.data['name'])
                for (var i = 0; i < res.data['classes'].length; i++) {
                  that.addStudentIntoClass(res.data['classes'][i], res.data['name'])
                }
              }

              app.globalData.userdata = res.data
              console.log(res.data);
              wx.setStorageSync('judge', true)
              wx.setStorageSync('userdata', res.data)
              /*
              wx.redirectTo({
                url: '../home/home',
              })*/
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
    app.globalData.username = e.detail.value
    this.setData({
      username: e.detail.value
    })
  },
  // 获取密码
  passwordInput: function(e) {
    app.globalData.password = e.detail.value
    this.setData({
      password: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var jud = wx.getStorageSync('judge')
    if (jud) {
/*
      wx.redirectTo({
        url: '../home/home',
      })
*/

      console.log("switch")
      wx.switchTab({
        url: '../home/home'
      })


    }
  },
})