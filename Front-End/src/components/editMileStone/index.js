import React, { useEffect, useState, useCallback } from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { useLocation, useHistory } from 'react-router';
import { NavBar } from '../../style/Layout/Layout';
import { LabelButton, MilestoneButton } from 'Components/common/';
import { GreenButton, GrayButton } from 'Style';
import {
  STATUS,
  getMileStoneById,
  addNewMileStone,
  editNewMileStone,
} from '../../api/milestoneTransaction';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    width: 100%;
    height: 100vh;
    font-family: Helvetica, Arial, sans-serif;
  }
  #app {
    width: 100%;
    height: 100%;

  }
  label{
    font-size : larger;
    font-weight:bold;

  }
  dt,dd ,dl{
    margin-bottom:25px;
    margin-left:0px;
  }

`;

const InputForm = styled.input`
  padding: 5px 12px;
  margin: 5px;
  font-size: 14px;
  line-height: 20px;
  width: 50%;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(225, 228, 232, 0.2);
`;
const TextAreaForm = styled.textarea`
  padding: 5px 12px;
  margin: 5px;
  font-size: 14px;
  line-height: 20px;
  width: 50%;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(225, 228, 232, 0.2);
`;

const MileStoneContainer = styled.div`
  margin: auto;
  width: 1024px;
`;
const MenuHeaderArea = styled.div``;

const BottomBtnsArea = styled.div`
  text-align: right;
`;

function getFormatDate(date) {
  const year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : '0' + month;
  let day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  return year + '-' + month + '-' + day;
}

const EditMileStoneComponent = ({ match }) => {
  const [title, setTitle] = useState('');
  const [until, setUntil] = useState(getFormatDate(new Date()));
  const [contents, setContents] = useState('');
  const [status, setStatus] = useState(STATUS.open);
  const [mode, setMode] = useState(match.params.mode);

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  });
  const onChangeUntil = useCallback((e) => {
    setUntil(e.target.value);
  });
  const onChangeContents = useCallback((e) => {
    setContents(e.target.value);
  });

  const history = useHistory();
  const location = useLocation();

  const onSubmitNew = useCallback(async (e) => {
    const data = { title, until, contents, status };
    const res = await addNewMileStone(data);
    alert(res);
    history.push({
      pathname: '/milestone',
    });
  });

  const onSubmitEdit = useCallback(async (e) => {
    const id = parseInt(location.search.split('?id=')[1]);
    const data = { id, title, until, contents, status };
    const res = await editNewMileStone(data);
    alert(res);
    history.push({
      pathname: '/milestone',
    });
  });
  const onSubmitCloseState = useCallback(async (e) => {
    const id = parseInt(location.search.split('?id=')[1]);
    const data = { id, status: STATUS.closed };
    const res = await editNewMileStone(data);
    setStatus(STATUS.closed);
    history.push({
      pathname: '/milestone',
    });
  });
  const onSubmitReopenState = useCallback(async (e) => {
    const id = parseInt(location.search.split('?id=')[1]);
    const data = { id, status: STATUS.open };
    const res = await editNewMileStone(data);
    setStatus(STATUS.open);
    history.push({
      pathname: '/milestone',
    });
  });

  const onClickCancel = useCallback(async (e) => {
    history.push({
      pathname: '/milestone',
    });
  });

  if (!(mode === 'new' || mode === 'edit')) {
    history.push({
      pathname: '/milestone',
    });
  }

  useEffect(async () => {
    if (mode === 'edit') {
      const targetId = parseInt(location.search.split('?id=')[1]);
      const data = await getMileStoneById(targetId);
      setTitle(data.title);
      setUntil(getFormatDate(new Date(data.until)));
      setStatus(data.status);
      setContents(data.contents);
    }
  }, []);

  return (
    <MileStoneContainer>
      <GlobalStyle></GlobalStyle>

      {mode === 'new' ? (
        <h2>New milestone</h2>
      ) : (
        <MenuHeaderArea>
          <LabelButton />
          <MilestoneButton color="#0366d6" />
        </MenuHeaderArea>
      )}

      <hr></hr>

      <div>
        <dl>
          <dt>
            <label htmlFor="title">Title</label>
          </dt>
          <dd>
            <InputForm
              type="text"
              placeholder="Title"
              id="title"
              value={title}
              onChange={onChangeTitle}
            />
          </dd>
        </dl>

        <dl>
          <dt>
            <label>Due date (optional)</label>
          </dt>
          <dd>
            <InputForm type="date" value={until} onChange={onChangeUntil} />
          </dd>
        </dl>
        <dl>
          <dt>
            <label>Description (optional)</label>
          </dt>
          <dd>
            <TextAreaForm value={contents} onChange={onChangeContents} />
          </dd>
        </dl>
      </div>
      <hr></hr>

      <BottomBtnsArea>
        <GrayButton onClick={onClickCancel}>cancel</GrayButton>
        {mode === 'new' ? (
          <GreenButton onClick={onSubmitNew}>create milestone</GreenButton>
        ) : (
          <>
            {status === STATUS.open ? (
              <GrayButton onClick={onSubmitCloseState}>
                Close milestone
              </GrayButton>
            ) : (
              <GrayButton onClick={onSubmitReopenState}>
                Reopen milestone
              </GrayButton>
            )}

            <GreenButton onClick={onSubmitEdit}>Edit milestone</GreenButton>
          </>
        )}
      </BottomBtnsArea>
    </MileStoneContainer>
  );
};

export default EditMileStoneComponent;
