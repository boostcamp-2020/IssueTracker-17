import React from 'react';

const MilestoneRow = ({ row }) => {
  return (
    <div className="selectbox__milestone">
      <ProgressBar></ProgressBar>
      <div className="selecbox__milestoneName">{row.milestoneName}</div>
    </div>
  );
};

export default MilestoneRow;
