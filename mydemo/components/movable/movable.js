// components/movable/movable.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    msg:'start',
    flag:false,
    scale:1,
    x:170,
    y:600,
    backC:'rgb(24, 163, 11)',
    startTimer:null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 触发点击事件时执行的操作
    add(){
      this.setData({
        x:170,
        y:600
      })
    },
    longTap(){

    },
    touchMove(e){
      clearInterval(this.data.startTimer)
      var touchs = e.touches[0]; 
      var pageX = touchs.pageX; 
      var pageY = touchs.pageY; 
      console.log('pageX: ' + pageX) 
      console.log('pageY: ' + pageY) 
    },
    touchStart(e){
      clearInterval(this.data.startTimer)
      this.data.startTimer = setInterval(()=>{
        console.log('按下计时开始')
        if(this.data.scale<500){
          wx.vibrateShort()
          console.log(e)
          this.setData({
            scale:this.data.scale+0.1,
          })
        }else{
          console.log('清除计时器')
          clearInterval(this.data.startTimer)
        }
      },100)
    },
    touchEnd(){
      clearInterval(this.data.startTimer)
      this.setData({
        scale:1,
      })
    }
  }
})
