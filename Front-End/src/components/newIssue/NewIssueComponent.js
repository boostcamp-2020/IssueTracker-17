import React, { useState, useEffect } from 'react';
import EditBox from './EditBox/EditBox.js';
import SelectBox from './SelectBox/SelectBox.js';
import AssigneeRow from './SelectBox/SelectBoxList/SelectBoxRows/AssigneeRow';
import LabelRow from './SelectBox/SelectBoxList/SelectBoxRows/LabelRow';
import MilestoneRow from './SelectBox/SelectBoxList/SelectBoxRows/MilestoneRow';
import styled from 'styled-components';
import {
  getUserList,
  getLabelList,
  getMileStoneList,
  postIssue,
  updateAssignee,
  updateHasLabel,
} from 'Api';

const NewIssueContainer = styled.div`
  text-align: center;
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const SelectboxesContiainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 25px;
`;

const addCheckedProperty = (list) => {
  return list.map((value) => {
    value.checked = false;
    return value;
  });
};

const NewIssueComponent = ({ history }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [assignees, setAssignees] = useState([]);
  const [labels, setLabels] = useState([]);
  const [milestone, setMilestone] = useState([]);
  const [assigneePopUp, setassigneePopUp] = useState('none');
  const [labelPopUp, setlabelPopUp] = useState('none');
  const [milestonePopUp, setmilestoneePopUp] = useState('none');

  const initData = async () => {
    const userList = await getUserList();
    const labelList = await getLabelList();
    const milestoneList = await getMileStoneList();
    setAssignees(addCheckedProperty(userList));
    setLabels(addCheckedProperty(labelList));
    setMilestone(addCheckedProperty(milestoneList));
  };

  const confirmData = async (title, contents) => {
    const data = {
      title: title,
      contents: contents,
      userId: user.id,
      created: new Date().toISOString(),
    };
    const checkedMilestone = milestone.filter((value) => value.checked)[0];
    if (checkedMilestone) {
      data.milestoneId = checkedMilestone.id;
    }
    const { result: issueResult, id: issueId } = await postIssue(data);

    const assigneeData = {
      issueId: issueId,
      insertAssignee: assignees
        .filter((value) => value.checked)
        .map((value) => value.id),
      deleteAssignee: [],
    };
    await updateAssignee(assigneeData);

    const labelData = {
      issueId: issueId,
      labelId: labels.filter((value) => value.checked).map((value) => value.id),
    };
    await updateHasLabel(labelData);
  };

  useEffect(initData, []);

  return (
    <>
      <NewIssueContainer>
        <Avatar src={user.profile_url} />
        <EditBox history={history} confirmData={confirmData} />
        <SelectboxesContiainer>
          <SelectBox
            WrappedComponent={AssigneeRow}
            title="Assignees"
            rows={assignees}
            setRows={setAssignees}
            popUp={assigneePopUp}
            setPopUp={setassigneePopUp}
          />
          <SelectBox
            WrappedComponent={LabelRow}
            title="Labels"
            rows={labels}
            setRows={setLabels}
            popUp={labelPopUp}
            setPopUp={setlabelPopUp}
          />
          <SelectBox
            WrappedComponent={MilestoneRow}
            title="Milestone"
            rows={milestone}
            setRows={setMilestone}
            popUp={milestonePopUp}
            setPopUp={setmilestoneePopUp}
          />
        </SelectboxesContiainer>
      </NewIssueContainer>
    </>
  );
};

export default NewIssueComponent;
