// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 生成订单号 时间(6)➕手机号后四位（4）➕随机数（4）
const D = `${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().length == 1
  ? '0' + (new Date().getMonth() + 1)
  : new Date().getMonth() + 1}${new Date().getDate().toString().length == 1
    ? '0' + new Date().getDate()
    : new Date().getDate()}`
const S = `${Math.round(Math.random()*(9999-1000))+1000}`
// 云函数入口函数
exports.main = async (event, context) => {
  const F = event.phone.substr(-4)  
  event.orderid = `${D.substr(-6)}${F}${S}`
  delete event.userInfo // 删除默认数据userInfo
  db.collection('order_list').add({
    data:event
  })
  .then(res=>{
    console.log(res)
  })
  .catch(console.error)
}