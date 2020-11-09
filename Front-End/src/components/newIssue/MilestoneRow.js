import React from 'react';
import styled from 'styled-components';
import { ProgressBar } from '../../style';

const Milestone = styled.div``;
const MilestoneName = styled.div`
  padding-top: 10px;
  font-weight: 600;
`;
const MilestoneRow = ({ row }) => {
  return (
    <Milestone>
      <ProgressBar status={row.status}></ProgressBar>
      <MilestoneName>{row.milestoneName}</MilestoneName>
    </Milestone>
  );
};

export default MilestoneRow;
