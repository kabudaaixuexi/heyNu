// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let { orderid} = event
  db.collection('order_evaluate_list').where({
    orderid
  }).remove()
  .then(res=>{
    console.log(res)
  })
  .catch(console.error)
}