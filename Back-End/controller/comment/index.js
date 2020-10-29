require('dotenv').config();
const { comment } = require('../../models/sequelize');

function commentController() {}

commentController.get = async (req, res) => {
    const { issue_id } = req.params;
    try {
        const result = await comment.findAll({ where: { issue_id } });
        res.status(200).json({ result: result });
    } catch (e) {
        res.status(400).json({ result: false });
    }
};
commentController.insert = async (req, res) => {
    const { issue_id, contents, created, emoji, user_id } = req.body;
    console.log(issue_id, contents, created, emoji, user_id);
    try {
        const result = await comment.create(
            {
                issue_id,
                contents,
                created,
                emoji,
                user_id,
            },
            { where: { issue_id } }
        );
        res.status(200).json({ result: true, id: result.id });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};
commentController.update = async (req, res) => {
    const { id, contents, created, emoji } = req.body;
    try {
        await comment.update(
            {
                contents,
                created,
                emoji,
            },
            {
                where: { id },
            }
        );
        res.status(200).json({ result: true });
    } catch (e) {
        res.status(400).json({ result: false });
    }
};
commentController.delete = async (req, res) => {
    const { id } = req.body;
    try {
        await comment.delete({ id: id });
        res.status(200).json({ result: true });
    } catch (e) {
        res.status(400).json({ result: false });
    }
};

module.exports = commentController;
