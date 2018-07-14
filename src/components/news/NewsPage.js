import React, { Component } from 'react'
import News from './News'
import contract from '../../blockchain/contractExplorer'

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }
    async onSubmitHandler(e) {
        e.preventDefault()
        console.log(contract.showCategories())
    }


    render() {
        return (
            <div className="container">

                <form onSubmit={this.onSubmitHandler}>
                    <input type="submit" className="btn btn-primary" value="Show categories" />
                </form>
                <News/>
            </div>
        );
    }
}