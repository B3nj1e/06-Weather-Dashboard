var citySearch = document.querySelector('#city');
var searchBtn = document.querySelector('.searchBtn');
var searchHistory = document.querySelector('.history');
var currentWeather = document.querySelector('.city-temp')
var today = moment();

var currentTitle = document.createElement("h2");
var currentIcon = document.createElement("img");
var currentTemp = document.createElement("p");
var currentWind = document.createElement("p");
var currentHumidity = document.createElement("p");
var currentUv = document.createElement("p");

var forecastCard1 = document.getElementById("1");
var forecastCard2 = document.getElementById("2");
var forecastCard3 = document.getElementById("3");
var forecastCard4 = document.getElementById("4");
var forecastCard5 = document.getElementById("5");
var forecastArray = ["", forecastCard1, forecastCard2, forecastCard3, forecastCard4, forecastCard5];

var cityCount = JSON.parse(localStorage.getItem("cityCount"));

var cityName = citySearch.value;

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
    getCurrentWeatherApi();
    // renderCity();
});

searchHistory.addEventListener("click", function (event) {
    console.log(event.srcElement.innerHTML);
    cityName = event.srcElement.innerHTML;

    var ApiKey = "3d90a22a5cc7a81125427869e7407c8d";
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + ApiKey;
    var iconUrl = "http://openweathermap.org/img/w/";

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.main.temp);
            console.log(data.coord.lat);
            localStorage.setItem("currentLat", JSON.stringify(data.coord.lat));
            localStorage.setItem("currentLon", JSON.stringify(data.coord.lon));

            currentIcon.setAttribute("src", iconUrl + data.weather[0].icon + ".png");
            currentTitle.textContent = cityName + "   " + today.format("DD-MM-YYYY");
            currentTemp.textContent = "Temperature: " + data.main.temp + " °C";
            currentWind.textContent = "Wind: " + data.wind.speed + " knots";
            currentHumidity.textContent = "Humidity: " + data.main.humidity + " %";

            currentWeather.appendChild(currentTitle);
            currentTitle.appendChild(currentIcon);
            currentWeather.appendChild(currentTemp);
            currentWeather.appendChild(currentWind);
            currentWeather.appendChild(currentHumidity);

            getUvApi();
            getForecastApi(event);
        });
});




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
        } else {
            return;
        }
    }
};

// function that calls current weather API and populates the elements with data. Also sets longtiude and latitude data in local storage. 
function getCurrentWeatherApi() {
    var cityName = citySearch.value;
    console.log(cityName);
    var ApiKey = "3d90a22a5cc7a81125427869e7407c8d";
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + ApiKey;
    var iconUrl = "http://openweathermap.org/img/w/";

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.main.temp);
            console.log(data.coord.lat);
            localStorage.setItem("currentLat", JSON.stringify(data.coord.lat));
            localStorage.setItem("currentLon", JSON.stringify(data.coord.lon));

            currentIcon.setAttribute("src", iconUrl + data.weather[0].icon + ".png");
            currentTitle.textContent = cityName + "   " + today.format("DD-MM-YYYY");
            currentTemp.textContent = "Temperature: " + data.main.temp + " °C";
            currentWind.textContent = "Wind: " + data.wind.speed + " knots";
            currentHumidity.textContent = "Humidity: " + data.main.humidity + " %";

            currentWeather.appendChild(currentTitle);
            currentTitle.appendChild(currentIcon);
            currentWeather.appendChild(currentTemp);
            currentWeather.appendChild(currentWind);
            currentWeather.appendChild(currentHumidity);

            getUvApi();
            getForecastApi();
        });
};

// a different API that is called to populate the UV index, requires latitude and longitude coords obtained from local storage set by the current weather API function. Setting class attribute for styling in CSS correlating to UV index.
function getUvApi() {
    var currentLat = JSON.parse(localStorage.getItem("currentLat"));
    var currentLon = JSON.parse(localStorage.getItem("currentLon"));
    var ApiKey = "3d90a22a5cc7a81125427869e7407c8d";
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + currentLat + '&lon=' + currentLon + '&appid=' + ApiKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var uvNow = data.current.uvi

            if (uvNow > 7) {
                currentUv.setAttribute("class", "Uv-red");
            } else if (uvNow < 3) {
                currentUv.setAttribute("class", "Uv-green");
            } else {
                currentUv.setAttribute("class", "Uv-orange");
            };

            currentUv.textContent = "UV index: " + uvNow;
            currentWeather.appendChild(currentUv);
        });
};

// fetching 5 day forecast API and populating the 5 forecast cards
function getForecastApi() {
    var currentLat = JSON.parse(localStorage.getItem("currentLat"));
    var currentLon = JSON.parse(localStorage.getItem("currentLon"));
    var ApiKey = "3d90a22a5cc7a81125427869e7407c8d";
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + currentLat + '&lon=' + currentLon + '&units=metric&appid=' + ApiKey;
    var iconUrl = "http://openweathermap.org/img/w/";

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.daily[1].temp.max);

            for (i = 1; i < 6; i++) {
    
                var forecastDate = document.createElement("p");
                var forecastIcon = document.createElement("img");
                var forecastTemp = document.createElement("p");
                var forecastWind = document.createElement("p");
                var forecastHumidity = document.createElement("p");
                
                forecastDate.textContent = today.add(1, "d").format("DD-MM-YYYY");
                forecastIcon.setAttribute("src", iconUrl + data.daily[i].weather[0].icon + ".png");
                forecastTemp.textContent = "Temp: " + data.daily[i].temp.max + "°C";
                forecastWind.textContent = "Wind: " + data.daily[i].wind_speed + "knots";
                forecastHumidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

                forecastArray[i].appendChild(forecastDate);
                forecastArray[i].appendChild(forecastIcon);
                forecastArray[i].appendChild(forecastTemp);
                forecastArray[i].appendChild(forecastWind);
                forecastArray[i].appendChild(forecastHumidity);

            }
        });
};