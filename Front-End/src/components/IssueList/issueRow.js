/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import styled from 'styled-components';

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
  justify-content: space-between;
`;

const IssueContainer = styled.div`
  width: 50%;
`;

const ExtraContainer = styled.div`
  width: 45%;
`;

const LabelBtn = styled.button`
  width: fit-content;
  padding: 1px;
  border: none;

  height: 25px;
  //텍스트 색 반전시키는 코드 여기 들어가야됨
  background-color: ${(props) => props.color};
`;

const MileStoneSVGIcon = () => {
  return (
    <svg
      aria-label="Milestone"
      class="octicon octicon-milestone"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      height="16"
      role="img"
    >
      <path
        fillRule="evenodd"
        d="M7.75 0a.75.75 0 01.75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 010 2.672l-2.07 1.75a1.75 1.75 0 01-1.13.414H8.5v5.25a.75.75 0 11-1.5 0V10H2.75A1.75 1.75 0 011 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 017.75 0zm0 8.5h4.384a.25.25 0 00.161-.06l2.07-1.75a.25.25 0 000-.38l-2.07-1.75a.25.25 0 00-.161-.06H2.75a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h5z"
      ></path>
    </svg>
  );
};

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
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
          {title} {labelList}
        </div>

        <div>
          {'Opened ' + makeDateStrFormat(created)}
          <span>
            {milestoneTitle ? <MileStoneSVGIcon /> : undefined}
            {milestoneTitle}
          </span>
        </div>
      </IssueContainer>
      <ExtraContainer>{assigneeList}</ExtraContainer>
    </RowContainer>
  );
};
