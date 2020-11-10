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

export const MileStoneRow = (props) => {
  const { title, contents, until } = props.data;
  const opened = 10;
  const closed = 7;
  return (
    <RowContainer>
      <MileStoneContainer>
        <h2>{title}</h2>
        <div>{contents}</div>
        <div>{'Due by ' + makeDateStrFormat(until)}</div>
      </MileStoneContainer>
      <ProgressContainer>
        <ProgressBar width="70%"></ProgressBar>
        <div>
          70% complete {opened} opened {closed} closed
        </div>
        <button>edit</button> <button>close</button> <button>delete</button>
      </ProgressContainer>
    </RowContainer>
  );
};
