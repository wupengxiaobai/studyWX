const express = require('express')
//  引入auth模块(微信服务器验证模块)
const auth = require('./wechat/auth')

const app = express()

//  接受处理微信服务器有效性的验证
app.use(auth())


app.listen(3000, () => console.log('服务器启动成功...访问3000端口'))