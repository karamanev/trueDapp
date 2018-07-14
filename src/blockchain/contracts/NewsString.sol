pragma solidity ^0.4.23;

contract TruthApp {
    
    struct news{
        string title;
        string summary;
        string category;
        address publisher;
        int rating;
        string imageHash;
    }
    
    mapping (string => news[]) newsAll;
    
    string [] private categories;
    
    modifier newsExists(string _category, uint _index) {
        require(newsAll[_category].length > 0);
        _;
    }

    function addNews(string _title, string _summary, string _category, address _publisher, int _rating, string _imageHash) public {
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
    
    function getNews(string _category, uint _index) view public newsExists(_category, _index)
    returns (string title, string summary, address publisher, int rating) {
        return(
        newsAll[_category][_index].title,
        newsAll[_category][_index].summary,
        newsAll[_category][_index].publisher,
        newsAll[_category][_index].rating
        );
    }
    
    function getNewsImageHash(string _category, uint _index) view public 
    returns (string imageHash)
    {
        return newsAll[_category][_index].imageHash;
    }        
    
    function ratePlus(string _category, uint _index) public newsExists(_category, _index) {
        newsAll[_category][_index].rating += 1; 
    }
    
    function rateMinus(string _category, uint _index) public newsExists(_category, _index) {
        newsAll[_category][_index].rating -= 1; 
    }
    
    function getCategoryName(uint _index) view public returns (string title) {
        require(_index < categories.length);
        return categories[_index];
    }
    
    function getNumberOfCategories() public view returns (uint count) {
        return categories.length;
    }
    
    function getNumberOfNewsInType(string _category) view public returns (uint count) {
        return newsAll[_category].length;
    }
}