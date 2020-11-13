/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { updateMultipleIssue } from '../../../api/issueTransaction';
const PopUpArea = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 350px;
`;
const PopUpBtn = styled.button`
  border: none;
  margin-top: 10px;
  font-weight: bold;
  height: 25px;
`;
const PopUpHeader = styled.div`
  background-color: #f4f4f4;
  height: 20px;
  font-weight: bolder;
`;
const Caret = styled.div`
  display: inline-block;
  margin-left: 4px;
  width: 0;
  height: 0;
  vertical-align: middle;
  content: '';
  border-top-style: solid;
  border-top-width: 4px;
  border-right: 4px solid transparent;
  border-bottom: 0 solid transparent;
  border-left: 4px solid transparent;
`;
const PopUpContent = styled.div`
  display: block;
  ${(props) =>
    !props.popup &&
    css`
      display: none;
    `};
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 5;
`;
const PopUpRow = styled.button`
  color: black;
  width: 200px;
  height: 25px;
  border: none;
  background-color: white;
  border-bottom: 1px solid rgb(225 228 232);
  text-decoration: none;
  display: block;

  &:hover {
    background-color: grey;
  }
`;

const ModalOveray = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: block;
  ${(props) =>
    !props.popup &&
    css`
      display: none;
    `};
  cursor: default;
  content: ' ';
  background: transparent;
`;

export const MarkAsPopUp = (props) => {
  const checkedIdList = props.checkedIdList;
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const onClickPopUpBtn = (e) => {
    setVisible(!visible);
  };

  const onClickSelectBtn = async (e) => {
    const res = updateMultipleIssue({
      status: e.target.value,
      id: checkedIdList,
    });

    setVisible(!visible);
    history.go({
      pathname: '/issue',
    });
  };

  return (
    <PopUpArea>
      <PopUpBtn onClick={onClickPopUpBtn}>
        Mark As<Caret></Caret>
      </PopUpBtn>
      <ModalOveray popup={visible} onClick={onClickPopUpBtn} />
      <PopUpContent popup={visible}>
        <PopUpHeader>Actions</PopUpHeader>
        <PopUpRow value={0} onClick={onClickSelectBtn}>
          Open
        </PopUpRow>
        <PopUpRow value={1} onClick={onClickSelectBtn}>
          Closed
        </PopUpRow>
      </PopUpContent>
    </PopUpArea>
  );
};
