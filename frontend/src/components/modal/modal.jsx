import React from 'react';
import LoginContainer from '../form/login_container';
import SignupContainer from '../form/signup_container';
import LobbyCreateContainer from '../lobbies/lobby_create_container';

class Modal extends React.Component {
  constructor(props) {
    super(props)
  }

  stopProp(e) {
    e.stopPropagation()
  }

  render() {
    if (!this.props.modal) {
      return null
    }
    console.log(this.props.modal)
    let modal = null
    switch (this.props.modal) {
      case 'signup':
        modal = <SignupContainer />
        break
      case 'login':
        modal = <LoginContainer />
        break
      case 'create':
        modal = <LobbyCreateContainer />
        break
      default:
        return null
    }

    return (
      <div className='modal-background' onClick={this.props.closeModal}>
        <div onClick={this.stopProp}>
          {modal}
        </div>
      </div>
    )
  }
}

export default Modal