const express = require('express')
//  引入auth模块(微信服务器验证模块)
const auth = require('./wechat/auth')
//  引入 access_token 模块
// const accessToken = require('./wechat/accessToken')

const app = express()
//  配置模板资源目录
app.set('views', './views');
//  配置模板引擎
app.set('view engine', 'ejs');

//  页面路由
app.get('/search', (req, res) => {
  //  渲染页面, 返回给用户
  res.render('search');
})


//  接受处理微信服务器有效性的验证
app.use(auth())



app.listen(3000, () => console.log('服务器启动成功...访问3000端口'))