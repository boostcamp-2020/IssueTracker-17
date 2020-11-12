import React, { useState, useEffect } from 'react';
import useDebounce from '@/util/useDebounce';
import styled from 'styled-components';
import { postFile } from 'Api';
import { Link, useHistory } from 'react-router-dom';

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
  font-family: inherit;
`;
const TabContainer = styled.div`
  margin-top: 10px;
  display: block;
  position: relative;
`;
const TabsDiv = styled.div`
  height: 35px;
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
const FileInput = styled.input`
  display: none;
`;

const EditBox = ({ confirmData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [numCharacters, setNumCharacters] = useState(content.length);
  const [file, setFile] = useState(null);
  const debouncedContent = useDebounce(content, 1000);
  const history = useHistory();
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  const onFileChanged = (e) => {
    setFile(e.target.files[0]);
  };

  const onCancelButtonClicked = (e) => {};

  const onSubmitButtonClicked = async (e) => {
    await confirmData(title, content);
    history.push('/issue');
  };

  useEffect(() => {
    if (debouncedContent || debouncedContent === '') {
      setNumCharacters(debouncedContent.length);
    }
  });

  useEffect(async () => {
    if (file) {
      const formData = new FormData();
      formData.append('img', file);
      const uri = await postFile(formData);
      setContent(`${content}\n${uri}`);
    }
  }, file);

  return (
    <EditBoxContainer>
      <TitleTextarea placeholder="Title" onChange={updateTitle} />
      <TabContainer>
        <TabsDiv>
          <Tab>Write</Tab>
        </TabsDiv>
        <ContentTextarea
          placeholder="Leave a comment"
          onChange={updateContent}
          value={content}
        />
        <FileUploader htmlFor="img">
          Attatch files by selecting here
        </FileUploader>
        <FileInput
          type="file"
          id="img"
          name="img"
          accept=".gif,.jpeg,.jpg,.png"
          onChange={onFileChanged}
        />
        <NumCharacters>{numCharacters} Characters</NumCharacters>
      </TabContainer>
      <ButtonContainer>
        <Link to="/issue">
          <CancelButton onClick={onCancelButtonClicked}>Cancel</CancelButton>
        </Link>
        <SubmitButton onClick={onSubmitButtonClicked}>
          Submit new issue
        </SubmitButton>
      </ButtonContainer>
    </EditBoxContainer>
  );
};

export default EditBox;
