import React, { useContext } from 'react';
import styled from 'styled-components';
import { IssueContext } from '../../../IssueDetailComponent';
import { SelectBoxContext } from '../SelectBox';

const PopupContainer = styled.div`
  display: ${(props) => props.popup};
  position: absolute;
  top: 40px;
  right: 0px;
  z-index: 10;
  width: 105%;
  background-color: white;
  border: 1px solid #dddddd;
  border-radius: 3px;
  overflow-x: hidden;
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
const PopupList = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 50vh;
`;

const updateChecked = (id, source, dispatch, category) => {
  if (category === 'Milestone') {
    dispatch(
      source.map((value) => {
        value.checked = false;
        return value;
      })
    );
  }
  const updatedItem = source.filter((item) => item.id === +id)[0];
  updatedItem.checked = !updatedItem.checked;
  const updatedItemIndex = source.indexOf(updatedItem);
  dispatch(Object.assign([...source], { [updatedItemIndex]: updatedItem }));
};

const PopUpBox = ({ category, PopUpRowcomponent, elementRef, popupTitle }) => {
  const { popUp, rows } = useContext(SelectBoxContext);
  const { dispatch } = useContext(IssueContext);
  return (
    <PopupContainer popup={popUp} ref={elementRef}>
      <PopupTitle>{popupTitle}</PopupTitle>
      <PopupList>
        {rows.map((row) => (
          <div
            key={`div${row.id}${row.name}`}
            onClick={() => {
              updateChecked(row.id, rows, dispatch, category);
            }}
          >
            <PopUpRowcomponent
              key={`${row.id}${row.name}`}
              row={row}
            ></PopUpRowcomponent>
          </div>
        ))}
      </PopupList>
    </PopupContainer>
  );
};

export default PopUpBox;
