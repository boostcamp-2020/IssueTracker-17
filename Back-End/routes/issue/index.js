const express = require('express');
const router = express.Router();
const issueController = require('../../controller/issue');

router.get('/get', issueController.get);
router.post('/detail', issueController.detail);
router.post('/insert', issueController.insert);
router.put('/update', issueController.update);
router.delete('/delete', issueController.delete);

module.exports = router;
