/* 验证服务器有效性 */
//  引入sha1模块
const sha1 = require('sha1')
//  引入 config
const config = require('../config')

module.exports = () => {
  return (req, res, next) => {
    //  接收服务发送来的数据
    const {
      signature,
      echostr,
      timestamp,
      nonce
    } = req.query
    //  获取我们的配置数据
    const {
      token
    } = config

    //  1. 将参与微信加密签名的三个参数(timestamp, nonce, token)按照字典序排序并组合在一起进行一个数组
    const arr = [timestamp, nonce, token]
    arr.sort()
    //  2. 将数组里所有参数拼接成一个字符串, 进行sha1加密
    const str = arr.join('')
    const sha1Str = sha1(str)
    //  3. 加密完成就生成了一个 signatrue, 和微信发送过来的进行对比确定是否有效
    if (sha1Str === signature) {
      //  如果一样, 说明消息来子微信服务器
      console.log('验证成功, 组成的字符串是: ' + sha1Str)
    } else {
      console.log('error')
    }
  }
}