import React from 'react';

const SelectBox = ({ WrappedComponent, rows, setPopUp }) => {
  const setPopUpVisible = () => {
    setPopUp('popup_true');
  };

  return (
    <div className="selectbox">
      <div className="selectbox__header">
        <div className="selectbox__title"></div>
        <button
          className="selectbox__button"
          onClick={setPopUpVisible}
        ></button>
      </div>
      <div className="selectbox__list">
        {rows.map((row) => (
          <WrappedComponent row={row}></WrappedComponent>
        ))}
      </div>
    </div>
  );
};

export default SelectBox;
