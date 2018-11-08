import { config } from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP {
  request ({url, data={}, method="GET"}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = "GET") {
    wx.request({
      url: `${config.api_base_url}${url}`,
      method,
      data,
      header: {
        appkey: config.appkey,
        contentType: 'application/json' 
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          this._show_error()
        }
      },
      fail: (err) => {
        reject()
        this._show_error()
      }
    })
  }

  _show_error(errCode) {
    if (!errCode) {
      errCode = 1
    }
    wx.showToast({
      title: tips[errCode],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}

