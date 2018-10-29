import React, { Component } from 'react';
import WordDescription from './WordDescription';
import setDB from '../db/setDB';
import './style.css';

export default class SearchBox extends Component {
    componentDidMount() {
        const isDBSet = window.localStorage.getItem('isDBSet');
        if (!isDBSet) {
            const result = setDB();
            if (result === 'success') {
                window.localStorage.setItem('isDBSet', true);
            }
        }
    }

    render() {
        return (
            <div>
                <div className="searchContainer">
                    <span className="labelMsg">
                        <p>Want to know the meaning of that cool word you came across? Type below:</p>
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