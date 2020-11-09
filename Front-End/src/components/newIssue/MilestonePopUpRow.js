import React from 'react';
import styled from 'styled-components';

const MilestoneRow = styled.div`
  padding: 5px 0;
  padding-left: 20px;
  border-bottom: 1px solid #dddddd;
`;
const MilestoneName = styled.div`
  font-weight: 600;
`;
const MilestoneDue = styled.div`
  font-size: 11px;
  padding-top: 5px;
`;

const MilestonePopUpRow = ({ row }) => {
  return (
    <MilestoneRow>
      <MilestoneName>{row.milestoneName}</MilestoneName>
      <MilestoneDue>No due date</MilestoneDue>
    </MilestoneRow>
  );
};

export default MilestonePopUpRow;
