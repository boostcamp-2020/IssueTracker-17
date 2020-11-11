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
  }
  #app {
    width: 100%;
    height: 100%;
  }
`;

const NavPaddingArea = styled.div`
  padding-top: 150px;
`;

export default function App() {
  return (
    <BrowserRouter>
      <NavBar>ISSUE TRACKER</NavBar>
      <GlobalStyle />
      <NavPaddingArea></NavPaddingArea>
      <Switch>
        <Route exac path="/label" component={Pages.LabelPage} />
        <Route exac path="/newIssue" component={Pages.NewIssuePage} />
        <Route exac path="/login" component={Pages.LoginPage} />
        <Route exac path="/auth" component={Pages.Auth} />
        <Route path="/milestone/:mode" component={Pages.EditMileStonePage} />
        <Route exac path="/milestone" component={Pages.MileStoneListPage} />
        <Route exac path="/issue" component={Pages.IssueListPage} />
      </Switch>
    </BrowserRouter>
  );
}
