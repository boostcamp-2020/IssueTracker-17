import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IssueContext } from '../../../IssueDetailComponent';
import { SelectBoxContext } from '../SelectBox';
import {
  updateAssignee,
  insertHasLabel,
  deleteHasLabel,
  updateIssue,
} from 'Api';

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

const PopUpBox = ({ category, PopUpRowcomponent, elementRef, popupTitle }) => {
  const { popUp } = useContext(SelectBoxContext);
  const { state, dispatch } = useContext(IssueContext);

  let rows;
  switch (category) {
    case 'Assignees':
      rows = state.assignees;
      break;
    case 'Labels':
      rows = state.labels;
      break;
    case 'Milestone':
      rows = state.milestones;
  }

  const putAssignee = (id) => {
    const data = { issueId: state.id, insertAssignee: [], deleteAssignee: [] };
    const checked = rows.filter((value) => value.id == id)[0].checked;
    if (checked) data.deleteAssignee.push(id);
    else data.insertAssignee.push(id);
    updateAssignee(data);
  };

  const putLabel = (id) => {
    const data = { issueId: state.id, labelId: [id] };
    const checked = rows.filter((value) => value.id == id)[0].checked;
    if (checked) deleteHasLabel(data);
    else insertHasLabel(data);
  };

  const putMilestone = (id) => {
    updateIssue({
      id: state.id,
      milestoneId: id,
    });
  };

  const putChanges = (id) => {
    switch (category) {
      case 'Assignees':
        putAssignee(id);
        break;
      case 'Labels':
        putLabel(id);
        break;
      case 'Milestone':
        putMilestone(id);
        break;
    }
  };

  const updateChecked = (id, source) => {
    if (category === 'Milestone') {
      const milestones = source.map((value) => {
        value.checked = false;
        return value;
      });
      dispatch({ type: 'UNCHECK_MILESTONE', milestones: milestones });
    }
    const updatedItem = source.filter((item) => item.id === +id)[0];
    updatedItem.checked = !updatedItem.checked;
    const updatedItemIndex = source.indexOf(updatedItem);
    const newRows = Object.assign([...source], {
      [updatedItemIndex]: updatedItem,
    });
    dispatch({
      type: 'UPDATE',
      category: category,
      newRows: newRows,
    });
  };

  return (
    <PopupContainer popup={popUp} ref={elementRef}>
      <PopupTitle>{popupTitle}</PopupTitle>
      <PopupList>
        {rows.map((row) => (
          <div
            key={`div${row.id}${row.name}`}
            onClick={(e) => {
              putChanges(row.id);
              updateChecked(row.id, rows);
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
