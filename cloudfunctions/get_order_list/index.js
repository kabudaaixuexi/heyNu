// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  const arr = cloud.database().collection('order_list').where({
    userid:event.userid
  }).get()

  return arr
}