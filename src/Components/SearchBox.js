import React, { Component } from 'react';
import './style.css';

export default class WordDescription extends Component {
    render() {
        const { handleSearchChange, searchTerm, handleSearch } = this.props;
        return (
            <div className="searchBox">
                <input
                    id="search"
                    name="Search"
                    placeholder="Your word goes here..."
                    type="text"
                    onChange={handleSearchChange}
                    value={searchTerm}
                />
                <button
                    className="searchBtn"
                    type="button"
                    onClick={handleSearch}
                    disabled={!searchTerm}
                >
                    Search
                </button>
            </div>
        );
    }
}