/* 
  自定义菜单

*/

module.exports = {
  "button": [{
      "type": "click",
      "name": "你敢点",
      "key": "click"
    },
    {
      "name": "菜单",
      "sub_button": [{
          "type": "view",
          "name": "百度",
          "url": "http://www.baidu.com/"
        },
        {
          "type": "click",
          "name": "赞一下我们",
          "key": "V1001_GOOD"
        }
      ]
    }
  ]
}