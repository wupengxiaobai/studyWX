Page({

  /**
   * 页面的初始数据
   */
  data: {
    myuuid: '',
    initLanya: '',
    selfLangyaStatus: '',
    unselfLanya: '',
    bluetoothDevices: [],
    lanyaDeviceId: '', //  链接蓝牙传递蓝牙uuid数据
    uuidSR: '', //  链接结果
    stopBDD: '',
    lanyaUuid: [], // 蓝牙服务
    lanyaUuid1: '',
    characteristics: [], //  蓝牙所有特征值
    writeServicweId: "", // 可写服务uuid
    writeCharacteristicsId: "", //可写特征值uuid
    readServicweId: "", // 可读服务uuid
    readCharacteristicsId: "", //可读特征值uuid
    notifyServicweId: "", //通知服务UUid
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
              'lanyaDeviceId': item.deviceId
            })
          } else {
            _this.setData({
              'lanyaDeviceId': "AF0D0432-907C-B001-894B-E74B6032812D"
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
      deviceId: _this.data.lanyaDeviceId ? _this.data.lanyaDeviceId : "AF0D0432-907C-B001-894B-E74B6032812D",
      success: function(res) {
        console.log('调用链接蓝牙成功', res)
        _this.setData({
          'uuidSR': res.errMsg
        })
        //  连接成功， 关闭搜索
        _this.stopBluetoothDevicesDiscovery()
      },
      fail: function(res) {
        console.log('调用链接蓝牙失败', res)
        _this.setData({
          'uuidSR': res.errMsg
        })
      },
      complete: function(res) {
        console.log('蓝牙链接结果打印', res)
        //  链接成功/失败停止搜索周边蓝牙
        // _this.stopBluetoothDevicesDiscovery()
      }
    })
  },
  //  6.停止搜索周边蓝牙设备
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
  },
  //  7.获取蓝牙所有服务
  getBLEDeviceServices() {
    var _this = this;
    wx.getBLEDeviceServices({
      deviceId: _this.data.lanyaDeviceId ? _this.data.lanyaDeviceId : "AF0D0432-907C-B001-894B-E74B6032812D",
      success(res) {
        console.log('当前连接的蓝牙： ', res.deviceId, '该蓝牙的所有服务: ', res.services)
        _this.setData({
          'lanyaUuid': res.services,
          'lanyaUuid1': res.services[0].uuid
        })
      }
    })
  },
  //  8.获取蓝牙服务所有特征值
  getBLEDeviceCharacteristics() {
    let _this = this
    _this.data.lanyaUuid.forEach((item) => {
      wx.getBLEDeviceCharacteristics({
        deviceId: _this.data.lanyaDeviceId, //  蓝牙设备id,
        serviceId: item.uuid, //  蓝牙服务id
        success(res) {
          _this.setData({
            'characteristics': JSON.stringify(res.characteristics)
          })
          //  循环确定读取使用
          res.characteristics.forEach(item => {
            console.log(item.uuid + '服务的特征值:' + JSON.stringify(item.properties))
            console.log('特征值：' + item.uuid)
            if (item.properties.notify) {
              console.log("获取开启notify的ServicweId：", _this.data.lanyaDeviceId);
              console.log("获取开启notify的CharacteristicsId：", item.uuid);
              _this.setData({
                notifyServicweId: _this.data.lanyaDeviceId,
                notifyCharacteristicsId: item.uuid,

              })
            }
            if (item.properties.write) {
              console.log("获取开启write的ServicweId：", _this.data.lanyaDeviceId);
              console.log("获取开启write的CharacteristicsId：", item.uuid);
              _this.setData({
                writeServicweId: _this.data.lanyaDeviceId,
                writeCharacteristicsId: item.uuid,
              })
            } else if (item.properties.read) {
              console.log("读read操作readServicweId：", _this.data.lanyaDeviceId);
              console.log("读read操作：readCharacteristicsId", item.uuid);
              _this.setData({
                readServicweId: _this.data.lanyaDeviceId,
                readCharacteristicsId: item.uuid,
              })
            }
          })
        },
        fail(err) {
          console.log('获取特征值失败', err)
          if (err.errCode === 10006) {
            wx.showToast({
              title: '已断开连接',
              icon: 'none'
            })
          } else if (err.errCode === 10004) {
            wx.showToast({
              title: '未找到指定服务',
              icon: 'none'
            })
          }
        }
      })
    })


  },

  //  ..断开蓝牙链接
  closeBLEConnection() {
    const _this = this
    wx.closeBLEConnection({
      deviceId: _this.data.lanyaDeviceId,
      success(res) {
        console.log('断开蓝牙链接', res)
      }
    })
  },

  //  监听低耗蓝牙链接状态
  onBLEConnectionStateChange(){
    const _this = this
    wx.onBLEConnectionStateChange((res)=>{
      console.log(res)
    })
  },

  //  分包发送数据
  datasubpck(datahex) {
    var arrayObj = new Array();
    for (var i = 0; i < datahex.length; i += 40) {
      // 预加 最大包长度，如果依然小于总数据长度，可以取最大包数据大小
      if ((i + 40) < datahex.length) {
        arrayObj.push(datahex.substring(i, i + 40))

      } else {
        arrayObj.push(datahex.substring(i))
      }
    }
    return arrayObj;
  }

})