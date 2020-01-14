
let cityHistory = [];

//let forecast = [date+1, date+2, date+3, date+4, date+5];

let APIkey = "82dd8f19c8ffad5a953a3d34883fd060";

//display current weather
function displayWeather() {
    let selectedCity = $(this).attr('data-name');
    let queryURL= `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=` + APIkey;
    //console.log(selectedCity);
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        $('#cityName').text(response["name"]);
        $('#temp').text(`Temperature: ${response.main.temp}`);
        $('#humidity').text(`Humidity: ${response.main.humidity}%`);
        $('#wind-speed').text(`Wind Speed: ${response.wind.speed} MPH`);
        //$('#uv-index').text(`UV Index: ${response.}`)
        let iconCode = response.weather[0].icon;
        console.log(iconCode);
        $('#icon').attr('src', `http://openweathermap.org/img/w/${iconCode}.png`);
    })    
}

function displayForecast() {

}

$('.citySearch').on('click', function() {
    cityHistory = [];
    cityHistory.push($('.new-city').val());
    //$('#cityName').text($('.new-city').val());

    $.each(cityHistory, function(index, city) {
        let cityButton = $('<button class="city border">').text(city);
        cityButton.attr('data-name', city);
        $('.city-history').append(cityButton);
    })
})

$(document).on("click", ".city", displayWeather);