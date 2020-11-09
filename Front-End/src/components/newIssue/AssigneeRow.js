import React from 'react';
import styled from 'styled-components';

const Avatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

const SelectBoxAssignee = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: start;
`;
const SelectBoxAssigneeName = styled.div`
  padding-left: 5px;
  line-height: 20px;
  font-weight: 600;
  color: #24292e;
`;

const AssigneeRow = ({ row }) => {
  return (
    <SelectBoxAssignee>
      <Avatar src={row.avatarUrl}></Avatar>
      <SelectBoxAssigneeName>{row.name}</SelectBoxAssigneeName>
    </SelectBoxAssignee>
  );
};

export default AssigneeRow;
