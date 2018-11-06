// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  
  properties: {
    src: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: "images/player@pause.png",
    playSrc: "images/player@play.png",
    playing: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay (env) {
      this.setData({
        playing: !this.data.playing
      })

      if (this.data.playing) {
        mMgr.src = this.properties.src
      } else {
        mMgr.pause()
      }
    },

    _recoverStatus () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      
      if (mMgr.src === this.properties.src) {
        this.setData({
          playing: true
        })
        return
      }
    },

    _monitorSwitch () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })

      mMgr.onPause(() => {
        this._recoverStatus()
      })

      mMgr.onStop(() => {
        this._recoverStatus()
      })

      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  },

  attached (env) {
    this._recoverStatus()
    this._monitorSwitch()
  }
})
