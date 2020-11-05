require('dotenv').config();
const { comment, model } = require('../../models/sequelize');

function commentController() {}

commentController.get = async (req, res) => {
    const { issueId } = req.params;
    //console.log(issueId);

    //console.log(query);
    try {
        const result = issueId
            ? await comment.get(issueId)
            : await comment.findAll();
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};
commentController.insert = async (req, res) => {
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
        console.error(e);
        res.status(400).json({ result: false });
    }
};
commentController.update = async (req, res) => {
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
        console.error(e);
        res.status(400).json({ result: false });
    }
};
commentController.delete = async (req, res) => {
    const { id } = req.body;
    try {
        const sql = { where: { id } };
        const result = await comment.destroy(sql);
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

module.exports = commentController;
