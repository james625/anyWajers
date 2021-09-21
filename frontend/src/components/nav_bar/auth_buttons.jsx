import React from 'react'
import { withRouter } from 'react-router'

// fix logout username/ email 

class AuthButtons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    e.preventDefault()
    this.props.logout()
  }

  render() {

    const signedIn = () => {
      return (
        <div>
          <button onClick={this.onClick}>
            LOGOUT
          </button>
          <h2>{this.props.currentUser.email}</h2>
          <h2>{this.props.currentUser.username}</h2>
        </div>
      )
    }

    const noUser = () => {
      return (
        <div>
          <div>
            <button onClick={() => this.props.openModal('login')}>
              Login
            </button>
            <button onClick={() => this.props.openModal('signup')}>
              Sign up
            </button>
          </div>
        </div>
      )
    }

    return (this.props.currentUser != undefined) && (this.props.currentUser.id != undefined) ? signedIn() : noUser()
  }
}

export default withRouter(AuthButtons)
