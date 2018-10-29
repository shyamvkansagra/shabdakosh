import React, { Component } from 'react';
import './App.css';
import SearchBox from './Components/SearchBox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Welcome to "Shabdakosh"
        </header>
        <SearchBox />
      </div>
    );
  }
}

export default App;
