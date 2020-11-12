/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IssueClosedSVG } from './svg/IssueClosedSVG';
import { IssueOpenSVG } from './svg/IssueOpenSVG';
import { MileStoneSVG } from './svg/MileStoneSVG';
const STATUS = { open: 0, close: 1 };
const makeDateStrFormat = (date) => {
  const options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
};
/*
const getElaspedTimeStr = (date) => {
  const now = new Date();
  const nowTimeStamp = now.getTime();
  const dateTimeStamp = date.getTime();

  const diff = (nowTimeStamp - dateTimeStamp) / 1000;
  let resultStr = '';

  if (diff < 60) resultStr = `${diff} second${diff <= 1 ? '' : 's'} ago`;
  else if (diff < 3600)
    resultStr = `${diff} minute${diff / 60 <= 1 ? '' : 's'} ago`;
  else if (diff < 3600 * 24)
    resultStr = `${diff} hour${diff / (60 * 60) <= 1 ? '' : 's'} ago`;
  else if (diff >= 3600 * 24 && diff < 3600 * 24 * 2) resultStr = `yesterday`;
};
*/
const RowContainer = styled.div`
  padding: 5px;
  border-bottom: 1px solid rgb(225 228 232);
  display: flex;
  justify-content: space-between;
`;

const IssueContainer = styled.div`
  width: 50%;
  display: flex;
`;
const TitleArea = styled.div`
  font-size: large;
  font-weight: bold;
  margin: 5px;
`;

const ExtraContainer = styled.div`
  width: 45%;
  display: flex;
`;

const LabelBtn = styled.button`
  padding: 0 7px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  border: 1px solid transparent;
  border-radius: 2em;
  //텍스트 색 반전시키는 코드 여기 들어가야됨
  background-color: ${(props) => props.color};
`;

const CheckBox = styled.input`
  margin: 11px;
`;
const StatusArea = styled.div`
  margin: 11px;
`;
const TitleLabelsArea = styled.div`
  display: flex;
`;

const LabelArea = styled.div`
  margin-top: 8px;
`;
const MileStoneTitleArea = styled.span`
  color: grey;
  margin: 0px 5px 0px 5px;

  & svg {
    margin-right: 3px;
  }
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;

const FilterColumn = styled.div`
  width: 100px;
  margin: 0px 10px 0px 10px;
`;
/*
const getDDays = (date) => {
  const now = new Date();
  const gap = now.getTime() - date.getTime();
  return Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
};
*/
export const IssueRow = (props) => {
  const {
    id,
    title,
    contents,
    created,
    userName,
    status,
    labels,
    assignees,
    milestoneTitle,
  } = props.data;

  const labelList = labels.map((data, idx) => {
    return (
      <LabelBtn key={idx} color={data.color}>
        {data.title}
      </LabelBtn>
    );
  });

  const assigneeList = assignees.map((data, idx) => {
    return <ProfileImg key={idx} src={data.profileUrl}></ProfileImg>;
  });

  return (
    <RowContainer>
      <IssueContainer>
        <div>
          <CheckBox type="checkbox" />
        </div>
        <StatusArea>
          {status === STATUS.open ? (
            <IssueOpenSVG color="green"></IssueOpenSVG>
          ) : (
            <IssueClosedSVG color="red"></IssueClosedSVG>
          )}
        </StatusArea>
        <div>
          <TitleLabelsArea>
            <Link to={`/detail/${id}`}>
              <TitleArea>{title}</TitleArea>
            </Link>
            <LabelArea> {labelList}</LabelArea>
          </TitleLabelsArea>
          <div>
            {'Opened ' + makeDateStrFormat(created)}
            <MileStoneTitleArea>
              {milestoneTitle ? <MileStoneSVG color="grey" /> : undefined}
              {milestoneTitle}
            </MileStoneTitleArea>
          </div>
        </div>
      </IssueContainer>
      <ExtraContainer>
        <FilterColumn />
        <FilterColumn />
        <FilterColumn />
        <FilterColumn />
        <FilterColumn>{assigneeList}</FilterColumn>
        <FilterColumn />
      </ExtraContainer>
    </RowContainer>
  );
};
