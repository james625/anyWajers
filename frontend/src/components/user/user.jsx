import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.bio = ''
    this.props.user ? (this.bio = this.props.user.data.bio) : (this.bio = '')
    this.favGame = ''
    this.props.user
      ? (this.favGame = this.props.user.data.favGame)
      : (this.favGame = '')
    this.state = {
      email: this.props.user
        ? this.props.user.data.email
        : this.props.currentUser.email,
      username: this.props.user
        ? this.props.user.data.username
        : this.props.currentUser.username,
      bio: this.bio,
      favGame: this.favGame,
      edit: false,
    }
    this.update = this.update.bind(this)
    this.onClick = this.onClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id)
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value })
  }

  onClick(e) {
    e.preventDefault()
    this.setState({
      edit: true,
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
      edit: false,
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
        <div className="user-form">
          <div className="game-show-art"></div>
          <div className="icon-box">
            <div>
              <FontAwesomeIcon
                icon={['fas', 'user-astronaut']}
                className="user-icon"
              />
            </div>
          </div>
          <div className="user-content">
            <div>
              <form action="">
                Username
                <br />
                <input
                  type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                />
                <br />
                <br />
                Bio
                <br />
                <input
                  type="text"
                  value={this.state.bio}
                  onChange={this.update('bio')}
                />
                <br />
                <br />
                Favorite Games
                <br />
                <input
                  type="text"
                  value={this.state.favGame}
                  onChange={this.update('favGame')}
                />
                <br />
                <br />
                <div className="user-form-buttons">
                  <button
                    type="submit"
                    value="Submit"
                    onClick={this.handleSubmit}
                  >
                    SUBMIT
                  </button>
                  <br />
                  <button id="delete-user" onClick={this.handleDelete}>
                    DELETE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }

    const show = () => {
      return (
        <div className="user-show">
          <div className="game-show-art"></div>
          <div className="icon-box">
            <div>
              <FontAwesomeIcon
                icon={['fas', 'user-astronaut']}
                className="user-icon"
              />
            </div>
          </div>
          <div className="user-info">
            <div>
              Email
              <p>{this.props.user.data.email}</p>
              <br />
              Username
              <p>{this.props.user.data.username}</p>
              <br />
              Bio
              <p>{this.props.user.data.bio}</p>
              <br />
              Favorite Games
              <p>{this.props.user.data.favGame}</p>
              <br />
              <div className="edit-button">
                <button onClick={this.onClick}>EDIT</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
    if (!this.props.user) return null
    return this.state.edit ? edit() : show()
  }
}

export default User
