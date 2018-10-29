import React, { Component } from 'react';
import WordDescription from './WordDescription';
import './style.css';

export default class SearchBox extends Component {
    render() {
        return (
            <div>
                <div className="searchContainer">
                    <span className="labelMsg">
                        <p>Want to know the meaning of that cool word you just heard? Type below:</p>
                    </span>
                    <div className="searchBox">
                        <input id="search" name="Search" placeholder="Your text goes here..." type="text" />
                        <button className="searchBtn" type="button">Search</button>
                    </div>
                </div>
                <WordDescription />
            </div>
        );
    }
}