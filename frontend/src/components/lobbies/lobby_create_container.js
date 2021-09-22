import { connect } from 'react-redux';
import { createLobby } from '../../actions/lobby_actions';
import LobbyForm from './lobby_form';
import { closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    currentGameId: Object.keys(state.entities.games)[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLobby: lobby => dispatch(createLobby(lobby)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyForm);