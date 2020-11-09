require('dotenv').config();
const { label } = require('../../models/sequelize');

function labelController() {}

labelController.get = async (req, res) => {
    try {
        const result = await label.get();
        res.status(200).json({ result: result });
    } catch (e) {
        res.status(400).json({ result: false });
    }
};
labelController.insert = async (req, res) => {
    const { title, contents, color } = req.body;
    try {
        const result = await label.insert({
            title: title,
            contents: contents,
            color: color,
        });
        res.status(200).json({ result: result });
    } catch (e) {
        res.status(400).json({ result: false });
    }
};
labelController.update = async (req, res) => {
    const { id, title, contents, color } = req.body;
    try {
        const result = await label.change({
            id: id,
            title: title,
            contents: contents,
            color: color,
        });
        res.status(200).json({ result: result });
    } catch (e) {
        res.status(400).json({ result: false });
    }
};
labelController.delete = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await label.delete({ id: id });
        res.status(200).json({ result: result });
    } catch (e) {
        res.status(400).json({ result: false });
    }
};

module.exports = labelController;
