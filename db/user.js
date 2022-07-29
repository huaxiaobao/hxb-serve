//用户登录数据表
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username:{
    type:String,
    require:true,
  },
  password:{
    type:String,
    require:true
  },
  picture:{
    type:String,
    default:'/file/photo/default.jpg'
  }
})




module.exports = mongoose.model('user',userSchema)