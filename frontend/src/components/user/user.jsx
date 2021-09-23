import e from 'express';
import React from 'react';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.bio = '';
    this.props.currentUser.bio === undefined ? this.bio = '' : this.bio = this.props.currentUser.bio
    this.state = {
      email: this.props.currentUser.email,
      username: this.props.currentUser.username,
      bio: this.bio,
      edit: false
    };
    this.update = this.update.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // componentDidMount() {
  //   this.props.fetchUser(this.props.currentUser)
  // }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value })
  }

  onClick(e) {
    e.preventDefault()
    this.setState({
      edit: true
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    let user = {
      email: this.state.email,
      username: this.state.username,
      bio: this.state.bio,
      id: this.props.currentUser.id
    }
    this.props.editUser(user)
    this.setState({
      edit: false
    })
  }

  // handleDelete() {
  //   e.preventDefault()
  //   this.props.deleteUser(this.props.currentUser.id)
  //   this.props.history.push('/')
  // }

  render() {
    debugger
    const edit = () => {
      return (
        <div>
          <h2>{this.state.email}</h2>
          <form action="">
            <input type='text' 
            value={this.state.username}
            onChange={this.update('username')} />
            <input type='text'  
            value={this.state.bio}
            onChange={this.update('bio')}/>
            <input type="submit" value="Submit" onClick={this.handleSubmit} />
          </form>
          {/* <button onClick={this.handleDelete}>Delete</button> */}
          
        </div>
      )
    }

    const show = () => {
      return (
        <div>
          <h2>{this.state.email}</h2>
          <p>{this.state.username}</p>
          <p>{this.state.bio}</p>
          <button onClick={this.onClick}>Edit</button>
        </div>
      )
    }

    return (this.state.edit ? edit() : show())
  }
}

export default User;