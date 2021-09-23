import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
      username: '',
      errors: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = this.input.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }
  componentDidUpdate(prevProps){
    if (prevProps.currentUser !== this.props.currentUser) {
      this.props.closeModal()
    }
  }

  input(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value,
      });
    }
  }
  
  handleSignup(e){
    e.preventDefault();
    this.props.closeModal();
    this.props.openModal('signup');
  }

  handleDemo(e) {
    e.preventDefault();
    this.props.login({
      email: "james@gmail.com",
      password: "password"
    })
  }

  handleSubmit(field) {
    return (e) => {
      e.preventDefault();
      if (field === 'login') {
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
    if (this.props.formType === 'login') {
      return (
        <form onSubmit={this.handleSubmit('login')}>
          <div className="god-container">
            <div className="splash-art"></div>
            <div className="splash-art-dark">
              <div className="errors-container">
                {this.props.errors.map((error) => {
                  return <p className="errors">{error}</p>;
                })}
              </div>
            </div>
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
                <span className="placeholder-one">Email</span>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.input('password')}
                  className="login-input two"
                  placeholder=" "
                />
                <span className="placeholder-two">Password</span>
                <p className="login-redirect-text">
                  Don't have an account? <sign-up onClick={this.handleSignup}>Sign up</sign-up>
                </p>
                <button className="auth-button">Login</button>
                <p className="auth-button" onClick={this.handleDemo}>Demo</p>
              </div>
            </div>
          </div>
        </form>
      );
    } else if (this.props.formType === 'signup') {
      return (
        <form onSubmit={this.handleSubmit('signup')}>
          <div className="god-container">
            <div className="splash-art"></div>
            <div className="splash-art-dark"></div>
            <div className="signup-container">
              <h1>Become a Wajer!</h1>
              <div className="errors-container">
                {this.props.errors.map((error) => {
                  return <p className="errors">{error}</p>;
                })}
              </div>
              <div className="signup-input-container">
                <input
                  type="text"
                  value={this.state.email}
                  onChange={this.input('email')}
                  className="signup-input one"
                  placeholder=" "
                  autoFocus
                />
                <span className="placeholder-one">Email</span>
                <input
                  type="text"
                  value={this.state.username}
                  onChange={this.input('username')}
                  className="signup-input two"
                  placeholder=" "
                />
                <span className="placeholder-two">Username</span>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.input('password')}
                  className="signup-input three"
                  placeholder=" "
                />
                <span className="placeholder-three">Password</span>
                <input
                  type="password"
                  value={this.state.password2}
                  onChange={this.input('password2')}
                  className="signup-input four"
                  placeholder=" "
                />
                <span className="placeholder-four">Confirm Password</span>
                <button className="auth-button">Sign up</button>
              </div>
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
