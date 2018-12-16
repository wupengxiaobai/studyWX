/* 
  获取 access_token: 
    是什么? 微信调用接口全局唯一凭证***

    特点:
      1. 唯一性
      2. 有效期为2小时(我们提前五分钟请求)
      3. 接口权限 每天最多2000次

    https请求方式: GET
      https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

        grant_type	  是	获取access_token 填写 client_credential
        appid	        是	第三方用户唯一凭证
        secret	      是	第三方用户唯一凭证密钥，即appsecret
    返回值: 
    {"access_token":"ACCESS_TOKEN","expires_in":7200}



  设计思路: 
    1. 首次本地没有, 发送请求获取 access_token. 保存下来(本地文件)
    2. 第二次及以后:
      - 先去本地读取文件, 判断是否过期
          + 过期了
            + 重新请求获取 access_token, 保存下来覆盖原来的文件(保证文件是唯一的)
          + 没有过期
            + 直接使用

  整理思路: 
    读取本地文件(readAccessToken)
      - 本地有文件
        + 判断是否过期(isValidAccessToken)
            + 过期了
              + 重新请求获取 access_token(getAccessToken), 保存下来覆盖原来的文件(保证文件是唯一的)(saveAccessToken)
            + 没有过期
              + 直接使用
      - 本地没有文件
        + 发送请求获取 access_token(getAccessToken). 保存下来(本地文件)(saveAccessToken), 直接使用
        
*/


/* 第三方库使用 request request-promise-native */
const rp = require('request-promise-native')

//  引入 fs
const fs = require('fs')

//  引入配置文件
const {
  appid,
  appsecret
} = require('../config')


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
    if (!accessToken && accessToken.access_token && !accessToken.expires_in) {
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
          resolve(res)
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



  /* fetchAccessToken() {
    return new Promise((resolve, reject) => {
      this.readAccessToken()
        .then(res => {
          //  本地存在文件, 判断是否过期
          if (this.isValidAccessToken(res)) {
            //  有效
            resolve(res)
          } else {
            //  无效
            this.getAccessToken()
              .then(res => {
                //  保存accessToken, 返回 accessToken 是否过期(boolean)
                this.saveAccessToken(res).then(() => {
                  resolve(res)
                })
              })
          }
        }).catch(err => {
          //  本地没有文件, 发送请求重新请求 accessToken
          this.getAccessToken()
            .then(res => {
              //  保存accessToken, 返回 accessToken 是否过期(boolean)
              this.saveAccessToken(res).then(() => {
                resolve(res)
              })
            }).catch(err => {
              reject(err)
            })
        })
    }).then(res => {
      console.log(res)
    })
  } */
}

//  模拟测试
const w = new Wechat()
w.fetchAccessToken()