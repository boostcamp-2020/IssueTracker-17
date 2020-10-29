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
        console.error(e);
        res.status(400).json({ result: false });
    }
};
hasLabelController.insert = async (req, res) => {
    const { issueId, labelId } = req.body;
    const list = [];
    labelId.forEach((id) => list.push({ labelId: id, issueId: issueId }));
    try {
        const result = await has_label.insert({ list: list });
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
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
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};
hasLabelController.delete = async (req, res) => {
    const { idList } = req.body;
    const sql = { where: { id: idList } };
    try {
        const result = await has_label.destroy(sql);
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

module.exports = hasLabelController;
