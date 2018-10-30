import React, { Component } from 'react';
import './App.css';

import mockBackend from './mockBackend';

import Dictionary from './components/Dictionary';
import Loading from './components/Loading';
import './App.css';

class App extends Component {
    state = {
        db: null,
        suggester: null,
        showLoading: true
    }

    async componentDidMount() {
        if (!this.state.db) {
            const { db, suggester } = await mockBackend();
            this.setState({ db, suggester, showLoading: false });
        }
    }

    render() {
        const { showLoading, db, suggester } = this.state;
        return (
            <div className="App">
            <header className="App-header">
                Welcome to Shabdakosh
            </header>
            {showLoading
                ? <Loading loadingMsg="Dictionary is loading, please wait!" />
                : <Dictionary db={db} suggester={suggester} />
            }
            </div>
        );
    }
}

export default App;
