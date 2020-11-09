import React, { useState, useEffect } from 'react';
import useDebounce from '../../util/useDebounce.js';
import styled from 'styled-components';
import {} from '../../style';

const EditBoxContainer = styled.div`
  width: 850px;
  height: auto;
  border: 1px solid #cccccc;
  border-radius: 10px;
  margin-left: 15px;
  text-align: left;
  padding: 10px 10px;
`;
const TitleTextarea = styled.textarea`
  padding: 5px 12px;
  vertical-align: middle;
  border: 1px solid rgb(225, 228, 232);
  border-radius: 6px;
  box-sizing: border-box;
  margin-bottom: 10px;
  width: 100%;
  height: 30px;
  background-color: rgb(250 251 252);
  resize: none;
  display: ${(props) => props.display || 'block'};
`;
const TabContainer = styled.div`
  margin-top: 10px;
  display: block;
  position: relative;
`;
const TabsDiv = styled.div`
  border-bottom: 1px solid #cccccc;
`;
const Tab = styled.div``;
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
`;
const FileUploader = styled.div`
  width: calc(100% - 14px);
  height: 20px;
  padding: 5px;
  cursor: pointer;
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
`;
const ButtonContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const CancelButton = styled.button`
  color: black;
  background-color: #f5f5f5;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
`;
const SubmitButton = styled.button`
  color: white;
  background-color: #2ea44f;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
`;
const NumCharacters = styled.div`
  position: absolute;
  bottom: 40px;
  right: 15px;
  font-size: 14px;
  color: #777777;
`;

const EditBox = () => {
  const [content, setContent] = useState('');
  const [numCharacters, setNumCharacters] = useState(content.length);

  const debouncedContent = useDebounce(content, 1000);

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (debouncedContent || debouncedContent === '') {
      setNumCharacters(debouncedContent.length);
    }
  });

  return (
    <EditBoxContainer>
      <TitleTextarea placeholder="Title" />
      <TabContainer>
        <TabsDiv>
          <Tab>Write</Tab>
        </TabsDiv>
        <ContentTextarea
          placeholder="Leave a comment"
          onChange={updateContent}
        />
        <FileUploader>Attatch files by selecting here</FileUploader>
        <NumCharacters>{numCharacters} Characters</NumCharacters>
      </TabContainer>
      <ButtonContainer>
        <CancelButton>Cancel</CancelButton>
        <SubmitButton>Submit new issue</SubmitButton>
      </ButtonContainer>
    </EditBoxContainer>
  );
};

export default EditBox;
