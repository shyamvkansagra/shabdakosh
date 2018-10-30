import React, { Component } from 'react';
import levenshtein from 'liblevenshtein';

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
    };

    handleSearchChange = e => {
        if (this.state.searchTerm && !e.target.value) {
            // search term was reset
            this.setState({
                searchTerm: '',
                wordSuggestions: [],
            })
        } else {
            // User is entering the data
            this.setState({ searchTerm: e.target.value });
        }

    }

    handleSearch = () => {
        const { searchTerm } = this.state;
        const { dictionary } = this.props;
        
        const searchResult = dictionary[searchTerm.toLowerCase()];
        
        if (searchResult) {
            // Match found!
            this.setState({
                dictionaryWord: searchResult.dictionaryWord,
                dictionaryDefinition: searchResult.dictionaryDefinition,
                wordSuggestions: [],
            });
        } else {
            // Maybe there was typo
            const completionList = Object.keys(dictionary);
            const builder = new levenshtein.Builder()
                .dictionary(completionList, false)  // generate spelling candidates from unsorted completion_list
                .algorithm("transposition")          // use Levenshtein distance extended with transposition
                .sort_candidates(true)               // sort the spelling candidates before returning them
                .case_insensitive_sort(true)         // ignore character-casing while sorting terms
                .include_distance(false)             // just return the ordered terms (drop the distances)
                .maximum_candidates(3);

            const MAX_EDIT_DISTANCE = 2;
 
            const transducer = builder.build();

            const wordSuggestions = transducer.transduce(searchTerm, MAX_EDIT_DISTANCE);
            this.setState({ wordSuggestions, dictionaryWord: '', dictionaryDefinition: '' });
        }
    }

    searchSuggestedWord = e => {
        const { word } = e.currentTarget.dataset;
        this.setState({
            searchTerm: word,
            wordSuggestions: [],
        }, () => {
            this.handleSearch();
        });
    }

    render() {
        const {
            searchTerm,
            dictionaryWord,
            dictionaryDefinition,
            wordSuggestions,
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
                    : (<React.Fragment />)
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