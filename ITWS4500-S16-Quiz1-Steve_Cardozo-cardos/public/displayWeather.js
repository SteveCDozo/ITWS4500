function showWeatherData(position) {
    
    // perform AJAX request to get the current weather data using the ciy name - Spokane,
    // imperial units, my own app id, and a specified callback function
    $.ajax({
        type: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather?q=Spokane&units=imperial&appid=467a50a63b6d907fb614520f891a7605',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'loadCurrentWeather',
        crossDomain: true,
        success: function(data) {
           console.log("Weather API call successful!");
        },
        error: function(error) {
           console.log("Weather API call failed! Error: " + error.message);
        }
    });
}

function loadCurrentWeather(data) {

	var temp = data.main.temp;
	
    // insert the data into the page
    $("#weather_info").html("Current Temperature in Spokane, WA: " + temp + " &#8457;");
	
	// vars to hold the message and color
	var text = "It is ";
	var color;
	
	// check the temperature and use the corresponding message and color
	if (temp < 10) {
		text += "Freezing";
		color = "DarkBlue";
	} else if (temp < 40) {
		text += "Cold";
		color = "LightBlue";
	} else if (temp < 70) {
		text += "Warm";
		color = "Orange";
	} else {
		text += "Hot";
		color = "Red";
	}
		
	text += "!";
	
	// display the message
	$("#message").text(text);
	// change the color
	$("#message").css("color", color);
}