require('dotenv').config();
const { has_label } = require('@models/sequelize');
const model = require('@models/sequelize');

function hasLabelController() {}

hasLabelController.get = async (req, res, next) => {
    const { issueId } = req.params;
    try {
        const result = await has_label.get({ issueId: issueId, model: model });
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};
hasLabelController.insert = async (req, res, next) => {
    const { issueId, labelId } = req.body;
    const list = [];
    labelId.forEach((id) => list.push({ label_id: id, issue_id: issueId }));
    try {
        const result = await has_label.insert({ list: list });
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};
hasLabelController.update = async (req, res, next) => {
    const { id, issueId, labelId } = req.body;
    try {
        const result = await has_label.change({
            id: id,
            issueId: issueId,
            labelId: labelId,
        });
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};
hasLabelController.delete = async (req, res, next) => {
    const { id } = req.body;
    const sql = { where: { id: id } };
    try {
        const result = await has_label.destroy(sql);
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};

module.exports = hasLabelController;
