import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GearSvg } from 'Style';
import SelectBoxList from './SelectBoxRows/SelectBoxList';
import PopUpBox from './PopUpBox/PopUpBox';
import AssigneeRow from './SelectBoxRows/AssigneeRow';
import LabelRow from './SelectBoxRows/LabelRow';
import MilestoneRow from './SelectBoxRows/MilestoneRow';
import AssigneePopUpRow from './PopUpBox/PopUpBoxRows/AssigneePopUpRow';
import LabelPopUpRow from './PopUpBox/PopUpBoxRows/LabelPopUpRow';
import MilestonePopUpRow from './PopUpBox/PopUpBoxRows/MilestonePopUpRow';
import { IssueContext } from '../../IssueDetailComponent';
import {
  updateAssignee,
  insertHasLabel,
  deleteHasLabel,
  updateIssue,
} from 'Api';

const SelectBoxContainer = styled.div`
  padding-top: 16px;
  font-size: 12px;
  color: rgb(88 96 105);
  text-align: left;
  padding-bottom: 8px;
  border-bottom: 1px solid #dddddd;
  position: relative;
`;
const SelectBoxHeader = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  cursor: pointer;
  & svg {
    fill: #9c9c9c;
  }
  &:hover {
    color: rgb(3 102 214);
  }
  &:hover svg {
    fill: rgb(3 102 214);
  }
`;
const SelectBoxSvg = styled(GearSvg)``;
const SelectBoxTitle = styled.div``;

export const SelectBoxContext = React.createContext({ popUp: 'none' });

const SelectBox = ({ category }) => {
  const popupElement = useRef(null);
  const selectBoxHeaderElement = useRef(null);
  const [popUp, setPopUp] = useState('none');
  const { state, dispatch } = useContext(IssueContext);
  // const [previousState, setPreviousState] = useState({
  //   assignees: [...state.assignees],
  //   labels: [...state.labels],
  // });

  const getValues = (category) => {
    switch (category) {
      case 'Assignees':
        return {
          popupTitle: 'Assign up to 10 people to this issue',
          RowComponent: AssigneeRow,
          PopUpRowcomponent: AssigneePopUpRow,
          rows: state.assignees,
        };
      case 'Labels':
        return {
          popupTitle: 'Apply labels to this issue',
          RowComponent: LabelRow,
          PopUpRowcomponent: LabelPopUpRow,
          rows: state.labels,
        };
      case 'Milestone':
        return {
          popupTitle: 'Set milestone',
          RowComponent: MilestoneRow,
          PopUpRowcomponent: MilestonePopUpRow,
          rows: state.milestones,
        };
      default:
        return {};
    }
  };

  const values = getValues(category);

  const setPopUpVisible = () => {
    setPopUp('block');
  };

  // const putAssignee = () => {
  //   const data = state.assignees.reduce(
  //     (prev, value, index) => {
  //       if (value.checked && !previousState.assignees[index])
  //         return {
  //           ...prev,
  //           insertAssignee: [...prev.insertAssignee, value.id],
  //         };
  //       else if (!value.checked && previousState.assignees[index])
  //         return {
  //           ...prev,
  //           deleteAssignee: [...prev.deleteAssignee, value.id],
  //         };
  //       else return { ...prev };
  //     },
  //     { insertAssignee: [], deleteAssignee: [] }
  //   );
  //   data.issueId = state.id;
  //   if (data.insertAssignee.length > 0 || data.deleteAssignee.length > 0)
  //     updateAssignee(data);
  // };

  // const putLabels = () => {
  //   const data = state.labels.reduce(
  //     (prev, value, index) => {
  //       if (value.checked && !previousState.labels[index])
  //         return {
  //           ...prev,
  //           insertAssignee: [...prev.insertAssignee, value.id],
  //         };
  //       else if (!value.checked && previousState.labels[index])
  //         return {
  //           ...prev,
  //           deleteAssignee: [...prev.deleteAssignee, value.id],
  //         };
  //       else return { ...prev };
  //     },
  //     { insert: [], delete: [] }
  //   );
  //   const insertData = { issueId: state.id, labelId: [...data.insert] };
  //   const deleteData = { labelId: [...data.delete] };
  //   insertHasLabel(insertData);
  //   deleteHasLabel(deleteData);
  // };

  const onClickOutsideHandler = (event) => {
    if (selectBoxHeaderElement.current.contains(event.target)) {
      return;
    }
    if (popUp === 'block' && !popupElement.current.contains(event.target)) {
      setPopUp('none');

      // switch (category) {
      //   case 'Assignees':
      //     putAssignee();
      //     break;
      //   case 'Labels':
      //     putLabels();
      //     break;
      //   case 'Milestone':
      //     const milestoneId = state.milestones.filter((value) => value.checked);
      //     updateIssue({ id: state.id, milestoneId: milestoneId });
      // }
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler);
  });

  return (
    <SelectBoxContext.Provider value={{ popUp: popUp, rows: values.rows }}>
      <SelectBoxContainer>
        <SelectBoxHeader onClick={setPopUpVisible} ref={selectBoxHeaderElement}>
          <SelectBoxTitle>{category}</SelectBoxTitle>
          <SelectBoxSvg />
        </SelectBoxHeader>
        <SelectBoxList
          category={category}
          rows={values.rows.filter((item) => item.checked)}
          RowComponent={values.RowComponent}
        />
        <PopUpBox
          category={category}
          elementRef={popupElement}
          popupTitle={values.popupTitle}
          PopUpRowcomponent={values.PopUpRowcomponent}
        ></PopUpBox>
      </SelectBoxContainer>
    </SelectBoxContext.Provider>
  );
};

export default SelectBox;
