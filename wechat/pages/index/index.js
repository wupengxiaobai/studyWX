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
    let updateManager = wx.getUpdateManager()
    // 查看是否有新版本
    updateManager.onCheckForUpdate((res) => {
      console.log(res)
    })
    //  有新版本则自动触发
    updateManager.onUpdateReady(() => {
      wx.showModel({
        title: '更新提示',
        content: '新版本已准备哈, 是否重启',
        success(res) {
          if (res.confirm) {
            //  强制小程序重启使用新版
            updateManager.applyUpdate()
          }
        }
      })
    })
    //  更新失败回调
    updateManager.onUpdateFailed(function() {
      console.log('更新失败')
    })

  },

})