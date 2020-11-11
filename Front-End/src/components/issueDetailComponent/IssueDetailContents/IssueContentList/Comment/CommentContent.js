import React, { useContext } from 'react';
import styled from 'styled-components';
import { IssueContext } from '../../../IssueDetailComponent';
import { CommentContext } from './Comment';

const Container = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #cccccc;
  border-radius: 5px;
  margin-left: 15px;
  text-align: left;
  margin-bottom: 30px;
`;
const CommentHeader = styled.div`
  background-color: ${(props) => (props.isIssue ? '#f1f8ff' : '#eeeeee')};
  display: flex;
  justify-content: space-between;
`;
const CommentHeaderLeft = styled.div`
  display: flex;
  justify-content: left;
`;
const CommentHeaderRight = styled.div`
  display: flex;
  justify-content: right;
`;
const Author = styled.div``;
const CreatedTime = styled.div``;
const OwnerTag = styled.div`
  display: ${(props) => (props.isOwner ? 'block' : 'none')};
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 0 10px;
`;
const EditButton = styled.button``;
const CommentBody = styled.div``;
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
    <>
      <Avatar src={row.profileUrl}></Avatar>
      <Container>
        <CommentHeader isIssue={isIssue}>
          <CommentHeaderLeft>
            <Author>{row.userName}</Author>
            <CreatedTime>{row.createdAt}</CreatedTime>
          </CommentHeaderLeft>
          <CommentHeaderRight>
            <OwnerTag isOwner={true}>Owner</OwnerTag>
            <EditButton>Edit</EditButton>
          </CommentHeaderRight>
        </CommentHeader>
        <CommentBody>{row.contents}</CommentBody>
      </Container>
    </>
  );
};

export default CommentContent;
