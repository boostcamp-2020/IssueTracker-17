import React, { useContext } from 'react';
import styled from 'styled-components';
import Comment from './Comment/Comment';
import { IssueContext } from '../../IssueDetailComponent';

const Container = styled.div`
  width: calc(100% - 320px);
  padding-top: 40px;
`;

const IssueContentList = () => {
  const { state, dispatch } = useContext(IssueContext);
  const rows = state.comments;
  const issueDetailRow = {
    id: state.id,
    user_id: state.user_id,
    userName: state.userName,
    contents: state.contents,
    created: state.created,
    profileUrl: state.profileUrl,
    edit: true,
  };

  return (
    <Container>
      <Comment row={issueDetailRow} isIssue={true} key={'main_issue'}></Comment>
      {rows.map((row, index) => (
        <Comment row={row} isIssue={false} key={index}></Comment>
      ))}
    </Container>
  );
};

export default IssueContentList;
