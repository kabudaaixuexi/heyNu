// 云函数入口文件
const cloud = require('wx-server-sdk')
// 已取餐状态改成已评价状态
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const orderid = event.orderid
  db.collection('order_list').where({
    orderid
  }).update({
    data:{
      status:'3'
    }
  })
  .then(res=>{
    console.log(res)
  })
  .catch(console.error)
}