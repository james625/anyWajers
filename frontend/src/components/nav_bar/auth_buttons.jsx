import React from 'react';
import { withRouter } from 'react-router';

class AuthButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.onClick = this.onClick.bind(this);
    this.navToUser = this.navToUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.logout();
  }

  navToUser(e) {
    e.preventDefault();
    this.props.history.push(`/users/${this.props.currentUser.id}`);
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.clearErrors();
    this.props.openModal('login');
  }

  render() {
    const signedIn = () => {
      return (
        <div>
          <button className="username" onClick={this.navToUser}>
            {this.props.user
              ? this.props.user.data.username
              : this.props.currentUser.username}
          </button>
          <button className="nav-auth-button" onClick={this.onClick}>
            Logout
          </button>
          {/* <Link to={`/users/${this.props.currentUser.id}`}>profile</Link> */}
        </div>
      );
    };

    const noUser = () => {
      return (
        <div>
          <button
            className="nav-auth-button"
            onClick={this.handleLogin}
          >
            Login
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
