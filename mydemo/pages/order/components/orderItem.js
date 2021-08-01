// pages/order/components/orderItem.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    takemeal(){
      this.triggerEvent('takemeal',this.data.data.orderid)
    },
    pending(){
      this.triggerEvent('pending',this.data.data.orderid)
    }
  }
})
