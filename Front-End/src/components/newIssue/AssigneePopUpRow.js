import React from 'react';
import styled from 'styled-components';

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const AssigneePopUpRow = ({ row }) => {
  return (
    <div className="popupbox__assignee">
      <Avatar></Avatar>
      <div className="popupbox__assigneeName">{row.name}</div>
    </div>
  );
};

export default AssigneePopUpRow;
