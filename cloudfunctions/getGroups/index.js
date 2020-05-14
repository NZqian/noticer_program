// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  try { 
      return await db.collection('Groups').where({
        admins: event['name'],
      }).get()
  } catch (e) {
    console.error(e)
  }
}