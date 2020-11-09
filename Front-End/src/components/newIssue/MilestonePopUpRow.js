import React from 'react';

const AssigneeRow = ({ row }) => {
  return (
    <div className="popupbox__milestone">
      <div className="popupbox__milestoneName">{row.name}</div>
      <div className="popupbox__milestoneDue">{row.dueDate}</div>
    </div>
  );
};

export default AssigneeRow;
