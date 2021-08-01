// mydemo/pages/index/index.js
const app = getApp() //18736062107 祥虹路18号三楼互隆科技  多放辣椒
const { $Message } = require('../../dist/base/index');
const { $Toast } = require('../../dist/base/index');
import * as actions from '../../store/actions'
const store = require('../../store/index.js').default
import {createTimestamp,getAccurateDate} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:null,
    remark:null,
    tip:null,
    totalprice:null,
    list:[],
    alradd:false,
    spinShow:true,
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(store.getState().common)
    if(store.getState().common.foodCar){
      this.setData({alradd:true,list:store.getState().common.foodCar.foodList,totalprice:store.getState().common.foodCar.totalPrice})
    }else{
      this.setData({alradd:false})
    }

    setTimeout(()=>{
      this.setData({spinShow:false})
    },1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onGetOpenid()
  },
  // remark_icon
  remarkClick: function(){
    // wx.navigateTo({
    //   url: '/pages/position/index',
    // })
    const self = this
    wx.chooseLocation({
      success: function (res) {    
        console.log(res.name);    
        self.setData({remark:res.name})
        //选择地点之后返回到原来页面
        // wx.switchTab({
        //   url: "/pages/home/index"
        // });
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },
  // phone输入框
  phoneInput: function(e){
    this.setData({phone:e.detail.detail.value})
  },
  // 地址输入框
  remarkInput: function(e){
    this.setData({remark:e.detail.detail.value})
  },
  // 备注输入框
  tipInput: function(e){
    this.setData({tip:e.detail.detail.value})
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  // 添加商品
  shopClick: function(){
    wx.navigateTo({
      url: '/pages/food/index',
    })
  },
  // 提交订单
  submitClick: function(){
    if(!app.checkLogin()){
      $Toast({
        content: '请先登录',
        type: 'error'
      });
      return
    }
    let isNull = false
    if(!this.data.phone){
      isNull = '手机号' 
    }
    if(!isNull && !this.data.remark){
      isNull = '地址信息'
    }
    if(isNull){
      $Message({
        content: `您还未输入${isNull}`,
        type: 'error'
      });
      return
    }
    if(!this.data.tip){
      $Message({
          content: '未输入订单备注',
          type: 'warning'
      });
    }
    let { phone , remark , tip , totalprice , list} = this.data
    this.setOrderList({
      phone,
      remark,
      status:'2',
      tip,
      totalprice,
      detail:list,
      orderdate:getAccurateDate(),
      timestamp:createTimestamp(),
      userid:store.getState().common.userInfo.userid,
    })
  },
  setOrderList(data){
    let self = this
    self.setData({spinShow:true}) || wx.cloud.callFunction({
      name:'set_order_list',
      data, // {phone,remark,status,tip,totalprice,detail,orderdate,timestamp,userid}
      success(res){
        self.setData({
          spinShow:false
        })
        $Toast({
          content: '云函数新增订单成功',
          type: 'success'
        });
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/order/index',
          })
        },1000)
      },
      fail(res){
        self.setData({
          spinShow:false
        })
        $Toast({
          content: '云函数调用失败',
          type: 'error'
        });
        console.log('set_order_list云函数调用失败'+res)
      }
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