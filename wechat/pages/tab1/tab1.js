// pages/tab1/tab1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(wx.getMenuButtonBoundingClientRect())
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#368',
      animation: {
        duration: 500,
        timingFunc: 'easeIn'
      }
    })
    wx.setTabBarStyle({
      color: '#333333',
      selectedColor: '#ff4400',
      backgroundColor: '#ffffff',
      borderStyle: 'black',
      success(){
        console.log('成功设置')
      }
    })
    // wx.setTabBarStyle({
    //   color: '#FF0000',
    //   selectedColor: '#00FF00',
    //   backgroundColor: '#0000FF',
    //   borderStyle: 'white'
    // })
    wx.setTabBarItem({
      index: 0,
      text: 'text',
      iconPath: '/path/to/iconPath',
      selectedIconPath: '/path/to/selectedIconPath'
    })
    wx.setTabBarItem({
      index: 1,
      text: 'text',
      iconPath: '/path/to/iconPath',
      selectedIconPath: '/path/to/selectedIconPath'
    })
    wx.showTabBarRedDot({
      index: 0,
    })
    wx.setTabBarBadge({
      index: 1,
      text: '1',
    })
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

  },

  handleClickToIndex() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})