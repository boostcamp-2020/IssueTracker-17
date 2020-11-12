require('dotenv').config();
const { comment } = require('@models/sequelize');

function commentController() {}

commentController.get = async (req, res, next) => {
    const { issueId } = req.params;
    try {
        const result = issueId
            ? await comment.get({ issueId })
            : await comment.findAll();
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};
commentController.insert = async (req, res, next) => {
    const { issueId, contents, created, emoji, userId } = req.body;
    try {
        const result = await comment.insert({
            issueId: issueId,
            contents: contents,
            created: created,
            emoji: emoji,
            userId: userId,
        });
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};
commentController.update = async (req, res, next) => {
    const { id, contents, created, emoji } = req.body;
    try {
        const result = await comment.change({
            id: id,
            contents: contents,
            created: created,
            emoji: emoji,
        });
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};
commentController.delete = async (req, res, next) => {
    const { id } = req.body;
    try {
        const sql = { where: { id } };
        const result = await comment.destroy(sql);
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};

module.exports = commentController;
