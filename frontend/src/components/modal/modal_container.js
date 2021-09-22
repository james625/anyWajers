import {connect} from 'react-redux';
import Modal from './modal';
import {closeModal} from '../../actions/modal_actions';
import { clearErrors } from '../../actions/session_actions';

const mSTP = (state) => (
    {
        modal: state.modal.type,
        modalData: state.modal.data
    }
)

const mDTP = (dispatch) => (
    {
        closeModal: () => dispatch(closeModal()),
        clearErrors: () => dispatch(clearErrors())
    }
)

export default connect(mSTP, mDTP)(Modal);