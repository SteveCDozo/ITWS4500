var app = angular.module("angularApp", []);
app.controller("angularController", function($scope) {
	// hide the loading image
	$scope.loading = false;
	// hide the export status text
	$scope.status = false;
	
	$scope.saveTweets = function() {
		// set status to false when performing a new request
		$scope.status = false;
		
		$.getJSON('/saveTweets')
			.done(function(data) {
				// update the status so the user is informed on what happened
				$scope.statusText = data;
				$scope.status = true;
				// tell angular to update the scope variables
				$scope.$apply();
			})
			.fail(function(jqxhr, textStatus, error) {
				// print the error
				$scope.statusText = "AJAX Request Failed: " + textStatus + ", " + error;
				$scope.status = true;
				// tell angular to update the scope variables
				$scope.$apply();		
			});
	}
	
	$scope.exportTweets = function() {
		// set status to false when performing a new request
		$scope.status = false;
		
		$.getJSON('/exportTweets', {format : $scope.format, filename : $scope.filename})
			.done(function(data) {
				// update the status so the user is informed on what happened
				$scope.statusText = data;
				$scope.status = true;
				// tell angular to update the scope variables
				$scope.$apply();
			})
			.fail(function(jqxhr, textStatus, error) {
				// print the error
				$scope.statusText = "AJAX Request Failed: " + textStatus + ", " + error;
				$scope.status = true;
				// tell angular to update the scope variables
				$scope.$apply();		
			});
	}

	$scope.searchTweets = function() {
		// hide the previous status if there was one
		$scope.status = false;
		
		// check if the numResults is a valid number
		if (isNaN($scope.numResults)) {
			alert("# of tweets must be an integer!");
			return;
		}
		
		// get the integer value
		var num = parseInt($scope.numResults);
		// alert the user if it is less than 0
		if (num < 0) {
			alert("# of tweets cannot be negative!");
			return;
		}
		
		// show the loading image
		$scope.loading = true;
		// clear the current tweet data
		$scope.tweets = [];
		
		// perform GET request to get the tweets in JSON format
		$.getJSON('/searchTweets', {search_terms : $scope.searchTerms, num_results : num})
			.done(function (data) {
				// check if data is a string (means an error was returned)
				if ((typeof data) === "string") {
					$scope.loading = false;
					// print the error
					$scope.statusText = "Twitter Stream error: " + data;
					$scope.status = true;
					// tell angular to update the scope variables
					$scope.$apply();
					return;
				}
				// Change the format of the dates in the data
				$.each(data, function(tweetNumber, tweet) {
					tweet.created_at = dateToString(new Date(tweet.created_at));
				});
				// store the statuses in the angular variable tweets so the page can render it
				$scope.tweets = data;
				// hide the loading image
				$scope.loading = false;
				// tell angular to update the scope variables
				$scope.$apply();
			})
			// called if the file was not found
			.fail(function( jqxhr, textStatus, error ) {
				// hide the loading image again
				$scope.loading = false;
				// print the error
				$scope.statusText = "AJAX Request Failed: " + textStatus + ", " + error;
				$scope.status = true;
				// tell angular to update the scope variables
				$scope.$apply();
			});
	}	
});

// helper functions for making the time from the Date() object easier to read
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function dateToString(date) {
  
	var period = "AM";
	var hours =  date.getHours();	
	if (hours >= 12){
		hours -= 12;
		period = "PM";
	}
	if (hours == 0)
		hours = 12;
	return addZero(hours) + ":" + addZero(date.getMinutes()) + " " + period;
}