// components/my-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bcolor: {
      type: String,
      value: 'transparent'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    lists: [{
      "text": '这是一个item1'
    }, {
      "text": '这是一个 item2'
    }, {
      "text": "这是一个item3"
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      // console.log(e)
      const myEventDetail = {} //	detail 对象, 提供给事件监听函数
      myEventDetail.target = e.target
      this.triggerEvent('myevent', myEventDetail)
    }
  }
})