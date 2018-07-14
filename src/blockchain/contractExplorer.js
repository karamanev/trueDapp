const ethers = require('ethers')
const config = require('./contractInfo')

let provider = ethers.providers.getDefaultProvider('ropsten')
let contractAddress = config.getContractAddress()
let contractABI = config.getContractABI()

let newsContract = new ethers.Contract(contractAddress, contractABI, provider)

async function addCurrentNews(title, summary, category, publisher, rating, imageUrl) {

    let privateKey = '0xf91c7e6f1e5a32ee9c8cfbd0b050f39e249d4effd19942537c04d34b78821b75'
    try {
        let wallet = await new ethers.Wallet(privateKey, provider);
        let newsContract = await new ethers.Contract(contractAddress, contractABI, wallet)

        rating = Number(rating)
        //    let news = (`"${title}", "${summary}", "${category}", ${publisher}, ${rating}, ${imageUrl}`)
        await newsContract.addNews(title, summary, category, publisher, rating, imageUrl)

        return
    }
    catch (err) {
        console.log(err)
    }
}

async function showNews() {
    try {
        let news = []
        let categoriesCount = Number(await newsContract.getNumberOfCategories())
        for (let index = 0; index < categoriesCount; index++) {
            let currentCategoryName = "";
            currentCategoryName = await newsContract.getCategoryName(index)
            let newsInCurrentCategory = Number(await newsContract.getNumberOfNewsInType(currentCategoryName))

            for (let newsIndex = 0; newsIndex < newsInCurrentCategory; newsIndex++) {
                let result = []
                result = await newsContract.getNews(currentCategoryName, newsIndex)
                let imageUrl = ''
                imageUrl = await newsContract.getNewsImageHash(currentCategoryName, newsIndex)
                let currentNews = {
                    title: result.title,
                    summary: result.summary,
                    category: currentCategoryName,
                    publisher: result.publisher,
                    rating: Number(result.rating),
                    imageUrl
                }
                news.push(currentNews)
            }
        }
        return news
    }

    catch (err) {
        console.log(err)
    }
}

async function showNewsFromCategory(categoryName) {
    try {
        let news = []
        let newsInCategoryCount = await newsContract.getNumberOfNewsInType(categoryName)
        for (let index = 0; index < newsInCategoryCount; index++) {
            let result = []
            result = await newsContract.getNews(categoryName, index)
            let imageUrl = ''
            imageUrl = await newsContract.getNewsImageHash(categoryName, index)
            let currentNews = {
                title: result.title,
                summary: result.summary,
                category: categoryName,
                publisher: result.publisher,
                rating: Number(result.rating),
                imageUrl
            }
            news.push(currentNews)
        }
        return news
    }

    catch (err) {
        console.log(err)
    }
}

async function showCategories() {
    try {
        let categories = []
        let categoriesCount = Number(await newsContract.getNumberOfCategories())
        for (let index = 0; index < categoriesCount; index++) {
            let currentCategoryName = "";
            currentCategoryName = await newsContract.getCategoryName(index)
            categories.push(currentCategoryName)
        }
        return categories
    }

    catch (err) {
        console.log(err)
    }
}

export default {
    addCurrentNews,
    showNews,
    showNewsFromCategory,
    showCategories
}