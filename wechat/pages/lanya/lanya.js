Page({

  /**
   * 页面的初始数据
   */
  data: {
    initLanya: '',
    selfLangyaStatus: '',
    unselfLanya: '',
    bluetoothDevices: [],
    uuId: '', //  链接蓝牙传递蓝牙uuid数据
    uuidSR: '', //  链接结果
    stopBDD: ''
  },
  onShow: function(options) {},
  //  1初始化设备适配
  openBluetoothAdapter() {
    let _this = this;
    wx.openBluetoothAdapter({
      success(res) {
        console.log('初始化蓝牙适配器成功返回', res)
        _this.setData({
          'initLanya': res.errMsg
        })
      },
      fail(res) {
        console.log('初始化蓝牙式排气失败返回')
        _this.setData({
          'initLanya': res.errMsg
        })
      }
    })
  },
  //  2获取本机蓝牙适配器状态
  getBluetoothAdapterState() {
    let _this = this;
    wx.getBluetoothAdapterState({
      success(res) {
        console.log('是否正在搜索设备', res.discovering)
        console.log('蓝牙适配器是否可用', res.available)
        _this.setData({
          'selfLangyaStatus': res.available
        })
      },
      fail(res) {
        console.log(res)
        _this.setData({
          'selfLangyaStatus': res.available
        })
      },
      complete(res) {
        console.log(res)
      }
    })
  },
  //  3搜索周边蓝牙
  startBluetoothDevicesDiscovery() {
    let _this = this;
    wx.startBluetoothDevicesDiscovery({
      // services: ['FEE7'], //  要搜索蓝牙设备主 service 的 uuid 列表, 用于过滤其他不需要接收的广播蓝牙
      success(res) {
        console.log('搜索设备: ', res)
        _this.setData({
          'unselfLanya': res
        })
      },
      complete(res) {
        console.log(res)
      }
    })
  },
  //  4获取蓝牙模块生效前所有已发现的蓝牙设备,包括已经连接
  getBluetoothDevices() {
    let _this = this;
    wx.getBluetoothDevices({
      success(res) {
        console.log('获取周边设备成功: ', res)
        _this.setData({
          'bluetoothDevices': res.devices
        })
        res.devices.forEach((item) => {
          if (item.localName === '* ANGUMEN *') {
            _this.setData({
              'uuId': item.deviceId
            })
          }
        })
      },
      complete(res) {
        console.log('获取搜索结果', res)
      }
    })
  },
  //  5连接低耗能蓝牙
  createBLEConnection() {
    let _this = this;
    wx.createBLEConnection({
      deviceId: this.data.uuId,
      success: function(res) {
        console.log('调用链接蓝牙成功', res)
        _this.setData({
          'uuidSR': res.errMsg
        })
        //  链接成功停止搜索周边蓝牙
        stopBluetoothDevicesDiscovery()
      },
      complete: function(res) {
        console.log('蓝牙链接结果打印', res)
      }
    })
  },
  //  6停止
  stopBluetoothDevicesDiscovery() {
    let _this = this;
    wx.stopBluetoothDevicesDiscovery({
      success: function(res) {
        console.log('停止蓝牙搜索调用成功', res)
        _this.setData({
          'stopBDD': res.errMsg
        })
      },
      complete: function(res) {
        console.log('停止蓝牙搜索打印结果: ', res)
      }
    })
  }
})