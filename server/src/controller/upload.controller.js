module.exports.uploadImage = async (req, res) => {
  if (req.file) {
    return res.send({
      status: true,
      message: "อัพโหลดรูปภาพสำเร็จ",
      data: { filename: req.file.filename, path: req.file.path },
    });
  } else {
    return res.send({ status: false, message: "อัพโหลดรูปภาพล้มเหลว" });
  }
};
