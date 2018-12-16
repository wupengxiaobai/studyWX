/* 
  处理用户发送的消息类型和内容, 决定返回不同的内容给用户
*/
module.exports = (message) => {
  let options = {
    toUserName: message.FromUserName,
    fromUserName: message.ToUserName,
    createTime: Date.now(),
    msgType: 'text',
  }
  let content = '您在说什么, 我听不懂!'
  //  判断用户发送的消息是否是文本消息
  if (message.MsgType === 'text') {
    //  判断用户发送消息的内容具体是什么
    if (message.Content === '1') {
      content = '大吉大利, 今晚吃鸡!'
    } else if (message.Content === '2') {
      content = '落地成盒'
    } else if (message.Content.match('爱')) {
      content = '爱~'
    }
  } else if (message.MsgType === 'image') {
    options.msgType = 'image'
    options.mediaId = message.MediaId
    // console.log(message.PicUrl)
  } else if (message.MsgType === 'voice') {
    options.msgType = 'voice'
    options.mediaId = message.MediaId
    //  开启语音识别后, 接受语音翻译后的文字如下
    // console.log(message.Recognition)
  } else if (message.MsgType === 'location') { //  接受地理位置消息
    content = `纬度:${message.Location_X} 经度:${message.Location_Y} 缩放大小: ${message.Scale} 位置信息 ${message.Label}`
  } else if (message.MsgType === 'event') { //  接受事件处理
    if (message.Event === 'subscribe') {
      content = `欢迎您的关注`;
      if (message.EventKey) {
        //  用户扫描了带参数二维码关注事件
        content = `用户扫描了带参数二维码关注事件`
      }
    } else if (message.Event === 'unsubscribe') {
      //  用户取消订阅事件
      console.log('无情取消关注 T_T')
    } else if (message.Event === 'SCAN') {
      //  用户取消订阅事件
      console.log('用户已经关注, 再扫描带参数的二维码关注事件')
    } else if (message.Event === 'LOCATION') {
      content = `纬度:${message.Latitude} 经度:${message.Longitude} 精度 ${message.Precision}`
    } else if (message.Event === 'CLICK') {
      content = `您点击了菜单按钮${message.EventKey}`
    }
  }

  options.content = content;
  return options;
}