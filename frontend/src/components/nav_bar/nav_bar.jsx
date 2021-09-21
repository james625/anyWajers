import React from 'react';
import AuthButtonContainer from './auth_buttons_container'


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
                <AuthButtonContainer />
            </div>
        )
    }
}

export default NavBar;