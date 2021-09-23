import React from 'react';
// import { AuthRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import '../assets/reset.scss';
import '../assets/browser.scss';
import '../assets/auth/signup.scss';
import '../assets/auth/login.scss';
import '../assets/splash/splash.scss';

import NavBar from './nav_bar/nav_bar';
import ModalContainer from './modal/modal_container';
import GamesIndexContainer from './games/games_index_container';
import GameShowContainer from './games/game_show_container';
import MessagesContainer from './messages/messages_container';
import LobbyShowContainer from './lobbies/lobby_show_container';
import UserContainer from './user/user_container';

const App = () => (
  <div>
    <ModalContainer />
    <NavBar />
    <Switch>
      <Route exact path="/" component={GamesIndexContainer} />
      <Route exact path="/games/:gameId" component={GameShowContainer} />
      <Route exact path="/games/:gameId/:lobbyId" component={LobbyShowContainer} />
      <Route exact path="/messages" component={MessagesContainer} />
      <Route exact path="/users/:userId" component={UserContainer} />
    </Switch>
  </div>
);

export default App;
