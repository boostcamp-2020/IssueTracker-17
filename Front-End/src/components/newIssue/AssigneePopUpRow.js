import React from 'react';
import styled from 'styled-components';

const Avatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 20px;
`;
const AssigneeRow = styled.div`
  height: 20px;
  padding: 5px 10px;
  display: flex;
  justify-content: left;
  vertical-align: center;
  border-bottom: 1px solid #dddddd;
`;
const AssigneeName = styled.div`
  padding-left: 10px;
  font-weight: 600;
  line-height: 20px;
`;
const AssigneeCheckbox = styled.div``;

const AssigneePopUpRow = ({ row }) => {
  return (
    <AssigneeRow>
      <Avatar src={row.avatarUrl}></Avatar>
      <AssigneeName>{row.name}</AssigneeName>
      <AssigneeCheckbox></AssigneeCheckbox>
    </AssigneeRow>
  );
};

export default AssigneePopUpRow;
