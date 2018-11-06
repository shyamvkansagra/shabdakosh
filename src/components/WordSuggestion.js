import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class WordSuggestions extends Component {
	static propTypes = {
		suggestedWord: PropTypes.string.isRequired,
		searchSuggestedWord: PropTypes.func.isRequired,
	};

    render() {
        const { suggestedWord, searchSuggestedWord } = this.props;
        return (
            <button className="suggestedWord" type="button" data-word={suggestedWord} onClick={searchSuggestedWord}>
                {suggestedWord}
            </button>
        );
    }
}