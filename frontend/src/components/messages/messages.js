import React from "react";
import { io } from "socket.io-client";
const socket = io();
socket.on('message', message => {
    console.log(message)
})

class Messages extends React.Component {

    constructor(props){
        super(props)
        this.state = { input: "" }
        this.handleSubmit = this.handleSubmit.bind(this)
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
        // this.props.createLobbyMessage({
        //     text: this.state.input,
        //     author: "61489d0b69a4306374146cdf",
        //     lobbyId: "6148fa04c199d16514780f78"
        // })
        const text = this.state.input
        socket.emit("body", text) // emit message to server
    }

    render(){
        if (!this.props.messages) return null
        return (
            <div>
                <ul>
                    {this.props.messages.map( message => {
                        return <li key={message._id}>{message.body}</li>
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