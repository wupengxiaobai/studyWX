// pages/scrollView/scrollView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewId: 'v4',

    //---------
    views: [{
      id: 'v1',
      title: 'xxx标题1',
      view: [{
        idx: 1,
        cont: 'xxxxx1'
      }, {
        idx: 2,
        cont: 'xxxxx1'
      }, {
        idx: 2,
        cont: 'xxxxx1'
      }, {
        idx: 2,
        cont: 'xxxxx1'
      }, {
        idx: 2,
        cont: 'xxxxx1'
      }, {
        idx: 2,
        cont: 'xxxxx1'
      }, {
        idx: 2,
        cont: 'xxxxx1'
      }, {
        idx: 2,
        cont: 'xxxxx1'
      }, {
        idx: 2,
        cont: 'xxxxx1'
      }]
    }, {
      id: 'v2',
      title: 'xxx标题2',
      view: [{
        idx: 1,
        cont: 'xxxxx2'
      }, {
        idx: 2,
        cont: 'xxxxx2'
      }, {
        idx: 2,
        cont: 'xxxxx2'
      }, {
        idx: 2,
        cont: 'xxxxx2'
      }, {
        idx: 2,
        cont: 'xxxxx2'
      }, {
        idx: 2,
        cont: 'xxxxx2'
      }, {
        idx: 2,
        cont: 'xxxxx2'
      }, {
        idx: 2,
        cont: 'xxxxx2'
      }, {
        idx: 2,
        cont: 'xxxxx2'
      }]
    }, {
      id: 'v3',
      title: 'xxx标题3',
      view: [{
        idx: 3,
        cont: 'xxxxx3'
      }, {
        idx: 2,
        cont: 'xxxxx3'
      }, {
        idx: 2,
        cont: 'xxxxx3'
      }, {
        idx: 2,
        cont: 'xxxxx3'
      }, {
        idx: 2,
        cont: 'xxxxx3'
      }, {
        idx: 2,
        cont: 'xxxxx3'
      }, {
        idx: 2,
        cont: 'xxxxx3'
      }, {
        idx: 2,
        cont: 'xxxxx3'
      }, {
        idx: 2,
        cont: 'xxxxx3'
      }]
    }, {
      id: 'v4',
      title: 'xxx标题4',
      view: [{
        idx: 4,
        cont: 'xxxxx4'
      }, {
        idx: 2,
        cont: 'xxxxx4'
      }, {
        idx: 2,
        cont: 'xxxxx4'
      }, {
        idx: 2,
        cont: 'xxxxx4'
      }, {
        idx: 2,
        cont: 'xxxxx4'
      }, {
        idx: 2,
        cont: 'xxxxx4'
      }, {
        idx: 2,
        cont: 'xxxxx4'
      }, {
        idx: 2,
        cont: 'xxxxx4'
      }, {
        idx: 2,
        cont: 'xxxxx4'
      }]
      }, {
        id: 'v5',
        title: 'xxx标题5',
        view: [{
          idx: 5,
          cont: 'xxxxx5'
        }, {
          idx: 2,
          cont: 'xxxxx5'
        }, {
          idx: 2,
          cont: 'xxxxx5'
        }, {
          idx: 2,
          cont: 'xxxxx5'
        }, {
          idx: 2,
          cont: 'xxxxx5'
        }, {
          idx: 2,
          cont: 'xxxxx5'
        }, {
          idx: 2,
          cont: 'xxxxx5'
        }, {
          idx: 2,
          cont: 'xxxxx5'
        }, {
          idx: 2,
          cont: 'xxxxx5'
        }]
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },



  handleClickChangeNav({
    currentTarget
  }) {
    const idx = currentTarget.dataset.idx;
    this.setData({
      'viewId': idx
    })
    console.log(idx)
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