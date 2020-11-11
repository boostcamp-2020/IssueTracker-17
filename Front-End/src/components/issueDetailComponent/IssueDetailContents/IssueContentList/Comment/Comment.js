import React from 'react';
import styled from 'styled-components';
import CommentContent from './CommentContent';
import CommentEditBox from './CommentEditBox';

const CommentContainer = styled.div``;

export const CommentContext = React.createContext();

const Comment = ({ row, isIssue }) => {
  const isEdit = row.edit;
  return (
    <CommentContext.Provider value={{ row, isIssue }}>
      <CommentContainer>
        {isEdit ? (
          <CommentEditBox></CommentEditBox>
        ) : (
          <CommentContent></CommentContent>
        )}
      </CommentContainer>
    </CommentContext.Provider>
  );
};

export default Comment;
