var input_box = document.querySelector("input");
var search_button = document.querySelector("#search");

var weather_tile = document.querySelector(".weather-tile");
var image = document.querySelector("#weather-image");
var weather_desc_display = document.querySelector("#weather-desc");
var humidity_percentage_display = document.querySelector("#percentage");
var temp_displays = {
    current: document.querySelector("#current-temp"),
    max: document.querySelector("#max-temp"),
    min: document.querySelector("#min-temp")
};

var init_tile_html = weather_tile.innerHTML;


function reinitializeVariables() {
    weather_tile = document.querySelector(".weather-tile");
    image = document.querySelector("#weather-image");
    weather_desc_display = document.querySelector("#weather-desc");
    humidity_percentage_display = document.querySelector("#percentage");
    temp_displays.current = document.querySelector("#current-temp");
    temp_displays.max = document.querySelector("#max-temp");
    temp_displays.min = document.querySelector("#min-temp");
}

input_box.addEventListener("keydown", event => {
    if (event.keyCode === 13) {
        extractCity();
    }
});

search_button.addEventListener("click", function() {
    extractCity();
});

function extractCity() {
    var city = input_box.value;
    var requestURL = addParams(city);
    sendRequest(requestURL);
}

function addParams(city) {
    var url = new URL("https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=6620fb18917ffa433db64ebf83cde131");
    url.searchParams.append('q', city);
    return url;
}

// WEATHER API REQUESTS
function sendRequest(requestURL) {
    fetch(requestURL, {mode: "cors"})
        .then(function(response) {
            return response.json();
        })
        .then(function showWeather(response) {
            var data = response;
            weather_tile.innerHTML = init_tile_html;
            //Needed after setting the innerHTML
            reinitializeVariables();
            updateWeatherData(data);
            updateWeatherImage(data);
            unhideTile();
        })
        .catch(function(error) {
            hideTile();
            errorMessage();
        });
}

function updateWeatherData(data) {
    temp_displays.current.textContent = data.main.temp;
    weather_desc_display.textContent = data.weather[0].description;
    temp_displays.min.textContent = data.main.temp_min;
    temp_displays.max.textContent = data.main.temp_max;
    humidity_percentage_display.textContent = data.main.humidity;
}

function updateWeatherImage(data) {
    var description_id = data.weather[0].id;

    if(description_id >= 200 && description_id < 300) {
        image.innerHTML = '<img src="assets/Weather Icons/thunder.svg">';
    }
    else if(description_id >= 300 && description_id < 400) {
        image.innerHTML = '<img src="assets/Weather Icons/rainy-5.svg">';
    }
    else if(description_id >= 500 && description_id < 600) {
        image.innerHTML = '<img src="assets/Weather Icons/rainy-6.svg">';
    }
    else if(description_id >= 600 && description_id < 700) {
        image.innerHTML = '<img src="assets/Weather Icons/snowy-6.svg">';
    }
    else if(description_id >= 700 && description_id < 800) {
        image.innerHTML = '<img src="assets/Weather Icons/weather.svg">';
    }
    else if(description_id === 800) {
        if(data.weather[0].icon === "01d") {
            image.innerHTML = '<img src="assets/Weather Icons/day.svg">';
        }
        else {
            image.innerHTML = '<img src="assets/Weather Icons/night.svg">';
        }
    }
    else if(description_id > 800) {
        image.innerHTML = '<img src="assets/Weather Icons/cloudy.svg">';
    }
}

function unhideTile() {
    weather_tile.classList.remove("hide");
}

function hideTile() {
    weather_tile.classList.add("hide");
}

function errorMessage() {
    console.log("Oops, not a real city name");
    alert("City not found");
}