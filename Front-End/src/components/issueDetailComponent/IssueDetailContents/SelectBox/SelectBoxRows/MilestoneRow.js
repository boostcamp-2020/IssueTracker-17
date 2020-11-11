import React from 'react';
import styled from 'styled-components';
import { ProgressBar } from 'Style';

const Milestone = styled.div``;
const MilestoneName = styled.div`
  padding-top: 10px;
  font-weight: 600;
`;

const MilestoneRow = ({ row }) => {
  const getStatus = () => {
    if (row.issues.length == 0) {
      return 0;
    }
    const closed = row.issues.filter((value) => value.status == 1);
    return (closed.length / row.issues.length) * 100;
  };

  return (
    <Milestone>
      <ProgressBar status={getStatus()}></ProgressBar>
      <MilestoneName>{row.title}</MilestoneName>
    </Milestone>
  );
};

export default MilestoneRow;
