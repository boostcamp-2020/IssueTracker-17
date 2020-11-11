import React from 'react';
import styled from 'styled-components';
import { GrayButton } from '../../../../style';

const Container = styled.div`
  width: 100%;
  font-size: 20px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  padding-left: 0;
  align-items: center;
`;
const TitleRowLeft = styled.div`
  display: flex;
  justify-content: left;
  line-height: 40px;
`;
const Title = styled.div`
  font-size: 30px;
  padding: 5px;
  padding-left: 0;
`;
const IssueId = styled.div`
  color: #586069;
  font-size: 30px;
  padding: 5px;
`;
const EditBtton = styled(GrayButton)`
  font-size: 12px;
  font-weight: 600;
  width: 60px;
  height: 30px;
  font-size: 13px;
`;

const HeaderTitleRow = () => {
  return (
    <Container>
      <TitleRowLeft>
        <Title>이슈 제목</Title>
        <IssueId>#N</IssueId>
      </TitleRowLeft>
      <EditBtton>Edit</EditBtton>
    </Container>
  );
};

export default HeaderTitleRow;
