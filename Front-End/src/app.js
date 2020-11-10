import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Pages from './pages';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100vh;
    font-family: Helvetica, Arial, sans-serif;
  }
  #app {
    width: 100%;
    height: 100%;
  }
`;

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route exac path="/label" component={Pages.LabelPage} />
        <Route exac path="/newIssue" component={Pages.NewIssuePage} />
        <Route exac path="/login" component={Pages.LoginPage} />
        <Route exac path="/milestone" component={Pages.MileStoneListPage} />
      </Switch>
    </BrowserRouter>
  );
}
