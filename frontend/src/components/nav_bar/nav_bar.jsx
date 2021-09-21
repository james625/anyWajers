import React from 'react';
import AuthButtonContainer from './auth_buttons_container'
import {Link} from 'react-router-dom';


class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault()
    }

    render() {
        return(
            <div>
                <Link to='/'><h1>any Wajers?</h1></Link>
                <AuthButtonContainer />
            </div>
        )
    }
}

export default NavBar;