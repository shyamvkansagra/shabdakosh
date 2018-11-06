import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Loading extends Component {
	static propTypes = {
		loadingMsg: PropTypes.string.isRequired,
	};

    render() {
        const { loadingMsg } = this.props;
        return (
            <div className="loaderContainer">
                <p>{loadingMsg}</p> 
                <div className="loader" />
            </div>
        );
    }
}