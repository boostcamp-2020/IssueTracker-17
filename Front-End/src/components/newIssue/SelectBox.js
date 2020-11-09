import React from 'react';
import styled from 'styled-components';
import { GearSvg } from './svg';

const SelectBoxContainer = styled.div`
  padding-top: 16px;
  font-size: 12px;
  color: rgb(88 96 105);
  text-align: left;
  border-bottom: 1px solid #dddddd;
`;
const SelectBoxHeader = styled.div`
  margin-bottom: 8px;
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
const SelectBoxList = styled.div``;

const SelectBox = ({ WrappedComponent, rows, setPopUp, title }) => {
  const setPopUpVisible = () => {
    setPopUp('popup_true');
  };
  return (
    <SelectBoxContainer>
      <SelectBoxHeader onClick={setPopUpVisible}>
        <SelectBoxTitle>{title}</SelectBoxTitle>
        <SelectBoxSvg />
      </SelectBoxHeader>
      <SelectBoxList>
        {rows.map((row, index) => (
          <WrappedComponent row={row} key={index}></WrappedComponent>
        ))}
      </SelectBoxList>
    </SelectBoxContainer>
  );
};

export default SelectBox;
