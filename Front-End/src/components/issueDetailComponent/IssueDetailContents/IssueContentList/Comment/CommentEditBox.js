import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import useDebounce from '@/util/useDebounce';
import { IssueContext } from '../../../IssueDetailComponent';
import { CommentContext } from './Comment';
import { GreenButton, GrayButton, IssueStatusSvg } from 'Style';
import { updateIssue, updateComment, postComment, getComments } from 'Api';

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const Container = styled.div`
  width: calc(100% - 86px);
  height: auto;
  border: 1px solid #cccccc;
  border-radius: 5px;
  margin-left: 15px;
  text-align: left;
  margin-bottom: 70px;
  font-family: inherit;
  padding: 0 15px;
`;
const TabContainer = styled.div`
  margin-top: 10px;
  display: block;
  position: relative;
`;
const TabsDiv = styled.div`
  height: 45px;
  border-bottom: 1px solid #cccccc;
  display: flex;
  justify-content: left;
`;
const Tab = styled.div`
  height: 20px;
  padding: 10px;
  padding-bottom: 5px;
  border: 1px solid #dddddd;
  background-color: white;
  border-bottom: none;
  margin-left: 15px;
  margin-top: 12px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: pointer;
`;
const ContentTextarea = styled.textarea`
  margin-top: 15px;
  max-height: 400px;
  height: 198px;
  min-height: 200px;
  width: calc(100% - 20px);
  padding: 8px;
  resize: vertical;
  border: 1px solid rgb(225, 228, 232);
  border-bottom: 1px dashed rgb(223, 226, 229);
  background-color: rgb(250 251 252);
  border-radius: 6px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  font-family: inherit;
`;
const FileUploader = styled.label`
  width: calc(100% - 14px);
  height: 20px;
  padding: 5px;
  font-size: 14px;
  color: rgb(36 41 46);
  vertical-align: middle;
  background-color: rgb(250 251 252);
  border: 1px solid rgb(225, 228, 232);
  border-top: 0;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-top: -4px;
  cursor: pointer;
`;
const FileInput = styled.input`
  display: none;
`;
const NumCharacters = styled.div`
  position: absolute;
  bottom: 40px;
  right: 15px;
  font-size: 14px;
  color: #777777;
`;
const ButtonContainer = styled.div`
  width: 100%;
  height: 40px;
  text-align: right;
  margin-top: 10px;
`;
const EditHead = styled.div`
  background-color: ${(props) => (props.isIssue ? '#f1f8ff' : '#eeeeee')};
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  margin: 0 -15px;
  margin-top: -10px;
  font-family: inherit;
  border-bottom: 1px solid #cccccc;
`;
const UpdateButton = styled(GreenButton)`
  height: 30px;
  font-weight: 600;
  padding: 5px 12px;
`;
const CancelButton = styled(GrayButton)`
  padding: 5px 12px;
  height: 30px;
  color: #d73a49;
  font-weight: 600;
  margin-right: 8px;
`;
const CloseButton = styled(GrayButton)`
  padding: 5px 12px;
  width: auto;
  height: 30px;
  color: #24292e;
  display: inline-flex;
  justify-content: space-around;
  cursor: pointer;
  font-weight: 400;
  background-color: #fafbfc;
  margin-right: 10px;
  & svg {
    fill: ${(props) => (props.status === 'closed' ? '#28a745' : '#d73a49')};
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
const CloseSvg = styled(IssueStatusSvg)``;

const CommentEditBox = () => {
  const { loginUser, state, dispatch, history, addEditProperty } = useContext(
    IssueContext
  );
  const { row, isIssue } = useContext(CommentContext);
  const [content, setContent] = useState(row.contents);
  const [numCharacters, setNumCharacters] = useState(content.length);
  const debouncedContent = useDebounce(content, 1000);

  const onFileChanged = async (e) => {};
  const updateContent = (e) => {
    setContent(e.target.value);
  };

  const onCancelButtonClicked = (e) => {
    const type = isIssue ? 'EDIT_ISSUE' : 'EDIT_COMMENT';
    dispatch({ type: type, commentId: row.id });
  };
  const onUpdateButtonClicked = async (e) => {
    if (row.id < 0) {
      const data = {
        issueId: state.id,
        contents: content,
        created: new Date().toISOString(),
        emoji: '',
        userId: loginUser.id,
      };
      const postResult = await postComment(data);
      const newComments = await getComments(state.id);
      const comments = addEditProperty(newComments, state.assignees);
      dispatch({
        type: 'REFRESH_COMMENTS',
        comments: comments,
      });
    }

    let result = undefined;
    const type = isIssue ? 'UPDATE_ISSUE' : 'UPDATE_COMMENT';
    if (isIssue) {
      result = await updateIssue({ id: state.id, contents: content });
    } else {
      result = await updateComment({ id: row.id, contents: content });
    }

    dispatch({ type: type, commentId: row.id, contents: content });
  };

  const onCloseButtonClicked = (e) => {
    if (state.status === 'open') {
      dispatch({ type: 'CLOSE_ISSUE' });
      updateIssue({ id: state.id, status: '1' });
    } else {
      dispatch({ type: 'REOPEN_ISSUE' });
      updateIssue({ id: state.id, status: '0' });
    }
  };

  useEffect(() => {
    if (debouncedContent || debouncedContent === '') {
      setNumCharacters(debouncedContent.length);
    }
  });

  return (
    <Wrapper>
      <Avatar src={row.profileUrl} />
      <Container>
        <TabContainer>
          <EditHead isIssue={isIssue}>
            <TabsDiv>
              <Tab>Write</Tab>
            </TabsDiv>
          </EditHead>
          <ContentTextarea
            placeholder="Leave a comment"
            value={content}
            onChange={updateContent}
          />
          <FileUploader htmlFor="img">
            Attatch files by selecting here
          </FileUploader>
          <FileInput
            type="file"
            id="img"
            accept=".gif,.jpeg,.jpg,.png"
            onChange={onFileChanged}
          />
          <NumCharacters>{numCharacters} Characters</NumCharacters>
        </TabContainer>
        <ButtonContainer>
          {row.id > -1 ? (
            <CancelButton onClick={onCancelButtonClicked}>Cancel</CancelButton>
          ) : (
            <CloseButton status={state.status} onClick={onCloseButtonClicked}>
              <CloseSvg status={state.status}></CloseSvg>
              <div>{state.status === 'closed' ? 'Reopen' : 'Close'} issue</div>
            </CloseButton>
          )}
          <UpdateButton onClick={onUpdateButtonClicked}>
            Update Comment
          </UpdateButton>
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
};

export default CommentEditBox;
