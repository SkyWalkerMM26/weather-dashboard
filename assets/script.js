// Peusdocode
// GIVEN a weather dashboard with form inputs.
// Insert a form with a submit button on the page.
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// Fetch and then the oneweathermap url to get the location.
// Console log the data that was retrieve from fetch.then to view the information retrieve from fetch.
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// Create section and use moment.format to show the proper format date.
// WHEN I view future weather conditions for that city.
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// Create cards to show the five days weather that was retrieved from fetch. 
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// click a button to remove the recent submission then display the current search.

//these are the set variables referring to the index.html
var searchCityForm = document.getElementById("search");
var inputCity = document.getElementById("city");
var citySearchButton = document.getElementById('searchCitybtn');
var clearHistorybtn = document.getElementById("clearHistorybtn");
var historyCity = document.getElementById("container");
var blockDataWeather = document.getElementById("presentWeather");
var mainCard = document.getElementById('image-card')
var weatherCard = document.getElementById("card-header");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var futureData = document.getElementById("futureWeatherData");
var historySearch = JSON.parse(localStorage.getItem("searchHistoryList"))||[];
var geocodeKey = 'f4ac9ae98ce232f81e1a8c7e3fd76a5a';
var apiKey = "aa3ac1aee36fc947283c79786b233621";
var container = document.getElementById("container");


//this function gets the data and image to input into the cards.
function createMainCard(data){
    console.log(data)
    var weatherIcon = data.weather[0].icon;
    temp.textContent = "Temperature: " + data.main.temp + " F";
    wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
    humidity.textContent = "Humidity: " + data.main.humidity + " %";
    
    var headerDate = moment.unix(data.dt).format("MM/DD/YYYY");
    weatherCard.textContent = currentlySearchedCity + " " + headerDate;
    var weatherImage = $("<img>");
    weatherImage.attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png");
    console.log(weatherImage[0])
    mainCard.append(weatherImage[0]);
    document.getElementById("future").textContent = "5 Day Forecast:"
    futureData.innerHTML = "";
}

//this fxn use the geocode api to get lat and lon of the city of interest.
function geoCodeApi(searchTerm){
    console.log("in the geocode API function!")
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

// this fxn fetch the data from the one weather API then we create divs, assign it a class. Since we have to have 5 data points, do it with a for loop.
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
   
        for (var i = 0; i < 5; i++){
           
            var col = document.createElement("div");
            col.setAttribute("class", "col");
            var cards = document.createElement("div");
            cards.setAttribute("class", "card");
            var cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");
            var h4 = document.createElement("h4").textContent = moment.unix(data[i].dt).format("MM//DD/YYYY");
            var newImageIcon = data[i].weather[0].icon;
            var icon = document.createElement("img");
            icon.setAttribute("src", "https://openweathermap.org/img/w/" + newImageIcon + ".png");
            var newTemp = document.createElement("p").textContent = "Temp: " + data[i].main.temp + "F\n";
            var newWind = document.createElement("p").textContent = "Wind: " + data[i].wind.speed + "MPH\n";
            var newHumidity = document.createElement("p").textContent = "Humid: " + data[i].main.humidity + "%\n";
            cardBody.append(h4, icon, newTemp, newWind, newHumidity);
            cards.append(cardBody);
            col.append(cards);
            futureData.append(col);
           
        }

        historyCity.addEventListener("click", function(clearData) {
            console.log(clearData);
            var city = e.target.getAttribute("data-city");
            getWeatherApi(city)
        })
        
        searchCityForm.addEventListener("submit", function(event){
            event.preventDefault();
            blockDataWeather.classList.remove("weather");
            blockDataWeather.style.display = "block";
            var city = document.getElementById("city").value;
            saveSearch(city);
            getWeatherApi(city)
;        })
        
        clearHistorybtn.addEventListener("click", function(){
            console.clear()
        })


    })
}

// this is supposed to save data into local storage :(.
function saveSearch(city){
    searchTerm.push(city);
    localStorage.setItem("searchHistoryList", JSON.stringify(searchTerm));
    container.innerHTML = "";
    for(var i = 0; i , searchTerm.length; i++){
        var btn = $("<button>");
        btn.textContent = searchTerm[i];
        btn.classList.add("oldCity");
        btn.setAttribute("cityData", searchTerm[i]);
        container.append(btn);
        }
}

// this gets the input from the form when searching from the form and give it to the geoCodeApi fxn.
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



     