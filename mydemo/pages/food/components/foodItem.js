// pages/food/components/foodItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cnt:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange({ detail = {} }) {
        this.setData({
          cnt: detail.value
        })
      },
  }
})
