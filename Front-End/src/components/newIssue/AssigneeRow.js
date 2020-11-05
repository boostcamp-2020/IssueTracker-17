import React from 'react';
import Avatar from './Avatar';

const AssigneeRow = ({ row }) => {
  return (
    <div className="selectbox__assignee">
      <Avatar></Avatar>
      <div className="assignee__assigneeName">{row.name}</div>
    </div>
  );
};

export default AssigneeRow;
