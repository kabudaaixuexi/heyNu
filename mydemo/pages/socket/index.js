// pages/socket/socket.js
const io  = require('./socket')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    socketTask:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(io)
    // this.createSocketTask()
  },
  //  创建socketTask
  createSocketTask() {
    let socketTask = wx.connectSocket({
      url: 'ws://www.dishanapp.cn:7080/DIM/sdws/dimsd',
      // header:{
      //   uid: getApp().globalData.msaUserInfo.id,
      //   phone: getApp().globalData.msaUserInfo.phone,
      //   name: encodeURI(getApp().globalData.msaUserInfo.realname),
      //   ts,
      //   token: hex_md5(ts+key).toUpperCase()
      // },
      success() {
        console.log('socket connect successful')
      },
      fail(){
        wx.showToast({
          title: '通讯连接失败',
          icon:'none'
        })
      }
    })
    socketTask.onOpen(res => {
      console.log(res)
      console.log('socketTask has open')
      this.setData({
        socketTask
      })
      // this.initRender()
      this.setListener(socketTask)
      this.setErrorListener(socketTask)
    })
    socketTask.onError(err=>{
      console.log(err)
    })
  },
  //  监听数据
  setListener(socketTask) {
    socketTask.onMessage((data) => {
      console.log(data)
      // let obj = JSON.parse(data.data);
      // if (obj.type == R_msg) {
      //   this.renderReport(obj)
      // } else if(obj.type==C_msg) {
      //   this.renderChat(obj)
      // } else if (obj.type == P_enter){
      //     this.data.clientObj.client_list.push(obj)
      //     this.data.clientObj.current++
      //     this.setData({
      //       clientObj:this.data.clientObj
      //     })
      // }else if(obj.type==P_leave){
      //   let index;
      //   this.data.clientObj.client_list.forEach((ele,i)=>{
      //     if(ele.id==obj.id){
      //       index=i
      //     }
      //   })
      //   if(index){
      //     this.data.clientObj.client_list.splice(index,1)
      //   }
      //   this.data.clientObj.current--
      //   this.setData({
      //     clientObj: this.data.clientObj
      //   })
      // }
      // else{
      //   this.initUi(obj)
      // }
    })
  },
  // 发送数据
  send:function(){
      this.checkFail();
      let _this = this
      console.log(_this.data.socketTask)
      _this.data.socketTask.send({
        data: JSON.stringify({
          aa:'aa',
          bb:'bb',
          cc:'cc'
        }),
        success() {
          console.log('发送成功')
          // _this.setData({
          //   sendMessage: ''
          // })
        },
        fail() {
          wx.showToast({
            title: '消息发送失败，请重试',
            icon: 'none',
          })
        },
        complete() {
          // _this.setData({
          //   loading: false
          // })
          
        }
      })
  },
  // 设置错误
  setErrorListener(socketTask) {
    socketTask.onError(() => {
      wx.showToast({
        title: '实时连接错误',
        icon: 'none'
      })
    })
  },
  // 通讯校验
  checkFail() {
    try {
      let readyState = this.data.socketTask.readyState;
      if(readyState!=1){
        this.createSocketTask()
      }
    } catch (e) {
      if(this.data.socketTask!=null){
        wx.showToast({
          title: '通讯重连失败',
          icon: 'none'
        })
      }
    }
  },
})