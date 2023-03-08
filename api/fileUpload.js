const express = require("express");
const router = express.Router();
const Uploads = require("../Model/upload")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  var maxSize = 10 * 1024 * 1024;
  const upload = multer({ storage: storage,limits: {fileSize: maxSize} });

router.get("/",  async (req, res) => {
  try {
    const result = await Uploads.findAll({
      attributes: ['createdAt', 'file_name','file_size','id']
    });
    res.json({ data: result });  
  } catch (err) {
    res.json({ msg: "file get error" });  

  }
});

router.post(
  "/",upload.any("files"),
  async (req, res) => {

    try {

    const obj = {
        file_name: req.files[0].filename,
        file_size : req.files[0].size
    }

      const uploaded =   await Uploads.create(obj);
      res.status(200).json(uploaded);

      } catch (err) {
        res.json({ msg: "file post error" });  
    
      }
  }
);

router.delete(
    "/",
    async (req, res) => {
  
  
        try {
           const deleted =  await Uploads.destroy({
              where: {
                id: req.query.id
              }
            });
            res.json({ msg: "file delete successfully", deleted });  
          } catch (err) {
            res.json({ msg: "file delete error" });  
        
          }
    }
  );

module.exports = router;