import React from 'react';
// import propTypes from 'prop-types';

class App extends React.Component {
  constructor(props) {
    super(props)
    console.log('aaa');
  }
  state = {
    count: 0,
    isLoading: true,
  };

  add = () => {
    this.setState(current => ({ count: current.count + 1 }));
  };
  
  minus = () => {
    this.setState(current => ({ count: current.count - 1 }));
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 1000);
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <h1>the state number { this.state.count }</h1>
        <div>
          <button type="button" onClick={ this.add }>더하기</button>
          <button type="button" onClick={ this.minus }>빼기</button>
        </div>
      <div>{ isLoading? "Loading..." : "We are ready" }</div>
      </div>
    );
  };
}

export default App;
