import React, { useState } from 'react';
import Avatar from './Avatar.js';
import EditBox from './EditBox.js';
import SelectBox from './SelectBox.js';
import AssigneeRow from './AssigneeRow';
import LabelRow from './LabelRow';
import MilestoneRow from './MilestoneRow';
import PopUpBox from './PopUpBox.js';
import LabelPopUpRow from './LabelPopUpRow';
import AsssigneePopUpRow from './AssigneePopUpRow';
import MilestonePopUpRow from './MilestonePopUpRow';

const NewIssueComponent = () => {
  const [assignees, setAssignees] = useState([]);
  const [labels, setLabels] = useState([{ labelName: 'testLabel' }]);
  const [milestone, setMilestone] = useState([]);
  const [assigneePopUp, setassigneePopUp] = useState();
  const [labelPopUp, setlabelPopUp] = useState();
  const [milestonePopUp, setmilestoneePopUp] = useState();

  return (
    <div>
      <Avatar />
      <EditBox />
      <div className="selectboxContiainer">
        <SelectBox
          WrappedComponent={AssigneeRow}
          rows={assignees}
          setPopUp={setassigneePopUp}
        />
        <SelectBox
          WrappedComponent={LabelRow}
          rows={labels}
          setPopUp={setlabelPopUp}
        />
        <SelectBox
          WrappedComponent={MilestoneRow}
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
      </div>
    </div>
  );
};

export default NewIssueComponent;
