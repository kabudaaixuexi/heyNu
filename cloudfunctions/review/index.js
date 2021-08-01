// 云函数入口文件
const cloud = require('wx-server-sdk')
// 待追评改成已追评状态
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let { orderid, reviewdate , review} = event
  db.collection('order_evaluate_list').where({
    orderid
  }).update({
    data:{
      status:'2',
      reviewdate,
      review
    }
  })
  .then(res=>{
    console.log(res)
  })
  .catch(console.error)
}