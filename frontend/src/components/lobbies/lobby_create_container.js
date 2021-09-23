import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import { createLobby } from '../../actions/lobby_actions';
import LobbyForm from './lobby_form';
import { closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    lobby: Object.values(state.entities.lobbies)[0],
    currentUser: state.session.user,
    currentGameId: Object.keys(state.entities.games)[Object.keys(state.entities.games).length-1],
    currentGame: Object.keys(state.entities.games)[Object.keys(state.entities.games).length-1],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLobby: lobby => dispatch(createLobby(lobby)),
    closeModal: () => dispatch(closeModal())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LobbyForm));