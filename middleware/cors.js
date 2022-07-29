const cors = require('cors')

//跨域设置  允许前端进行跨域的域名
const whiteList = ['http://localhost:8080']
module.exports = cors({
  origin: true,
  credentials:true
})
