
let cityHistory = [];

//let forecast = [date+1, date+2, date+3, date+4, date+5];

let APIkey = "82dd8f19c8ffad5a953a3d34883fd060";

//display current weather
function displayWeather() {
    let selectedCity = $(this).attr('data-name');
    let currentURL= `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${APIkey}`;
    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${APIkey}`;

    //current weather ajax call
    $.ajax({
        url: currentURL,
        method: 'GET'
    }).then(function(response) {
        $('#cityName').text(response["name"]);
        $('#temp').text(`Temperature: ${response.main.temp}`);
        $('#humidity').text(`Humidity: ${response.main.humidity}%`);
        $('#wind-speed').text(`Wind Speed: ${response.wind.speed} MPH`);
        //$('#uv-index').text(`UV Index: ${response.}`)
        let iconCode = response.weather[0].icon;
        console.log(iconCode);
        $('#icon').attr('src', `http://openweathermap.org/img/w/${iconCode}.png`);
    })

    //forecast ajax call
    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response.list);
        $('.forecast').empty();
        for(let i=0; i<5; i++) {
            let results = response.list[i];
            let day = $('<div>');
            let date = $('<h4>').text('1/14/20');
            let forecastTemp = $('<p>').text(results.main.temp);
            let forecastHumidity = $('<p>').text(results.main.humidity);
            let fIconCode = results.weather[0].icon;
            let forecastIcon = $('<img>').attr('src', `http://openweathermap.org/img/w/${fIconCode}.png`)
            day.attr("class", "newDay");
            day.append(date, forecastIcon, forecastTemp, forecastHumidity);
            $('.forecast').append(day);
        }
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
        $('.city-history').prepend(cityButton);
    })
})

$(document).on("click", ".city", displayWeather);

