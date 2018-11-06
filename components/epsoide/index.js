// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      observer: function(newVal, oldVal, changedPath) {
        let newValString = newVal + ''
        let val = newVal < 10 ? newValString.padStart(2, '0') : newVal + ''
        this.setData({
          _index: val
        })
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    _index: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  attached () {
    let month = new Date().getMonth()
    this.setData({
      year: new Date().getFullYear(),
      month: this.data.month[month]
    })
  }
})
