import React from 'react';
import Form from '../form/form'
class Splash extends React.Component {

    constructor(props){
        super(props)
    }
   
    render(){
        return(
            <div>
                anyWajers?!?!?!?!??!?!?!?!?!?!?!?!?!??!?!?
                <Form 
                    login={this.props.login}
                    signup={this.props.signup}
                    currentUser={this.props.currentUser}
                />
            </div>
        )
    }
}

export default Splash