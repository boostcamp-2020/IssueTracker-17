const express = require('express');
const router = express.Router();
const commentController = require('../../controller/comment');

router.get('/get/:issue_id', commentController.get);
router.post('/insert', commentController.insert);
router.put('/update', commentController.update);
router.delete('/delete', commentController.delete);

module.exports = router;
