require('dotenv').config();
const { issue } = require('../../models/sequelize');
const model = require('../../models/sequelize');

function issueController() {}

issueController.get = async (req, res) => {
    try {
        const result = await issue.get({ model: model });
        result.forEach((issueDataValue) => {
            let data = issueDataValue['dataValues'];
            data['userName'] = data['user']['name'];
            data['milestoneTitle'] = data['milstone']
                ? data['milstone']['title']
                : data['milstone'];
            data['user'] = undefined;
            data['milestone'] = undefined;
            data['labels'] = [];
            data['has_labels'].forEach((label) => {
                data['labels'] = [...data['labels'], label['label']];
            });
            data['has_labels'] = undefined;
        });
        res.status(200).json({ result: result });
    } catch (e) {
        console.log(e);
        res.status(400).json({ result: false });
    }
};
issueController.detail = (req, res, next) => {};
issueController.insert = async (req, res) => {};
issueController.update = async (req, res) => {};
issueController.delete = async (req, res) => {
    try {
        const result = await issue.destroy({ where: { id: req.body.id } });
        res.status(200).json({ result: result });
    } catch (e) {
        console.log(e);
        res.status(400).json({ result: false });
    }
};

module.exports = issueController;
