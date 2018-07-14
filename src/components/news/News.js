import React from 'react'

const News = (props) => {
    return (
        <div className="container">
            <div className="news">
                <h1>{props.title}</h1>
                <h2>{props.summary}</h2>
                <h1>{props.category}</h1>
                <p>{props.publisher}</p>
                <p>{props.rating}</p>
                <img className="NewsImg" alt="" src={props.imgUrl} />
            </div>
        </div>
    )
}

export default News