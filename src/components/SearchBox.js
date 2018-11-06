import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class WordDescription extends Component {
    static propTypes = {
        handleSearchChange: PropTypes.func.isRequired,
        searchTerm: PropTypes.string,
        handleSearch: PropTypes.func.isRequired,
    };

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