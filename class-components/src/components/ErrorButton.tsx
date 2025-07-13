import { Component } from 'react';

class ErrorButton extends Component {
  state = { shouldError: false };

  onClick = () => {
    this.setState({ shouldError: true });
  };

  render() {
    if (this.state.shouldError) {
      throw new Error('Force Error');
    }

    return (
      <button className='right' onClick={this.onClick}>
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
