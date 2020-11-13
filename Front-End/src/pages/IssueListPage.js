import React from 'react';
import IssueListComponent from '../components/IssueList';
import { Header } from 'Components/Header/Header';

function IssueListPage() {
  return (
    <>
      <Header />
      <IssueListComponent />
    </>
  );
}

export default IssueListPage;
