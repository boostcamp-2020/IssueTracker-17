/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { ProgressBar } from './ProgressBar';
import { useLocation, useHistory } from 'react-router';
import {
  STATUS,
  editNewMileStone,
  deleteNewMileStone,
} from '../../api/milestoneTransaction';

const makeDateStrFormat = (date) => {
  const options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

const RowContainer = styled.div`
  padding: 5px;
  border-bottom: 1px solid rgb(225 228 232);
  display: flex;
  justify-content: stretch;
`;

const MileStoneContainer = styled.div`
  width: 50%;
`;

const ProgressContainer = styled.div`
  width: 50%;
`;

const Btn = styled.button`
  border: none;
  color: ${(props) => (props.color ? props.color : 'blue')};
`;

export const MileStoneRow = (props) => {
  const [status, setStatus] = useState(props.data.status);

  const { id, title, contents, until, issues } = props.data;
  let opened = 0;
  let closed = 0;

  const onClickEdit = useCallback(async (e) => {
    history.push({
      pathname: `/milestone/edit?id=${id}`,
    });
  });

  const onSubmitCloseState = useCallback(async (e) => {
    alert('test close');
    const data = { id, status: STATUS.closed };
    const res = await editNewMileStone(data);
    setStatus(STATUS.closed);
    alert(res);
  });

  const onSubmitReopenState = useCallback(async (e) => {
    const data = { id, status: STATUS.open };
    const res = await editNewMileStone(data);
    alert(res);
    setStatus(STATUS.open);
  });

  const onSubmitDelete = useCallback(async (e) => {
    if (!confirm('삭제하시겠습니까?')) return;
    const data = { id };
    const res = await deleteNewMileStone(data);
    alert(res ? '삭제되었습니다' : '삭제에 실패했습니다');
  });

  issues.forEach((issue) => {
    issue.status === 0 ? (opened += 1) : (closed += 1);
  });

  const progress =
    opened + closed === 0 ? 0 : (closed / (opened + closed)) * 100;

  return (
    <RowContainer>
      <MileStoneContainer>
        <h2>{title}</h2>
        <div>{contents}</div>
        <div>{'Due by ' + makeDateStrFormat(until)}</div>
      </MileStoneContainer>
      <ProgressContainer>
        <ProgressBar width={progress + '%'}></ProgressBar>
        <div>
          {progress} %complete {opened} opened {closed} closed
        </div>
        <Btn onClick={onClickEdit}>edit</Btn>
        {status === STATUS.open ? (
          <Btn onClick={onSubmitCloseState}>close</Btn>
        ) : (
          <Btn onClick={onSubmitReopenState}>reopen</Btn>
        )}

        <Btn onClick={onSubmitDelete} color="red">
          delete
        </Btn>
      </ProgressContainer>
    </RowContainer>
  );
};
