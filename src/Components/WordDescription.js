import React, { Component } from 'react';
import './style.css';

export default class SearchBox extends Component {
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