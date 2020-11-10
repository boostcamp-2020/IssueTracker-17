import React from 'react';
import styled from 'styled-components';
import { CheckSvg } from './svg';

const Avatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 20px;
`;
const AssigneeRow = styled.div`
  height: 20px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  vertical-align: center;
  border-bottom: 1px solid #dddddd;
  position: relative;
`;
const AssigneeName = styled.div`
  width: calc(100% - 50px);
  padding-left: 10px;
  font-weight: 600;
  line-height: 20px;
`;
const AssigneeCheckbox = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  padding: 5px 5px;
`;

const AssigneePopUpRow = ({ row }) => {
  return (
    <AssigneeRow>
      <Avatar src={row.profile_url}></Avatar>
      <AssigneeName>{row.name ? row.name : '-'}</AssigneeName>
      <AssigneeCheckbox>
        <CheckSvg checked={row.checked} />
      </AssigneeCheckbox>
    </AssigneeRow>
  );
};

export default AssigneePopUpRow;
