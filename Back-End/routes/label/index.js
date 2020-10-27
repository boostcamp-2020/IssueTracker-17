const express = require('express');
const router = express.Router();
const labelController = require('../../controller/label');

router.post('/get', labelController.get);
router.post('/insert', labelController.insert);
router.post('/update', labelController.update);
router.post('/delete', labelController.delete);

module.exports = router;
