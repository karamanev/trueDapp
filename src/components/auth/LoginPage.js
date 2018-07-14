import React, { Component } from 'react'
import Input from '../common/Input'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/userStore'
import Auth from './Auth'
import '../../styles/submit.css'
import toastr from 'toastr'

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            error: ''
        }

        this.handleUserLogin = this.handleUserLogin.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)

        userStore.on(
            userStore.eventTypes.USER_LOGGED_IN,
            this.handleUserLogin
        )
    }

    componentWillUnmount() {
        userStore.removeListener(
            userStore.eventTypes.USER_LOGGED_IN,
            this.handleUserLogin
        )
    }

    onChangeHandler(event) {
        const target = event.target
        const field = target.name
        const value = target.value
        const user = this.state.user
        user[field] = value

        this.setState({ value })
    }

    onSubmitHandler(e) {
        e.preventDefault()
        if (!this.validateUser())
            return
        userActions.login(this.state.user)
    }

    handleUserLogin(data) {
        if (!data.success) {
            let firstError = data.message
            this.setState({ error: firstError })
        }
        else {
            toastr.success(data.message)
            Auth.authenticateUser(data.token)
            Auth.saveUser(data.user)
            this.props.history.push('/')
        }
    }

    validateUser() {
        const user = this.state.user
        let formIsValid = true
        let error = ''
        if (user.password.length < 4) {
            error = 'Password must be longer.'
            formIsValid = false
        }
        if (error) {
            this.setState({ error })
        }

        return formIsValid
    }

    render() {
        return (
            <div className="container">
                <div className="submitForm">
                    <h1>Login</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="errmsg">{this.state.error}</div>
                        <Input
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeHandler}
                            label="Username"
                        />
                        <Input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChangeHandler}
                            label="Password"
                        />
                        <input type="submit" className="btn btn-primary" value="Login" />
                    </form>
                </div>
            </div>
        );
    }
}