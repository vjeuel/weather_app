$(document).ready(function () {
   
   function chooseCity(e) {
      var city = $("#search-city").val();

      // Empties the Current Weather box and not append below it
      $("#current-weather").empty();
      $("#forecast").empty();
      // Clears the input area to an empty state
      $("#search-city").val("");
      
      // If condition to run the search or tell the user that is input is not correct
      if(city !== "") {   
         // API connection for the 5 Day Forecast
         $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=68d6dbd51f19629214123398c2229b80",
            method: "GET"
         }).then(function (forecast) {    
            var forecastName = $("<h3 class='forecast-name'>").text(forecast.city.name + " - 5 Day Forecast");
            // $("#forecast").append(forecastName);
            
            var forecast5Days = $("<div id='forecast-5days'>");
            $("#forecast").append(forecastName, forecast5Days);

            var forecastDay1 = $("<div class='day'>");
            var forecastDay2 = $("<div class='day'>");
            var forecastDay3 = $("<div class='day'>");
            var forecastDay4 = $("<div class='day'>");
            var forecastDay5 = $("<div class='day'>");
            forecast5Days.append(forecastDay1, forecastDay2, forecastDay3, forecastDay4, forecastDay5);

            var forecastDayDate = $("<p class='forecast-day-max-temp'>'").text(forecast.list[7].dt_txt);
            var forecastDayMaxTemp = $("<p class='forecast-day-max-temp'>'").text("Max: " + forecast.list[7].main.temp + "F");
            var forecastDayMinTemp = $("<p class='forecast-day-max-temp'>'").text("Min: " + forecast.list[2].main.temp + "F");
            var forecastDayHumidity = $("<p class='forecast-day-max-temp'>'").text("Humidity: " + forecast.list[7].main.humidity + "%");            
            forecastDay1.append(forecastDayDate, forecastDayMaxTemp, forecastDayMinTemp, forecastDayHumidity);

            var forecastDayDate = $("<p class='forecast-day-max-temp'>'").text(forecast.list[15].dt_txt);
            var forecastDayMaxTemp = $("<p class='forecast-day-max-temp'>'").text("Max: " + forecast.list[15].main.temp + "F");
            var forecastDayMinTemp = $("<p class='forecast-day-max-temp'>'").text("Min: " + forecast.list[10].main.temp + "F");
            var forecastDayHumidity = $("<p class='forecast-day-max-temp'>'").text("Humidity: " + forecast.list[15].main.humidity + "%");
            forecastDay2.append(forecastDayDate, forecastDayMaxTemp, forecastDayMinTemp, forecastDayHumidity);
            
            var forecastDayDate = $("<p class='forecast-day-max-temp'>'").text(forecast.list[23].dt_txt);
            var forecastDayMaxTemp = $("<p class='forecast-day-max-temp'>'").text("Max: " + forecast.list[23].main.temp + "F");
            var forecastDayMinTemp = $("<p class='forecast-day-max-temp'>'").text("Min: " + forecast.list[18].main.temp + "F");
            var forecastDayHumidity = $("<p class='forecast-day-max-temp'>'").text("Humidity: " + forecast.list[23].main.humidity + "%");
            forecastDay3.append(forecastDayDate, forecastDayMaxTemp, forecastDayMinTemp, forecastDayHumidity);

            var forecastDayDate = $("<p class='forecast-day-max-temp'>'").text(forecast.list[31].dt_txt);
            var forecastDayMaxTemp = $("<p class='forecast-day-max-temp'>'").text("Max: " + forecast.list[31].main.temp + "F");
            var forecastDayMinTemp = $("<p class='forecast-day-max-temp'>'").text("Min: " + forecast.list[26].main.temp + "F");
            var forecastDayHumidity = $("<p class='forecast-day-max-temp'>'").text("Humidity: " + forecast.list[31].main.humidity + "%");            
            forecastDay4.append(forecastDayDate, forecastDayMaxTemp, forecastDayMinTemp, forecastDayHumidity);

            var forecastDayDate = $("<p class='forecast-day-max-temp'>'").text(forecast.list[39].dt_txt);
            var forecastDayMaxTemp = $("<p class='forecast-day-max-temp'>'").text("Max: " + forecast.list[39].main.temp + "F");
            var forecastDayMinTemp = $("<p class='forecast-day-max-temp'>'").text("Min: " + forecast.list[34].main.temp + "F");
            var forecastDayHumidity = $("<p class='forecast-day-max-temp'>'").text("Humidity: " + forecast.list[39].main.humidity + "%");
            forecastDay5.append(forecastDayDate, forecastDayMaxTemp, forecastDayMinTemp, forecastDayHumidity);

            
            console.log(forecast);
         });

         
         // API connection for the Current Weather
         $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=68d6dbd51f19629214123398c2229b80",
            method: "GET"
         }).then(function (weather) {
            var currWeatherName = $("<h3 class='curr-weather-name'>").text(weather.name + " - Current Weather");
            var currWeatherTemp = $("<p class='curr-weather-temp'>").text("Current Temperature: " + weather.main.temp + "F");
            var currWeatherFeel = $("<p class='curr-weather-temp'>").text("Feels like: " + weather.main.feels_like + "F");
            var currWeatherHumid = $("<p class='curr-weather-hum'>").text("Current Humidity: " + weather.main.humidity + "%");
            var currWeatherWind = $("<p class='curr-weather-wind'>").text("Current Wind Speed: " + weather.wind.speed + "m/h");
            $("#current-weather").append(currWeatherName, currWeatherTemp, currWeatherFeel, currWeatherHumid, currWeatherWind);
         });

         // Local Storage
         var cityData = localStorage.getItem(value);   

         console.log(localStorage.getItem(value));
         
         var prevCity = $("<p class='city-data'>").text(cityData).val();
            console.log("test - localStorage");
            console.log(localStorage);
         
      } else {
         // In red color, ask the user to try again
         $("#search-city").attr("placeholder", "type a valid city name");
         $("#search-city").attr("style", "color: var(--p1); font-size: 2.5rem");
      };
   }
   
   
   

   
   // Search button click
   $("#search-button").on("click", function () {
      var buttonClick = this.id;
      var textAreaValue = $(this).siblings('#search-city').val();
      localStorage.setItem(buttonClick, textAreaValue);

      getItemCity();
      return chooseCity();
   });
   
   // Enter keypress
   $("#search-city").keypress(function(event) {
      if (event.which === 13) {
         return chooseCity();
      };
   });
   
});


// function clearWeather() {
   //    $("#search-city").val("");
   //    CurrWeatherName.val("");
   // };
   // clearWeather();
   
   // unsplash API 
   // r60tWdxsPJXnDDxzIGlxeQDB_Q4WocIaJvb0t8pD9VI
   // ajzNPOf3ZdKuBm3kUN7YnLxRbQFhWE_iMJEXN1n1XhI