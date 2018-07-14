import React, { Component } from 'react'
import newsActions from '../../actions/NewsActions'
import newsStore from '../../stores/newsStore'
import '../../styles/post.css'
import toastr from 'toastr'

export default class LoginPage extends Component {
    constructor(props) {
        super(props)

        const page = 1
        this.state = {
            newses: [],
            page
        }

        this.handleNewsFetching = this.handleNewsFetching.bind(this)

        newsStore.on(
            newsStore.eventTypes.NEWS_FETCHED,
            this.handleNewsFetching)

    }

    async componentDidMount() {
        toastr.success("We are connecting to the blockchain...")
        await newsActions.all()
    }

    componentWillUnmount() {
        newsStore.removeListener(
            newsStore.eventTypes.NEWS_FETCHED,
            this.handleNewsFetching)
    }

    handleNewsFetching(data) {
        this.setState({
            newses: data
        })
    }

    render() {

        const newses = this.state.newses.map(news =>
            <div className="container" key={news.id}>
                <div className="post">
                    <div className="category">{news.category}</div>
                    <h2>{news.title}</h2>
                    <img className="NewsImg" alt="" src={news.imageUrl} />
                    <h3>{news.summary}</h3>
                    <br />
                    <div className="author"><b>Author: </b>{news.publisher}</div>
                    <div className="rating"><b>Rating: </b>{news.rating}</div>
                </div>
            </div>
        )

        return (
            <div className="contain">
                <h1>All news in the trueDapp blockchain</h1>
                {newses}
            </div>
        )
    }
}