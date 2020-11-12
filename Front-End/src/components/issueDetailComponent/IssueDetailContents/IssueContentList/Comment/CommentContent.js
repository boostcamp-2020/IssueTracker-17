import React, { useContext } from 'react';
import styled from 'styled-components';
import { IssueContext } from '../../../IssueDetailComponent';
import { CommentContext } from './Comment';
import { calcTime } from '@/util/calcTime';

const Container = styled.div`
  display: flex;
  justify-content: 'left';
`;

const CommentContainer = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #cccccc;
  border-radius: 5px;
  margin-left: 15px;
  text-align: left;
  margin-bottom: 70px;
  font-family: inherit;
`;
const CommentHeader = styled.div`
  background-color: ${(props) => (props.isIssue ? '#f1f8ff' : '#eeeeee')};
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  padding: 8px 20px;
  font-family: inherit;
  border-bottom: 1px solid #cccccc;
`;
const CommentHeaderLeft = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 5px;
`;
const CommentHeaderRight = styled.div`
  display: flex;
  justify-content: right;
`;
const Author = styled.div`
  font-weight: 600;
`;
const CreatedTime = styled.div`
  padding: 0 8px;
  color: #555555;
`;
const OwnerTag = styled.div`
  display: ${(props) => (props.isOwner ? 'block' : 'none')};
  border: 1px solid #aaaaaa;
  border-radius: 5px;
  padding: 5px;
  margin: 0 10px;
  font-size: 14px;
`;
const EditButton = styled.button`
  display: ${(props) => (props.isAuthor ? 'block' : 'none')};
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const CommentBody = styled.div`
  padding: 15px 20px;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const CommentContent = () => {
  const { state, loginUser, dispatch } = useContext(IssueContext);
  const { row, isIssue } = useContext(CommentContext);
  const isOwner = row.user_id === state.userId;
  const isAuthor = row.user_id === loginUser.id;

  const onEditButtonClicked = (e) => {
    const type = isIssue ? 'EDIT_ISSUE' : 'EDIT_COMMENT';
    dispatch({ type: type, commentId: row.id });
  };

  return (
    <Container>
      <Avatar src={row.profileUrl}></Avatar>
      <CommentContainer>
        <CommentHeader isIssue={isIssue}>
          <CommentHeaderLeft>
            <Author>{row.userName}</Author>
            <CreatedTime>commented {calcTime(row.created)}</CreatedTime>
          </CommentHeaderLeft>
          <CommentHeaderRight>
            <OwnerTag isOwner={isOwner}>Owner</OwnerTag>
            <EditButton isAuthor={isAuthor} onClick={onEditButtonClicked}>
              Edit
            </EditButton>
          </CommentHeaderRight>
        </CommentHeader>
        <CommentBody>{row.contents}</CommentBody>
      </CommentContainer>
    </Container>
  );
};

export default CommentContent;
