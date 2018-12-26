// pages/button/button.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    messages: [{
        id: 1,
        name: '美丽'
      }, {
        id: 2,
        name: '善良'
      }, {
        id: 3,
        name: '可爱'
      },
      {
        id: 4,
        name: '么么哒'
      }
    ],
    multiSelector: [
      [{
        id: 1,
        name: '美丽'
      }, {
        id: 2,
        name: '善良'
      }, {
        id: 3,
        name: '么么哒'
      }],
      [{
        id: 1,
        gender: '女'
      }, {
        id: 0,
        gender: '男'
      }, {
        id: 2,
        name: '保密'
      }]
    ],
    messages3: [
      ['a', 'b'],
      ['c', 'd']
    ]
  },
  changePicker({
    detail
  }) {
    console.log(detail)
  },
  changePicker2({
    detail
  }) {
    console.log(detail)
  },
  bindInputChange({
    detail
  }) {
    return '直接返回的内容' + detail.value.substring(7) + '/'
  },
  bindInputFocus() {
    this.setData({
      focus: true
    })
  },
  submitForm(e) {
    console.log(e)
  },
  checkboxChange({
    detail
  }) {
    console.log(detail)
  },
  onGotUserInfo(res) {
    console.log(res)
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