import React, { Component } from 'react'
import News from './News'

export default class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
        };

    }

    render() {
        return (
            <div className="container">
            <News/>
            </div>
        );
    }
}