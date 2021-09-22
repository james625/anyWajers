import React from "react";
import { io } from "socket.io-client";


class Messages extends React.Component {

    constructor(props){
        super(props)
        this.state = { input: "" }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.socket = io();
        this.socket.on("receive-message", message => {
            this.props.fetchLobbyMessages("6148fa04c199d16514780f78")
            this.setState({
                input: ""
            })
        })
    }

    componentDidMount(){
        this.props.fetchLobbyMessages("6148fa04c199d16514780f78")

    }

    handleChange(){
        return e => {
            e.preventDefault();
            this.setState({ input: e.currentTarget.value })
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
    
        const text = {
            text: this.state.input,
            author: this.props.currentUserId,
            lobbyId: "6148fa04c199d16514780f78"
        }
        this.props.createLobbyMessage(text)

        this.socket.emit("body", text)
    }

    render(){
        if (this.props.messages.length === 0) {
            return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.input} onChange={this.handleChange()}>
                </input>
                <button>Submit</button>
            </form>
            )
        }

        return (
            <div>
                <ul>
                    {this.props.messages.map( message => {
                        return <li key={message._id}>
                            {message.body}
                            </li>
                    })}
                </ul>
                <form>
                    <input type="text" value={this.state.input} onChange={this.handleChange()}>
                    </input>
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Messages;