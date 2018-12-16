/* 第三方库使用 request request-promise-native */
const rp = require('request-promise-native')
//  引入配置文件
const {
  appid,
  appsecret
} = require('../config')
//  引入菜单
const menu = require('./menu')
//  引入地址api
const api = require('../utils/api')
//  引入工具函数库
const {
  readFileAsync,
  writeFileAsync
} = require('../utils/tools')


class Wechat {
  constructor() {}
  /**
   * 获取 access_token 
   * @memberof Wechat
   */
  getAccessToken() {
    //  定义请求地址
    const url = `${api.accessToken}&appid=${appid}&secret=${appsecret}`
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
    return writeFileAsync(accessToken, './accessToken.txt')
  }

  /**
   *  读取本地文件中的 access_token
   * @memberof Wechat
   */
  readAccessToken() {
    return readFileAsync('./accessToken.txt')
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
   *  获取 jsapi_ticket
   * @returns
   * @memberof Wechat
   */
  getTicket() {
    //  发送请求
    return new Promise(async (resolve, reject) => {
      //  获取 access_token
      const data = await this.fetchAccessToken()
      //  定义请求地址
      const url = `${api.ticket}&access_token=${data.access_token}`
      rp({
        method: 'GET',
        url,
        json: true
      }).then(res => {
        //  设置 access_token 过期时间
        res.expires_in = Date.now() + (res.expires_in - 300) * 1000
        //  将promise对象状态修改成成功状态
        resolve({
          ticket: res.ticket,
          expires_in: res.expires_in
        })
      }).catch(err => {
        reject('getTicket方法出了问题: ' + err)
      })
    })
  }

  /**
   *  保存 jsapi_ticket
   * @memberof Wechat
   */
  saveTicket(ticket) {
    return writeFileAsync(ticket, './ticket.txt')
  }

  /**
   *  读取 jsapi_ticket 
   * @memberof Wechat
   */
  readTicket() {
    return readFileAsync('./ticket.txt')
  }

  /**
   *  读取 jsapi_ticket
   * @param {*} data
   * @memberof Wechat
   */
  isValidTicket(data) {
    //  检查传入参数是否有效
    if (!data && !data.ticket && !data.expires_in) {
      //  ticket 无效
      return false
    }
    return data.expires_in > Date.now()
  }

  /**
   *  获取一个没有过期的 jsapi_ticket 凭证
   * @memberof Wechat
   */
  fetchTicket() {
    //  作缓存进行优化
    if (this.ticket && this.ticket_expires_in && this.isValidTicket(this)) {
      //  说明之前保存过 accessToken.txt 并且他是有效的, 直接可以使用
      return Promise.resolve({
        ticket: this.ticket,
        expires_in: this.ticket_expires_in
      })
    }

    return this.readTicket()
      .then(async res => {
        //  本地存在文件, 判断是否过期
        if (this.isValidTicket(res)) {
          //  有效
          return Promise.resolve(res)
        } else {
          //  无效, 从新获取, 保存ticket
          const res = await this.getTicket()
          await this.saveTicket(res)
          //  返回最新结果
          return Promise.resolve(res)
        }
      })
      .catch(async err => {
        //  本地没有ticket文件, 发送请求重新请求 ticket
        const res = await this.getTicket()
        //  保存ticket
        await this.saveTicket(res)
        //  返回 ticket
        return Promise.resolve(res)
      })
      .then(res => {
        //  将 ticket 挂载到this上
        this.ticket = res.ticket
        this.ticket_expires_in = res.expires_in
        console.log(this)
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
        const url = `${api.menu.create}access_token=${data.access_token}`
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
        const data = await this.fetchAccessToken();
        const url = `${api.menu.delete}access_token=${data.access_token}`
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

/* (async () => {
  let w = new Wechat()
  //  删除之前定义的菜单
  // await w.deleteMenu()
  //  创建新的菜单
  w.fetchAccessToken()
  await w.createMenu(menu)
  await w.fetchTicket()
})() */

module.exports = Wechat