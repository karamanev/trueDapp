import React, { Component } from 'react'
import '../../styles/post.css'

export default class HomePage extends Component {
    render() {
        return (
            <div className="container">
                <h1>Welcome to trueDapp</h1>
                <h3>
                    The truth is out there…
                </h3>

                <p className="post">You can read latest news saved on our blockchain here. If you want to publish or vote for newss accurancy, please register or log in!</p>

            </div>
        );
    }
}