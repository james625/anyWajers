import React from 'react';
import { withRouter } from 'react-router';

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
          <button onClick={this.onClick}>Logout</button>
        </div>
      );
    };

    const noUser = () => {
      return (
        <div>
          <button onClick={() => this.props.openModal('login')}>Login</button>
          <button onClick={() => this.props.openModal('signup')}>
            Sign up
          </button>
        </div>
      );
    };

    return this.props.currentUser ? signedIn() : noUser();
  }
}

export default withRouter(AuthButtons);
