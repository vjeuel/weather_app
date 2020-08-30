$(document).ready(function () {
   
   function chooseCity(city) {
      //var city = $("#search-city").val();
      
      // Empties the Current Weather box and not append below it
      $("#current-weather").empty();
      $("#forecast").empty();
      // Clears the input area to an empty state
      $("#search-city").val("");
      
      // If condition to run the search or tell the user that is input is not correct
      if (city !== "") {
         // API connection for the 5 Day Forecast
         $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=68d6dbd51f19629214123398c2229b80",
            method: "GET"
         }).then(function (forecast) {
            var forecastName = $("<h3 class='forecast-name'>").text(forecast.city.name + " - 5 Day Forecast");
            var forecast5Days = $("<div id='forecast-5days'>");
            $("#forecast").append(forecastName, forecast5Days);

            var forecastDay1 = $("<div class='day'>");
            var forecastDay2 = $("<div class='day'>");
            var forecastDay3 = $("<div class='day'>");
            var forecastDay4 = $("<div class='day'>");
            var forecastDay5 = $("<div class='day'>");
            forecast5Days.append(forecastDay1, forecastDay2, forecastDay3, forecastDay4, forecastDay5);
            
            var forecastDayDate = $("<p class='each-date'>'").text(moment().add(1, 'day').format('ddd, MM/DD/YY'));
            var forecastDayIcon = $("<img class='weather-icon' src='http://openweathermap.org/img/wn/" + forecast.list[7].weather[0].icon + "@2x.png'>");
            var forecastDayMaxTemp = $("<p class='each-day'>'").text("Max: " + forecast.list[7].main.temp + "F");
            var forecastDayMinTemp = $("<p class='each-day'>'").text("Min: " + forecast.list[7].main.temp + "F");
            var forecastDayHumidity = $("<p class='each-day'>'").text("Humidity: " + forecast.list[7].main.humidity + "%");
            forecastDay1.append(forecastDayDate, forecastDayMaxTemp, forecastDayMinTemp, forecastDayHumidity, forecastDayIcon);
               
            var forecastDayDate = $("<p class='each-date'>'").text(moment().add(2, 'day').format('ddd, MM/DD/YY'));
            var forecastDayIcon = $("<img class='weather-icon' src='http://openweathermap.org/img/wn/" + forecast.list[15].weather[0].icon + "@2x.png'>");
            var forecastDayMaxTemp = $("<p class='each-day'>'").text("Max: " + forecast.list[15].main.temp + "F");
            var forecastDayMinTemp = $("<p class='each-day'>'").text("Min: " + forecast.list[15].main.temp + "F");
            var forecastDayHumidity = $("<p class='each-day'>'").text("Humidity: " + forecast.list[15].main.humidity + "%");
            forecastDay2.append(forecastDayDate, forecastDayMaxTemp, forecastDayMinTemp, forecastDayHumidity, forecastDayIcon);
               
            var forecastDayDate = $("<p class='each-date'>'").text(moment().add(3, 'day').format('ddd, MM/DD/YY'));
            var forecastDayIcon = $("<img class='weather-icon' src='http://openweathermap.org/img/wn/" + forecast.list[23].weather[0].icon + "@2x.png'>");
            var forecastDayMaxTemp = $("<p class='each-day'>'").text("Max: " + forecast.list[23].main.temp + "F");
            var forecastDayMinTemp = $("<p class='each-day'>'").text("Min: " + forecast.list[23].main.temp + "F");
            var forecastDayHumidity = $("<p class='each-day'>'").text("Humidity: " + forecast.list[23].main.humidity + "%");
            forecastDay3.append(forecastDayDate, forecastDayMaxTemp, forecastDayMinTemp, forecastDayHumidity, forecastDayIcon);
               
            var forecastDayDate = $("<p class='each-date'>'").text(moment().add(4, 'day').format('ddd, MM/DD/YY'));
            var forecastDayIcon = $("<img class='weather-icon' src='http://openweathermap.org/img/wn/" + forecast.list[31].weather[0].icon + "@2x.png'>");
            var forecastDayMaxTemp = $("<p class='each-day'>'").text("Max: " + forecast.list[31].main.temp + "F");
            var forecastDayMinTemp = $("<p class='each-day'>'").text("Min: " + forecast.list[31].main.temp + "F");
            var forecastDayHumidity = $("<p class='each-day'>'").text("Humidity: " + forecast.list[31].main.humidity + "%");
            forecastDay4.append(forecastDayDate, forecastDayMaxTemp, forecastDayMinTemp, forecastDayHumidity, forecastDayIcon);
               
            var forecastDayDate = $("<p class='each-date'>'").text(moment().add(5, 'day').format('ddd, MM/DD/YY'));
            var forecastDayIcon = $("<img class='weather-icon' src='http://openweathermap.org/img/wn/" + forecast.list[39].weather[0].icon + "@2x.png'>");
            var forecastDayMaxTemp = $("<p class='each-day'>'").text("Max: " + forecast.list[39].main.temp + "F");
            var forecastDayMinTemp = $("<p class='each-day'>'").text("Min: " + forecast.list[39].main.temp + "F");
            var forecastDayHumidity = $("<p class='each-day'>'").text("Humidity: " + forecast.list[39].main.humidity + "%");
            forecastDay5.append(forecastDayDate, forecastDayMaxTemp, forecastDayMinTemp, forecastDayHumidity, forecastDayIcon);
         });
         
         // API connection for the Current Weather
         $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=68d6dbd51f19629214123398c2229b80",
            method: "GET"
         }).then(function (weather) {
            
            $.ajax({
               type: 'GET',
               dataType: 'json',
               beforeSend: function (request) {
                  request.setRequestHeader('x-access-token', 'f02e32122b5b1b6725621f7c85706c98');
               },
               url: "https://api.openuv.io/api/v1/uv?lat=" + weather.coord.lat + "&lng=" + weather.coord.lon,
               success: function (uvi) {
                  
                  var currentWeather = $("#current-weather");
                  var currentWeatherName = $("<h3 id='current-weather-name'>").text(weather.name + " - Current Weather");
                  currentWeather.append(currentWeatherName);
                  
                  var currentData = $("<div id='current-data'>");
                  currentWeather.append(currentData);
                  var currWeatherTemp = $("<p class='curr-weather-temp'>").text("Current Temperature: " + weather.main.temp + "F");
                  var currWeatherFeel = $("<p class='curr-weather-temp'>").text("Feels like: " + weather.main.feels_like + "F");
                  var currWeatherHumid = $("<p class='curr-weather-hum'>").text("Current Humidity: " + weather.main.humidity + "%");
                  var currWeatherWind = $("<p class='curr-weather-wind'>").text("Current Wind Speed: " + weather.wind.speed + "m/h");
                  
                  //UV Index
                  var currWeatherUvi = $("<p class='curr-weather-uvi'>").text("UV index: ");
                  var currWeatherUviMax = $("<p class='curr-weather-uvi'>").text("UV index max: ");                  
                  currentData.append(currWeatherTemp, currWeatherFeel, currWeatherHumid, currWeatherWind, currWeatherUvi, currWeatherUviMax);
                  
                  // UV Index Color
                  var currWeatherUvSpan = $("<span class='curr-weather-uvi-icon'>").text(+ uvi.result.uv);
                  currWeatherUvSpan.appendTo(currWeatherUvi);
                  
                  var currWeatherUvSpanMax = $("<span class='curr-weather-uvi-icon'>").text(+ uvi.result.uv_max);
                  currWeatherUvSpanMax.appendTo(currWeatherUviMax);

                  var uvColor = uvi.result.uv;
                  if (uvColor < 2.999) {
                     currWeatherUvSpan.addClass("uv-index-low")
                  } else if (uvColor > 3 && uvColor < 5.99) {
                     currWeatherUvSpan.addClass("uv-index-medium")
                  } else if (uvColor > 6 && uvColor < 7.99) {
                     currWeatherUvSpan.addClass("uv-index-high")
                  } else if (uvColor > 8 && uvColor < 10.99) {
                     currWeatherUvSpan.addClass("uv-index-very-high")
                  } else if (uvColor > 11) {
                     currWeatherUvSpan.addClass("uv-index-extreme")
                  };   

                  var uvColorMax = uvi.result.uv_max;
                  if (uvColorMax < 2.999) {
                     currWeatherUvSpanMax.addClass("uv-index-low")
                  } else if (uvColorMax > 3 && uvColorMax < 5.99) {
                     currWeatherUvSpanMax.addClass("uv-index-medium")
                  } else if (uvColorMax > 6 && uvColorMax < 7.99) {
                     currWeatherUvSpanMax.addClass("uv-index-high")
                  } else if (uvColorMax > 8 && uvColorMax < 10.99) {
                     currWeatherUvSpanMax.addClass("uv-index-very-high")
                  } else if (uvColorMax > 11) {
                     currWeatherUvSpanMax.addClass("uv-index-extreme")
                  };   

                  
                  // Weather Icon
                  var currentIcon = $("<div id='current-icon'>");
                  currentWeather.append(currentIcon);
                  var currWeatherIcon = $("<img class='current-weather-icon' src='http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png'>");
                  currentIcon.append(currWeatherIcon);
                  
                  // Just a tester to check the pictures changing accordingly to the weather
                  // weather.weather[0].description = "clear sky";
                  // weather.weather[0].description = "scattered clouds";
                  // weather.weather[0].description = "shower rain";
                  // weather.weather[0].description = "thunderstorm";
                  // weather.weather[0].description = "snow";
                  // weather.weather[0].description = "mist";

                  if (weather.weather[0].description === "clear sky" || weather.weather[0].description === "few clouds") {
                     $("#jumbotron").attr("style", "background: url(./images/sunny.jpg); background-size: cover; background-repeat: no-repeat; background-position: center center");
                  } else if (weather.weather[0].description === "scattered clouds" || weather.weather[0].description === "broken clouds") {
                     $("#jumbotron").attr("style", "background: url(./images/cloudy.jpg); background-size: cover; background-repeat: no-repeat; background-position: center center");
                  } else if (weather.weather[0].description === "shower rain" || weather.weather[0].description === "rain") {
                     $("#jumbotron").attr("style", "background: url(./images/rainy.jpg); background-size: cover; background-repeat: no-repeat; background-position: center center");
                  } else if (weather.weather[0].description === "thunderstorm") {
                     $("#jumbotron").attr("style", "background: url(./images/stormy.jpg); background-size: cover; background-repeat: no-repeat; background-position: center center");
                  } else if (weather.weather[0].description === "snow") {
                     $("#jumbotron").attr("style", "background: url(./images/snowy.jpg); background-size: cover; background-repeat: no-repeat; background-position: center center");
                  } else if (weather.weather[0].description === "mist") {
                     $("#jumbotron").attr("style", "background: url(./images/misty.jpg); background-size: cover; background-repeat: no-repeat; background-position: center center");
                  };
               }
            });
         });

      } else {
         // In red color, ask the user to try again
         var citySearch = $("#search-city");
         citySearch.attr("placeholder", "type a valid city name");
         citySearch.attr("style", "color: var(--p1); font-size: 2.5rem");
      };
   };
   
   // Local Storage
   if (window.localStorage.getItem('cities')) {
      var indexCity = (JSON.parse(window.localStorage.getItem('cities')).length -1)
      chooseCity(JSON.parse(window.localStorage.getItem('cities'))[indexCity])
   };

   
   $("#form-submit").on("submit", function (event) {
      event.preventDefault();
      location.reload(true);
      
      var cityArr;
      if (window.localStorage.getItem('cities')) {
         cityArr = JSON.parse(window.localStorage.getItem('cities'))
      } else {
         cityArr = []
      }
      var city = $("#search-city").val();
      cityArr.push(city)
      
      window.localStorage.setItem('cities', JSON.stringify(cityArr));
      
      chooseCity(city);
   });

    function buttons() {
      var getCities = JSON.parse(localStorage.getItem('cities'));
      
      getCities.forEach(function (city) {
         var createButtons = $("<input>").attr({
            type: "button",
            value: city
         });

         $("#prev-searches").append(createButtons);

         createButtons.on("click", function (event) {
            event.preventDefault();
            chooseCity(city);
         });
      });
   };
   buttons();

   var clearButton = $("<button id='clear-button'>delete cities</button>")
   $("#prev-searches").append(clearButton);
   clearButton.on("click", function () {
      localStorage.clear();
      location.reload(true);
   })
});