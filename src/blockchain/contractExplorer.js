const ethers = require('ethers')
const config = require('./contractInfo')
const newsDTO = require('./newsDTO')
const ipfsConfig = require('./ipfs-config')

let provider = ethers.providers.getDefaultProvider('ropsten')
let contractAddress = config.getContractAddress()
let contractABI = config.getContractABI()

let newsContract = new ethers.Contract(contractAddress, contractABI, provider)

async function addCurrentNews(title,summary,category,publisher,rating,imageHash) {
    
    let privateKey = '0xf91c7e6f1e5a32ee9c8cfbd0b050f39e249d4effd19942537c04d34b78821b75'
    try {
        let wallet = await new ethers.Wallet(privateKey, provider);
        let newsContract = await new ethers.Contract(contractAddress, contractABI, wallet)

        rating = Number(rating)
    //    let news = (`"${title}", "${summary}", "${category}", ${publisher}, ${rating}, ${imageHash}`)
     console.log(await newsContract.addNews(title, summary, category, publisher, rating, imageHash))

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
            let newsInCurrentCategory = Number (await newsContract.getNumberOfNewsInType(currentCategoryName))

            for (let newsIndex = 0; newsIndex < newsInCurrentCategory; newsIndex++) {
                let result = []
                result = await newsContract.getNews(currentCategoryName, newsIndex)
                let imageUrl = ''
                imageUrl = await newsContract.getNewsImageHash(currentCategoryName, newsIndex)
                let currentNews = new newsDTO(
                                    result.title,
                                    result.summary,
                                    currentCategoryName,
                                    result.publisher,
                                    Number(result.rating),
                                    imageUrl
                                )
                news.push(currentNews)
            }
        }
        return news
    }

    catch (err) {
        console.log(err)
    }
}


async function showNewsFromCategory(category) {
    try {
        let news = []
        let newsInCategoryCount = await newsContract.getNumberOfNewsInType(category).then(console.log)
        for (let index = 0; index < newsInCategoryCount; index++) {
            await newsContract.getNews(category, index)
                .then(result => {
                    newsContract.getNewsImageHash
                        .then(imageHash => {

                            let imageUrl = ipfsConfig.getServerUrl() + imageHash
                            let currentNews = new newsDTO(
                                result.title,
                                result.sumary,
                                category,
                                result.publisher,
                                result.rating,
                                imageUrl
                            )
                            news.push(currentNews)
                            console.log(currentNews)
                            console.log(news)
                        })
                })
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
        let categoriesCount = Number (await newsContract.getNumberOfCategories())
        for (let index = 0; index < categoriesCount; index++) {
            let currentCategoryName = "";
            currentCategoryName = await newsContract.getCategoryName(index)
            categories.push(currentCategoryName)
        }
        console.log(categories)
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