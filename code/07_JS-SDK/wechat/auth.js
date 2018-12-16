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
//  引入消 template 模块
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

    const sha1Str = sha1([timestamp, nonce, token].sort().join(''))

    if (req.method == 'GET') {
      if (sha1Str === signature) {
        console.log('消息来自微信服务器 ^_^ ')
        res.send(signature)
      } else {
        res.send('error消息不是来自微信服务1')
      }
    } else if (req.method == 'POST') {
      //  验证消息来自于微信服务器
      if (sha1Str !== signature) {
        res.send('error消息不是来自微信服务2')
      }
      //  消息来自微信服务器之后操作
      //  接收请求体重的数据, 流式数据
      const xmlData = await getUserDataAsync(req);
      //  我们接收到数据, 解析 xml 数据解释为 js 对象
      const jsData = await parseXMLAsync(xmlData)
      //  格式化数据
      const message = formatMessage(jsData)
      //  传递参数给 rely 模块, 最终返回 options(需要返回给用户信息所需参数) 
      const options = reply(message)
      //  传递要返回参数, 给 template 模板, 最终返回回复用户的消息
      let replyMessage = template(options)
      //  回复用户消息
      res.send(replyMessage);
    }
  }
}