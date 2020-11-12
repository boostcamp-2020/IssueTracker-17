import React from 'react';
import { IssueDetailComponent } from 'Components';
import { Header } from 'Components/Header/Header';

function IssueDetailPage({ match }) {
  return (
    <>
      <Header />
      <IssueDetailComponent issueId={match.params.issueId} />
    </>
  );
}

export default IssueDetailPage;
