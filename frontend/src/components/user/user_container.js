import { connect } from "react-redux"
import { fetchUser, editUser, deleteUser } from "../../actions/user_actions";
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
    deleteUser: userId => dispatch(deleteUser(userId))
});

export default connect(mSTP, mDTP)(User)