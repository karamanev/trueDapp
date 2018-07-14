import React, { Component } from 'react'
import Input from '../common/Input'
import contractExplorer from '../../blockchain/contractExplorer'
import '../../styles/submit.css'

export default class AddNewsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: {
                title: '',
                summary: '',
                category: '',
                publisher: '0xe77a27aa92eaf1fa52316d8298588dd3f0c0c8e4',
                rating: 0,
                imageUrl: ''
            },
            error: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    validateNews() {
        const news = this.state.news
        let formIsValid = true
        let error = ''
        if (news.title === '') {
            error = 'You have to write a title.'
            formIsValid = false
        }

        if (news.summary === '') {
            error = 'You have to write a summary.'
            formIsValid = false
        }
        
        if (news.category === '') {
            error = 'You have to enter a category.'
            formIsValid = false
        }        
        
        if (news.imageUrl === '') {
            error = 'You have to enter an image url.'
            formIsValid = false
        }
              

        if (error) {
            this.setState({ error })
        }
        return formIsValid
    }




    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        contractExplorer.addCurrentNews({ ...this.state.props })
    }

    render() {
        return (
            <div className="container">
                <div className="submitForm">
                    <h1>Enter your news to be broadcasted on blockchain!</h1>
                    <form onSubmit={this.onSubmitHandler}>
                    <div className="errmsg">{this.state.error}</div>
                        <Input
                            name="title"
                            type="textarea"
                            value={this.state.news.title}
                            onChange={this.onChangeHandler}
                            label="Title"
                        />
                        <Input
                            name="summary"
                            type="textarea"
                            value={this.state.news.summary}
                            onChange={this.onChangeHandler}
                            label="Sumary"
                        />
                        <Input
                            name="category"
                            type="textarea"
                            value={this.state.news.category}
                            onChange={this.onChangeHandler}
                            label="Summary"
                        />
                        <Input
                            name="publisher"
                            type="text"
                            value={this.state.news.publisher}
                            onChange={this.onChangeHandler}
                            label="Publisher"
                            readonly="true"
                        />
                        <Input
                            name="imageUrl"
                            type="text"
                            value={this.state.news.imageUrl}
                            onChange={this.onChangeHandler}
                            label="Image url"
                        />

                        <p>Make sure that you have filled correct the form. Once in the blockchain the news cannot be changed!</p>
                        <input type="submit" className="btn btn-primary" value="Publish!" />
                    </form>
                </div>
            </div>
        );
    }
}