/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import styled from 'styled-components';

const OuterProgressBar = styled.span`
  display: flex;
  height: 10px;
  overflow: hidden;
  background-color: rgb(225 228 232);
  border-radius: 6px;
  outline: 1px solid transparent;
`;

const InnerProgressBar = styled.span`
  outline: 2px solid transparent;
  background-color: #2c974b;
  width: ${(props) => (props.width ? props.width : '0%')};
`;

export const ProgressBar = (props) => {
  console.log(props);
  return (
    <OuterProgressBar>
      <InnerProgressBar width={props.width}></InnerProgressBar>
    </OuterProgressBar>
  );
};
