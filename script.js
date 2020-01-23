let emptyArray=[];
let APIkey = "82dd8f19c8ffad5a953a3d34883fd060";

let m = moment().format('MM/DD/YY');

//set local storage to empty array if it hasn't been set yet
if(localStorage.getItem('searchHistory') == undefined) {
    localStorage.setItem('searchHistory', JSON.stringify(emptyArray));
}

let cityHistory = JSON.parse(localStorage.getItem('searchHistory'));
console.log(cityHistory);

//display weather of last city searched
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
        console.log(response);
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        console.log(lat);
        $('#city-name').text(response["name"] + ` (${m})`);
        $('#temp').text(`Temperature: ${response.main.temp}`);
        $('#humidity').text(`Humidity: ${response.main.humidity}%`);
        $('#wind-speed').text(`Wind Speed: ${response.wind.speed} MPH`);
        let iconCode = response.weather[0].icon;
        $('#icon').attr('src', `http://openweathermap.org/img/w/${iconCode}.png`);
        displayUV(lat, lon);
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
            //console.log(results);
            let day = $('<div>');
            let date = $('<h4>').text(moment().add(i/8, 'days').format('l'));
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

function displayUV(lat, lon) {
    $.ajax ({
        url: `http://api.openweathermap.org/data/2.5/uvi/forecast?appid=${APIkey}&lat=${lat}&lon=${lon}`,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        $('#uv-index').text(`UV index: ${response[0].value}`);
    })
}

//click event for search button
$('.citySearch').on('click', function() {
    //empty search-history div when new city is searched
    $('.search-history').empty();

    //add new search to beginning of cityHistory array
    cityHistory.unshift($('.new-city').val());

    //empty search bar
    $('.new-city').val('');

    //set local storage to new array
    localStorage.setItem('searchHistory', JSON.stringify(cityHistory));

    //create a button for each city in cityHistory array, prepend button to search-history div
    $.each(cityHistory, function(index, city) {
        let cityButton = $('<button class="city border">').text(city);
        cityButton.attr('data-name', city);
        $('.search-history').append(cityButton);
    })
    displayWeather(cityHistory[0]);
})

//when user selects city button from search history, prepend this city to cityHistory array
$(document).on("click", ".city", function() {
    cityHistory.unshift($(this).attr('data-name'));
    displayWeather(cityHistory[0]);
});

