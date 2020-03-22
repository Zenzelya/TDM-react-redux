import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {HomePage, Page404 } from '../pages';


import './app.css';

const App = () => {
  return (
      <Switch>
        <Route
          path="/"
          component={HomePage}
          exact />

          <Route component={Page404} />
      </Switch>
  );
};

export default App;
