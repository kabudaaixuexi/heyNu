// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const $ = db.command.aggregate
  const orderid = db
    .collection('order_list')
    .aggregate()
    .sort({
      orderid: 1
    })
    .group({
      _id: null,
      max: $.last('$orderid')
    })
    .end()
    
    return orderid
}