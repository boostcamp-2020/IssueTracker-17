import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { getissueList } from '../../api/issueTransaction';
import { getMileStoneList } from '../../api/milestoneTransaction';
import { getLabelList } from '../../api/labelTransaction';
import { NavBar } from '../../style/Layout/Layout';
import { LabelButton, MilestoneButton } from 'Components/common/';
import { FilterBarComponent } from './FilterBar';
import { IssueList } from './issueList';
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
  width: 400px;
`;
const CheckBox = styled.input`
  margin: 11px;
`;
const FilterSelectArea = styled.div`
  display: flex;
  padding: 10px 5px 0px 5px;
  width: 500px;
  justify-content: space-between;
`;

const Caret = styled.span`
  display: block;
  width: 0;
  height: 0;
  vertical-align: middle;
  content: '';
  border-top-style: solid;
  border-top-width: 4px;
  border-right: 4px solid transparent;
  border-bottom: 0 solid transparent;
  border-left: 4px solid transparent;
`;

const FilterColumn = styled.div`
  width: 100px;
  display: flex;
  text-align: center;
  & * {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 2px;
  }
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
        <FilterSelectArea>
          <FilterColumn>
            Author
            <Caret></Caret>
          </FilterColumn>
          <FilterColumn>
            Label <Caret />
          </FilterColumn>
          <FilterColumn>
            Projects <Caret />
          </FilterColumn>
          <FilterColumn>
            MileStones <Caret />
          </FilterColumn>
          <FilterColumn>
            Assignee <Caret />
          </FilterColumn>
          <FilterColumn>
            Sort <Caret />
          </FilterColumn>
        </FilterSelectArea>
      </ListHeader>
      <ListContainer>
        <IssueList issueList={issueList}></IssueList>
      </ListContainer>
    </IssueContainer>
  );
};

export default IssueListComponent;
