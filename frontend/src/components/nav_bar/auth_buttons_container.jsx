import { connect } from "react-redux"
import { logout } from "../../actions/session_actions";
import { openModal } from '../../actions/modal_actions';
import AuthButtons from "./auth_buttons"


const mSTP = (state) => ({
    currentUser: state.session.user
});

const mDTP = (dispatch) => ({
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal)),
});

export default connect(mSTP, mDTP)(AuthButtons)