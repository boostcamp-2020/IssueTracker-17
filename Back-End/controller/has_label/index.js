require('dotenv').config();
const { has_label } = require('../../models/sequelize');
const model = require('../../models/sequelize');

function hasLabelController() {}

hasLabelController.get = async (req, res) => {
    const { issueId } = req.body;
    try {
        const result = await has_label.get({ issueId: issueId, model: model });
        res.status(200).json({ result: result });
    } catch (e) {
        console.log(e);
        res.status(400).json({ result: false });
    }
};
hasLabelController.insert = async (req, res) => {
    const { issueId, labelId } = req.body;
    const list = [];
    labelId.forEach((id) => list.push({ label_id: id, issue_id: issueId }));
    try {
        const result = await has_label.insert({ list: list });
        res.status(200).json({ result: true, id: result.id });
    } catch (e) {
        res.status(400).json({ result: false });
    }
};
hasLabelController.update = async (req, res) => {
    const { id, issueId, labelId } = req.body;
    try {
        const result = await has_label.change({
            id: id,
            issueId: issueId,
            labelId: labelId,
        });
        res.status(200).json({ result: true, id: result.id });
    } catch (e) {
        res.status(400).json({ result: false });
    }
};
hasLabelController.delete = async (req, res) => {
    const { idList } = req.body;
    const sql = { where: { id: idList } };
    try {
        const result = await has_label.destroy(sql);
        res.status(200).json({ result: true, id: result.id });
    } catch (e) {
        res.status(400).json({ result: false });
    }
};

module.exports = hasLabelController;
