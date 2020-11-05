const express = require('express');
const router = express.Router();
const assigneeController = require('../../controller/assignee');

router.get('/:issueId', assigneeController.get);
router.post('/', assigneeController.insert);
router.put('/', assigneeController.update);
router.delete('/', assigneeController.delete);

module.exports = router;
