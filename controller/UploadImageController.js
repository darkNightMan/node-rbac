
class UploadImageController {
  uploadAvatar (req, res) {
    res.R.ok({file:req.file})
  }
}

module.exports = new UploadImageController()