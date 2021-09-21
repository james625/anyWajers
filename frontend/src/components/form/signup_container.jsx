import { connect } from 'react-redux'
import { login, signup } from '../../actions/session_actions'
import Form from './form'
import { closeModal } from '../../actions/modal_actions'

const mapStateToProps = (state) => {
  return {
    formType: 'signup',
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
