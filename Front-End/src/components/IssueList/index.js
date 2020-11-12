import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { getissueList } from '../../api/issueTransaction';
import { getMileStoneList } from '../../api/milestoneTransaction';
import { getLabelList } from '../../api/labelTransaction';
import { NavBar } from '../../style/Layout/Layout';
import { LabelButton, MilestoneButton } from 'Components/common/';
import { FilterBarComponent } from './FilterBar';
import { IssueList } from './issueList';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100vh;
    font-family: Helvetica, Arial, sans-serif;
  }
  #app {
    width: 100%;
    height: 100%;
    
  }
  * {
    border:1px solid black;
  }
`;
const TopMenuBar = styled.div`
  display: flex;
  border: none;
  height: 40px;
  padding: 5px;
  justify-content: space-between;
`;

const IssueContainer = styled.div`
  width: 85%;
  margin: auto;
`;

const ListHeader = styled.div`
  display: flex;
  border: 1px solid rgb(225 228 232);
  border-bottom: none;
  height: 40px;
  padding: 5px;
  justify-content: space-between;
  background-color: #f4f4f4;
`;
const ListContainer = styled.div`
  border: 1px solid rgb(225 228 232);
`;

const AllSelectChkboxArea = styled.div`
  width: 50%;
`;
const FilterSelectArea = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-between;
`;

const IssueListComponent = () => {
  const [issueList, setIssueList] = useState([]);
  const [labelList, setLabelList] = useState([]);
  const [mileStoneList, setMilestonelist] = useState([]);

  useEffect(async () => {
    const res = await getissueList();
    setIssueList(res);
  }, []);
  useEffect(async () => {
    const res = await getMileStoneList();
    setMilestonelist(res);
  }, []);
  useEffect(async () => {
    const res = await getLabelList();
    setLabelList(res);
  }, []);

  return (
    <IssueContainer>
      <GlobalStyle />
      <NavBar></NavBar>
      <TopMenuBar>
        <FilterBarComponent />
        <LabelButton />
        <MilestoneButton />
      </TopMenuBar>

      <ListHeader>
        <AllSelectChkboxArea>
          <input type="checkbox"></input>
        </AllSelectChkboxArea>
        <FilterSelectArea>
          <div>Author</div>
          <div>Label</div>
          <div>Projects</div>
          <div>MileStones</div>
          <div>Assignee</div>
          <div>Sort</div>
        </FilterSelectArea>
      </ListHeader>
      <ListContainer>
        <IssueList issueList={issueList}></IssueList>
      </ListContainer>
    </IssueContainer>
  );
};

export default IssueListComponent;
