// pages/progress/progress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress: 30
  },

  addPro() {
    if (this.data.progress > 100) return;
    console.log(this.data.progress);
    this.data.progress = this.data.progress <= 100 ? this.data.progress += 10 : 100
    this.setData({
      progress: this.data.progress
    })
  },
  over(){
    console.log('进度条动画完毕')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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