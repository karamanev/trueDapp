pragma solidity ^0.4.18;

contract TruthApp {
    
    struct news{
        bytes32 title;
        bytes32 summary;
        bytes20 category;
        address publisher;
        int rating;
        string imageHash;
    }
    
    mapping (bytes20 => news[]) newsAll;
    
    bytes20[] private categories;
    
    address private owner;
    
    modifier newsExists(bytes20 _category, uint _index) {
        require(newsAll[_category].length > 0);
        _;
    }

    modifier onlyOwner(){
        require(owner == msg.sender);
        _;
    }

    function addNews(bytes32 _title, bytes32 _summary, bytes20 _category, address _publisher, int _rating, string _imageHash) public {
        news memory currentNews;
        currentNews.title = _title;
        currentNews.summary = _summary;
        currentNews.category = _category;
        currentNews.publisher = _publisher;
        currentNews.rating = _rating;
        currentNews.imageHash = _imageHash;

        if(newsAll[_category].length == 0) {
            categories.push(_category);
        }

        newsAll[_category].push(currentNews);
    }
    
    function getNews(bytes20 _category, uint _index) view public newsExists(_category, _index)
    returns (bytes32 title, bytes32 summary, address publisher, int rating) {
        return(
        newsAll[_category][_index].title,
        newsAll[_category][_index].summary,
        newsAll[_category][_index].publisher,
        newsAll[_category][_index].rating
        );
    }
    
    function getNewsImageHash(bytes20 _category, uint _index) view public 
    returns (string imageHash)
    {
        return newsAll[_category][_index].imageHash;
    }        
    
    function ratePlus(bytes20 _category, uint _index) public newsExists(_category, _index) {
        newsAll[_category][_index].rating += 1; 
    }
    
    function rateMinus(bytes20 _category, uint _index) public newsExists(_category, _index) {
        newsAll[_category][_index].rating += 1; 
    }
    
    function getCategoryName(uint _index) view public returns (bytes32 title) {
        require(_index < categories.length);
        return categories[_index];
    }
    
    function getNumberOfCategories() public view returns (uint count) {
        return categories.length;
    }
    
    function getNumberOfNewsInType(bytes20 _category) view public returns (uint count) {
        return newsAll[_category].length;
    }
}