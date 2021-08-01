// mydemo/pages/mine/index.js
const DB = wx.cloud.database()
import { newGuid } from "../../utils/util";
import { optionsModel } from './func'
import * as actions from '../../store/actions'
const store = require('../../store/index.js').default
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionsModel,
    userInfo:{},
    spinShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//     if (!wx.cloud) {
//       console.log(wx.cloud)
//     }
// // 获取用户信息
// wx.getSetting({
//   success: res => {
//     if (res.authSetting['scope.userInfo']) {
//       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//       wx.getUserInfo({
//         success: res => {
//           console.log(res)
//           return
//           this.setData({
//             avatarUrl: res.userInfo.avatarUrl,
//             userInfo: res.userInfo
//           })
//         }
//       })
//     }
//   }
// })

    this.setData({spinShow:true},()=>{
      this.getUserInfo()
    })
  },
  // 头部点击
  headerClick:function(){
    this.data.userInfo && wx.navigateTo({url:'/pages/userinfo/index'})
  },
  // 从数据库获取个人信息
  getUserInfo: function(){
    DB.collection('user_list').where({
      "phone":18736062107
    }).get()
    .then(res=>{
      $Toast({
        content: '自动登录成功',
        type: 'right'
      });
      this.setData({userInfo:res.data[0],spinShow: false})
      store.dispatch(actions.setUserInfo(res.data[0]))
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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