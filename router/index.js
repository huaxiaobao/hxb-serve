const express = require('express')
const router = express.Router()
//注册路由
router.use('/reg',require('./reg'))
//登录路由

module.exports = router