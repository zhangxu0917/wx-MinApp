// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false
  },

  onLike(ev) {
    let behavior = ev.detail.behavior
    likeModel.like(behavior, this.data.classicData.data.id, this.data.classicData.data.type)
  },

  onPrevious() {
    this._updateClassic('previous')
  },

  onNext () {
    this._updateClassic('next')
  },

  _updateClassic(nextOrPrevious) {
    let index = this.data.classicData.data.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.data.id, res.data.type)
      this.setData({
        classicData: res,
        first: classicModel.isFirst(res.data.index),
        latest: classicModel.isLatest(res.data.index)
      })
    })
  },
  
  _getLikeStatus (artId, category) {
    likeModel.getClassicLikeStatus(artId, category, (res) => {
      this.setData({
        likeStatus: res.data.like_status,
        likeCount: res.data.fav_nums
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classicData: res,
        likeStatus: res.data.like_status,
        likeCount: res.data.fav_nums
      })
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