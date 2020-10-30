const { has_assignee: hasAssignee } = require('../../models/sequelize');

const model = require('../../models/sequelize');

const assigneeController = {};

assigneeController.get = async (req, res) => {
    const { issueId } = req.params;
    try {
        const assignees = await hasAssignee.get({
            issueId: issueId,
            model: model,
        });
        res.status(200).json({ result: assignees });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

assigneeController.insert = async (req, res) => {
    const { issueId, assigneeId } = req.body;
    try {
        const result = await hasAssignee.create({
            issueId: issueId,
            userId: assigneeId,
        });
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};
assigneeController.delete = async (req, res) => {
    const { issueId, assigneeId } = req.body;
    try {
        const result = await hasAssignee.destroy({
            where: {
                issueId: issueId,
                userId: assigneeId,
            },
        });
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

assigneeController.update = async (req, res) => {
    const { issueId, insertAssignee, deleteAssignee } = req.body;
    try {
        await hasAssignee.delete({
            issueId: issueId,
            deleteAssignees: deleteAssignee,
        });
        const insertObject = insertAssignee.map((value) => ({
            issueId: issueId,
            userId: value,
        }));
        const insertResult = await hasAssignee.bulkCreate(insertObject);
        res.status(200).json({ result: insertResult });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

module.exports = assigneeController;
