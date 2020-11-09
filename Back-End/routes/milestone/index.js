const express = require('express');
const router = express.Router();
const milestoneController = require('../../controller/milestone');

router.get('/get', milestoneController.get);
router.post('/insert', milestoneController.insert);
router.put('/update', milestoneController.update);
router.delete('/delete', milestoneController.delete);

module.exports = router;
