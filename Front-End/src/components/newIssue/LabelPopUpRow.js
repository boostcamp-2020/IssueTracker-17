import React from 'react';

const LabelPopUpRow = ({ row }) => {
  return (
    <div className="popupbox__label">
      <div className="popupbox__labelName">{row.name}</div>
    </div>
  );
};

export default LabelPopUpRow;
