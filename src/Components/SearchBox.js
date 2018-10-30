import React, { Component } from 'react';

// Import styles
import './style.css';

// Import components
import WordDescription from './WordDescription';
import WordSuggestion from './WordSuggestion';

export default class SearchBox extends Component {
    state = {
        searchTerm: '',
        dictionaryWord: '',
        dictionaryDefinition: '',
        wordSuggestions: [],
        noneFound: false,
    };

    handleSearchChange = e => {
        if (this.state.searchTerm && !e.target.value) {
            // search term was reset
            this.setState({
                searchTerm: '',
                wordSuggestions: [],
                noneFound: false,
            })
        } else {
            // user is entering the data
            this.setState({ searchTerm: e.target.value });
        }
    }

    handleSearch = () => {
        const { searchTerm } = this.state;
        
        fetch(
            `http://localhost:8080/dictionary/${searchTerm}`,
            {
                method: 'get',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(json => JSON.parse(json))
            .then(stateObj => this.setState(stateObj));
    }

    searchSuggestedWord = e => {
        const { word } = e.currentTarget.dataset;
        this.setState({ searchTerm: word, wordSuggestions: [], noneFound: false }, this.handleSearch);
    }

    render() {
        const {
            searchTerm,
            dictionaryWord,
            dictionaryDefinition,
            wordSuggestions,
            noneFound,
        } = this.state;
        const showSuggestions = !dictionaryWord && !dictionaryDefinition && wordSuggestions;

        return (
            <div>
                <div className="searchContainer">
                    <span className="labelMsg">
                        <p>Know the meaning of that cool word you came across:</p>
                    </span>
                    <div className="searchBox">
                        <input
                            id="search"
                            name="Search"
                            placeholder="Your word goes here..."
                            type="text"
                            onChange={this.handleSearchChange}
                            value={searchTerm}
                        />
                        <button
                            className="searchBtn"
                            type="button"
                            onClick={this.handleSearch}
                            disabled={!searchTerm}
                        >
                            Search
                        </button>
                    </div>
                    {showSuggestions && showSuggestions.length
                    ? (
                        <div className="wordSuggestions">
                            <span>Did you mean?:</span>
                            {wordSuggestions.map(ws => (
                                <WordSuggestion
                                    key={ws}
                                    suggestedWord={ws}
                                    searchSuggestedWord={this.searchSuggestedWord}
                                />
                            ))}
                            <p>(Click any above suggested word for instant search)</p>
                        </div>
                    )
                    : (noneFound
                        ? (
                            <div className="noneFoundMsg">
                                <span>Nothing found! 🙊 says, "Hmm, maybe this Shabdakosh is not as cool as I thought!" </span>
                            </div>
                        ) : null
                    )
                    }
                </div>
                {dictionaryWord && dictionaryDefinition &&
                    <WordDescription
                        dictionaryWord={dictionaryWord}
                        dictionaryDefinition={dictionaryDefinition}
                    />
                }
            </div>
        );
    }
}