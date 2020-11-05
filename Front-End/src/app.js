import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Pages from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exac path="/" component={Pages.LabelPage} />
        <Route exac path="/newIssue" component={Pages.NewIssuePage} />
        <Route exac path="/" component={Pages.LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}
