import React from 'react';


class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            password2: "",
            username: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = this.input.bind(this);
    }

    input(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(field){
        return e => {
            e.preventDefault();
            if(field === 'signin'){
                const user = {
                    email: this.state.email,
                    password: this.state.password
                }
                this.props.login(user);

                this.setState({
                    email: "",
                    password: ""
                })

            } else if(field === 'signup'){
                const user = {
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password,
                    password2: this.state.password2
                }
                this.props.signup(user)
                this.setState({
                    email: "",                  
                    username: "",
                    password: "",
                    password2: ""
                })
            }
        }
    }

    render(){
        if(this.props.currentUser){
            return(
                <form onSubmit={this.handleSubmit('signin')}> 
                    <label>Email
                        <input type="text" value={this.state.email} onChange={this.input('email')}/>
                    </label>
                    
                    <label>Password
                        <input type="text" value={this.state.password} onChange={this.input('password')}/>
                    </label>
                    <button>Login</button>
                </form>
            )
        } else {
            
            return(
                <form onSubmit={this.handleSubmit('signup')}> 
                    <label>Email
                        <input type="text" value={this.state.email} onChange={this.input('email')}/>
                    </label>
                    <label>Username
                        <input type="text" value={this.state.username} onChange={this.input('username')}/>
                    </label>
                    
                    <label>Password
                        <input type="text" value={this.state.password} onChange={this.input('password')}/>
                    </label>
                    
                    <label>Password
                        <input type="text" value={this.state.password2} onChange={this.input('password2')}/>
                    </label>

                    <button>Sign up</button>
                </form>
            )
        }

    }
}

export default Form