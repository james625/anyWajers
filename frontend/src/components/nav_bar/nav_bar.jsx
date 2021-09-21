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
        <Link to="/">
          <h1>any Wajers?</h1>
        </Link>
        <input
          className="search-bar"
          type="text"
          placeholder="Find your game ..."
        ></input>
        <AuthButtonContainer />
      </div>
    );
  }
}

export default NavBar;
