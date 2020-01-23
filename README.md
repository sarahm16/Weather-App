# Weather App

With this weather app, the user can search for a city anywhere in the world, and both the current weather and the 5 day forecast are displayed. The current forecast includes the city, the date, current temperature, current humidity, and UV index. The forecast includes the date, forecasted temperature, and forecasted humidity for each day.
<br>

Each city that is searched for is saved into an array in local storage, and displayed on the screen in search history in the form of buttons. The user may access weather data from the search history as well.
When the user refreshes the app, weather data from the most recent city searched will populate the page.
<br>

Three different AJAX alls and URLs are used from open weather API. One AJAX call returns current weather for selected city, another AJAX call returns 5 day forecast, and another AJAX call returns the UV index for the selected city based on the latitude and longitude retrieved from the first AJAX call. All returns are in the form of a JSON object.
<br>

<img src ="./home.png" alt="home-page">