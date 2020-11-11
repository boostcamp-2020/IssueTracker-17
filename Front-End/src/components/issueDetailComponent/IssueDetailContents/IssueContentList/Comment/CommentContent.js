import React, { useContext } from 'react';
import styled from 'styled-components';
import { IssueContext } from '../../../IssueDetailComponent';
import { CommentContext } from './Comment';

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
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 0 10px;
`;
const EditButton = styled.button`
  display: ${(props) => (props.isOwner ? 'block' : 'none')};
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
  const { loginUser } = useContext(IssueContext);
  const { row, isIssue } = useContext(CommentContext);
  const isOwner = row.userId === loginUser.id;
  return (
    <Container>
      <Avatar src={row.profileUrl}></Avatar>
      <CommentContainer>
        <CommentHeader isIssue={isIssue}>
          <CommentHeaderLeft>
            <Author>{row.userName}</Author>
            <CreatedTime>commented at {row.created}</CreatedTime>
          </CommentHeaderLeft>
          <CommentHeaderRight>
            <OwnerTag isOwner={isOwner}>Owner</OwnerTag>
            <EditButton isOwner={isOwner}>Edit</EditButton>
          </CommentHeaderRight>
        </CommentHeader>
        <CommentBody>{row.contents}</CommentBody>
      </CommentContainer>
    </Container>
  );
};

export default CommentContent;
