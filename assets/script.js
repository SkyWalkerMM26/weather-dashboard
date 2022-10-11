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
var mainCard = document.getElementById('block-card')
var weatherCard = document.getElementById("card-header");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var futureData = document.getElementById("futureWeatherData");
var historySearch = JSON.parse(localStorage.getItem("searchHistoryList"))||[];
var geocodeKey = 'f4ac9ae98ce232f81e1a8c7e3fd76a5a';
var apiKey = "aa3ac1aee36fc947283c79786b233621";
var currentlySearchedCity;

function createMainCard(data){
    console.log(data)
    var weatherIcon = data.weather[0].icon;
    temp.textContent = "Temperature: " + data.main.temp + " F";
    wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
    humidity.textContent = "Humidity: " + data.main.humidity + " %";
    
    var headerDate = moment.unix(data.dt).format("MM/DD/YYYY");
    weatherCard.textContent = currentlySearchedCity + "" + headerDate;
    var weatherImage = $("<img>");
    weatherImage.attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png");
    console.log(weatherImage[0])
    mainCard.append(weatherImage[0]);
    document.getElementById("future").textContent = "5 Day Forecast:"
    futureData.innerHTML = "";
}

function geoCodeApi(searchTerm){
    console.log("int he geocode API function!")
    console.log(searchTerm)
    var geocodeKey = 'f4ac9ae98ce232f81e1a8c7e3fd76a5a';
    var url = 'https://api.openweathermap.org/geo/1.0/direct?q='+searchTerm+'&limit=5&appid='+geocodeKey
    // console.log(url)
    fetch(url).then(function(response,error){
        console.log(response)
        if(!response.ok){
            console.log("error")
        }
        return response.json()
    }).then(function(data){
        console.log(data);
        // console.log(data[0]);
        var lat = data[0].lat;
        console.log(lat);
        var lon = data[0].lon;
        console.log(lon)
        getWeatherApi(lat, lon)
        
    })
}
function getWeatherApi(lat,lon){
    var apiKey = "aa3ac1aee36fc947283c79786b233621";
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units=imperial"
    fetch(url).then(function(response, error){
        console.log(response)
        if(!response.ok){
            console.log("error")
        }
        return response.json()
    }).then(function(data){
        console.log(data)
        data = data.list
        console.log(data)
        createMainCard(data[0])
        var fiveDayArray = [data[6],data[12],data[18],data[24], data[30]]
        console.log(fiveDayArray)
        return
        createFutureCards(fiveDayArray)
        for (var i = 0; i < 5; i++){
            var col = document.createElement("div");
            col.setAttribute("class", "col");
            var cards = document.createElement("div");
            cards.setAttribute("class", "card");
            var cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");
            var h4 = document.createElement("h4").textContent = moment.unix(weatherData.daily[i].dt).format("MM//DD/YYYY");
            var newImageIcon = data.daily[i].weather[0].icon;
            var icon = document.createElement("img");
            icon.setAttribute("src", "https://openweathermap.org/img/w/" + newImageIcon + ".png");
            var newTemp = document.createElement("p").textContent = "temp: " + data.daily[i].temp.day + "F";
            var newHumidity = document.createElement("p").textContent = "Humid: " + data.daily[i].humidity + "%";
            cardBody.append(h4, icon, newTemp, newHumidity);
            cards.append(cardBody);
            col.append(cards);
            futureData.append(col);
        }

        historyCity.addEventListener("click", function(clearData) {
            console.log(clearData);
            var city = e.target.getAttribute("data-city");
            weatherApi(city)
        })
        
        citySearchButton.addEventListener("click", function(event){
            event.preventDefault();
            blockDataWeather.classList.remove("weather");
            blockDataWeather.style.display = "block";
            var city = document.getElementById("city").value;
            saveSearch(city);
            weatherApi(city)
;        })
        
        clearHistorybtn.addEventListener("click", function(){
            localStorage.removeItem("searchHistoryList");
            historyCity.innerHTML ="";
            historySearch = [];
        })


    })
}
function getValue(event){
    event.preventDefault()
    // console.log(event.target)
    if(event.target.id === "search"){
        var city = document.getElementById('city').value
        currentlySearchedCity = city
        geoCodeApi(city)
        //add it to local storage
        return
    }
    console.log(event.target)
    currentlySearchedCity = ""
    // figuring out if the search is from past history searches
}


searchCityForm.addEventListener('submit', getValue)


// }
// // var search = JSON.parse(localStorage.getItem("searchHistory"));
// // var searchLength = ("searchHistory.length");
// // var lastSearch =(searchLength -1)
// // // geoCodeApi()
    
