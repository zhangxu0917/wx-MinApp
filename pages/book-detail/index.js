// pages/book-detail/index.js
import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'

const likeModel = new LikeModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    likeCount: 0,
    likeStatus: false,
    posting: false
  },

  onLike(ev) {
    let behavior = ev.detail.behavior
    likeModel.like(behavior, this.data.book.id, 400)
  },

  onFakePost (env) {
    this.setData({
      posting: true
    })
  },

  onCancel(env) {
    this.setData({
      posting: false
    })
  },

  onPost (env) {
    const comment = env.detail.text || env.detail.value

    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多为12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
    })

    this.data.comments.unshift({
      content: comment,
      nums: 1
    })

    this.setData({
      comments: this.data.comments,
      posting: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()

    const bid = options.bid

    let detailPromise = bookModel.getDetail(bid)
    let commentsPromise = bookModel.getComments(bid)
    let likeStatusPromise = bookModel.getLikeStatus(bid)

    Promise.all([detailPromise, commentsPromise, likeStatusPromise]).then(res => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})