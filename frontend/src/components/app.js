import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

import Splash from './splash/splash';

const App = () => (
    <div>
      <Switch>
          <AuthRoute exact path="/" component={Splash} />
      </Switch>
    </div>
  );

export default App;