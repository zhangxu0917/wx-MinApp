import {HTTP} from '../utils/http.js'

class ClassicModel extends HTTP {
  getLatest(sCallBack) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        sCallBack(res)
        this._setLatestIndex(res.data.index)
        let key = this._getKey(res.data.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  getClassic(index, nextOrPrevious, sCallBack) {
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `/classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.data.index), res)
          sCallBack(res)
        }
      })
    } else {
      sCallBack(classic)
    }
  }

  getMyFavor (success) {
    const params = {
      url: '/classic/favor',
      success
    }
    this.request(params)
  }

  isFirst (index) {
    return index === 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return index == latestIndex ? true : false
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index) 
  }

  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }

  _getKey (index) {
    let key = 'classic-' + index
    return key
  }
}

export {
  ClassicModel
}