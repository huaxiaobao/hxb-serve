const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
  res.send('请求成功')
})


module.exports = router