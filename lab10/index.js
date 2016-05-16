var express = require('express');
var app = express();

var fs = require('fs');

// use the twitter module
var Twitter = require('twitter');
var client = new Twitter({
	consumer_key: 'bBl5FCvE2xB6iImeweCV2qpVg',
	consumer_secret: 'rfdkO2oeus43JOsYvQCmxKuPiFSFTvb9MJtzmeNhVETgHtkDSz',
	access_token_key: '702969809659629569-yiNcJT7TZtoGPrwaINGxTXbHnk9xIc7',
	access_token_secret: 'cz0NWKJ74luIeIuU7qlVJSzXUI5Yg1hpOa71vdqSDdIHj'
});

// use the mongoose module
var mongoose = require('mongoose');
// connect to the database
mongoose.connect('mongodb://localhost/cardos-tweetr');
// store the connection in a variable
var db = mongoose.connection;
// check for an error connecting
db.on('error', function(error){
	console.log("MongoDB/Mongoose error: " + error);
});
// create variables for the schema and model
var tweetSchema, Tweet;

// create the models on the initial connection
db.once('open', function() {
	// create the schema
	tweetSchema = mongoose.Schema({
		created_at: String,
		id: Number,
		text: String,
		user_id: Number,
		user_name: String,
		user_screen_name: String,
		user_location: String,
		user_followers_count: Number,
		user_friends_count: Number,
		user_created_at: String,
		user_time_zone: String,
		user_profile_background_color: String,
		user_profile_image_url: String,
		geo: String,
		coordinates: String,
		place: String
	});
	// create model based on schema
	Tweet = mongoose.model('Tweet', tweetSchema);
});


app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/visualize', function (req, res) {
	res.sendFile(__dirname + '/public/visualize.html');
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

app.get("/saveTweets", function(req, res) {
	// add the current tweets stored in 'tweetArray' to the database
	
	// create variables to hold the current tweet, property, and value
	var currentTweet, currentProperty, currentValue;
	// go through the tweets in the tweet array
	for (x = 0; x < tweetArray.length; x++) {
	
		currentTweet = tweetArray[x];
		
		// create an ojbect to store the information
		var tweetInfo = {};
		
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
			
			// update the object
			tweetInfo[currentProperty] = currentValue;
		}
		
		// create new Tweet document
		var currentTweet = new Tweet(tweetInfo);
		// save it to the database
		currentTweet.save(function (error) {
			if (error) {
				res.send(JSON.stringify(error));
				return;
			}
		});
	}
	// if all of the tweets in the array were processed, then send a success message
	res.send(JSON.stringify("Tweets were successfully saved to the database!"));
});

app.get("/exportTweets", function(req, res) {
	Tweet.find(function (error, tweets) {
		if (error) {
			res.send(JSON.stringify(error));
			return;
		}		
		
		// if the filename field was empty, set the filename to the default
		if (req.query.filename == "" || req.query.filename == null)
			req.query.filename = "webscilab9-SteveCardozo-cardos-tweets";
		
		// create variables to hold the current status text and the file output
		var status, output;
		// get the extension from the query and store it
		var extension = '.' + req.query.format.toLowerCase();
		
		// check if the file exists (check if server has write access)
		fs.access(req.query.filename+extension, fs.W_OK, function(error) {
			// if there was an error, it means the file does not exist
			if (error)
				status = "Exported tweets in database to";
			else
				status = "File already exists. Overwrote";
				
			status += " '" + req.query.filename + extension + "'";
			
			// check which format was specified, update the filename, and update the output accordingly
			if (extension === ".json") {
				output = JSON.stringify(tweets, null, 4);
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
				// go through the tweets in the tweets
				for (x = 0; x < tweets.length; x++) {
					// start a new line in the output
					output += '\r\n';
					currentTweet = tweets[x];
					// go through the properties specified in the array
					for (y = 0; y < properties.length; y++) {
						currentProperty = properties[y];
						currentValue = currentTweet[currentProperty];
						// add the property value to the output
						output += '"' + currentValue + '"';
						if (y != properties.length-1)
							output += ',';
					}
				}		
			} else if (extension === ".xml") {
				// start the output with the required XML header and a tweets object
				output = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<tweets>";
				
				// create variables to hold the current tweet, property, and value
				var currentTweet, currentProperty, currentValue;
				// go through the tweets
				for (x = 0; x < tweets.length; x++) {
					// start a new line and new tweet object in the output
					output += "\n\t<tweet>";
					currentTweet = tweets[x];
					// go through the properties specified in the array
					for (y = 0; y < properties.length; y++) {
						currentProperty = properties[y];
						currentValue = currentTweet[currentProperty];
						// add the properties & values to the tweet object
						output += "\n\t\t<" + currentProperty + ">" + currentValue + "</" + currentProperty + ">";
					}
					// after going through the properties, end the tweet object
					output += "\n\t</tweet>";
				}
				// after going through all the tweets, end the tweets object
				output += "\n</tweets>";
			} else {
				// if the specified format is neither CSV or JSON, set status to report an error
				status = "Error: Export format '" + req.query.format + "' not supported."
				res.send(JSON.stringify(status));
				return;
			}
			
			// write the tweets to the file
			fs.writeFile(req.query.filename+extension, output, function(error) {
				// update the status if there was an error
				if(error)
					status = "Error writing to file. " + error;
			});
			
			res.send(JSON.stringify(status));
		});
	});
});

app.get("/searchTweets", function(req, res) {
	
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

app.get("/updateCharts", function(req, res) {
	
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