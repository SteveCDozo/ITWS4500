var express = require('express');
var app = express();

var fs = require("fs");
var filename = "webscilab6-SteveCardozo-cardos-tweets";

// use the twitter module
var Twitter = require('twitter');
var client = new Twitter({
	consumer_key: 'bBl5FCvE2xB6iImeweCV2qpVg',
	consumer_secret: 'rfdkO2oeus43JOsYvQCmxKuPiFSFTvb9MJtzmeNhVETgHtkDSz',
	access_token_key: '702969809659629569-yiNcJT7TZtoGPrwaINGxTXbHnk9xIc7',
	access_token_secret: 'cz0NWKJ74luIeIuU7qlVJSzXUI5Yg1hpOa71vdqSDdIHj'
});	

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// initialize variable to hold the tweets for the current page
var tweetArray;

// store the required properties
var properties = [
	"created_at", "id", "text", "user_id", "user_name", "user_screen_name",
	"user_location", "user_followers_count", "user_friends_count", "user_created_at",
	"user_time_zone", "user_profile_background_color", "user_profile_image_url", 
	"geo", "coordinates", "place"
];

app.get("/export", function(req, res) {
	// create variables to hold the current status text and the file output
	var status, output;
	// get the extension from the query and store it
	var extension = '.' + req.query.format.toLowerCase();

	// check if the file exists (check if server has write access)
	fs.access(filename+extension, fs.W_OK, function(error) {
		// if there was an error, it means the file does not exist
		if (error)
			status = "Exported tweets to";
		else
			status = "File already exists. Overwrote";
			
		status += " '" + filename + extension + "'";
			
		// check which format was specified, update the filename, and update the output accordingly
		if (extension === ".json") {
			output = JSON.stringify(tweetArray, null, 4);
		} else if (extension === ".csv") {
			// start the output as an empty string
			output = "";
			// go through the properties array and add each one to the output
			for (i = 0; i < properties.length; i++) {
				output += '"' + properties[i] + '"';
				if (i != properties.length-1)
					output += ',';
			}
			// create variables to hold the current tweet, property, and value
			var currentTweet, currentProperty, currentValue;
			// go through the tweets in the tweet array
			for (x = 0; x < tweetArray.length; x++) {
				// start a new line in the output
				output += '\r\n';
				currentTweet = tweetArray[x];
				// go through the properties specified in the array
				for (y = 0; y < properties.length; y++) {
					currentProperty = properties[y];
					// check if it begins with 'user_' or if its 'place' and set the value accordingly
					if (currentProperty.substring(0,5) === "user_")
						currentValue = currentTweet["user"][currentProperty.substring(5)];
					else if (currentProperty === "place") {
						// check if a value exists for the property
						if (currentTweet["place"])
							currentValue = currentTweet["place"]["full_name"];
						else
							currentValue = currentTweet["place"];
					} else
						currentValue = currentTweet[currentProperty];
					// add the property value to the output
					output += '"' + currentValue + '"';
					if (y != properties.length-1)
						output += ',';
				}
			}		
		} else {
			// if the specified format is neither CSV or JSON, set status to report an error
			status = "Error: Export format '" + req.query.format + "' not supported."
			res.send(JSON.stringify(status));
			return;
		}
		
		// write the tweets to the file
		fs.writeFile(filename+extension, output, function(error) {
			// update the status if there was an error
			if(error)
				status = "Error writing to file." + error;
		});
		
		res.send(JSON.stringify(status));
	});
});

app.get("/tweets", function(req, res) {
	
	// create an object to hold the search parameters
	var searchParams = {};
	
	// if the search field was empty, set the search parameters to the RPI area
	if (req.query.search_terms == "" || req.query.search_terms == null) {
		searchParams.locations = '-73.68,42.72,-73.67,42.73';
	} else {
	// otherwise set the search parameters to filter to the value of the search field
		searchParams.track = req.query.search_terms;
	}
	
	// open a stream, filtering statuses by the search parameters
	client.stream('statuses/filter', searchParams,  function(stream){
		// keep track of the number of tweets
		var tweetCount = 0;
		// clear the tweet array
		tweetArray = [];
		
		stream.on('data', function(tweet) {
			// add the current tweet to the array
			tweetArray.push(tweet);
			// update the counter
			tweetCount++;
			// limit the tweet count to the number of results specified in the request parameters
			if (tweetCount == req.query.num_results) {
				// send the tweets
				res.send(tweetArray);
				// end the stream
				stream.destroy();				
			}
		});
		
		stream.on('error', function(error) {
			res.send(JSON.stringify(error));
		});
	});
});

app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
	console.log('Server listening on port 3000');
});