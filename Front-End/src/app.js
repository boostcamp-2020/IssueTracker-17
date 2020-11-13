import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Pages from './pages';
import styled, { createGlobalStyle } from 'styled-components';
import { NavBar } from './style/Layout/Layout';
const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: auto;
    width: 100%;
    height: 100vh;
    font-family: Helvetica, Arial, sans-serif;
    overflow-y: auto;
  }
  #app {
    width: 100%;
    height: 100%;
  }
  label {
    display: inline-block;
  }
`;

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route exac path="/label" component={Pages.LabelPage} />
        <Route exac path="/newIssue" component={Pages.NewIssuePage} />
        <Route exac path="/auth" component={Pages.Auth} />
        <Route path="/milestone/:mode" component={Pages.EditMileStonePage} />
        <Route exac path="/milestone" component={Pages.MileStoneListPage} />
        <Route exac path="/issue" component={Pages.IssueListPage} />
        <Route path="/detail/:issueId" component={Pages.IssueDetailPage} />
        <Route exac path="/" component={Pages.LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}
