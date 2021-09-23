import { connect } from 'react-redux';
import { clearErrors, login, signup } from '../../actions/session_actions';
import Form from './form';
import { closeModal, openModal } from '../../actions/modal_actions';

const mapStateToProps = state => {
  return {
    formType: 'login',
    errors: Object.values(state.errors.session),
    currentUser: state.session.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors()),
    openModal: modal => dispatch(openModal(modal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);