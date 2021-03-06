// components/navigation/navigation.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    rightconShow:{
      type:Boolean,
      value:false
    },
    showBack:{
      type:Boolean,
      value:true
    },
    bgColor:{
      type:String,
      value:'#fff'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    toggleAnimationData:{},
    whetherExpand:false,
    menuButtonObject:{}
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log(wx.getMenuButtonBoundingClientRect());
      this.setData({menuButtonObject:wx.getMenuButtonBoundingClientRect()})
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back(){
      wx.navigateBack()
    },
  }
})
