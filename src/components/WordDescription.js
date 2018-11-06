import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class WordDescription extends Component {
    static propTypes = {
        dictionaryWord: PropTypes.string.isRequired,
        dictionaryDefinition: PropTypes.string.isRequired,
    };

    render() {
        const { dictionaryWord, dictionaryDefinition } = this.props;
        return (
            <div>
                <div className="definitionContainer">
                    <span className="dictionaryWord">{dictionaryWord}</span>
                    <p className="dictionaryDefinition">{dictionaryDefinition}</p>
                </div>
            </div>
        );
    }
}