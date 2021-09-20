import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
      username: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = this.input.bind(this);
  }

  input(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(field) {
    return (e) => {
      e.preventDefault();
      if (field === 'signin') {
        const user = {
          email: this.state.email,
          password: this.state.password,
        };
        this.props.login(user);

        this.setState({
          email: '',
          password: '',
        });
      } else if (field === 'signup') {
        const user = {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          password2: this.state.password2,
        };
        this.props.signup(user);
        this.setState({
          email: '',
          username: '',
          password: '',
          password2: '',
        });
      }
    };
  }

  render() {
    if (this.props.type === 'signin') {
      return (
        <form onSubmit={this.handleSubmit('signin')}>
          <div className="login-container">
            <h1>Login to get started</h1>
            <div className="login-input-container">
              <input
                type="text"
                value={this.state.email}
                onChange={this.input('email')}
                className="login-input one"
                placeholder=" "
                autoFocus
              />
              <span class="placeholder-one">Email</span>
              <input
                type="text"
                value={this.state.password}
                onChange={this.input('password')}
                className="login-input two"
                placeholder=" "
              />
              <span class="placeholder-two">Password</span>
              <p className="login-redirect-text">
                Don't have an account? <sign-up>Sign up</sign-up>
              </p>
              <button className="auth-button">Login</button>
            </div>
          </div>
        </form>
      );
    } else if (this.props.type === 'signup') {
      return (
        <form onSubmit={this.handleSubmit('signup')}>
          <div className="signup-container">
            <h1>Become a Wajer!</h1>
            <div className="signup-input-container">
              <input
                type="text"
                value={this.state.email}
                onChange={this.input('email')}
                className="signup-input one"
                placeholder=" "
                autoFocus
              />
              <span class="placeholder-one">Email</span>
              <input
                type="text"
                value={this.state.username}
                onChange={this.input('username')}
                className="signup-input two"
                placeholder=" "
              />
              <span class="placeholder-two">Username</span>
              <input
                type="password"
                value={this.state.password}
                onChange={this.input('password')}
                className="signup-input three"
                placeholder=" "
              />
              <span class="placeholder-three">Password</span>
              <input
                type="password"
                value={this.state.password2}
                onChange={this.input('password2')}
                className="signup-input four"
                placeholder=" "
              />
              <span class="placeholder-four">Confirm Password</span>
              <button className="auth-button">Sign up</button>
            </div>
          </div>
        </form>
      );
    } else {
      return null;
    }
  }
}

export default Form;
