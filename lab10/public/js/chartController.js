var app = angular.module("angularApp", []);
app.controller("angularController", function($scope) {
	// hide the loading image
	$scope.loading = false;
	// hide the export status text
	$scope.status = false;

	$scope.updateCharts = function() {
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
		$.getJSON('/updateCharts', {search_terms : $scope.searchTerms, num_results : num})
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
				// keep count of retweets
				var numRetweets = 0;
				// keep track of current year
				var year;
				// keep track of creation dates
				var dates = {};
				// keep track of friend and follower count
				var numFriends = 0, numFollowers = 0;
				// Change the format of the dates in the data
				$.each(data, function(tweetNumber, tweet) {
					if (tweet.text.substring(0,2) === "RT")
						numRetweets += 1;
					year = tweet.user.created_at.substring(tweet.user.created_at.length-4);
					if (dates[year] == null)
						dates[year] = 1;
					else
						dates[year] += 1;
					numFriends += tweet.user.friends_count;
					numFollowers += tweet.user.followers_count;
				});
				// update the chart
				updateRetweetChart(numRetweets, num-numRetweets);
				updateCreatedChart(dates);
				updateFfChart(numFriends, numFollowers);
				
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