import React, { useState } from 'react';
import EditBox from './EditBox.js';
import SelectBox from './SelectBox.js';
import AssigneeRow from './AssigneeRow';
import LabelRow from './LabelRow';
import MilestoneRow from './MilestoneRow';
import PopUpBox from './PopUpBox.js';
import LabelPopUpRow from './LabelPopUpRow';
import AsssigneePopUpRow from './AssigneePopUpRow';
import MilestonePopUpRow from './MilestonePopUpRow';
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
  ]);
  const [milestone, setMilestone] = useState([]);
  const [assigneePopUp, setassigneePopUp] = useState();
  const [labelPopUp, setlabelPopUp] = useState();
  const [milestonePopUp, setmilestoneePopUp] = useState();

  return (
    <NewIssueContainer>
      <Avatar src="" />
      <EditBox />
      <SelectboxesContiainer>
        <SelectBox
          WrappedComponent={AssigneeRow}
          title="Assignees"
          rows={assignees}
          setPopUp={setassigneePopUp}
        />
        <SelectBox
          WrappedComponent={LabelRow}
          title="Labels"
          rows={labels}
          setPopUp={setlabelPopUp}
        />
        <SelectBox
          WrappedComponent={MilestoneRow}
          title="Milestone"
          rows={milestone}
          setPopUp={setmilestoneePopUp}
        />
        <PopUpBox
          WrappedComponent={AsssigneePopUpRow}
          className={assigneePopUp}
          rows={[]}
        ></PopUpBox>
        <PopUpBox
          WrappedComponent={LabelPopUpRow}
          className={labelPopUp}
          rows={[]}
        ></PopUpBox>
        <PopUpBox
          WrappedComponent={MilestonePopUpRow}
          className={milestonePopUp}
          rows={[]}
        ></PopUpBox>
      </SelectboxesContiainer>
    </NewIssueContainer>
  );
};

export default NewIssueComponent;
