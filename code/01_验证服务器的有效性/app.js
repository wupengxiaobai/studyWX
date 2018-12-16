const express = require('express')
//  引入sha1模块
const sha1 = require('sha1')
const app = express()

//  验证服务器有效性

/* 
  1. 微信服务器知道开发者服务器是哪个
    - 在测试号管理页面上填写 url 开发者服务器地址
      + 使用 ngrok 将本地端口开启的服务映射到外网
        ngrok http 3000

    - 填写 token
      + 参与微信签名加密的一个参数


  2. 开发者服务器 - 验证消息是否来自微信服务器
    目的: 计算得出 signature 微信加密签名, 和微信传递来的 signature进行对比, 
        如果一样说明消息来自微信服务器, 如果不一样说明不是来自微信服务器
    1). 将参与微信加密签名的三个参数(timestamp, nonce, token) 组合在一起, 按照字典序排序
    2). 将数组中的所有参数拼接成一个字符串, 进行是sha1加密
    3). 加密完成就生成了一个signatrue 和 微信发送来的进行对比
      - 如果一样. 说明消息来自微信服务器, 返回 echostr 给微信服务器
      - 如果不一样, 说明不是微信服务器发送的消息, 返回 error
*/

//  配置对象
const config = {
  appid: '1e32efd11f410398ac77d0869b086999',
  appsecret: 'wxad4f19c52925d10a',
  token: 'aiyayawodemaya111'
}



app.use((req, res, next) => {
  //  微信服务器提交的参数
  // console.log(req.query)
  /* { signature: 'b350c0b1a1115495b1b62e82c19d53e2b33bf18d',
  echostr: '6076881149151854534',
  timestamp: '1544860868',
  nonce: '1531996364' } */
  //  微信服务器发送的参数
  const {
    signature,
    echostr,
    timestamp,
    nonce
  } = req.query

  //  我们配置的参数
  const {
    token
  } = config


  //  1. 将参与微信加密签名的三个参数(timestamp, nonce, token)按照字典序排序并组合在一起进行一个数组
  const arr = [timestamp, nonce, token]
  const arrSort = arr.sort()
  // console.log(arrSort)
  //  2. 将数组里所有参数拼接成一个字符串, 进行sha1加密
  const str = arr.join('')
  // console.log(str)
  const sha1Str = sha1(str)
  // console.log(sha1Str)
  //  3. 加密完成就生成了一个 signatrue, 和微信发送过来的进行对比确定是否有效
  if (sha1Str === signature) {
    //  如果一样, 说明消息来子微信服务器
    console.log('验证成功')
  } else {
    //  不一样, 说明不是微信服务器发送的消息, 返回err
    console.log(err)
  }

})


app.listen(3000, () => console.log('服务器启动成功...访问3000端口'))