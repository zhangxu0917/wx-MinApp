const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false
  },

  methods: {
    setMoreData (dataArray) {
      let tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      }) 
    },

    getCurrentStart () {
      return this.data.dataArray.length
    },

    hasMore () {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    setTotal (total) {
      this.setData({
        total
      })

      if (total === 0) {
        this.setData({
          noneResult: true
        })
      }
    },

    initialize () {
      this.setData({
        total: null,
        dataArray: [],
        noneResult: false,
        loading: false
      })
    },

    isLocked() {
      return this.data.loading
    },

    locked() {
      this.setData({
        loading: true
      })
    },

    unlocked() {
      this.setData({
        loading: false
      })
    }
  }
})

export {
  paginationBev
}