import React from 'react';
import styled from 'styled-components';
import { CheckSvg } from 'Style';

const MilestoneRow = styled.div`
  padding: 5px 0;
  padding-left: 20px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
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

const MilestonePopUpRow = ({ row }) => {
  return (
    <MilestoneRow>
      <MilestoneRowContent>
        <MilestoneName>{row.title}</MilestoneName>
        <MilestoneDue>{row.until}</MilestoneDue>
      </MilestoneRowContent>
      <MilestoneCheckbox>
        <CheckSvg checked={row.checked}></CheckSvg>
      </MilestoneCheckbox>
    </MilestoneRow>
  );
};

export default MilestonePopUpRow;
