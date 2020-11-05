const express = require('express');
const router = express.Router();
const hasLabelController = require('@controller/has_label');

router.get('/:issueId?', hasLabelController.get);
router.post('/', hasLabelController.insert);
router.put('/', hasLabelController.update);
router.delete('/', hasLabelController.delete);

module.exports = router;
