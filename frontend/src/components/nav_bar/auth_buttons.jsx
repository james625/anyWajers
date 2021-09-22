import React from 'react';
import { withRouter } from 'react-router';

// fix logout username/ email

class AuthButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const signedIn = () => {
      return (
        <div>
          <button className="nav-auth-button" onClick={this.onClick}>
            Logout
          </button>
          <button className="username">
            {this.props.currentUser.username}
          </button>
        </div>
      );
    };

    const noUser = () => {
      return (
        <div>
          <button
            className="nav-auth-button"
            onClick={() => this.props.openModal('login')}
          >
            Login
          </button>
          <button
            className="nav-auth-button"
            onClick={() => this.props.openModal('signup')}
          >
            Sign up
          </button>
        </div>
      );
    };

    return this.props.currentUser !== undefined &&
      this.props.currentUser.id !== undefined
      ? signedIn()
      : noUser();
  }
}

export default withRouter(AuthButtons);
