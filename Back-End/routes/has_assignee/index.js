const express = require('express');
const router = express.Router();
const assigneeController = require('../../controller/assignee');

router.get('/get:/issueId', assigneeController.get);
router.post('/insert', assigneeController.insert);
router.put('/update', assigneeController.update);
router.delete('/delete', assigneeController.delete);

module.exports = router;
