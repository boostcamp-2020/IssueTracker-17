import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { getissueList } from '../../api/issueTransaction';
import { getMileStoneList } from '../../api/milestoneTransaction';
import { getUser } from 'Api/userTransaction';
import { getLabelList } from '../../api/labelTransaction';
import { NavBar } from '../../style/Layout/Layout';
import { LabelButton, MilestoneButton } from 'Components/common/';
import { FilterBarComponent } from './FilterBar';
import { IssueList } from './issueList';
import { FilterSelectArea } from './FilterSelectArea/FilterSelectArea';
import { GreenButton, GrayButton } from 'Style';

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

  a{
    text-decoration: none;
    color:black;

  }

`;
const TopMenuBar = styled.div`
  display: flex;
  border: none;
  height: 40px;

  margin-bottom: 15px;
  justify-content: space-between;
`;
const MenuHeaderArea = styled.div`
  & * {
    margin: 3px 5px 0px 0px;
  }
`;
const IssueContainer = styled.div`
  width: 1024px;
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

const CheckBox = styled.input`
  margin: 11px;
`;

const IssueListComponent = () => {
  const [issueList, setIssueList] = useState([]);
  const [labelList, setLabelList] = useState([]);
  const [mileStoneList, setMilestonelist] = useState([]);
  const [assigneeList, setAssigneeList] = useState([]);
  const [authorList, setAuthorList] = useState([]);

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
  useEffect(async () => {
    const res = await getUser();
    setAssigneeList(res);
    setAuthorList(res);
  })

  return (
    <IssueContainer>
      <GlobalStyle />

      <TopMenuBar>
        <FilterBarComponent />
        <MenuHeaderArea>
          <LabelButton count={labelList.length} />
          <MilestoneButton count={mileStoneList.length} />
          <GreenButton>New Issue</GreenButton>
        </MenuHeaderArea>
      </TopMenuBar>

      <ListHeader>
        <AllSelectChkboxArea>
          <CheckBox type="checkbox" />
        </AllSelectChkboxArea>
        <FilterSelectArea />
      </ListHeader>
      <ListContainer>
        <IssueList issueList={issueList}></IssueList>
      </ListContainer>
    </IssueContainer>
  );
};

export default IssueListComponent;
