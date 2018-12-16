const express = require('express')
//  引入auth模块(微信服务器验证模块)
const auth = require('./wechat/auth')
//  引入 access_token 模块
const app = express()
//  引入 wechat 模块
const Wechat = require('./wechat/wechat')
//  引入 sha1模块
const sha1 = require('sha1')
//  配置模板资源目录
app.set('views', './views')
//  配置模板引擎
app.set('view engine', 'ejs')
//  创建实力对象
const wechatApi = new Wechat()
//  拿取config中的url
const {
  url,
  appid
} = require('./config')

//  页面路由
app.get('/search', async (req, res) => {
  /* 
    生成 js-sdk使用的签名
      1. 组合参与签名的四个参数: jsapi_ticket(临时票据)  noncestr(随机字符串)  timestamp(时间戳)   url(当前服务器地址)
      2. 进行字典序排序, 以&符号拼接在一起
      3. 进行sha1加密, 生成最终签名 signature
  */
  //  获取票据
  const {
    ticket
  } = await wechatApi.fetchTicket()

  //  获取随机字符串
  const noncestr = Math.random().substring(3)

  //  获取时间戳
  const timestamp = Date.now()

  //  组合参数,然字典排序,然格式为以&连接的字符串
  const arr = [
    `jsapi_ticket=${ticket}`,
    `noncestr=${noncestr}`,
    `timestamp=${timestamp}`,
    `url=${url}`
  ]
  const str = arr.sort().json('&')
  console.log(str)

  //  进行 sha1 加密,生成最终的结果
  const signature = sha1(str)

  //  渲染页面, 传递 signature, noncestr, timestamp
  res.render('search', {
    appid,
    signature,
    noncestr,
    timestamp
  })

})


//  接受处理微信服务器有效性的验证
app.use(auth())



app.listen(3000, () => console.log('服务器启动成功...访问3000端口'))