import React, { Component } from 'react';
import autobind from 'react-autobind';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import App from './App';

class AppRoot extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {};
    }

    render() {
        return (
            <BrowserRouter basename="/">
                <Route component={App} />
            </BrowserRouter>
        );
    }
}

AppRoot.propTypes = {};

export default AppRoot;
