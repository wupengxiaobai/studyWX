// pages/storage/storage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userStorages: {}
  },
  //  判断本地中是否有用户信息得存储, 返回true/false
  hasUserInfoStorage() {
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        return true
      },
      fail(err) {
        return false
      }
    })
  },
  //  设置本地存储
  setUserInfoStorage() {
    wx.setStorage({
      key: 'userInfo',
      data: {
        "id": 1,
        "truename": '吴鹏',
        "nickname": "小白",
        "hobbies": "撸代码"
      },
    })
  },
  getUserInfoStorage() {
    wx.getStorage({
      key: 'userInfo',
      success: (res)=> {
        console.log(this);
        this.setData({
          'userStorages': res.data
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //  获取本地存储存储的 用户信息 缓存
    let HS = this.hasUserInfoStorage()
    if (!HS) {
      this.setUserInfoStorage()
    }
    this.getUserInfoStorage()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})