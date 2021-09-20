import { connect } from "react-redux"
import { login, logout, signup } from "../../actions/session_actions";
import Splash from "./splash"


const mSTP = (state) => ({
    currentUser: state.session.user,
    errors: state.errors.session
});

const mDTP = (dispatch) => ({
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout()),
    signup: user => dispatch(signup(user))
});

export default connect(mSTP, mDTP)(Splash)