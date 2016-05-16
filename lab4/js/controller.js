var app = angular.module("angularApp", []);
app.controller("angularController", function($scope) {	
	
	// perform GET request to get the tweets in JSON format
    $.getJSON('./get_tweets.php')
   		.done(function (data) {
			// Change the formate of the dates in the data
			$.each(data.statuses, function(tweetNumber, tweet) {
				tweet.created_at = new Date(tweet.created_at).toUTCString();
			});
			// store the statuses in the angular variable tweets so the page can render it
			$scope.tweets = data.statuses;
			// tell angular to update the scope variables
			$scope.$apply();
   		})
   		// called if the file was not found
   		.fail(function( jqxhr, textStatus, error ) {
   			// print the error
			var err = textStatus + ", " + error;
			console.log("AJAX Request Failed: " + err);
		});
});