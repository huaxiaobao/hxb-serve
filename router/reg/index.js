const express = require('express')
const router = express.Router()
const userDB = require('db/user')
const { usernameValid ,passValid} = require('utils/validator')
//路由
router.post('/',async(req,res)=>{
  console.log('注册程序')
  const {username,password} = req.body

  /* 验证数据格式是否规范 */
  const usernameReg =usernameValid(username)
  const passReg = passValid(password)

  if(!usernameReg || !passReg){
    return  res.send({
      code:400,
      Msg:'用户数据格式不正确,请重新填写！'
    })
  }

  //验证用户时候存在
  let hasUser = await userDB.findOne({username})

  if(!hasUser){
          //不存在，存储至数据库
  await userDB.create({username,password})

  res.send({
    code:200,
    Msg: '注册成功'
  })

  }else{
    res.send({
      code:201,
      Msg:'用户名已存在',
      data:hasUser
    })
  }
})

module.exports  = router