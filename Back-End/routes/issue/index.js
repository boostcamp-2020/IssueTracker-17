const express = require('express');
const router = express.Router();
const issueController = require('../../controller/issue');

router.post('/get', issueController.get);
router.post('/detail', issueController.detail);
router.post('/insert', issueController.insert);
router.post('/update', issueController.update);
router.post('/delete', issueController.delete);

module.exports = router;
