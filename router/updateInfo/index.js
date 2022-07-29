const express = require('express')
const router = express.Router()


//鉴权 未登录的用户不能进行信息的修改
router.use((req, res, next) => {
  if (!req.session.userInfo&& !req.session.userInfo?.id) {
     res.send({
      code: 808,
      Msg: '小主，你还没有登录，不能修改信息！',
      data:null
    })
    return
  }

  next()
})


router.use('/updateUserName',require('./updateUserName')) //修改用户名
router.use('/editPass', require('./editPass'))  //修改密码
router.use('/updateAvatar',require('./Avatar'))
module.exports  = router