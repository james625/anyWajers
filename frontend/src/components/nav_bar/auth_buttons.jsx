import React from 'react';
import { withRouter } from 'react-router';
// import { Link } from 'react-router-dom';

class AuthButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.onClick = this.onClick.bind(this);
    this.navToUser = this.navToUser.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.logout();
  }

  navToUser(e) {
    e.preventDefault();
    this.props.history.push(`/users/${this.props.currentUser.id}`);
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
            onClick={() => this.props.openModal('login')}
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
