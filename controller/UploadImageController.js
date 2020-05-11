
class UploadImageController {
  uploadAvatar (req, res) {
    // res.R.ok({path:req.file})
    res.R.ok({path:`public/uploads/${req.file.filename}`})
  }
}

module.exports = new UploadImageController()