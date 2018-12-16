/* 第三方库使用 request request-promise-native */
const rp = require('request-promise-native')
//  引入 fs
const fs = require('fs')
//  引入配置文件
const {
  appid,
  appsecret
} = require('../config')
//  引入菜单
const menu = require('./menu')

class Wechat {
  constructor() {}
  /**
   * 获取 access_token 
   * @memberof Wechat
   */
  getAccessToken() {
    //  定义请求地址
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`
    //  发送请求
    return new Promise((resolve, reject) => {
      rp({
        method: 'GET',
        url,
        json: true
      }).then(res => {
        // console.log(res)
        //  设置 access_token 过期时间
        res.expires_in = Date.now() + (res.expires_in - 300) * 1000
        //  将promise对象状态修改成成功状态
        resolve(res)
      }).catch(err => {
        // console.log(err)
        reject('getAccessToke方法出了问题: ' + err)
      })
    })
  }

  /**
   *  保存 access_token
   * @param accessToken 要保存的凭据
   * @memberof Wechat
   */
  saveAccessToken(accessToken) {
    //  将对象转化为json字符串
    accessToken = JSON.stringify(accessToken)
    //  将 access_token 保存一个文件
    return new Promise((resolve, reject) => {
      fs.writeFile('./accessToken.txt', accessToken, err => {
        if (!err) {
          // console.log('文件保存成功!');
          resolve('文件保存成功!');
        } else {
          // console.log('保存文件失败')
          reject('saveAccessToken方法出了问题: ' + err)
        }
      })
    })
  }

  /**
   *  读取本地文件中的 access_token
   * @memberof Wechat
   */
  readAccessToken() {
    return new Promise((resolve, reject) => {
      fs.readFile('./accessToken.txt', (err, data) => {
        if (!err) {
          // console.log('文件读取成功!')
          data = JSON.parse(data)
          resolve(data);
        } else {
          reject('readAccessToken方法出了问题: ' + err)
        }
      })
    })
  }

  /**
   *  检查 access_token 是否有效
   * @param accessToken 
   * @memberof Wechat
   */
  isValidAccessToken(accessToken) {
    //  检查传入参数是否有效
    if (!accessToken && !accessToken.access_token && !accessToken.expires_in) {
      //  access_token 无效
      return false
    }

    //  检查access_token是否在有效期内
    /* if (accessToken.expires_in < Date.now()) {
      //  过期
      return false
    } else {
      //  未过期
      return true
    } */
    return accessToken.expires_in > Date.now()
  }

  /**
   *  拿取没有过期的 accessToken 
   * @memberof Wechat
   */
  fetchAccessToken() {
    //  作缓存进行优化
    if (this.access_token && this.expires_in && this.isValidAccessToken(this)) {
      //  说明之前保存过 accessToken.txt 并且他是有效的, 直接可以使用
      return Promise.resolve({
        access_token: this.access_token,
        expires_in: this.expires_in
      })
    }

    return this.readAccessToken()
      .then(async res => {
        //  本地存在文件, 判断是否过期
        if (this.isValidAccessToken(res)) {
          //  有效
          return Promise.resolve(res)
          // resolve(res)
        } else {
          //  无效
          const res = await this.getAccessToken()
          //  保存accessToken, 返回 accessToken 是否过期(boolean)
          await this.saveAccessToken(res)
          //  将请求过来的 accessToken 返回出去
          return Promise.resolve(res)
          // resolve(res)
        }
      })
      .catch(async err => {
        //  本地没有文件, 发送请求重新请求 accessToken
        const res = await this.getAccessToken()
        //  保存accessToken, 返回 accessToken 是否过期(boolean)
        await this.saveAccessToken(res)
        //  将请求过来的 accessToken 返回出去
        return Promise.resolve(res)
        // resolve(res)
      })
      .then(res => {
        //  将 accessToken 挂载到this上
        this.access_token = res.access_token
        this.expires_in = res.expires_in
        //  返回 res 包装一层 promise 对象(此对象为成功状态)
        //  this.readAccessToken() 最终的返回值
        return Promise.resolve(res)
      })
  }


  /**
   *  创建自定义菜单
   * @param {*} menu 自定义菜单对象
   * @memberof Wechat
   */
  createMenu(menu) {
    return new Promise(async (resolve, reject) => {
      //  获取 accessToken
      try {
        const data = await this.fetchAccessToken()
        //  定义请求地址
        //  http请求方式：POST（请使用https协议） https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
        const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${data.access_token}`
        //  发送请求
        const result = await rp({
          method: 'POST',
          url,
          json: true,
          body: menu
        })
        resolve(result);
      } catch (e) {
        reject('createMenu方法出了问题: ' + e)
      }
    })
  }

  /**
   *  删除自定义菜单
   * @returns
   * @memberof Wechat
   */
  deleteMenu() {
    return new Promise(async (resolve, reject) => {
      try {
        /* 
          http请求方式：GET
            https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=ACCESS_TOKEN
        */
        const data = await this.fetchAccessToken();
        const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${data.access_token}`
        const result = await rp({
          method: 'GET',
          url,
          json: true
        })
        resolve(result)
      } catch (e) {
        reject('deleteMenu方法出了问题: ' + e)
      }
    })
  }

}

(async () => {
  let w = new Wechat()
  //  删除之前定义的菜单
  let result = await w.deleteMenu()
  console.log(result)
  console.log('______________________________')
  //  创建新的菜单
  result = await w.createMenu(menu)
  console.log(result)
})()