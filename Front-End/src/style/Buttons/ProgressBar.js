import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 8px;
  z-index: 5;
  background-color: #aaaaaa;
`;
const Progress = styled.div`
  width: ${(props) => props.status}%;
  border-radius: 8px;
  border-bottom-right-radius: ${(props) => {
    return props.status != 100 ? 0 : '8px';
  }};
  border-top-right-radius: ${(props) => {
    return props.status != 100 ? 0 : '8px';
  }};
  height: 8px;
  background-color: #2ea44f;
  z-index: 4;
`;

const ProgressBar = ({ status }) => {
  return (
    <Container>
      <Progress status={status}></Progress>
    </Container>
  );
};

export default ProgressBar;
