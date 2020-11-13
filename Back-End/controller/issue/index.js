require('dotenv').config();
const { issue } = require('@models/sequelize');
const model = require('@models/sequelize');

function issueController() {}

issueController.get = async (req, res, next) => {
    const { issueId } = req.params;
    const { status, mention, author, labels, milestone, asignee, version } = req.query;
    let filterQuery = false;
    if (version)
        filterQuery = createContentFilterQuery({
            status,
            mention,
            author,
            milestone,
            asignee,
        });
    else
        filterQuery = createFilterQuery({
            status,
            mention,
            author,
            milestone,
            asignee,
        });

    try {
        const initResult = await issue.get({
            model: model,
            id: issueId,
            filterQuery: filterQuery,
        });

        let result = makeGetResult({ result: initResult });

        if(version){
            if (labels) {
                const filterLabelList = Array.isArray(labels)
                    ? labels.map((label) => label)
                    : [labels];
                result = getlabelContentFilteredList(result, filterLabelList);
            }
        } else {
            if (labels) {
                const filterLabelList = Array.isArray(labels)
                    ? labels.map((label) => parseInt(label))
                    : [parseInt(labels)];
                result = getlabelFilteredList(result, filterLabelList);
            }
        }

        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
};

const getlabelContentFilteredList = (issueList, filterLabelList) => {
    return issueList.filter((issue) => {
        const issueLabelList = issue.dataValues.labels.map(
            (label) => label.dataValues.title
        );
        return filterLabelList.every((label) => issueLabelList.includes(label));
    });
};

const getlabelFilteredList = (issueList, filterLabelList) => {
    return issueList.filter((issue) => {
        const issueLabelList = issue.dataValues.labels.map(
            (label) => label.dataValues.id
        );
        return filterLabelList.every((label) => issueLabelList.includes(label));
    });
};

const createFilterQuery = ({ status, mention, author, milestone, asignee }) => {
    const filterQuery = {};
    if (status !== undefined) filterQuery['status'] = status;
    if (mention !== undefined) filterQuery['$comments.user_id$'] = mention;
    if (author !== undefined) filterQuery['user_id'] = author;
    if (milestone !== undefined) filterQuery['$milestone.id$'] = milestone;
    if (asignee !== undefined) filterQuery['$has_assignees.user_id$'] = asignee;
    return filterQuery;
};

const createContentFilterQuery = ({ status, mention, author, milestone, asignee }) => {
    const filterQuery = {};
    if (status !== undefined) filterQuery['status'] = status;
    if (mention !== undefined) filterQuery['$comments.user_id$'] = mention;
    if (author !== undefined) filterQuery['$user.name$'] = author;
    if (milestone !== undefined) filterQuery['$milestone.title$'] = milestone;
    if (asignee !== undefined) filterQuery['$has_assignees.user.name$'] = asignee;
    return filterQuery;
};

const makeGetResult = ({ result }) => {
    result.forEach((issueDataValue) => {
        let data = issueDataValue['dataValues'];
        data['userName'] = data['user']['name'];
        data['profileUrl'] = data['user']['profile_url'];
        data['milestoneTitle'] = data['milestone']
            ? data['milestone']['title']
            : data['milestone'];
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
        data['comments'].forEach((comment) => {
            comment['dataValues']['name'] = comment['dataValues']['user']['name'];
            comment['dataValues']['profileUrl'] = comment['dataValues']['user']['profile_url'];
            comment['dataValues']['user'] = undefined;
        });
    });
    return result;
};

issueController.update = async (req, res, next) => {
    const bodyObj = req.body;
    const { id } = bodyObj;
    const modifyData = makeModifyData({ bodyObj: bodyObj });
    try {
        await issue.update(modifyData, { where: { id } });
        res.status(200).json({ result: true });
    } catch (e) {
        next(e);
    }
};

issueController.insert = async (req, res, next) => {
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
        next(e);
    }
};

issueController.delete = async (req, res, next) => {
    try {
        const result = await issue.destroy({ where: { id: req.body.id } });
        res.status(200).json({ result: result });
    } catch (e) {
        next(e);
    }
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
