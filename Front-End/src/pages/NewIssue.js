import React from 'react';
import Avatar from '../components/newIssue/Avatar.js';
import EditBox from '../components/newIssue/EditBox.js';
import SelectBox from '../components/newIssue/SelectBox.js';

const NewIssue = () => {
  return (
    <div>
      <Avatar />
      <EditBox />
      <div className="selectboxContiainer">
        <SelectBox />
        <SelectBox />
        <SelectBox />
      </div>
    </div>
  );
};

export default NewIssue;
