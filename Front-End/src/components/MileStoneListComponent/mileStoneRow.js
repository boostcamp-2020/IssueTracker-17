/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { ProgressBar } from './ProgressBar';
import { useLocation, useHistory } from 'react-router';
import {
  STATUS,
  editNewMileStone,
  deleteNewMileStone,
} from '../../api/milestoneTransaction';
import { Link } from 'react-router-dom';
import { DueSVG } from './svg/DueSVG';
import { PastSVG } from './svg/PastSVG';

const makeDateStrFormat = (date) => {
  const options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

const getDDays = (date) => {
  const now = new Date();
  const gap = now.getTime() - date.getTime();
  return Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
};

const RowContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid rgb(225 228 232);
  display: flex;
  justify-content: stretch;
`;

const MileStoneContainer = styled.div`
  width: 50%;

  & h3 {
    margin: 0;
    padding: 0;
  }
`;
const DueInfo = styled.div`
  color: grey;
`;

const ProgressContainer = styled.div`
  width: 50%;
`;
const ProgressInfo = styled.div`
  margin: 5px 0px 5px 0px;
`;

const Btn = styled.button`
  border: none;
  padding-left: 0px;
  background-color: transparent;
  margin-right: 5px;
  margin-left: 0px;
  color: ${(props) => (props.color ? props.color : 'blue')};
`;

export const MileStoneRow = (props) => {
  const [status, setStatus] = useState(props.data.status);
  const removeMileStone = props.removeMileStone;
  const changeOpenedCnt = props.changeOpenedCnt;
  const changeClosedCnt = props.changeClosedCnt;

  const { id, title, contents, until, issues } = props.data;
  let opened = 0;
  let closed = 0;

  const onSubmitCloseState = useCallback(async (e) => {
    const data = { id, status: STATUS.closed };
    const res = await editNewMileStone(data);
    setStatus(STATUS.closed);
    changeClosedCnt(1);
    changeOpenedCnt(-1);
  });

  const onSubmitReopenState = useCallback(async (e) => {
    const data = { id, status: STATUS.open };
    const res = await editNewMileStone(data);
    setStatus(STATUS.open);
    changeClosedCnt(-1);
    changeOpenedCnt(+1);
  });

  const onSubmitDelete = useCallback(async (e) => {
    if (!confirm('삭제하시겠습니까?')) return;
    const res = await deleteNewMileStone(id);
    alert(res ? '삭제되었습니다' : '삭제에 실패했습니다');
    removeMileStone(id);
  });

  issues.forEach((issue) => {
    issue.status === 0 ? (opened += 1) : (closed += 1);
  });

  const progress =
    opened + closed === 0 || closed === 0
      ? 0
      : ((closed / (opened + closed)) * 100).toFixed(2);

  return (
    <RowContainer>
      <MileStoneContainer>
        <h3>{title}</h3>
        <DueInfo>
          {getDDays(new Date(until)) >= 0 ? (
            <>
              <DueSVG color="grey" /> due by {makeDateStrFormat(until)}
            </>
          ) : until !== null ? (
            <>
              <PastSVG color="grey" /> Past due by
              {' ' + -1 * getDDays(new Date(until))} days
            </>
          ) : (
            <></>
          )}
        </DueInfo>
        <div>{contents}</div>
      </MileStoneContainer>
      <ProgressContainer>
        <ProgressBar width={progress + '%'}></ProgressBar>
        <ProgressInfo>
          <b>{progress}</b> %complete {opened} opened {closed} closed
        </ProgressInfo>
        <Link to={`/milestone/edit?id=${id}`}>
          <Btn>edit</Btn>
        </Link>
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
