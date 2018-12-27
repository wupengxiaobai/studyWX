Page({
  data: {
    src: ''
  },
  takePhoto() {
    const cxt = wx.createCameraContext()
    cxt.takePhoto({
      success:(res)=>{
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  }
})