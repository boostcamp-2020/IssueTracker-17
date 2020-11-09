import React, { useState, useEffect } from 'react';
import EditBox from './EditBox.js';
import SelectBox from './SelectBox.js';
import AssigneeRow from './AssigneeRow';
import LabelRow from './LabelRow';
import MilestoneRow from './MilestoneRow';
import styled from 'styled-components';

const NewIssueContainer = styled.div`
  text-align: center;
  width: 95%;
  margin: auto;
  margin-top: 80px;
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

const NewIssueComponent = () => {
  const [assignees, setAssignees] = useState([
    {
      avatarUrl: 'https://avatars3.githubusercontent.com/u/40164248?v=4',
      name: 'sunkest',
    },
  ]);
  const [labels, setLabels] = useState([
    { labelName: 'testLabel', color: '#abcdef' },
    { labelName: 'testLabel2', color: '#a23dc4' },
  ]);
  const [milestone, setMilestone] = useState([
    { milestoneName: 'milestone_test', status: 70 },
  ]);
  const [assigneePopUp, setassigneePopUp] = useState('none');
  const [labelPopUp, setlabelPopUp] = useState('none');
  const [milestonePopUp, setmilestoneePopUp] = useState('none');

  useEffect();

  return (
    <NewIssueContainer>
      <Avatar src="" />
      <EditBox />
      <SelectboxesContiainer>
        <SelectBox
          WrappedComponent={AssigneeRow}
          title="Assignees"
          rows={assignees}
          popUp={assigneePopUp}
          setPopUp={setassigneePopUp}
        />
        <SelectBox
          WrappedComponent={LabelRow}
          title="Labels"
          rows={labels}
          popUp={labelPopUp}
          setPopUp={setlabelPopUp}
        />
        <SelectBox
          WrappedComponent={MilestoneRow}
          title="Milestone"
          rows={milestone}
          popUp={milestonePopUp}
          setPopUp={setmilestoneePopUp}
        />
      </SelectboxesContiainer>
    </NewIssueContainer>
  );
};

export default NewIssueComponent;
