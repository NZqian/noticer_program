// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var Group
  let _id = event['_id']
  let name = event['name']
  console.log(_id)
  console.log(name)
  try{
    var val 
    await db.collection('Groups').doc(_id).get().then(res=>{
      console.log(res.data)
      val = res
      if(res.data.admins.indexOf(name) == -1){//不在admins中
        db.collection('Groups').doc(_id).update({
          data:{
            admins: _.push(name) 
          },success: function (res) {
            console.log(res.data)
          }
        })
      }
    })
    return val
  } catch (e) {
    console.error(e)
  }
  
}