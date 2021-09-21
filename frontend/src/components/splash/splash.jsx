import React from 'react';
import Form from '../form/form';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
    };
    // this.handleClick = this.handleClick.bind(this)
  }

  handleClick(field) {
    return (e) => {
      e.preventDefault();
      if (field === 'logout') {
        this.props.logout();
      } else {
        this.setState({
          type: field,
        });
      }
    };
  }
  render() {
    return <div></div>;
  }
}

export default Splash;
