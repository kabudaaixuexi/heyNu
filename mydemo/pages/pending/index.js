// mydemo/pages/pending/index.js
const { $Message } = require('../../dist/base/index');
const { $Toast } = require('../../dist/base/index');
const DB = wx.cloud.database()
import { _setOrderEvaluate , _modifyEvaluate} from '../../public/cloudFunc'
import {createTimestamp,getAccurateDate} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodlist:[],
    orderid: '',
    score: 6,
    evaluate: '',
    pics: [],
    evaluateimgurl:[],
    spinShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    options.orderid && this.setData({ orderid:options.orderid },()=>{
      this.getOrderPending()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  // 通过orderid获取订单商品列表
  getOrderPending(){
    this.setData({ spinShow: true })
    DB.collection('order_list').where({
      orderid:this.data.orderid
    }).get()
    .then(res=>{
      this.setData({foodlist:res.data[0].detail,userid:res.data[0].userid,spinShow: false})
    })
  },
  // 输入评价
  inputChange: function(e){
    this.setData({evaluate:e.detail.detail.value})
  },
  // 打分
  starChange: function (e) {
    const index = e.detail.index;
    this.setData({
      score: index
    })
  },
  // 点击图片上传
  upShopLogo: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageShop('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImageShop('camera')
          }
        }
      }
    })
  },
  //删除上传的某一张图片
  delupimg(e) {
    console.log(e)
    var that = this
    var uploaderList = that.data.pics;//原数据
    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        uploaderList.splice(i, 1);
      }
    }
    that.setData({
      pics: uploaderList
    })
    console.log(that.data.pics)
  },
  // 选择本地图片
  chooseWxImageShop: function (type) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        //本地展示
        that.setData({
          pics: res.tempFilePaths
        })
      }
    })
  },
  // 上传图片
  doUpload: function () {
    let promiseArr = [];
    let evaluateimg = []
    this.data.pics.map((item, index) => {
      promiseArr.push(new Promise((reslove) => {
        let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
        wx.cloud.uploadFile({
          cloudPath: `evaluate/${this.data.orderid}/${new Date().getTime()}${suffix}`,// 上传至云端的路径
          filePath: item, // 小程序临时文件路径
          success: res => {
            evaluateimg.push(res.fileID)
            reslove();
          },
          fail: res => {
            this.setData({ spinShow: false })
            console.log(item + '上传失败')
          }
        })

      }))
    })
    this.setData({evaluateimgurl:evaluateimg})
    Promise.all(promiseArr).then(res => {//全部图片都上传完
      this.setOrderEvaluate()
    })
  },
  // 点击立即评价
  shopClick: function () {
    if (!this.data.evaluate) {
      $Message({
        content: `请为此订单做出评价吧～`,
        type: 'error'
      });
      return
    }
    this.setData({ spinShow: true })
    if (this.data.pics.length <= 0) {
      this.setOrderEvaluate()
    }else{
      this.doUpload()
    }
  },
  // 向集合里插入这条评价
  setOrderEvaluate(){
    let {orderid,foodlist,userid,evaluate,score,evaluateimgurl} = this.data
    _setOrderEvaluate({
      orderid,
      score,
      evaluate,
      evaluateimgurl,
      foodlist,
      userid,
      review:'',
      reviewdate:'',
      status:'1',
      evaluatedate:getAccurateDate(),
    },()=>{
      // 插入完成把该订单状态修改为已完成
      _modifyEvaluate(orderid,()=>{
        this.setData({ spinShow: false })
        $Toast({
          content: '感谢评价～',
          type: 'success'
        });
        console.log('修改订单状态结束 待评价 -> 已完成')
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/order/index',
          })
        },1000)
      })
    },()=>{this.setData({ spinShow: false })})
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