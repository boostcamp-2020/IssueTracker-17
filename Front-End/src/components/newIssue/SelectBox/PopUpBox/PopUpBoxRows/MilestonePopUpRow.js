import React from 'react';
import styled from 'styled-components';
import { CheckSvg } from 'Style';

const MilestoneRow = styled.div`
  padding: 5px 0;
  padding-left: 5px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  &:hover {
    background-color: #e7e7e7;
  }
`;
const MilestoneRowContent = styled.div``;
const MilestoneName = styled.div`
  font-weight: 600;
`;
const MilestoneDue = styled.div`
  font-size: 11px;
  padding-top: 5px;
`;
const MilestoneCheckbox = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  padding-top: 10px;
  padding-left: 10px;
`;

const MilestonePopUpRow = ({ row, Event }) => {
  const changeFilterTextEventHandler = (e) => {
    e.preventDefault();
    Event({ id: row.id, title: row.title });
  };

  return (
    <MilestoneRow
      onClick={Event ? (e) => changeFilterTextEventHandler(e) : undefined}
    >
      <MilestoneCheckbox>
        <CheckSvg checked={row.checked}/>
      </MilestoneCheckbox>
      <MilestoneRowContent>
        <MilestoneName>{row.title}</MilestoneName>
        <MilestoneDue>{row.until}</MilestoneDue>
      </MilestoneRowContent>
    </MilestoneRow>
  );
};

export default MilestonePopUpRow;
