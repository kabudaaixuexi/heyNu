// mydemo/pages/food/index.js
const app = getApp()
const { $Toast } = require('../../dist/base/index');
const { $Message } = require('../../dist/base/index');
import * as actions from '../../store/actions'
const store = require('../../store/index.js').default
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    loading:false,
    buttonVal:'选完了',
    modelShow:false,
    currentList:[],
    totalPrice:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
 /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getFoodList()
  },
  shopClick(){
    if(this.data.loading){return}
    this.setData({loading:true,buttonVal:'正在生成预订单',totalPrice:0})
    const temArr = []
    this.data.list.map((i)=>{
      // 如果选择的商品数大于0
      if(this.selectComponent(`#food${i.fid}`).data.cnt>0){
        // 计算总价
        this.setData({
          totalPrice:this.data.totalPrice+= this.selectComponent(`#food${i.fid}`).data.cnt*this.selectComponent(`#food${i.fid}`).data.data.price
        })
        // 加入实时订单
        temArr.push({
          fid:this.selectComponent(`#food${i.fid}`).data.data.fid,
          cnt:this.selectComponent(`#food${i.fid}`).data.cnt,
          imgurl:this.selectComponent(`#food${i.fid}`).data.data.imgurl,
          label:this.selectComponent(`#food${i.fid}`).data.data.label,
          name:this.selectComponent(`#food${i.fid}`).data.data.fname,
          price:this.selectComponent(`#food${i.fid}`).data.data.price
        })
      }
    })
    // 总价格式化
    this.setData({currentList:temArr,totalPrice:this.data.totalPrice.toFixed(2)})
    
    if(this.data.currentList.length>0){
      this.setData({modelShow:true})
    }else{
      $Message({
          content: '您还未选择任何商品',
          type: 'warning'
      });
    }
    this.setData({loading:false,buttonVal:'选完了'})
  },
  getFoodList(){
    let self = this
    self.setData({spinShow:true}) || wx.cloud.callFunction({
      name:'get_food_list',
      success(res){
        self.setData({
          spinShow:false,
          list:res.result.data
        })
      },
      fail(res){
        $Toast({
          content: '云函数调用失败',
          type: 'error'
        });
        console.log('get_food_list云函数调用失败'+res)
      }
    })
  },
  // 取消
  cancel: function(){
    this.setData({modelShow:false,buttonVal:'选完了'})
  },
  // 下单
  comfire: function(){
    store.dispatch(actions.setFoodCar({
      foodList:this.data.currentList,
      totalPrice:this.data.totalPrice
    }))
    this.setData({modelShow:false})
    wx.navigateBack()
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