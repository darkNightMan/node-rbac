
class UploadImageController {
  uploadAvatar (req, res) {
    // res.R.ok({path:req.file})
    res.R.ok({path:`public/upload/${req.file.filename}`})
  }
}

module.exports = new UploadImageController()