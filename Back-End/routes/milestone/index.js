const express = require('express');
const router = express.Router();
const milestoneController = require('../../controller/milestone');

router.post('/get', milestoneController.get);
router.post('/insert', milestoneController.insert);
router.post('/update', milestoneController.update);
router.post('/delete', milestoneController.delete);

module.exports = router;
