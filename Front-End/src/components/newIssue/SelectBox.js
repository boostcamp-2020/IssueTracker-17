import React from 'react';
import styled from 'styled-components';
import { GearSvg } from './svg';
import SelectBoxList from './SelectBoxList';
import PopUpBox from './PopUpBox';
import AssigneePopUpRow from './AssigneePopUpRow';
import LabelPopUpRow from './LabelPopUpRow';
import MilestonePopUpRow from './MilestonePopUpRow';

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

const getValues = (title) => {
  switch (title) {
    case 'Assignees':
      return {
        popupTitle: 'Assign up to 10 people to this issue',
        component: AssigneePopUpRow,
      };
    case 'Labels':
      return {
        popupTitle: 'Apply labels to this issue',
        component: LabelPopUpRow,
      };
    case 'Milestone':
      return {
        popupTitle: 'Set milestone',
        component: MilestonePopUpRow,
      };
    default:
      return '';
  }
};

const SelectBox = ({ WrappedComponent, rows, title, popUp, setPopUp }) => {
  const values = getValues(title);
  const setVisible = () => {
    setPopUp('block');
  };

  return (
    <SelectBoxContainer>
      <SelectBoxHeader onClick={setVisible}>
        <SelectBoxTitle>{title}</SelectBoxTitle>
        <SelectBoxSvg />
      </SelectBoxHeader>
      <SelectBoxList
        title={title}
        rows={rows}
        WrappedComponent={WrappedComponent}
      />
      <PopUpBox
        popupTitle={values.popupTitle}
        WrappedComponent={values.component}
        popup={popUp}
        rows={[]}
      ></PopUpBox>
    </SelectBoxContainer>
  );
};

export default SelectBox;
