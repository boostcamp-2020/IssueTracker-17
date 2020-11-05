const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/image/',
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

router.post('/', upload.single('file'), (req, res) => {
  const uri = `![${req.file.originalname}](${'/image/' + req.file.filename})`;
  res.json({ result: uri });
});

module.exports = router;
