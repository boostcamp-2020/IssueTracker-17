/* eslint-disable react/jsx-key */
import React from 'react';
import { IssueRow } from './issueRow';

export const IssueList = (props) => {
  const issueList = props.issueList.map((data, idx) => (
    <IssueRow key={idx} data={data}></IssueRow>
  ));

  return issueList;
};
