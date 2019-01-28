/* 验证服务器有效性 */
//  引入sha1模块
const sha1 = require('sha1')
//  引入 config
const config = require('../config')
//  引入工具函数中的方法
const {
  getUserDataAsync,
  parseXMLAsync,
  formatMessage
} = require('../utils/tools')
//  引入消息回复模板模块
const template = require('./template')
//  引入 reply 模块
const reply = require('./reply')

module.exports = () => {
  return async (req, res, next) => {
    const {
      signature,
      echostr,
      timestamp,
      nonce
    } = req.query
    const {
      token
    } = config

    //  1. 将参与微信加密签名的三个参数(timestamp, nonce, token)按照字典序排序并组合在一起进行一个数组, 进行sha1排序, 之后和微信发送过来的进行对比确定是否消息是否来自微信服务器
    const sha1Str = sha1([timestamp, nonce, token].sort().join(''))
    /* 
      微信服务器会发送两种类型的消息给开发者服务器
        1. GET 请求
          - 验证服务器有效性
        2. POST 请求
          - 微信服务器的数据以post请求的方式转发到开发者服务器上
    */
    console.log(req.method)
    if (req.method == 'GET') {
      if (sha1Str === signature) {
        //  如果一样, 说明消息来子微信服务器
        console.log('消息来自微信服务器 ^_^ ')
        res.send(signature)
      } else {
        res.send('error消息不是来自微信服务1')
      }
    } else if (req.method == 'POST') {
      //  验证消息来自于微信服务器
      if (sha1Str !== signature) {
        //  消息不是来自微信服务
        res.send('error消息不是来自微信服务2')
      }
      //  消息来自微信服务器之后操作
      //  如果开发者服务器没有返回响应给服务器, 微信服务器会发送三次请求过来
      // console.log(req.query)

      //  接收请求体重的数据, 流式数据
      const xmlData = await getUserDataAsync(req);
      // console.log(xmlData)

      /* 
        <xml>
          <URL><![CDATA[https://bf45d8ae.ngrok.io]]></URL>
          <ToUserName><![CDATA[gh_9657753d11f8]]></ToUserName><FromUserName>
          <![CDATA[oHZ5B5jBncGNrHmX-2_8TOHfU8C4]]></FromUserName>
          <CreateTime>11111122</CreateTime><MsgType><![CDATA[text]]></MsgType>
          <Content><![CDATA[111]]></Content>
          <MsgId>1234567890123456</MsgId>
        </xml>
      */

      //  我们接收到数据, 解析 xml 数据解释为 js 对象
      const jsData = await parseXMLAsync(xmlData)
      // console.log(jsData);
      /* 
        { xml:
         { URL: [Array],
           ToUserName: [Array],
           FromUserName: [Array],
           CreateTime: [Array],
           MsgType: [Array],
           Content: [Array],
           MsgId: [Array] 
          } 
        }
      */

      //  格式化数据
      const message = formatMessage(jsData)
      console.log(message)
      /* 
      { URL: 'https://bf45d8ae.ngrok.io',
        ToUserName: 'gh_9657753d11f8',
        FromUserName: 'oHZ5B5jBncGNrHmX-2_8TOHfU8C4',
        CreateTime: '11111122',
        MsgType: 'text',
        Content: '11111阿萨德',
        MsgId: '1234567890123456' 
      }
      */

      //  简单的自动回复, 只回复文本内容

      /* 
        一旦遇到以下情况，微信都会在公众号会话中，向用户下发系统提示“该公众号暂时无法提供服务，请稍后再试”：
          1 开发者在5秒内未回复任何内容 2、开发者回复了异常数据，比如JSON数据等
          2 开发者回复了异常数据, 比如JSON数据, 字符串, xml数据中有多余的空格***
      */

      /* let options = {
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
      } */

      const options = reply(message)

      //  最终回复用户的消息
      let replyMessage = template(options)
      console.log(replyMessage)

      res.send(replyMessage);
    }
  }
}