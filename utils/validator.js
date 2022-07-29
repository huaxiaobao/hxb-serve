//用户名校验
function usernameValid(value) {
   if(!value) return false
  const reg = /^[\w\u4e00-\u9fa5]{1,8}$/g
  return  reg.test(value)
}

//密码校验
function passValid(value) {
  if(!value) return false
  const reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/
  return reg.test(value)
}

module.exports = {
  usernameValid,
  passValid
}