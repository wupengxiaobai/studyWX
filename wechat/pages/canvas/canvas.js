Page({
  data: {
    x: 0,
    y: 0,
    hidden: true
  },
  start(e) {
    this.setData({
      hidden: false,
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  move(e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  end(e) {
    this.setData({
      hidden: true
    })
  },
  onLoad() {
    //  第二个canvas绘制
    this.SecondCanvas()
  },
  SecondCanvas() {
    // const ctx = wx.createCanvasContext('myCanvas')
    // const grd = ctx.createLinearGradient(0, 0, 200, 0)
    // grd.addColorStop(0, 'red')
    // grd.addColorStop(1, 'white')
    // ctx.setFillStyle(grd)
    // ctx.fillRect(10, 10, 190, 54)
    // ctx.draw()

    const ctx = wx.createCanvasContext('myCanvas')
    const grd = ctx.createCircularGradient(75, 50, 50)
    grd.addColorStop(0, 'red')
    grd.addColorStop(1, 'white')

    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(10, 10, 150, 80)
    ctx.draw()
  },
  canvasIdErrorCallback(e) {
    console.error(e.detail.errMsg)
  },
  onReady(e) {
    // 使用 wx.createContext 获取绘图上下文 context
    const context = wx.createCanvasContext('firstCanvas')

    context.setStrokeStyle('#00ff00')
    context.setLineWidth(5)
    context.rect(0, 0, 200, 200)
    context.stroke()
    context.setStrokeStyle('#ff0000')
    context.setLineWidth(2)
    context.moveTo(160, 100)
    context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    context.moveTo(140, 100)
    context.arc(100, 100, 40, 0, Math.PI, false)
    context.moveTo(85, 80)
    context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    context.moveTo(125, 80)
    context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    context.stroke()
    context.draw()
  }
})