console.log("test");

var citySearch = document.querySelector('#city');
var searchBtn = document.querySelector('.searchBtn');
var searchHistory = document.querySelector('.history');

var cityCount = JSON.parse(localStorage.getItem("cityCount"));

console.log(citySearch);
console.log(searchBtn);

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    console.log("search button clicked");
    console.log(event);
    console.log(citySearch.value)

    cityCount++
    console.log(cityCount);
    saveCity();
    // renderCity();
});

// function searchProcess {

// };

// load previously search cities on load
renderCity();

// save searched city to local storage and to search history button
function saveCity() {
    var cityValue = citySearch.value;

    if (cityValue !== null) {
        localStorage.setItem("city".concat(cityCount), JSON.stringify(cityValue));
        var searchedCityBtn = document.createElement("button");
        localStorage.setItem("cityCount", JSON.stringify(cityCount));
        searchedCityBtn.setAttribute("type", "submit");
        searchedCityBtn.setAttribute("class", "btn btn-primary mb-3 historyBtn");
        searchedCityBtn.textContent = cityValue;
        searchHistory.appendChild(searchedCityBtn);
    }

    console.log(cityCount);
};

// retrive searched cities from local storage, and display as buttons in search history
function renderCity() {
    for (i = 1; i < 10; i++) {
        var savedCity = JSON.parse(localStorage.getItem("city".concat(i)));
        console.log(savedCity);
        if (savedCity) {
            var searchedCityBtn = document.createElement("button");
            searchedCityBtn.setAttribute("type", "submit");
            searchedCityBtn.setAttribute("class", "btn btn-primary mb-3 historyBtn");
            searchedCityBtn.textContent = savedCity;
            searchHistory.appendChild(searchedCityBtn);


            //     console.log(searchedCityBtn);
            //     // var searchedCity = document.innerHTML(savedCity);
            //     // console.log(searchedCity);
            //     // searchHistory.textContent = savedCity;
            //     // searchHistory.appendChild(searchedCity);
        } else {
            return;
        }
    }
    // searchHistory.appendChild("<button type='submit' class='btn btn-primary mb-3 " + savedCity + "'>" + savedCity + "</button>")
};