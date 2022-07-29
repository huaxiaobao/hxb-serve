const express = require('express')
const router = express.Router()
const remarkDB = require('db/remark')

//鉴权 未登录的用户不能进行信息的修改
router.use((req, res, next) => {
  if (!req.session.userInfo&& !req.session.userInfo?.id) {
     res.send({
      code: 808,
      Msg: '小主，你还没有登录，不能留言哦！',
      data:null
    })
    return
  }

  next()
})

router.post('/', async (req,res) => {
  const { data} = req.body

  if (!data.trim()) {
    return res.send({
      code: 400,
      Msg: '小主，不能提交空的评论哦!',
      data:null
    })
  }

  let id = req.session.userInfo.id
  await remarkDB.create({
    text: data.trim(),
    author: id,
    
  })

  res.send({
    code: 200,
    Msg: '留言成功！',
    data:null
  })
})


module.exports  = router