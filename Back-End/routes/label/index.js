const express = require('express');
const router = express.Router();
const labelController = require('../../controller/label');

router.get('/:id?', labelController.get);
router.post('/', labelController.insert);
router.put('/', labelController.update);
router.delete('/', labelController.delete);

module.exports = router;
