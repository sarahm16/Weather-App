
let cityHistory = [];

//let forecast = [date+1, date+2, date+3, date+4, date+5];


$('.citySearch').on('click', function() {
    cityHistory = [];
    cityHistory.push($('.new-city').val());
    $('#cityName').text($('.new-city').val());

    $.each(cityHistory, function(index, city) {
        let cityButton = $('<button class="city border">').text(city);
        $('.city-history').append(cityButton);
    })
})