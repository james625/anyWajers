import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../assets/reset.scss';
import '../assets/browser.scss';
import '../assets/auth/signup.scss';
import '../assets/auth/login.scss';
import '../assets/splash/splash.scss';
import '../assets/game_show/game_show.scss';
import '../assets/game_show/lobby_modal.scss';
import '../assets/footer/footer.scss';
import '../assets/user/user.scss';
import '../assets/messages/messages.scss';

import NavBar from './nav_bar/nav_bar';
import ModalContainer from './modal/modal_container';
import GamesIndexContainer from './games/games_index_container';
import GameShowContainer from './games/game_show_container';
import MessagesContainer from './messages/messages_container';
import LobbyShowContainer from './lobbies/lobby_show_container';
import UserContainer from './user/user_container';
import { ProtectedRoute } from '../util/route_util';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faUserAstronaut, faRedo } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faUserAstronaut, faRedo);

const App = () => (
  <div>
    <ModalContainer />
    <NavBar />
    <Switch>
      <Route exact path="/" component={GamesIndexContainer} />
      <ProtectedRoute exact path="/games/:gameId" component={GameShowContainer} />
      <ProtectedRoute
        exact
        path="/games/:gameId/:lobbyId"
        component={LobbyShowContainer}
      />
      <Route exact path="/messages" component={MessagesContainer} />
      <ProtectedRoute exact path="/users/:userId" component={UserContainer} />
    </Switch>
  </div>
);

export default App;
