const express = require('express');
const router = express.Router();
const commentController = require('../../controller/comment');

router.get('/:issueId?', commentController.get);
router.post('/', commentController.insert);
router.put('/', commentController.update);
router.delete('/', commentController.delete);

module.exports = router;
