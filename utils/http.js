import { config } from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP {
  request(params) {
    let method = params.method || 'get'
    wx.request({
      url: `${config.api_base_url}${params.url}`,
      method,
      data: params.data,
      header: {
        appkey: config.appkey,
        contentType: 'application/json' 
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res)
        } else {
          this._show_error()
        }
      },
      fail: (err) => {
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

