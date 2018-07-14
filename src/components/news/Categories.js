import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import newsActions from '../../actions/NewsActions'
import newsStore from '../../stores/newsStore'
import toastr from 'toastr'
import '../../styles/post.css'

export default class Categories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }

        this.handleCategoriesFetching = this.handleCategoriesFetching.bind(this)

        newsStore.on(
            newsStore.eventTypes.CATEGORIES_FETCHED,
            this.handleCategoriesFetching)

    }

    async componentDidMount() {
        toastr.success("We are connecting to the blockchain...")
        await newsActions.categories()
    }

    componentWillUnmount() {
        newsStore.removeListener(
            newsStore.eventTypes.CATEGORIES_FETCHED,
            this.handleCategoriesFetching)
    }

    handleCategoriesFetching(data) {
        this.setState({
            categories: data
        })
    }

    render() {

        const categories = this.state.categories.map((category, index) =>
            <div className="category">
                <h3><Link to={`category/${category}`} className="headLink">{category}</Link></h3>
            </div>
        )

        return (
            <div className="contain">
                <h1>Categories of our blockchain</h1>
                {categories}
            </div>
        );
    }
}