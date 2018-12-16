/* 
  工具函数包
*/
const {
  parseString
} = require('xml2js')

const {
  writeFile,
  readFile
} = require('fs')

module.exports = {
  getUserDataAsync(req) {
    return new Promise((resolve, reject) => {
      let xmlData = '';
      req
        .on('data', data => {
          //  当流失数据传递过来的时候, 会触发当前事件, 会将数据注入到回调函数中
          // console.log(data)
          xmlData += data.toString()
        })
        .on('end', () => {
          //  数据接收完毕, 触发
          resolve(xmlData)
        })
    })
  },
  parseXMLAsync(xmlData) {
    return new Promise((resolve, reject) => {
      parseString(xmlData, {
        trim: true
      }, (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject('parseXMLAsync方法出了问题: ' + err)
        }
      })
    })
  },
  formatMessage(jsData) {
    let message = {};
    //  获取 xml 对象
    jsData = jsData.xml
    //  判断数据是否是一个对象
    if (typeof jsData == 'object') {
      //  遍历对象
      for (const key in jsData) {
        let value = jsData[key];
        //  过滤空数据
        if (Array.isArray(value) && value.length > 0) {
          message[key] = value[0]
        }
      }
    }
    //  将格式化后数据返回出去
    return message;
  },
  //  读取文件
  writeFileAsync(data, fileName) {
    data = JSON.stringify(data)
    return new Promise((resolve, reject) => {
      writeFile(fileName, data, err => {
        if (!err) {
          resolve('文件保存成功!');
        } else {
          reject(err)
        }
      })
    })
  },
  //  拿文件
  readFileAsync(fileName) {
    return new Promise((resolve, reject) => {
      readFile(fileName, (err, data) => {
        if (!err) {
          data = JSON.parse(data)
          resolve(data);
        } else {
          reject(err)
        }
      })
    })
  }
}