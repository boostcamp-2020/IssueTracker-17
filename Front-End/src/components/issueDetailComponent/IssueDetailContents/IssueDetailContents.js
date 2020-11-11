import React from 'react';
import styled from 'styled-components';
import SelectBox from './SelectBox/SelectBox';

const Container = styled.div``;
const IssueContentList = styled.div``;
const SelectboxesContiainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 25px;
  padding-top: 30px;
`;

const IssueDetailContents = () => {
  const categories = ['Assignees', 'Labels', 'Milestone'];
  return (
    <Container>
      <IssueContentList></IssueContentList>
      <SelectboxesContiainer>
        {categories.map((value, index) => {
          return (
            <SelectBox key={`Selectbox${index}`} category={value}></SelectBox>
          );
        })}
      </SelectboxesContiainer>
    </Container>
  );
};

export default IssueDetailContents;
