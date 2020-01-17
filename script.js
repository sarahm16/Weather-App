$('#forecast-title').text('');
let APIkey = "82dd8f19c8ffad5a953a3d34883fd060";
let cityHistory=[''];
// cityHistory.unshift('Tacoma');
// cityHistory = JSON.parse(localStorage.getItem('past-cities'));
// console.log(cityHistory[0]);

if(cityHistory[0] != undefined) {
    displayWeather(cityHistory[0]);
}

//display current weather
function displayWeather(selectedCity) {
    let currentURL= `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${APIkey}`;
    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${APIkey}`;

    //current weather ajax call to retrieve current weather JSON object
    $.ajax({
        url: currentURL,
        method: 'GET'
    }).then(function(response) {
        let lat = 0;
        $('#city-name').text(response["name"]);
        $('#temp').text(`Temperature: ${response.main.temp}`);
        $('#humidity').text(`Humidity: ${response.main.humidity}%`);
        $('#wind-speed').text(`Wind Speed: ${response.wind.speed} MPH`);
        let iconCode = response.weather[0].icon;
        $('#icon').attr('src', `http://openweathermap.org/img/w/${iconCode}.png`);
        //displayUV();
    })

    //forecast ajax call to retrieve forecast JSON object
    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then(function(response) {
        $('.forecast').empty();
        $('#forecast-title').text('5 Day Forecast:');
        for(let i=3; i<40; i=i+8) {
            let results = response.list[i];
            let day = $('<div>');
            let date = $('<h4>').text('1/15/20');
            let forecastTemp = $('<p>').text(`Temp: ${results.main.temp}`);
            let forecastHumidity = $('<p>').text(`Humidity: ${results.main.humidity}%`);
            let fIconCode = results.weather[0].icon;
            let forecastIcon = $('<img>').attr('src', `http://openweathermap.org/img/w/${fIconCode}.png`)
            day.attr("class", "newDay");
            day.append(date, forecastIcon, forecastTemp, forecastHumidity);
            $('.forecast').append(day);
        }
    })
}

// function displayUV(selectedCity) {
//     console.log(response);
//     // $.ajax ({
//     //     url: `http://api.openweathermap.org/data/2.5/uvi/forecast?appid=${APIkey}&lat=${lat}&lon=${lon}`,
//     //     method: 'GET'
//     // }).then(function(response) {

//     // })
//     // $('#uv-index').text(`UV Index: 5`);
// }

$('.citySearch').on('click', function() {
    $('.search-history').empty();
    cityHistory.unshift($('.new-city').val());
    $('#city-name').text($('.new-city').val());
    $('.new-city').val('');
    localStorage.setItem('searchHistory', cityHistory);

    $.each(cityHistory, function(index, city) {
        let cityButton = $('<button class="city border">').text(city);
        cityButton.attr('data-name', city);
        $('.search-history').prepend(cityButton);
    })
    displayWeather(cityHistory[0]);
})

$(document).on("click", ".city", function() {
    cityHistory.unshift($(this).attr('data-name'));
    displayWeather(cityHistory[0]);
});

