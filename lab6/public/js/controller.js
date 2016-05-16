var app = angular.module("angularApp", []);
app.controller("angularController", function($scope) {

	// hide the loading image
	$scope.loading = false;
	// hide the export status text
	$scope.exportStatus = false;
	
	$scope.exportTweets = function() {
		
		// set export status to false when performing a new export
		$scope.exportStatus = false;
		
		// perform GET request to export the tweets in the specified format
		$.getJSON('/export', {format : $scope.exportOption})
			.done(function (data) {
				// update the export text so the user is informed on what happened
				$scope.exportText = data;
				$scope.exportStatus = true;
				// tell angular to update the scope variables
				$scope.$apply();
			})
			// called if the route was not found
			.fail(function( jqxhr, textStatus, error ) {
				// print the error
				$scope.exportText = "AJAX Request Failed: " + textStatus + ", " + error;
				$scope.exportStatus = true;
				// tell angular to update the scope variables
				$scope.$apply();
			});
	}

	$scope.search = function() {
		// hide the previous error if there was one
		$scope.errorStatus = false;
		// set export status to false when performing a new export
		$scope.exportStatus = false;
		
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
		$.getJSON('/tweets', {search_terms : $scope.searchTerms, num_results : num})
			.done(function (data) {
				// check if data is a string (means an error was returned)
				if ((typeof data) === "string") {
					$scope.loading = false;
					// print the error
					$scope.errorText = "Twitter Stream error: " + data;
					$scope.errorStatus = true;
					// tell angular to update the scope variables
					$scope.$apply();
					return;
				}
				// Change the format of the dates in the data
				$.each(data, function(tweetNumber, tweet) {
					tweet.created_at = new Date(tweet.created_at).toUTCString();
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
				$scope.errorText = "AJAX Request Failed: " + textStatus + ", " + error;
				$scope.errorStatus = true;
				// tell angular to update the scope variables
				$scope.$apply();
			});
	}	
});