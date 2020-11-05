const express = require('express');
const router = express.Router();
const milestoneController = require('@controller/milestone');

router.get('/', milestoneController.get);
router.post('/', milestoneController.insert);
router.put('/', milestoneController.update);
router.delete('/', milestoneController.delete);

module.exports = router;
