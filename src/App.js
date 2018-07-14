import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Header from './components/common/Header.js'
import Routes from './components/common/routing/Routes'


class App extends Component {

    render() {
        return (
            <div className="App">
                <Header />
                <Routes />
            </div>
        );
    }
}

export default withRouter(App)