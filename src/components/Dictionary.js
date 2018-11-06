import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';

// Import styles
import './style.css';

// Import components
import SearchBox from './SearchBox';
import WordDescription from './WordDescription';
import WordSuggestion from './WordSuggestion';
import { searchHandler } from '../state-handlers';

export default class Dictionary extends Component {
    static propTypes = {
        db: PropTypes.object.isRequired,
        suggester: PropTypes.object.isRequired,
    };

    state = {
        searchTerm: '',
        dictionaryWord: '',
        dictionaryDefinition: '',
        wordSuggestions: [],
        noneFound: false,
        error: null,
    };

    componentDidCatch(error, errorInfo) {
      this.setState({ error });
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(error);
      });
    }

    handleSearchChange = e => {
        const newStateObj = searchHandler(this.state.searchTerm, e.target.value);
        this.setState(newStateObj);
    }

    handleSearch = () => {
        const { searchTerm } = this.state;
        const { db, suggester } = this.props;
        
        db.findOne(
            { word: searchTerm.toLowerCase() },
            (err, doc) => {
                if (doc) {
                    return this.setState({
                        dictionaryWord: doc.dictionaryWord,
                        dictionaryDefinition: doc.dictionaryDefinition,
                        wordSuggestions: [],
                        noneFound: false,
                    });
                }

                const MAX_EDIT_DISTANCE = 2;
                const wordSuggestions = suggester.transduce(searchTerm, MAX_EDIT_DISTANCE);

                return this.setState({
                    wordSuggestions,
                    dictionaryWord: '',
                    dictionaryDefinition: '',
                    noneFound: wordSuggestions.length === 0,
                })
            }
        );
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
            noneFound
        } = this.state;
        const showSuggestions = !dictionaryWord && !dictionaryDefinition && wordSuggestions;

        return (
            <div>
                <div className="searchContainer">
                    <span className="labelMsg">
                        <p>Know the meaning of that cool word you came across:</p>
                    </span>
                    <SearchBox
                        searchTerm={searchTerm}
                        handleSearchChange={this.handleSearchChange}
                        handleSearch={this.handleSearch}
                    />
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