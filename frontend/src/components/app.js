import React from 'react';
import { AuthRoute, ProtectedRoute, } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import SplashContainer from './splash/splash_container';
import GamesIndexContainer from './games/games_index_container';
import GameShowContainer from './games/game_show_container';

const App = () => (
    <div>
      <Switch>
          <Route exact path="/" component={SplashContainer} />
          <AuthRoute exact path="/login" component={SplashContainer} />
          <AuthRoute exact path="/signup" component={SplashContainer} />
          <Route exact path='/games' component={GamesIndexContainer}/>
          <Route exact path='/games/:gameId' component={GameShowContainer}/>
      </Switch>
    </div>
  );

export default App;