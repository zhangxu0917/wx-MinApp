// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'
import {paginationBev} from '../behaviors/pagination.js' 

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [paginationBev],

  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    word: '',
    loading: false,
    loadingCenter: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel (env) {
      this.triggerEvent('cancel', {})
      this.initialize()
    },

    onDelete (env) {
      this._closeResult()
      this.initialize()
    },

    onConfirm (env) {
      this._showResult()
      this.initialize()

      const word = env.detail.value || env.detail.text
      this._showLoadingCenter()
      bookModel.search(0, word).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          word
        })
        keywordModel.addToHistory(word) 
        this._hideLoadingCenter()   
      })
    },

    loadMore () {
      if (!this.data.word) {
        return 
      }

      if (this.isLocked()) {
        return
      }

      if (this.data.searching && this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.word).then(res => {
          this.setMoreData(res.books)
          this.unlocked()
        }, () => {
          this.unlocked()
        })
      }
    },

    _showLoadingCenter () {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter () {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult () {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        word: ''
      })
    }
  },

  attached () {
    let historyWords = keywordModel.getHistory()
    let hotWordsPromise = keywordModel.getHot()

    this.setData({
      historyWords
    })

    hotWordsPromise.then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  }
})
