import React, { Component } from 'react';
import './App.css';
import Dictionary from './components/Dictionary';
import Loading from './components/Loading';

class App extends Component {
    state = { dictionary: null, showLoading: false }

    dictionaryTxtToObj = data => {
        const dataArr = data.split('\n\n');
        const dictionaryObj = {};
        dataArr.forEach(d => {
            const dataDefinition = d.split(' ');
            const [dictionaryWord] = dataDefinition;
            dataDefinition.shift();
            const dictionaryDefinition = dataDefinition.join(' ');
            dictionaryObj[dictionaryWord.toLowerCase()] = { dictionaryWord, dictionaryDefinition };
        });
       return dictionaryObj;
    }

    setDictionaryInState = () => fetch('https://raw.githubusercontent.com/shyamvkansagra/shabdakosh/development/dictionary.txt')
        .then(res => res.text())
        .then(data => this.setState({
            dictionary: this.dictionaryTxtToObj(data),
            showLoading: false
        }))
        .catch(err => console.log('Fetch Error:', err));

    componentDidMount() {
        if (!this.state.dictionary) {
            this.setState({ showLoading: true }, this.setDictionaryInState);
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
                ? <Loading loadingMsg="Dictionary is loading, please wait!" />
                : <Dictionary dictionary={dictionary} />
            }
            </div>
        );
    }
}

export default App;
