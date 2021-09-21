import React from 'react';
import Form from '../form/form'

class Splash extends React.Component {   
    constructor(props){
        super(props)
        this.state = {
            type: ""
        }
        // this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(field){
     
        return e => {
            e.preventDefault();
            if(field === 'logout') {
                this.props.logout()
            } else {
                this.setState({
                    type: field
                })
            }
        }
    }
    render(){
        return(
            <div>
                anyWajers?!?!?!?!??!?!?!?!?!?!?!?!?!??!?!?
                {/* <button onClick={this.handleClick('signin')}>Login</button>
                <button onClick={this.handleClick('signup')}>Sign up</button>
                <button onClick={this.handleClick('logout')}>Logout </button>
                <Form 
                    login={this.props.login}
                    signup={this.props.signup}
                    currentUser={this.props.currentUser}
                    type={this.state.type}
                /> */}
                
            </div>
        )
    }
}

export default Splash