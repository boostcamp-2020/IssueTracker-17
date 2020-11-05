import React from 'react';
import Avatar from './Avatar';

const AssigneePopUpRow = ({ row }) => {
  return (
    <div className="popupbox__assignee">
      <Avatar></Avatar>
      <div className="popupbox__assigneeName">{row.name}</div>
    </div>
  );
};

export default AssigneePopUpRow;
