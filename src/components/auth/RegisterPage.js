import React, { Component } from 'react'
import Input from '../common/Input.js'
import '../../styles/submit.css'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/userStore'
import toastr from 'toastr'

export default class RegisterPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: '',
                password: '',
                repeat: ''
            },
            error: ''
        }

        this.handleUserRegistration = this.handleUserRegistration.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)

        userStore.on(
            userStore.eventTypes.USER_REGISTERED,
            this.handleUserRegistration
        )
    }

    componentWillUnmount() {
        userStore.removeListener(
            userStore.eventTypes.USER_REGISTERED,
            this.handleUserRegistration
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

        userActions.register(this.state.user)
    }

    handleUserRegistration(data) {
        if (!data.success) {
            let firstError = data.message
            this.setState({ error: firstError })
        }
        else {
            toastr.success(data.message)
            this.props.history.push('/login')
        }
    }

    validateUser() {
        const user = this.state.user
        let formIsValid = true
        let error = ''
        if (user.password !== user.repeat) {
            error = 'Password do not match.'
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
                    <h1>Register</h1>
                    <form onSubmit={this.onSubmitHandler}>
                    <div className="errmsg">{this.state.error}</div>
                        <Input
                            name="username"
                            value={this.state.user.username}
                            onChange={this.onChangeHandler}
                            label="Username"
                        />
                        <Input
                            name="password"
                            type="password"
                            value={this.state.user.password}
                            onChange={this.onChangeHandler}
                            label="Password"
                        />
                        <Input
                            name="repeat"
                            type="password"
                            value={this.state.user.repeat}
                            onChange={this.onChangeHandler}
                            label="Repeat password"
                        />
                        <input type="submit" className="btn btn-primary" value="Register" />
                    </form>
                </div>
            </div>
        );
    }
}