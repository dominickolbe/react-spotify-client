import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Profile from './pages/Profile';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} exact />
      <Route path="/profile" component={Profile} exact />
      <Route component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Router;
