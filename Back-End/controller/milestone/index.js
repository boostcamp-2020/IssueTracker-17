require('dotenv').config();
const { milestone } = require('@models/sequelize');
const model = require('@models/sequelize');
function milestoneController() {}

milestoneController.get = async (req, res, next) => {
    const { id } = req.params;

    const query = {
        include: [
            {
                model: model.issue,
            },
        ],
    };

    if (id) query.where = { id };
    try {
        const result = await milestone.findAll(query);
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};

milestoneController.insert = async (req, res, next) => {
    const { title, contents, until, status } = req.body;
    try {
        const result = await milestone.create({
            title,
            contents,
            until,
            status,
        });
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};

milestoneController.update = async (req, res, next) => {
    const { id, title, contents, until, status } = req.body;
    const sql = { where: { id } };
    try {
        const result = await milestone.update({ title, contents, status }, sql);
        res.status(200).json({ result: result[0] });
    } catch (e) {
        next(e);
    }
};
milestoneController.delete = async (req, res, next) => {
    const { id } = req.params;

    const sql = { where: { id } };
    try {
        const result = await milestone.destroy(sql);
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};

module.exports = milestoneController;
