/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import styled from 'styled-components';
import { ProgressBar } from './ProgressBar';

const makeDateStrFormat = (date) => {
  const options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

const RowContainer = styled.div`
  padding: 5px;
  border-bottom: 1px solid rgb(225 228 232);
  display: flex;
  justify-content: stretch;
`;

const MileStoneContainer = styled.div`
  width: 50%;
`;

const ProgressContainer = styled.div`
  width: 50%;
`;

const Btn = styled.button`
  border: none;
  color: ${(props) => (props.color ? props.color : 'blue')};
`;

const onEdit = () => {};
const onClose = () => {};
const onDelete = () => {};


export const MileStoneRow = (props) => {
  const { title, contents, until, issues } = props.data;
  let opened = 0;
  let closed = 0;

  issues.forEach((issue) => {
    issue.status === 0 ? (opened += 1) : (closed += 1);
  });

  const progress =
    opened + closed === 0 ? 0 : (closed / (opened + closed)) * 100;

  return (
    <RowContainer>
      <MileStoneContainer>
        <h2>{title}</h2>
        <div>{contents}</div>
        <div>{'Due by ' + makeDateStrFormat(until)}</div>
      </MileStoneContainer>
      <ProgressContainer>
        <ProgressBar width={progress + '%'}></ProgressBar>
        <div>
          {progress} %complete {opened} opened {closed} closed
        </div>
        <Btn>edit</Btn> <Btn>close</Btn> <Btn color="red">delete</Btn>
      </ProgressContainer>
    </RowContainer>
  );
};
