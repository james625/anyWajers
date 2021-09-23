import { connect } from "react-redux"
import { fetchUser, editUser, deleteUser } from "../../actions/user_actions";
import { logout } from '../../actions/session_actions';
import { withRouter } from "react-router";
import User from "./user"

// fix route, util and validation

const mSTP = (state) => {
    return {
        currentUser: state.session.user,
        user: Object.values(state.entities.users)[0]
    }
};


const mDTP = (dispatch) => ({
    fetchUser: userId => dispatch(fetchUser(userId)),
    editUser: user => dispatch(editUser(user)),
    deleteUser: userId => dispatch(deleteUser(userId)),
    logout: () => dispatch(logout())

});

export default withRouter(connect(mSTP, mDTP)(User))