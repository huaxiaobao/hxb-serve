const express = require('express')
const router = express.Router()
const userDB = require('db/user')
const {  passValid} = require('utils/validator')
/* 登录 */
router.post('/', async (req, res) => {
  const { username, password, newPassword } = req.body
  
  //验证数据格式
  const passReg = passValid(password)
  const newReg = passValid(newPassword)
  if (!passReg) {
    return res.send({
      code: 400,
      success:false,
      Msg:'原密码不正确!',
      data:null
    })
  }
  if (!newReg) {
    res.send({
      code: 400,
      success:false,
      Msg:'新密码数据格式不正确!',
      data:null
    })
  }

  //验证账号和密码是否正确
  const hasUser = await userDB.findOne({ username, password })

  if (!hasUser) {
    res.send({
      code: 400,
      success:false,
      Msg:'原密码不正确!',
      data:null
    })
  }

  //查找对应的数据表格 更新密码
  const editData = await userDB.update({ username, password }, { $set: { password: newPassword } })
  if (editData.acknowledged) {
    res.send({
      code: 200,
      success: true,
      Msg: '密码修改成功！',
      data:null
    })
  } else {
    res.send({
      code: 401,
      success: false,
      Msg: '密码修改失败！',
      data:null
    })
  }

  //修改对应的表单数据

  //返回前台结果信息
})


module.exports  = router