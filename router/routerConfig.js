const routerConfig = (router)=> {
  //路由配置

/* 登录 */
router.use('/login',require('./login'))
/* 注册 */
router.use('/reg', require('./reg'))
/* 修改用户信息 */
router.use('/updateInfo', require('./updateInfo'))
/* 留言 */
router.use('/remark',require('./remark'))

}


module.exports = routerConfig