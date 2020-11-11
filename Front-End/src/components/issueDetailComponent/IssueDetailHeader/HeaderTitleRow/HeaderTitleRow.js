import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button, GrayButton } from 'Style';
import { IssueContext } from '../../IssueDetailComponent';

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
const TitleTextarea = styled.textarea`
  width: calc(100% - 200px);
  border-radius: 5px;
`;
const CancelButton = styled(GrayButton)`
  background-color: transparent;
  color: #0366d6;
  border: none;
`;
const ConfirmButton = styled(GrayButton)`
  font-weight: 600;
`;

const HeaderTitleRow = () => {
  const { state } = useContext(IssueContext);
  return (
    <Container>
      {state.editTitle ? (
        <>
          <TitleTextarea></TitleTextarea>
          <ConfirmButton>Save</ConfirmButton>
          <CancelButton>Cancel</CancelButton>
        </>
      ) : (
        <>
          <TitleRowLeft>
            <Title>이슈 제목</Title>
            <IssueId>#N</IssueId>
          </TitleRowLeft>
          <EditBtton>Edit</EditBtton>
        </>
      )}
    </Container>
  );
};

export default HeaderTitleRow;
