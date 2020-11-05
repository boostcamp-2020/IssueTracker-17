import React from 'react';

const PopUpBox = ({ WrappedComponent, rows }) => {
  return (
    <div className="popupbox">
      <div className="popupbox__title"></div>
      <div className="popupbox__list">
        {rows.map((row) => (
          <WrappedComponent row={row}></WrappedComponent>
        ))}
      </div>
    </div>
  );
};

export default PopUpBox;
