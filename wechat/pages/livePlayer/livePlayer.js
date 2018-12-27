// Page({
//   onReady(res) {
//     this.ctx = wx.createLivePlayerContext('player')
//   },
//   statechange(e) {
//     console.log('live-player code:', e.detail.code)
//   },
//   error(e) {
//     console.error('live-player error:', e.detail.errMsg)
//   },
//   bindPlay() {
//     this.ctx.play({
//       success: res => {
//         console.log('play success')
//       },
//       fail: res => {
//         console.log('play fail')
//       }
//     })
//   },
//   bindPause() {
//     this.ctx.pause({
//       success: res => {
//         console.log('pause success')
//       },
//       fail: res => {
//         console.log('pause fail')
//       }
//     })
//   },
//   bindStop() {
//     this.ctx.stop({
//       success: res => {
//         console.log('stop success')
//       },
//       fail: res => {
//         console.log('stop fail')
//       }
//     })
//   },
//   bindResume() {
//     this.ctx.resume({
//       success: res => {
//         console.log('resume success')
//       },
//       fail: res => {
//         console.log('resume fail')
//       }
//     })
//   },
//   bindMute() {
//     this.ctx.mute({
//       success: res => {
//         console.log('mute success')
//       },
//       fail: res => {
//         console.log('mute fail')
//       }
//     })
//   }
// })
// Page({
//   statechange(e) {
//     console.log('live-pusher code:', e.detail.code)
//   }
// })

Page({
  onReady(res) {
    this.ctx = wx.createLivePusherContext('pusher')
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },
  bindStart() {
    this.ctx.start({
      success: res => {
        console.log('start success')
      },
      fail: res => {
        console.log('start fail')
      }
    })
  },
  bindPause() {
    this.ctx.pause({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  },
  bindStop() {
    this.ctx.stop({
      success: res => {
        console.log('stop success')
      },
      fail: res => {
        console.log('stop fail')
      }
    })
  },
  bindResume() {
    this.ctx.resume({
      success: res => {
        console.log('resume success')
      },
      fail: res => {
        console.log('resume fail')
      }
    })
  },
  bindSwitchCamera() {
    this.ctx.switchCamera({
      success: res => {
        console.log('switchCamera success')
      },
      fail: res => {
        console.log('switchCamera fail')
      }
    })
  }
})