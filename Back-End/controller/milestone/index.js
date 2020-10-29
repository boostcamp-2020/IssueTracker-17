require('dotenv').config();
const { milestone } = require('../../models/sequelize');

function milestoneController() {}

milestoneController.get = async (req, res, next) => {
    const data = await milestone.findAll();
    res.status(200).json(data);
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
        res.status(200).json({ result: true, id: result.id });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

milestoneController.update = async (req, res, next) => {
    const { id, title, contents, until, status } = req.body;
    const sql = { where: { id } };
    try {
        console.log(sql);
        console.log({ title, contents, status });
        let result = await milestone.update({ title, contents, status }, sql);
        result = result >= 1 ? true : false;
        res.status(200).json({ result });
    } catch (e) {
        res.status(400).json({ result: false });
    }
};
milestoneController.delete = async (req, res, next) => {
    const { id } = req.body;
    const sql = { where: { id } };
    try {
        console.log(sql);
        let result = await milestone.destroy(sql);
        result = result >= 1 ? true : false;
        res.status(200).json({ result });
    } catch (e) {
        res.status(400).json({ result: false });
    }
};

module.exports = milestoneController;
