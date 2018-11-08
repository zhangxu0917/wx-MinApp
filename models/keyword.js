import { HTTP } from '../utils/http-p.js'

export class KeywordModel extends HTTP {
  constructor () {
    super()
    this.key = 'q'
    this.maxLength = 10
  }

  getHistory () {
    let words = wx.getStorageSync(this.key)
    if (!words) {
      return []
    }
    return words
  }

  getHot () {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  
  addToHistory (keyword) {
    let words = this.getHistory()

    if (!words.includes(keyword)) {
      let length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}