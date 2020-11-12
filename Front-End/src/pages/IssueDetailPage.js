import React from 'react';
import { IssueDetailComponent } from 'Components';

function IssueDetailPage({ match }) {
  return (
    <>
      <IssueDetailComponent issueId={match.params.issueId} />
    </>
  );
}

export default IssueDetailPage;
