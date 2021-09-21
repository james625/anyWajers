import {connect} from 'react-redux';
import Modal from './modal';
import {closeModal} from '../../actions/modal_actions';

const mSTP = (state) => (
    {
        modal: state.modal.type,
        modalData: state.modal.data
    }
)

const mDTP = (dispatch) => (
    {
        closeModal: () => dispatch(closeModal())
    }
)

export default connect(mSTP, mDTP)(Modal);