import React, { Component } from 'react';
import './App.css';
import SearchBox from './Components/SearchBox';

class App extends Component {
  state = {
    dictionary: null,
  }

  setDB = () => {
    const setState = value => {
        this.setState({ dictionary: value });
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
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
  };

  componentDidMount() {
      if (!this.state.dictionary) {
          this.setDB();
      }
  }

  render() {
    const { dictionary } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          Welcome to Shabdakosh
        </header>
        <SearchBox dictionary={dictionary} />
      </div>
    );
  }
}

export default App;
