console.log("linked")
var citySearchButton = document.getElementById('search')
console.log(citySearchButton)
function geoCodeApi(searchTerm){
    var geocodeKey = 'f4ac9ae98ce232f81e1a8c7e3fd76a5a'
    var url = 'http://api.openweathermap.org/geo/1.0/direct?q='+searchTerm+'&limit=5&appid='+ geocodeKey
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
    console.log(lat)
    console.log(lon)
    var apiKey = "aa3ac1aee36fc947283c79786b233621"
    var url = 'https://api.openweathermap.org/data/3.0/onecall?lat='+lat +'&lon=' +lon+'&exclude={part}&appid=' +apiKey
    fetch(url)


}

function getValue(event){
    event.preventDefault()
    console.log(event.target)
    var city = document.getElementById('city')
    console.log(city.value)
    geoCodeApi(city.value)
}

citySearchButton.addEventListener('submit', getValue)


//geoCodeApi()

