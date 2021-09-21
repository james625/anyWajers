// import { connect } from 'react-redux';
// import { deleteLobby } from '../../util/lobby_api_util';
// // import { updateLobby, deleteLobby } from '../../actions/lobby_actions';
// import LobbyForm from './lobby_form';

// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.session.user,
//     newLobby: state.lobby.new,
//     currentGameId: state.entities.game.data._id,
//     formType: 'edit'
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     updateLobby: lobby => dispatch(updateLobby(lobby)),
//     deleteLobby: lobbyId => dispatch(deleteLobby(lobbyId))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LobbyForm);