require('dotenv').config();
const { issue } = require('../../models/sequelize');
const model = require('../../models/sequelize');

function issueController() {}

issueController.get = async (req, res) => {
    try {
        const initResult = await issue.get({ model: model });
        const result = makeGetResult({ result: initResult });
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

issueController.update = async (req, res) => {
    const bodyObj = req.body;
    const { id } = bodyObj;
    const modifyData = makeModifyData({ bodyObj: bodyObj });
    try {
        await issue.update(modifyData, { where: { id } });
        res.status(200).json({ result: true });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

issueController.insert = async (req, res) => {
    const { userId, milestoneId, title, contents, created } = req.body;
    try {
        const result = await issue.insert({
            userId: userId,
            milestoneId: milestoneId,
            title: title,
            contents: contents,
            created: created,
            status: 0,
        });
        res.status(200).json({ result: true, id: result.id });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

issueController.delete = async (req, res) => {
    try {
        const result = await issue.destroy({ where: { id: req.body.id } });
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

const makeGetResult = ({ result }) => {
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
        data['assignees'] = [];
        data['has_assignees'].forEach((user) => {
            data['assignees'] = [...data['assignees'], user['user']];
        });
        data['has_assignees'] = undefined;
    });
    return result;
};

const makeModifyData = ({ bodyObj }) => {
    let modifyData = {};
    modifyData.title = !bodyObj.title ? undefined : bodyObj.title;
    modifyData.contents = !bodyObj.contents ? undefined : bodyObj.contents;
    modifyData.created = !bodyObj.created ? undefined : bodyObj.created;
    modifyData.milestone_id =
        bodyObj.milestoneId === undefined ? undefined : bodyObj.milestoneId;
    modifyData.status = !bodyObj.status ? undefined : bodyObj.status;

    modifyData = JSON.parse(JSON.stringify(modifyData));
    return modifyData;
};

module.exports = issueController;
