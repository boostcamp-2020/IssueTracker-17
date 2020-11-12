require('dotenv').config();
const { label } = require('@models/sequelize');

function labelController() {}

labelController.get = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await label.get(id);
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};
labelController.insert = async (req, res, next) => {
    const { title, contents, color } = req.body;
    try {
        const result = await label.insert({
            title: title,
            contents: contents,
            color: color,
        });
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};
labelController.update = async (req, res, next) => {
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
        next(e);
    }
};
labelController.delete = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await label.delete({ id: id });
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};

module.exports = labelController;
