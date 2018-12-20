//index.js
//获取应用实例
const app = getApp()

Page({
  data: {},
  onLoad: function() {
    // console.log(wx.canIUse('showToast.object.image'))
    // console.log(wx.getSystemInfoSync())
    // console.log(wx.getUpdateManager())

    //  更新唯一凭证
    // let updateManager = wx.getUpdateManager()
    // // 查看是否有新版本
    // updateManager.onCheckForUpdate((res) => {
    //   console.log(res)
    // })
    // //  有新版本则自动触发
    // updateManager.onUpdateReady(() => {
    //   wx.showModel({
    //     title: '更新提示',
    //     content: '新版本已准备哈, 是否重启',
    //     success(res) {
    //       if (res.confirm) {
    //         //  强制小程序重启使用新版
    //         updateManager.applyUpdate()
    //       }
    //     }
    //   })
    // })
    // //  更新失败回调
    // updateManager.onUpdateFailed(function() {
    //   console.log('更新失败')
    // })

  },
  handleClickNavigatorbackPage() {
    wx.navigateTo({
      url: '/pages/navigatorBack/navigatorBack',
    })
  },
  handleClickToTab1() {
    wx.switchTab({
      url: '/pages/tab1/tab1',
    })
  },
  handleClickToTab2() {
    wx.switchTab({
      url: '/pages/tab2/tab2',
    })
  },
  handleClickToRelaunchPage() {
    wx.navigateTo({
      url: '/pages/reLaunch/reLaunch',
    })
  },
  handleClickToRedirectPage() {
    wx.navigateTo({
      url: '/pages/redirect/redirect',
    })
  },
  handleClickShowSheet() {
    wx.showActionSheet({
      itemList: ['操作菜单选项1', '操作菜单选项2', '操作菜单选项3'],
      success({
        tapIndex
      }) {
        console.log('点击了索引' + tapIndex)
      }
    })
  },
  handleClickShowLoading() {
    wx.showLoading({
      title: '加载提示',
      mask: true, //  隐藏层. 防止用户在提示期间点击其他部分
      success() {
        setTimeout(() => {
          wx.hideLoading()
        }, 1000)
      }
    })
  },
  handleClickShowToast() {
    wx.showToast({
      title: '你好',
      icon: 'fail',
      mask: true
    })
  },
  handleClickShowModel() {
    wx.showModal({
      title: 'HELLO',
      content: '你好世界!',
      cancelText: "点我取消",
      cancelColor: '#f40',
      confirmText: '点我确认',
      confirmColor: '#368',
      success(res) {
        console.log(res)  //  res参数确定用户是点击取消还是确定...
        console.log('模态框成功回调')
      },
      fail() {
        wx.showToast({
          title: '模态框调用失败了!',
          icon: 'none'
        })
      }
    })
  }
})