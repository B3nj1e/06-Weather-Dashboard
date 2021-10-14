console.log("test");

var citySearch = document.querySelector('#city');
var searchBtn = document.querySelector('.searchBtn');

var cityCount = [];

console.log(citySearch);
console.log(searchBtn);

searchBtn.addEventListener("click", function(event){
    event.preventDefault();

    console.log("search button clicked");
    console.log(event);
    console.log(citySearch.value)

    cityCount++
    console.log(cityCount);
    saveCity();
    renderCity();
});



// function searchProcess {
    
// };

function saveCity() {
    var cityValue = citySearch.value;

    if (cityValue !== null) {
        localStorage.setItem("city".concat(cityCount), JSON.stringify(cityValue));
    }

    console.log(cityCount);
};

function renderCity() {
    var savedCity = JSON.parse(localStorage.getItem("city".concat(cityCount)));
    console.log(savedCity);
};