import React, { Component } from 'react';
import './App.css';
import SearchBox from './Components/SearchBox';
import Loading from './Components/Loading';

class App extends Component {
    state = {
        dictionary: null,
        showLoading: false,
    }

  setDB = () => {
    const setState = value => {
        this.setState({ dictionary: value, showLoading: false });
    }
    fetch(
        'https://raw.githubusercontent.com/shyamvkansagra/shabdakosh/development/dictionary.txt'
    )
        .then(res => res.text())
        .then(function(data) {
            const dataArr = data.split('\n\n');
            const wordDescriptions = {};
            dataArr.forEach(d => {
                const dataDefinition = d.split(' ');
                const dictionaryWord = dataDefinition[0];
                dataDefinition.shift();
                const dictionaryDefinition = dataDefinition.join(' ');
                wordDescriptions[dictionaryWord.toLowerCase()] = { dictionaryWord, dictionaryDefinition };
            });
            const dictionary = Object.assign({}, wordDescriptions);
            setState(dictionary);
            return;
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
  };

    componentDidMount() {
        if (!this.state.dictionary) {
            this.setDB();
            this.setState({ showLoading: true });
        }
    }

    render() {
        const { dictionary, showLoading } = this.state;
        return (
            <div className="App">
            <header className="App-header">
                Welcome to Shabdakosh
            </header>
            {showLoading
                ? (<Loading loadingMsg="Dictionary is loading, please wait!" />)
                : (<SearchBox dictionary={dictionary} />)
            }
            </div>
        );
    }
}

export default App;
