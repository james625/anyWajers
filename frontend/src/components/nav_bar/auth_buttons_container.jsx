import { connect } from "react-redux"
import { clearErrors, logout } from "../../actions/session_actions";
import { openModal } from '../../actions/modal_actions';
import AuthButtons from "./auth_buttons"
import { withRouter } from "react-router"; 


const mSTP = (state, ownProps) => {
    return {
        currentUser: state.session.user,
        user: Object.values(state.entities.users)[0],
        history: ownProps.history
    }
};

const mDTP = (dispatch) => ({
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal)),
    clearErrors: () => dispatch(clearErrors())
});

export default withRouter(connect(mSTP, mDTP)(AuthButtons))