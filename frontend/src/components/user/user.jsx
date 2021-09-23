import React from 'react';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.bio = '';
    this.props.user ? this.bio = this.props.user.data.bio : this.bio = ''
    this.favGame = '';
    this.props.user ? this.favGame = this.props.user.data.favGame : this.favGame = ''
    this.state = {
      email: (this.props.user ? this.props.user.data.email : this.props.currentUser.email),
      username: (this.props.user ? this.props.user.data.username : this.props.currentUser.username),
      bio: this.bio,
      favGame: this.favGame,
      edit: false
    };
    this.update = this.update.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    this.props.fetchUser(this.props.currentUser.id)
  }

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
      favGame: this.state.favGame,
      id: this.props.currentUser.id,
    }
    this.props.editUser(user)
    this.setState({
      edit: false
    })
  }

  handleDelete(e) {
    e.preventDefault()
    this.props.deleteUser(this.props.currentUser.id)
    this.props.logout()
    this.props.history.push('/')
  }

  render() {
    const edit = () => {
      return (
        <div>
          <h2>{this.state.email}</h2>
          <form action="">
            Username
            <input type='text' 
            value={this.state.username}
            onChange={this.update('username')} />
            <br />
            Bio
            <input type='text'  
            value={this.state.bio}
            onChange={this.update('bio')}/>
            <br />
            Favorite Games
            <input type='text'  
            value={this.state.favGame}
            onChange={this.update('favGame')}/>
            <br />
            <input type="submit" value="Submit" onClick={this.handleSubmit} />
          </form>
          <br />
          <button onClick={this.handleDelete}>Delete</button>
          
        </div>
      )
    }

    const show = () => {
      return (
        <div>
          <h2>{this.props.user.data.email}</h2>
          <p>{this.props.user.data.username}</p>
          <p>{this.props.user.data.bio}</p>
          <p>{this.props.user.data.favGame}</p>
          <button onClick={this.onClick}>Edit</button>
        </div>
      )
    }
    if (!this.props.user) return null
    return (this.state.edit ? edit() : show())
  }
}

export default User;