import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Router;
