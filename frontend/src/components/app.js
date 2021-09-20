import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import '../assets/auth/signup.scss';
import '../assets/auth/login.scss';

import SplashContainer from './splash/splash_container';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={SplashContainer} />
      <AuthRoute exact path="/login" component={SplashContainer} />
      <AuthRoute exact path="/signup" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;
