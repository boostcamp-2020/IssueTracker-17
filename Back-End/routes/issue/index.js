const express = require('express');
const router = express.Router();
const issueController = require('../../controller/issue');

router.get('/:issueId?', issueController.get);
router.post('/', issueController.insert);
router.put('/', issueController.update);
router.delete('/', issueController.delete);

module.exports = router;
