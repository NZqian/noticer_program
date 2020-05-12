// pages/voteresult/voteresult.js
Page({
  data:{
    voteid: 0,
    voteType: 0,
    title: "",
    items: {},    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that = this
    that.setData({ "voteid": options.id })

    wx.request({
      url: 'https://www.ningziqian.club:8000/vote/result',
      data: { voteid: options.id },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        var changed = {}
        let v = res.data.data.vote;
        let vi = res.data.data.results;
        changed['title'] = v.title
        changed['voteType'] = v.single_select
        changed['items'] = vi
        console.log(vi)
        that.setData(changed)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})