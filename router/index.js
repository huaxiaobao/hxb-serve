const express = require('express')
const router = express.Router()
const routerConfig = require('./routerConfig')
console.log(routerConfig)
//路由配置
routerConfig(router)


module.exports  = router