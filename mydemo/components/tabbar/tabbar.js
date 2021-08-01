// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbatIndex:{
      type:String,
      value:'0'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    navHeight:148,
    urls: [
      '/pages/home/index',
      '/pages/order/index',
      '/pages/mine/index',
      '/pages/record/index',
    ]
  },
  attached() {
    var self = this
    wx.getSystemInfo({
      success(res) {
          self.setData({
            navHeight: 154
          })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTap: function (e) {
      let self = this
      let index = e.currentTarget.dataset.index;
      let urls = self.data.urls
      wx.switchTab({
        url: urls[index],
      })

    }
  }
})