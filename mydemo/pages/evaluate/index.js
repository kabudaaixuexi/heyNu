// mydemo/pages/evaluate/index.js
const app = getApp()
const { $Toast } = require('../../dist/base/index');
import { _getEvaluateList , _modifyReview , _delEvaluate} from '../../public/cloudFunc'
import {getAccurateDate} from '../../utils/util'
const store = require('../../store/index.js').default
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spinShow:false,
    review:'',//追评
    dialogShow:false,
    list:[],
    orderid:'',//当前追评
    currentid:'',//当前更多 - 删除
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.checkLogin()){
      this.setData({spinShow:true},()=>{
        this.getEvaluateList()
      })
    }else{
      $Toast({
        content: '请先登录',
        type: 'error'
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  // 追加评价
  inputChange: function(e){
    this.setData({review:e.detail.detail.value})
  },
  // 写追评
  writeReview: function(e){
    this.setData({dialogShow:true,orderid:e.currentTarget.dataset.orderid})
  },
  // 点击更多
  opClick: function(e){
    if(this.data.currentid == e.currentTarget.dataset.orderid){
      this.setData({currentid:''})
    }else{
      this.setData({currentid:e.currentTarget.dataset.orderid})
    }
  },
  // 删除评价
  delEvaluate: function(e){
    let orderid = e.currentTarget.dataset.orderid
    this.setData({spinShow:true,currentid:''})
    _delEvaluate({orderid},()=>{
      this.setData({ spinShow: false},()=>{
        $Toast({
          content: '删除评价成功',
          type: 'success'
        });
      })
      setTimeout(()=>{
        this.getEvaluateList()
      },600)
    })
  },
  // 弹窗empty
  emptyClick: function(){
    this.setData({dialogShow:false})
  },
  // 弹窗 - 提交
  commitClick: function(){
    if(!this.data.review){
      $Toast({
        content: '请输入追评',
        type: 'error'
      });
      return
    }
    this.setData({dialogShow:false,spinShow:true})
    let { orderid ,review} = this.data
    // 更新完成把该订单状态修改为已追评
    _modifyReview({orderid,review,reviewdate:getAccurateDate()},()=>{
      this.setData({ spinShow: false},()=>{
        $Toast({
        content: '追评成功',
        type: 'success'
      });
      })
      setTimeout(()=>{
        this.getEvaluateList()
      },600)
      console.log('修改评价订单状态结束 写追评 -> 已追评')
    })
  },

  // 获取我的评价列表
  getEvaluateList: function(){
    let self = this
    _getEvaluateList(store.getState().common.userInfo.userid,(res)=>{
      self.setData({
        spinShow:false,
        list:res.result.data
      })
      console.log('云函数调用成功 - get_evaluate_list')
    },(res)=>{
      self.setData({
        spinShow:false
      })
      $Toast({
        content: '云函数调用失败',
        type: 'error'
      });
      console.log('get_evaluate_list云函数调用失败'+res)
    })
  },

  //图片点击事件
 imgYu:function(event){
    var list = event.currentTarget.dataset.list;
    var src = list[0];
    //图片预览
    wx.previewImage({
    current: src, 
    urls: list 
    })
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