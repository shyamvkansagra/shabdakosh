import React, { Component } from 'react';
import WordDescription from './WordDescription';
import './style.css';

export default class SearchBox extends Component {
    state = {
        searchTerm: '',
        dictionaryWord: '',
        dictionaryDefinition: '',
    };

    handleSearchChange = e =>
        this.setState({ searchTerm: e.target.value })

    handleDictionarySearch = () => {
        const { searchTerm } = this.state;
        const { dictionary } = this.props;

        const searchResult = dictionary[searchTerm.toLowerCase()];
        if (searchResult) {
            this.setState({
                dictionaryWord: searchResult.dictionaryWord,
                dictionaryDefinition: searchResult.dictionaryDefinition,
            });
        }
    }

    render() {
        const { searchTerm, dictionaryWord, dictionaryDefinition } = this.state;
        return (
            <div>
                <div className="searchContainer">
                    <span className="labelMsg">
                        <p>Want to know the meaning of that cool word you came across? Type below:</p>
                    </span>
                    <div className="searchBox">
                        <input
                            id="search"
                            name="Search"
                            placeholder="Your text goes here..."
                            type="text"
                            onChange={this.handleSearchChange}
                            value={searchTerm}
                        />
                        <button
                            className="searchBtn"
                            type="button"
                            onClick={this.handleDictionarySearch}
                        >
                            Search
                        </button>
                    </div>
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