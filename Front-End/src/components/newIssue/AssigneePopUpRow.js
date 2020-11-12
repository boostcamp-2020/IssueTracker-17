import React from 'react';
import styled from 'styled-components';
import { CheckSvg } from 'Style';

const Avatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 20px;
`;
const AssigneeRow = styled.div`
  height: 20px;
  padding: 5px 10px;
  display: flex;
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

const AssigneePopUpRow = ({ row, Event }) => {
  const changeFilterTextEventHandler = (e) => {
    e.preventDefault();
    Event({ id: row.id, title: row.name });
  };
  return (
    <AssigneeRow
      onClick={Event ? (e) => changeFilterTextEventHandler(e) : undefined}
    >
      <AssigneeCheckbox>
        <CheckSvg checked={row.checked} />
      </AssigneeCheckbox>
      <Avatar src={row.profile_url}></Avatar>
      <AssigneeName>{row.name ? row.name : '-'}</AssigneeName>
    </AssigneeRow>
  );
};

export default AssigneePopUpRow;
