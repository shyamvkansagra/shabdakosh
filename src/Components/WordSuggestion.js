import React, { Component } from 'react';
import './style.css';

export default class WordSuggestions extends Component {
    render() {
        const { suggestedWord, searchSuggestedWord } = this.props;
        return (
            <button className="suggestedWord" type="button" data-word={suggestedWord} onClick={searchSuggestedWord}>
                {suggestedWord}
            </button>
        );
    }
}