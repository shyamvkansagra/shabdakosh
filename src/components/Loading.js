import React, { Component } from 'react';
import './style.css';

export default class Loading extends Component {
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