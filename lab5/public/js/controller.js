var app = angular.module("angularApp", []);
app.controller("angularController", function($scope) {

	// hide the loading image
	$scope.loading = false;

	$scope.search = function() {
		// hide the previous error if there was one
		$scope.errorStatus = false;
		
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