const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const config = require('@config/addressconfig');

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/image/',
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        },
    }),
});

router.post('/', upload.single('img'), (req, res) => {
    const uri = `![${req.file.originalname}](${
        config.serverAddress +
        '/' +
        config.imageAddress +
        '/' +
        req.file.filename
    })`;
    res.json({ result: uri });
});

module.exports = router;
