import { connect } from "react-redux"
import { fetchUser, editUser, deleteUser } from "../../actions/user_actions";
import { login } from '../../actions/session_actions';
import { withRouter } from "react-router";
import User from "./user"

// fix route, util and validation

const mSTP = (state, ownProps) => ({
    currentUser: state.session.user,
    // history: ownProps.history
});

const mDTP = (dispatch) => ({
    fetchUser: userId => dispatch(fetchUser(userId)),
    editUser: user => dispatch(editUser(user)),
    deleteUser: userId => dispatch(deleteUser(userId)),
    login: user => dispatch(login(user))
});

export default withRouter(connect(mSTP, mDTP)(User))