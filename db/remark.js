//用户登录数据表
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const remarkSchema = new Schema({
  text:{
    type:String,
    require:true,
  },
  date:{
    type:Number,
    default:Date.now
  },
  likes: [
    {type:Schema.Types.ObjectId}
  ],
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:'user'
  },
  childRemark: [
    
  ]
})




module.exports = mongoose.model('remark',remarkSchema)