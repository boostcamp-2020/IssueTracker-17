import React from 'react';
import styled from 'styled-components';
import HeaderTitleRow from './HeaderTitleRow/HeaderTitleRow';
import HeaderDetailRow from './HeaderDetailRow/HeaderDetailRow';

const Container = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #cccccc;
`;

const IssueDetailHeader = () => {
  return (
    <Container>
      <HeaderTitleRow></HeaderTitleRow>
      <HeaderDetailRow></HeaderDetailRow>
    </Container>
  );
};

export default IssueDetailHeader;
