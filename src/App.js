import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Header from './components/common/Header.js'
import Routes from './components/common/routing/Routes'
import Footer from './components/common/Footer'

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header />
                <Routes />
                <Footer />
            </div>
        );
    }
}

export default withRouter(App)