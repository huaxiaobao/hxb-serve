const express = require('express')
const router = express.Router()
const userDB = require('db/user')

/* 登录 */
router.post('/', async (req, res) => {
  const {username,password} = req.body
    //验证用户是否存在
  const hasUser = await userDB.findOne({ username })
  if(!hasUser){
    return res.send({
      code: 405,
      success:false,
      Msg:'用户名不存在，请先进行注册！',
      data:null
    })
  } else {
    const checkedUser = await userDB.findOne({ username, password })
    if (!checkedUser) {
      return  res.send({
        code:201,
        Msg:'用户名或密码不正确，请重新输入！',
        data: null,
        success:false
      })
    }
    //登录成功
    let userInfo = {
      username: checkedUser.username,
      id: checkedUser._id,
      avatar:checkedUser.picture
    }

    //存储session 的 用户信息
    req.session.userInfo = userInfo
    return res.send({
      code: 200,
      success:true,
      Msg:'登录成功！',
      data:userInfo
    })
  }


})

/* 登录状态检测 */
router.post('/loginStatus', (req, res) => {
  const data = req.session.userInfo
  if (data) {
    res.send({
      code: 800,
      Msg: '已登录!',
      data
    })
  } else {
    res.send({
      code: 808,
      Msg: '用户未登录！',
      data:null
    })
  }
})

/* 退出登录 */
router.post('/loginOut', (req, res) => {
  req.session.destroy()
  res.send({
    code: 803,
    Msg: '退出登录成功！',
    data:null
  })
})
module.exports  = router