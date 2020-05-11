
const multer = require('multer')
const date = new Date()

const storage = multer.diskStorage({
  destination: './views/public/upload/',
  // 给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    console.log("后台文件");
    console.log(file)
    const arry = file.originalname.split(".")
    const length = arry.length
    const newName = arry[0] + '.' + arry[length - 1]
    console.log("新名称");
    console.log(newName);
    cb(null, newName)
  }
})

const upload = multer({  storage: storage })

module.exports = upload

