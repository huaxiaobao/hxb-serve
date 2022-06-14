const express  = require('express')
const app = express()
app.listen(4000, () => {
  console.log('启动服务');
})

//连接数据库
require('./middleware/mongoose')

//引入跨域资源
app.use(require('./middleware/cors'))
//引入 session 免登录
app.use(require('./middleware/session'))

//数据处理
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//路由
app.use('/',require('./router/index'))