// pages/lanyademo/lanyademo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "",
    msg1: "",
    status: "",
    sousuo: "",
    connectedDeviceId: "", //已连接设备uuid
    services: "", // 连接设备的服务
    characteristics: "", // 连接设备的状态值
    writeServicweId: "", // 可写服务uuid
    writeCharacteristicsId: "", //可写特征值uuid
    readServicweId: "", // 可读服务uuid
    readCharacteristicsId: "", //可读特征值uuid
    notifyServicweId: "", //通知服务UUid
    notifyCharacteristicsId: "", //通知特征值UUID
    inputValue: "",
    characteristics1: "", // 连接设备的状态值
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter()
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  //   初始化蓝牙适配器
  lanya1() {
    let _this = this;
    wx.openBluetoothAdapter({
      success: function(res) {
        console.log('蓝牙初始化成功!')
        _this.setData({
          'msg': JSON.stringify(res)
        })
        //  监听蓝牙适配器状态
        wx.onBluetoothAdapterStateChange(function(res) {
          _this.setData({
            'sousuo': res.discovering ? '在搜索' : '未搜索',
            'status': res.available ? '可用' : '不可用'
          })
        })
      },
    })
  },

  //  本机蓝牙适配状态
  lanya2() {
    let _this = this;
    wx.getBluetoothAdapterState({
      success: function(res) {
        console.log('本机蓝牙适配!')
        _this.setData({
          msg: "本机蓝牙适配器状态" + "/" + JSON.stringify(res.errMsg),
          sousuo: res.discovering ? "在搜索。" : "未搜索。",
          status: res.available ? "可用。" : "不可用。"
        })
        //  监听本机蓝牙适配状态
        wx.onBluetoothAdapterStateChange(function(res) {
          _this.setData({
            sousuo: res.discovering ? "在搜索。" : "未搜索。",
            status: res.available ? "可用。" : "不可用。",
          })
        })
      },
    })
  },

  //  搜索周边蓝牙设备
  lanya3() {
    let _this = this;
    wx.startBluetoothDevicesDiscovery({
      success: function(res) {
        _this.setData({
          msg: "搜索设备" + JSON.stringify(res),
        })
        //监听蓝牙适配器状态
        wx.onBluetoothAdapterStateChange(function(res) {
          _this.setData({
            sousuo: res.discovering ? "在搜索。" : "未搜索。",
            status: res.available ? "可用。" : "不可用。",
          })
        })
      }
    })
  },

  // 获取所有已发现的设备
  lanya4() {
    let _this = this;
    wx.getBluetoothDevices({
      success: function(res) {
        //是否有已连接设备
        wx.getConnectedBluetoothDevices({
          success: function(res) {
            console.log('已连接设备？', JSON.stringify(res.devices));
            _this.setData({
              connectedDeviceId: res.deviceId
            })
          }
        })
        console.log('获取所有已发现的设备', res)
        _this.setData({
          msg: "搜索设备" + JSON.stringify(res.devices),
          devices: res.devices,
        })
        //监听蓝牙适配器状态
        wx.onBluetoothAdapterStateChange(function(res) {
          _this.setData({
            sousuo: res.discovering ? "在搜索。" : "未搜索。",
            status: res.available ? "可用。" : "不可用。",
          })
        })
      }
    })
  },

  //  停止搜索周边设备
  lanya5() {
    let _this = this;
    wx.stopBluetoothDevicesDiscovery({
      success: function(res) {
        _this.setData({
          msg: "停止搜索周边设备" + "/" + JSON.stringify(res.errMsg),
          sousuo: res.discovering ? "在搜索。" : "未搜索。",
          status: res.available ? "可用。" : "不可用。",
        })
      }
    })
  },

  //连接设备
  connectTO: function(e) {
    var _this = this;
    wx.createBLEConnection({
      deviceId: e.currentTarget.id,
      success: function(res) {
        console.log(res.errMsg);
        _this.setData({
          connectedDeviceId: e.currentTarget.id,
          msg: "已连接" + e.currentTarget.id,
          msg1: "",
        })
      },
      fail: function() {
        console.log("调用失败");
      },
      complete: function() {
        console.log("调用结束");
      }

    })
    console.log(_this.data.connectedDeviceId);
  },

  //  获取连接设备的服务  
  lanya6() {
    let _this = this;
    wx.getBLEDeviceServices({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: that.data.connectedDeviceId,
      success: function (res) {
        console.log('device services:', JSON.stringify(res.services));
        that.setData({
          services: res.services,
          msg: JSON.stringify(res.services),
        })
      }
    })
  },
  lanya7() {
    let _this = this;
  },
  lanya8() {
    let _this = this;
  },
  lanya9() {
    let _this = this;
  },
  lanya10() {
    let _this = this;
  }
})