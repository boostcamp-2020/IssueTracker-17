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
export const getElapsedTimeSTr = (date) => {
  const time = Math.floor((new Date() - new Date(date)) / 1000);
  const minute = time > 60 ? Math.floor(time / 60) : undefined;
  const hour = minute > 60 ? Math.floor(minute / 60) : undefined;
  const day = hour > 24 ? Math.floor(hour / 24) : undefined;
  const month = day >= 30 ? Math.floor(day / 30) : undefined;
  const year = day >= 365 ? Math.floor(day / 365) : undefined;

  if (year) {
    return year + ` year${year > 1 ? 's' : ''} ago`;
  } else if (month) {
    return month + ` months${month > 1 ? 's' : ''} ago`;
  } else if (day) {
    return day + ` day${day > 1 ? 's' : ''} ago`;
  } else if (hour) {
    return hour + ` hour${hour > 1 ? 's' : ''} ago`;
  } else if (minute) {
    return minute + ` minute${minute > 1 ? 's' : ''} ago`;
  } else return time + ` second${time > 1 ? 's' : ''} ago`;
};
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
const OpenCloseDateArea = styled.strong`
  color: grey;
`;
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

  const checkItems = props.checkItems;
  const setCheckItems = props.setCheckItems;
  const handleSingleCheck = props.handleSingleCheck;

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
          <CheckBox
            type="checkbox"
            onChange={(e) => handleSingleCheck(e.target.checked, id)}
            // checkItems에 id가 있으면 체크 아니면 체크 해제
            checked={checkItems.includes(id) ? true : false}
          />
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
            <OpenCloseDateArea title={makeDateStrFormat(created)}>
              {`#${id} `}
              {status === STATUS.open
                ? 'Opened ' + getElapsedTimeSTr(created)
                : 'Closed ' + getElapsedTimeSTr(created)}
            </OpenCloseDateArea>

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
