import React from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  display: ${(props) => props.popup};
  position: absolute;
  top: 40px;
  right: 0px;
  z-index: 10;
  width: 105%;
  background-color: white;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid #dddddd;
  border-radius: 3px;
`;
const PopupTitle = styled.div`
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  width: 100%;
  background-color: #f5f5f5;
  font-weight: 600;
  border-bottom: 1px solid #dddddd;
`;
const PopupList = styled.div``;

const PopUpBox = ({ popupTitle, WrappedComponent, popup, rows }) => {
  return (
    <PopupContainer popup={popup}>
      <PopupTitle>{popupTitle}</PopupTitle>
      <PopupList>
        {rows.map((row) => (
          <WrappedComponent row={row}></WrappedComponent>
        ))}
      </PopupList>
    </PopupContainer>
  );
};

export default PopUpBox;
