// pages/downloadFile/downFile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    message: 'woyun'
  },
  downLoadFile() {
    if (!this.data.imgUrl) {
      let RequestTask = wx.downloadFile({
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545303501290&di=fdd08c353d8c0c4c44afca807aa9a1d7&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F00%2F95%2F76%2F78bOOOPIC49.jpg',
        success: (res) => {
          if (res.statusCode == 200) {
            console.log(res.tempFilePath)
            this.setData({
              'imgUrl': res.tempFilePath
            })
          }
        }
      })
      RequestTask.onProgressUpdate(function(res) {
        console.log(res)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.setdata({
    // })
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