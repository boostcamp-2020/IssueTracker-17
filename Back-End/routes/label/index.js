const express = require('express');
const router = express.Router();
const labelController = require('../../controller/label');

router.get('/get', labelController.get);
router.post('/insert', labelController.insert);
router.put('/update', labelController.update);
router.delete('/delete', labelController.delete);

module.exports = router;
