const express = require('express')
const multer  = require('multer')
const router = express.Router()
const userDB = require('db/user')
const path = require('path')
const fs=require('fs')
//磁盘存储
const storage = multer.diskStorage({
  //文件存储的目录
 
  destination: (req, file, cb) => {

    cb(null, path.join(__dirname,'../../../public/file/photo'))
  },
  //文件存储的名字
  filename: (req, file, cb) => {
    const id = req.session.userInfo.id
    const fileExtension = path.extname(file.originalname)  //获取文件名后缀
    let fileName = ''

    //判断当前是否为默认图片 ，并给文件名进行命名操作
    const imgeInfo = defaultImage(req.session.userInfo.avatar)
    if (imgeInfo.isDefault) {
        fileName = 1 + "_"+ id+  fileExtension 
    } else {
      const num = Number(imgeInfo.fileName.split('_')[0]) + 1
      console.log(num)
      fileName = num + '_' +id+fileExtension
    }
   
    req.pictureFileName = fileName
    console.log(fileName)
    cb(null,fileName)
  }
})

const upload = multer({ storage: storage }).single('file')

//判断是否为默认图片
const defaultImage = (imageURL) => {
  const arr = imageURL.split('/')
  const fileName = arr[arr.length -1]
  return {
    isDefault: fileName === 'default.jpg',
    fileName
  }
}
router.post('/',
  (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      // 发生错误
      res.send({
        code: 809,
        Msg: '上传错误！',
        data:null
      })
      return 
    }

    // 图片上传成功
    const imgeInfo = defaultImage(req.session.userInfo.avatar)
    if (!imgeInfo.isDefault) {
      //删除照片
      console.log(__filename)
      fs.unlink(__dirname + '../../../../public/file/photo/' + imgeInfo.fileName, (error) => {
        if(error){
          console.log(error)
          return false
      }
      console.log('删除文件成功');
      })
    }
    const id = req.session.userInfo.id
    const avatarURL = `/file/photo/${req.pictureFileName}`
    // 更新数据库数据
    await userDB.findByIdAndUpdate(id, { picture: avatarURL }) 
    // 更新session
    req.session.userInfo.avatar =avatarURL 
    res.send({
      code: 200,
      Msg: '图片上传成功！',
      data:avatarURL
    })
  })
})

module.exports  = router