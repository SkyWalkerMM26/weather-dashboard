// Peusdocode
// GIVEN a weather dashboard with form inputs.
// Insert a form with a submit button on the page.
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// Fetch and then the oneweathermap url to get the location and weather data.
// Console log the data that was retrieve from fetch.then to view the information retrieve from fetch.
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// 
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var searchCityForm = document.getElementById("search");
var inputCity = document.getElementById("city");
var citySearchButton = document.getElementById('searchCitybtn');
var clearHistorybtn = document.getElementById("clearHistorybtn");
var historyCity = document.getElementById("container");
var blockDataWeather = document.getElementById("presentWeather");
var weatherCard = document.getElementById("cardHeader");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var futureData = document.getElementById("futureWeatherData");


function geoCodeApi(searchTerm){
    console.log(searchTerm)
    var geocodeKey = 'f4ac9ae98ce232f81e1a8c7e3fd76a5a'
    var url = 'http://api.openweathermap.org/geo/1.0/direct?q='+searchTerm+'&limit=5&appid='+geocodeKey
    console.log(url)
    fetch(url).then(function(response,error){
        console.log(response)
        if(!response.ok){
            console.log("error")
        }
        return response.json()
    }).then(function(data){
        console.log(data)
        console.log(data[0])
        var lat = data[0].lat
        console.log(lat)
        var lon = data[0].lon
        weatherApi(lat,lon)
    })
 
}
function weatherApi(lat,lon){
    console.log(lat);
    console.log(lon);
    var apiKey = "aa3ac1aee36fc947283c79786b233621"
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(url).then(function(response, error){
        console.log(response)
        if(!response.ok){
            console.log("error")
        }
        return response.json()
    }).then(function(data){
        console.log(data)
        var weatherIcon = data.current.weather[0].icon;
        temp.textContent = "Temperature: " + data.current.temp + " F";
        wind.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";
        humidity.textContent = "Humidity: " + data.current.humidity + " %";

        var headerDate = moment.unix(data.current.dt).format("MM/DD/YYYY");
        weatherCard.textContent = city + "" + date;
        var weatherImage = $("<img>");
        weatherImage.attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png");
        weatherImage.appendTo(WeatherCard);
        document.getElementById("future").textContent = "5 Day Forecast:"
        futureData.innerHTML = "";
        for (var i = 0; i < 5; i++){
            var col = document.createElement("div");
            col.setAttribute("class", "col");
            var cards = document.createElement("div");
            cards.setAttribute("class", "card");
            var cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");
            var h4 = document.createElement("h4").textContent = moment.unix(weatherData.daily[i].dt).format("MM//DD/YYYY");
            var newImageIcon = weatherData.daily[i].weatehr[0].icon;
            var icon = document.createElement("img");
            icon.setAttribute("src", "https://openweathermap.org/img/w/" + newImageIcon + ".png");

        }


    })
}


function getValue(event){
    event.preventDefault()
    console.log(event.target)
    var city = document.getElementById('city')
    console.log(city.value)
    geoCodeApi(city.value)
}

citySearchButton.addEventListener('submit', getValue)




// // var search = JSON.parse(localStorage.getItem("searchHistory"));
// // var searchLength = ("searchHistory.length");
// // var lastSearch =(searchLength -1)
// // // geoCodeApi()

    