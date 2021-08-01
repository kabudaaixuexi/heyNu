/**
 *  云函数针对于批量操作数据和修改数据状态
 * 
 */
export function _modifyTakemeal(orderid,complete,fail){
  wx.cloud.callFunction({
    name: 'takemeal',
    data: {
      orderid
    },
    success: res => {
      complete()
    },
    fail: err => {
      fail()
      console.error('[云函数] [takemeal] 调用失败', err)
    }
  })
}

export function _modifyEvaluate(orderid,complete,fail){
  wx.cloud.callFunction({
    name: 'evaluate',
    data: {
      orderid
    },
    success: res => {
      complete()
    },
    fail: err => {
      fail()
      console.error('[云函数] [evaluate] 调用失败', err)
    }
  })
}

export function _modifyReview(obj,complete,fail){ // 追评
  let {orderid,reviewdate,review} = obj
  wx.cloud.callFunction({
    name: 'review',
    data: {
      orderid,
      reviewdate,
      review
    },
    success: res => {
      complete()
    },
    fail: err => {
      fail()
      console.error('[云函数] [review] 调用失败', err)
    }
  })
}

export function _setOrderEvaluate(data = {},complete,fail){
  wx.cloud.callFunction({
    name: 'set_order_evaluate',
    data,
    success: res => {
      complete()
    },
    fail: err => {
      fail()
      console.error('[云函数] [set_order_evaluate] 调用失败', err)
    }
  })
}

export function _delEvaluate(data,complete,fail){ // 删除评价
  wx.cloud.callFunction({
    name: 'del_order_evaluate',
    data,
    success: res => {
      complete()
    },
    fail: err => {
      fail()
      console.error('[云函数] [del_order_evaluate] 调用失败', err)
    }
  })
}

export function _getOrderList(userid,complete,fail){
  wx.cloud.callFunction({
    name:'get_order_list',
    data:{
      userid
    },
    success(res){
      complete(res)
    },
    fail(res){
      fail(res)
    }
  })
}

export function _getEvaluateList(userid,complete,fail){
  wx.cloud.callFunction({
    name:'get_evaluate_list',
    data:{
      userid
    },
    success(res){
      complete(res)
    },
    fail(res){
      fail(res)
    }
  })
}