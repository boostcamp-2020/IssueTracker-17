import React, { useState } from 'react';
import Avatar from '../components/newIssue/Avatar.js';
import EditBox from '../components/newIssue/EditBox.js';
import SelectBox from '../components/newIssue/SelectBox.js';
import AssigneeRow from '../components/newIssue/AssigneeRow';
import LabelRow from '../components/newIssue/LabelRow';
import MilestoneRow from '../components/newIssue/MilestoneRow';
import PopUpBox from '../components/newIssue/PopUpBox.js';
import LabelPopUpRow from '../components/newIssue/LabelPopUpRow';
import AsssigneePopUpRow from '../components/newIssue/AssigneePopUpRow';
import MilestonePopUpRow from '../components/newIssue/MilestonePopUpRow';

const NewIssue = () => {
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

export default NewIssue;
