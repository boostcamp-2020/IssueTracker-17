import React, { useEffect, useReducer } from 'react';
import * as reducers from '../../reducer';
import styled from 'styled-components';
import IssueDetailHeader from './IssueDetailHeader/IssueDetailHeader';
import IssueDetailContents from './IssueDetailContents/IssueDetailContents';
import {
  getIssueDetails,
  getUserList,
  getLabelList,
  getMileStoneList,
  getComments,
} from 'Api';
import { NavBar } from 'Style';
import { Redirect } from 'react-router-dom';

const Wrapper = styled.div`
  width: 85%;
  margin: auto;
  margin-top: 50px;
  display: block;
`;

const addCheckedProperty = (list, compare) => {
  return list.map((value) => {
    value.checked = false;
    if (compare.includes(value.id)) {
      value.checked = true;
    }
    return value;
  });
};

const addEditProperty = (list, userList) => {
  return list.map((value) => {
    const user = userList.filter((user) => user.id === value.user_id);
    value.userName = 'Unknown';
    if (user.length > 0) {
      value.userName = user[0].name;
      value.profileUrl = user[0].profile_url;
    }
    value.edit = true;
    return value;
  });
};

const getInitialState = () => {
  return {
    id: 0,
    userId: 0,
    title: '',
    status: 0,
    contents: '',
    createdAt: new Date().toISOString(),
    userName: '',
    profileUrl: '',
    labels: [],
    assignees: [],
    milestones: [],
    comments: [],
  };
};

export const IssueContext = React.createContext();

const IssueDetailComponent = ({ issueId }) => {
  const getinitialData = async () => {
    const issue = await getIssueDetails(issueId);
    const userList = await getUserList();
    const labelList = await getLabelList();
    const milestoneList = await getMileStoneList();
    const hasAssignees = issue.assignees.map((value) => value.id);
    const hasLabels = issue.labels.map((value) => value.id);
    const hasMilestone = [issue.milestone_id];
    const comments = issue.comments;
    return {
      id: issue.id,
      userId: issue.user_id,
      title: issue.title,
      status: issue.status == 0 ? 'open' : 'closed',
      contents: issue.contents,
      created: issue.created,
      userName: issue.userName,
      profileUrl: issue.profileUrl,
      labels: addCheckedProperty(labelList, hasLabels),
      assignees: addCheckedProperty(userList, hasAssignees),
      milestones: addCheckedProperty(milestoneList, hasMilestone),
      comments: addEditProperty(comments, userList),
    };
  };

  const loginUser = JSON.parse(localStorage.getItem('user'));

  const [state, dispatch] = useReducer(
    reducers.issueDetailReducer,
    getInitialState()
  );

  useEffect(async () => {
    const initData = await getinitialData();
    dispatch({ type: 'INIT', initData: initData });
  }, []);

  return (
    <IssueContext.Provider value={{ state, dispatch, loginUser }}>
      <NavBar></NavBar>
      <Wrapper>
        <IssueDetailHeader></IssueDetailHeader>
        <IssueDetailContents></IssueDetailContents>
      </Wrapper>
    </IssueContext.Provider>
  );
};

export default IssueDetailComponent;
