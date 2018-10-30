import React, { Component } from 'react';

import SearchBox from './components/SearchBox';
import Loading from './components/Loading';
import './App.css';

class App extends Component {
    state = { showLoading: false };
    render() {
        const { showLoading } = this.state;
        return (
            <div className="App">
            <header className="App-header">
                Welcome to Shabdakosh
            </header>
            {showLoading
                ? <Loading loadingMsg="Dictionary is loading, please wait!" />
                : <SearchBox />
            }
            </div>
        );
    }
}

export default App;
