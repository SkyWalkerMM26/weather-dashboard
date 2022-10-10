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


var citySearchButton = document.getElementById('search');
var daysForecast = document.querySelector('#daysForecast');
var cities = ["San Francisco", "San Jose", "San Mateo", "Berkeley", "Antioch"]

function geoCodeApi(searchTerm){
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
        console.log("We're in the GEOCODE API")
        var lat = data[0].lat
        console.log(lat)
        var lon = data[0].lon
        weatherApi(lat,lon)
    })
 
}

function weatherApi(lat,lon){
    console.log("WE'RE IN THE WEATHER API CALL")
    console.log(lat);
    console.log(lon);
    var apiKey = "aa3ac1aee36fc947283c79786b233621"
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(url).then(function(response, error){
        console.log(response)
        if(!response.ok){
            console.log("error")
        }
        return response.json()
    }).then(function(data){
        console.log(data)
        var listDays = [0, 8 ,16 ,24 ,32]
        for (var i = 0; i < listDays.length; i++){
            var daysList = document.createElement("div");
            daysList.className = "weatherInfo";
            console.log(data.list[listDays[i]].main.humidity);
            var p1 = document.createElement("p");
            var p2 = document.createElement("p");
            var p3 = document.createElement("p");
            var p4 = document.createElement("p");
            var p5 = document.createElement("p");
            p1.className = "dayContent";
            p2.className = "dayContent";
            p3.className = "dayContent";
            p1.textContent = data.list[listDays[i]].main.humidity;
            p2.textContent = data.list[listDays[i]].main.temp;
            p3.textContent = data.list[listDays[i]].wind.speed;
        
            daysList.appendChild(p1);
            daysList.appendChild(p2);
            daysList.appendChild(p3);
            
            daysForecast.appendChild(daysList);
        }
        function storeContent (){
            var key = $("#city").val()
            var value =$(".dayContent").input()
            localStorage.setItem(key, value);
        }
        storeContent();

        function resetSubmit (){
            citySearchButton.addEventListener('submit', getValue)
            console.log(getValue);
            getValue = "";
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




var search = JSON.parse(localStorage.getItem("searchHistory"));
var searchLength = ("searchHistory.length");
var lastSearch =(searchLength -1)
// geoCodeApi()

