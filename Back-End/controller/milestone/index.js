require('dotenv').config();
const { milestone } = require('../../models/sequelize');

function milestoneController() {}

milestoneController.get = async (req, res) => {
    const { id } = req.params;
    const query = {};
    if (id) query.where = { id };
    const result = await milestone.findAll(query);
    res.status(200).json({ result: result });
};

milestoneController.insert = async (req, res) => {
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
        console.error(e);
        res.status(400).json({ result: false });
    }
};

milestoneController.update = async (req, res) => {
    const { id, title, contents, until, status } = req.body;
    const sql = { where: { id } };
    try {
        let result = await milestone.update({ title, contents, status }, sql);
        result = result >= 1;
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};
milestoneController.delete = async (req, res) => {
    const { id } = req.body;
    const sql = { where: { id } };
    try {
        let result = await milestone.destroy(sql);
        result = result >= 1;
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

module.exports = milestoneController;
