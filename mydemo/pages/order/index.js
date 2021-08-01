//index.js
const app = getApp()
const { $Toast } = require('../../dist/base/index');
import { _modifyTakemeal , _getOrderList} from '../../public/cloudFunc'
const store = require('../../store/index.js').default
Page({
  data: {
    list:[],
    spinShow:false,
  },

  onLoad: function() {
    
  },
  onShow: function() {
    console.log(app.checkLogin())
    if(app.checkLogin()){
      this.setData({spinShow:true},()=>{
        this.getOrderList()
      })
    }else{
      $Toast({
        content: '请先登录',
        type: 'error'
      });
    }
  },
  getOrderList(){
    let self = this
    _getOrderList(store.getState().common.userInfo.userid,(res)=>{
      self.setData({
        spinShow:false,
        list:res.result.data
      })
      console.log('云函数调用成功 - get_order_list')
    },(res)=>{
      self.setData({
        spinShow:false
      })
      $Toast({
        content: '云函数调用失败',
        type: 'error'
      });
      console.log('get_order_list云函数调用失败'+res)
    })
  },
  // 取餐 - 修改订单状态 
  takemeal: function(payload){
    this.setData({spinShow:true}) || _modifyTakemeal(payload.detail,()=>{
      $Toast({
        content: '云函数取餐成功',
        type: 'success'
      });
      setTimeout(()=>{
        this.getOrderList()
      },1000)
    })
  },
  // 评价 
  pending: function(payload){ 
    wx.navigateTo({
      url: `/pages/pending/index?orderid=${payload.detail}`,
    })
  },
  

})
