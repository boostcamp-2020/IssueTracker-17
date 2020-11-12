import React from 'react';
import NewIssueComponent from '../components/newIssue/NewIssueComponent';
import { Header } from 'Components/Header/Header';

function NewIssuePage() {
  return (
    <>
      <Header />
      <NewIssueComponent />
    </>
  );
}

export default NewIssuePage;
