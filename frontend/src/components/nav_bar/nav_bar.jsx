import React from 'react';
import AuthButtonContainer from './auth_buttons_container';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="header-content-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Find your game ..."
        ></input>
        <Link to="/" replace>
          <div className="home-button"></div>
        </Link>
        <AuthButtonContainer />
      </div>
    );
  }
}

export default NavBar;
