var express = require('express');
var app = express();

var fs = require("fs");
var filename = "webscilab5-SteveCardozo-cardos-tweets.json";

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
		// create an array to store them
		var tweetArray = [];
		
		stream.on('data', function(tweet) {
			// add the current tweet to the array
			tweetArray.push(tweet);
			// update the counter
			tweetCount++;
			// limit the tweet count to the number of results specified in the request parameters
			if (tweetCount == req.query.num_results) {
				// write the tweets to the file
				fs.writeFile(filename, JSON.stringify(tweetArray, null, 4), function(error) {
					if(error) {
					  console.log(error);
					} else {
					  console.log("JSON saved to " + filename);
					}
				}); 
				// send the tweets
				res.send(tweetArray);
				// end the stream
				stream.destroy();				
			}
		});
		
		stream.on('error', function(error) {
			console.log(error);
		});
	});
});

app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
	console.log('Server listening on port 3000');
});