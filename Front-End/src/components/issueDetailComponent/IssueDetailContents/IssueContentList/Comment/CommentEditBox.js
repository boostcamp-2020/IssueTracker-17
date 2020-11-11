import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import useDebounce from '@/util/useDebounce';
import { IssueContext } from '../../../IssueDetailComponent';
import { CommentContext } from './Comment';
import { GreenButton, GrayButton } from 'Style';

const Container = styled.div`
  width: calc(100% - 86px);
  height: auto;
  border: 1px solid #cccccc;
  border-radius: 5px;
  margin-left: 56px;
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

const CommentEditBox = () => {
  const { loginUser } = useContext(IssueContext);
  const { row, isIssue } = useContext(CommentContext);
  const [content, setContent] = useState('');
  const [numCharacters, setNumCharacters] = useState(content.length);
  const debouncedContent = useDebounce(content, 1000);

  const onFileChanged = async (e) => {};
  const updateContent = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (debouncedContent || debouncedContent === '') {
      setNumCharacters(debouncedContent.length);
    }
  });

  return (
    <Container>
      <TabContainer>
        <EditHead isIssue={isIssue}>
          <TabsDiv>
            <Tab>Write</Tab>
          </TabsDiv>
        </EditHead>
        <ContentTextarea
          placeholder="Leave a comment"
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
        <CancelButton>Cancel</CancelButton>
        <UpdateButton>Update Comment</UpdateButton>
      </ButtonContainer>
    </Container>
  );
};

export default CommentEditBox;
