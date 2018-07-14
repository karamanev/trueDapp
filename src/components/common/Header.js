import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/header.css'
import Auth from '../auth/Auth'
import userStore from '../../stores/userStore'

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: Auth.getUser().username
        }

        this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this)

        userStore.on(
            userStore.eventTypes.USER_LOGGED_IN,
            this.handleUserLoggedIn
        )
    }

    handleUserLoggedIn(data) {
        if (data.success) {
            this.setState({
                username: data.user.username
            })
        }
    }

    render() {
        return (
            <header>
                <div className="menu">
                    <h2>trueDapp</h2>

                    {Auth.isUserAdmin() ? (
                        <div className="welcome">
                            <Link to="/admin" className="headLink">Do the administrator things</Link>
                        </div>) : null}

                    {Auth.isUserAuthenticated() ? (
                        <div>
                            <div className="welcome">Welcome, {this.state.username}!</div>
                            <Link to="/" className="headLink">Home</Link>
                            <Link to="/news" className="headLink">All news</Link>
                            <Link to="/news/categories" className="headLink">Categories</Link>
                            <Link to="/news/add" className="headLink">Publish your news!</Link>
                            <Link to="/logout" className="headLink">Logout</Link>
                        </div>)
                        : (
                            <div>
                                <Link to="/" className="headLink">Home</Link>
                                <Link to="/news" className="headLink">All news</Link>
                                <Link to="/news/categories" className="headLink">Categories</Link>
                                <Link to="/login" className="headLink">Login</Link>
                                <Link to="/register" className="headLink">Register</Link>
                            </div>)
                    }
                </div>
            </header>
        )
    }
}