var rain_button = document.querySelector("#rain");
var sunny_button = document.querySelector("#sunny");

var image = document.querySelector("#weather-image");

rain_button.addEventListener("click", function() {
    image.innerHTML = '<img src="assets/Weather Icons/rainy-1.svg">';
});

sunny_button.addEventListener("click", function() {
    image.innerHTML = '<img src="assets/Weather Icons/day.svg">';
});

var temp_displays = {
    current: document.querySelector("#current-temp"),
    max: document.querySelector("#max-temp"),
    min: document.querySelector("#min-temp")
};

var weather_image_display = document.querySelector("#weather-image");
var weather_desc_display = document.querySelector("#weather-desc");
var humidity_percentage_display = document.querySelector("#percentage");

// WEATHER API REQUESTS
var requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=imperial&appid=6620fb18917ffa433db64ebf83cde131';
var request = new XMLHttpRequest();
request.open('GET', requestURL);

request.onload = function() {
    var data = JSON.parse(this.response);

    var current_temp = data.main.temp;
    var weather_desc = data.weather[0].description;
    var min_temp = data.main.temp_min;
    var max_temp = data.main.temp_max;
    var humidity = data.main.humidity;
    updateWeatherData(data);
    updateWeatherImage(data);
}

request.send();


function updateWeatherData(data) {
    temp_displays.current.textContent = data.main.temp;
    weather_desc_display.textContent = data.weather[0].description;
    temp_displays.min.textContent = data.main.temp_min;
    temp_displays.max.textContent = data.main.temp_max;
    humidity_percentage_display.textContent = data.main.humidity;
    return;
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


