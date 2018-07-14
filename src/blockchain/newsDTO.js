class NewsDTO {
    constructor(title, summary, category, publisher, rating, imageUrl){
        this.title = title
        this.summary = summary
        this.category = category
        this.publisher = publisher
        this.rating = rating
        this.imageUrl = imageUrl
    }
}
module.exports = NewsDTO