const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/blog0614', {
  useNewUrlParser: true,
  useUnifiedTopology:true,
})
  .then(() => {
  console.log('连接成功');
  })
  .catch(() => {
    console.log('连接失败');
  })