import React, { Component } from 'react';
import HBOPlayer from './HBO';
import './styles/main.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HBOPlayer />
      </div>
    );
  }
}

export default App;
