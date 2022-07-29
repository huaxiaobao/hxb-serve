const express = require('express')
const router = express.Router()
const userDB = require('db/user')
const { usernameValid } = require('utils/validator')

/* 修改用户名 */
router.post('/', async (req, res) => {
  console.log('进来了');
  const userInfo = req.session.userInfo
  const { username } = req.body
  const nameReg = usernameValid(username)
  if (!nameReg) {
    res.send({
      code: 402,
      Msg: '用户名格式不正确！',
      data:null
    })
    return
  }
  //验证新旧用户名是否相同
  if (username === userInfo.username) {
    res.send({
      code: 400,
      Msg: '小主，新旧用户名不能相同哦！',
      data:null
    })
    return
  }

  //验证数据库存不存在
  const data = await userDB.findOne({ username })
  if (data) {
    res.send({
      code: 400,
      Msg: '小主，已经有人再用这个了，你再换一个吧！',
      data:null
    })
    return
  }

  await userDB.findByIdAndUpdate(userInfo.id, { username })
  req.session.userInfo.username = username
  res.send({
    code: 200,
    Msg: '小主，用户名修改成功了！',
    data:username
  })

})


module.exports  = router