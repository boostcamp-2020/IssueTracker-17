import React from 'react';
import styled from 'styled-components';
import { GreenButton, IssueStatusSvg } from 'Style';

const Container = styled.div`
  display: flex;
  justify-content: left;
  height: 40px;
`;
const StatusBox = styled(GreenButton)`
  padding: 8px 5px;
  width: 80px;
  height: 35px;
  color: white;
  display: flex;
  justify-content: space-around;
  cursor: unset;
  background-color: ${(props) =>
    props.status === 'closed' ? '#d73a49' : '#28a745'};
  & svg {
    fill: white;
    width: 16px;
    height: 16px;
  }
  margin-right: 10px;
`;
const IssueStatus = styled(IssueStatusSvg)``;
const Author = styled.div`
  padding: 10px 5px;
  font-weight: 600;
  color: #586069;
`;
const Details = styled.div`
  padding: 10px 5px;
  padding-left: 0;
  color: #586069;
`;

const HeaderDetailRow = () => {
  return (
    <Container>
      <StatusBox status={'closed'}>
        <IssueStatus status={'closed'}></IssueStatus>
        <div>Closed</div>
      </StatusBox>
      <Author>Author</Author>
      <Details>opened this issue N days ago · N comments</Details>
    </Container>
  );
};

export default HeaderDetailRow;
