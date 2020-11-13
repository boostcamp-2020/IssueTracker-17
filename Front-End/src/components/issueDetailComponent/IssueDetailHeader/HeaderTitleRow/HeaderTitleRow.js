import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { GrayButton } from 'Style';
import { IssueContext } from '../../IssueDetailComponent';
import { updateIssue } from 'Api';

const Container = styled.div`
  width: 100%;
  font-size: 20px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  padding-left: 0;
  align-items: center;
`;
const TitleRowLeft = styled.div`
  display: flex;
  justify-content: left;
  line-height: 40px;
`;
const Title = styled.div`
  font-size: 30px;
  padding: 5px;
  padding-left: 0;
`;
const IssueId = styled.div`
  color: #586069;
  font-size: 30px;
  padding: 5px;
`;
const EditBtton = styled(GrayButton)`
  font-size: 12px;
  font-weight: 600;
  width: 60px;
  height: 30px;
  font-size: 13px;
  line-height: 10px;
`;
const TitleTextarea = styled.textarea`
  width: calc(100% - 200px);
  border-radius: 5px;
`;
const CancelButton = styled(GrayButton)`
  background-color: transparent;
  color: #0366d6;
  border: none;
`;
const ConfirmButton = styled(GrayButton)`
  font-weight: 600;
`;

const HeaderTitleRow = () => {
  const { state, dispatch } = useContext(IssueContext);
  const [title, setTitle] = useState(state.title);
  const TitleTextareaElement = useRef(null);

  const onEditButtonClicked = (e) => {
    dispatch({ type: 'EDIT_TITLE' });
    setTitle(state.title);
  };

  const onCancelButtonClicked = (e) => {
    dispatch({ type: 'EDIT_TITLE' });
    setTitle(state.title);
  };

  const onSaveButtonClicked = async (e) => {
    dispatch({ type: 'EDIT_TITLE' });
    const result = await updateIssue({
      id: state.id,
      title: title,
    });
    if (`${result}` !== `true`) {
      alert('update failed');
    }
    dispatch({ type: 'UPDATE_TITLE', title: title });
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <Container>
      {state.editTitle ? (
        <>
          <TitleTextarea
            ref={TitleTextareaElement}
            value={title}
            onChange={onTitleChange}
          ></TitleTextarea>
          <ConfirmButton onClick={onSaveButtonClicked}>Save</ConfirmButton>
          <CancelButton onClick={onCancelButtonClicked}>Cancel</CancelButton>
        </>
      ) : (
        <>
          <TitleRowLeft>
            <Title>{state.title}</Title>
            <IssueId>#{state.id}</IssueId>
          </TitleRowLeft>
          <EditBtton onClick={onEditButtonClicked}>Edit</EditBtton>
        </>
      )}
    </Container>
  );
};

export default HeaderTitleRow;
