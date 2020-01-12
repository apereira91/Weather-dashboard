$(document).ready(function() {

    setInterval(function() {
        $("#dateDisplay").text(moment().format("MMMM DD, YYYY"))
    }, 1000);
    
    cityList = JSON.parse(localStorage.getItem("#city"));
    if (cityList === null) {
        cityList = [];
    }

    for (var i = cityList.length; i > 0; i++) {
        if (cityList[i] != undefined) {

            var cityRow = $("<tr>");
            var cityColumn = $("<td>");
            var cityLink = $("<button>");
            cityLink.attr("class", "btn btn-light");
            cityLink.attr("city-name", cityList[i]);
            cityLink.text(cityList[i]);
            $(cityColumn).append(cityLink);
            $(cityRow).append(cityColumn);
            $("tbody").append(cityRow);
        }
    };

    $("#submit").on("click", function() {

        var city = $("#city").val().trim();
        var apiKey = "e3df94dcbbc5404db3f3f6ce18a74cef";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&apikey=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        
        .then(function(response) {

            lowTempFaren = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);
            highTempFaren = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);

            $("#lowDiv").text("Low of: " + lowTempFaren + "°F");
            $("#highDiv").text("High of: " + highTempFaren + "°F");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            $("#windSpeed").text("Wind Speed: " + response.wind.speed + "MPH");
            $("#description").text("Today's Weather: " + response.weather[0].description);
            weather_icon = response.weather[0].icon + ".png"
            $("#cityHeader").text(response.name);

            var cityRow = $("<tr>");
            var cityColumn = $("<td>");
            var cityLink = $("<button>");
            cityLink.text(response.name);
            cityLink.attr("class", "btn btn-light");
            cityLink.attr("class", "newBtn");
            cityLink.attr("value", response.name);
            $(cityColumn).append(cityLink);
            $(cityRow).append(cityColumn);
            $("tbody").prepend(cityRow);

            cityList = JSON.parse(localStorage.getItem("#city"));
            if (cityList === null) {
                cityList = [];
            }
            cityList.push(response.name);
            localStorage.setItem("#city", JSON.stringify(cityList));
        });

        var apiKey = "e3df94dcbbc5404db3f3f6ce18a74cef";
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then (function(response) {
            localStorage.setItem("#city", JSON.stringify(response));
            result = JSON.parse(localStorage.getItem("#city"));
            newDays = [4, 12, 20, 28, 36]
            for (var i = 0; i < newDays.length; i++) {
                var newDate = newDays[i];
                var dayTemp = result.list[newDate].main.temp;
                var dayTempFaren = Math.floor(((dayTemp - 273.15) * 1.8) + 32);
                var dayDate = result.list[newDate].dt;
                var dayHumidity = result.list[newDate].main.humidity;
                var dayWindSpeed = result.list[newDate].wind.speed;
                var dayIcon = result.list[newDate].weather[0].icon;
        

                $("#day" + newDate + "_date").text(moment.unix(dayDate).format("MMMM DD"));
                $("#day" + newDate + "_date").attr("class", "date");
                $("#day" + newDate + "_temp").text(dayTempFaren + "°F");
                $("#day" + newDate + "_humidity").text(dayHumidity + "% Humidity");
                $("#day" + newDate + "_wind").attr("class", "windText");
                $("#day" + newDate + "_wind").text("Wind: " + dayWindSpeed +" MPH");
                $("#icon" + newDate).attr("src", "http://openweathermap.org/img/wn/" + dayIcon + "@2x.png");
            };

            $("#weatherInfo").attr("style", "display: block");
        });

    });

    function buttonWeatherDisplay() {
        var city2 = $(this).val();
        console.log(city2);
        var apiKey = "e3df94dcbbc5404db3f3f6ce18a74cef";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city2 + "&apikey=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            lowTempFaren = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);
            highTempFaren = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);

            $("#lowDiv").text("Low of: " + lowTempFaren + "°F");
            $("#highDiv").text("High of: " + highTempFaren + "°F");
            $("#humidity").text("Humidity: " + response.main.humudity + "%");
            $("#windSpeed").text("Wind Speed: " + response.wind.speed + "MPH");
            $("#description").text("Today's Weather: " + response.weather[0].description);
            weather_icon = response.weather[0].icon + ".png"
            $("#cityHeader").text(response.name);


        });

        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city2 + "&appid=" + apiKey;

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then (function(response){
            console.log(response);
            localStorage.setItem("forecast", JSON.stringify(response));
            result = JSON.parse(localStorage.getItem("forecast"));
            newDays = [4, 12, 20, 28, 36]
            for (var j = 0; j < newDays.length; j++) {
                var newDate = newDays[j];
                var dayTemp = result.list[newDate].main.temp;
                var dayTempFaren = Math.floor(((dayTemp - 273.15) * 1.8) + 32);
                var dayDate = result.list[newDate].dt;
                var dayHumidity = result.list[newDate].main.humidity;
                var dayWindSpeed = result.list[newDate].wind.speed;
                var dayIcon = result.list[newDate].weather[0].icon;

                $("#day" + newDate + "_date").text(moment.unix(dayDate).format("MMMM DD"));
                $("#day" + newDate + "_date").attr("class", "date");
                $("#day" + newDate + "_temp").text(dayTempFaren + "°F");
                $("#day" + newDate + "_humidity").text(dayHumidity + "% Humidity");
                $("#day" + newDate + "_wind").attr("class", "windText");
                $("#day" + newDate + "_wind").text("Wind: " + dayWindSpeed +" MPH");
                $("#icon" + newDate).attr("src", "http://openweathermap.org/img/wn/" + dayIcon + ".png");
            };

            $("#weatherInfo").attr("style", "display: block");
        });


    };

    $(".newBtn").on("click", buttonWeatherDisplay());



});