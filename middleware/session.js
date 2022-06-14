const session = require('express-session')
const MongoStore = require('connect-mongo')
module.exports = session({
  secret: 'hxb',
  cookie: { maxAge: 7 * 24 * 3600 * 1000 },
  rolling: true,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl:'mongodb://localhost:27017/blog0614'
  })
})