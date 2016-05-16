// ngSanitize required to load HTML in the Angular variables displayed on the page
var app = angular.module("angularApp", ['ngSanitize']);
app.controller("angularController", function($scope) {
	// hide the loading image
	$scope.loading = false;
	// initialize variables
	$scope.columnHeaders = [];
	$scope.data = [];
	$scope.querySuccessful = false;
	$scope.error = false;
	// set the query to the one I created by default
	$scope.query = 'SELECT ?name ?number ?person WHERE {?person a yago:PresidentsOfTheUnitedStates . ?person foaf:name ?name . ?person dbo:orderInOffice ?number .	FILTER(?number = "16th")}';
	
	// called when the 'Execute Query' button runs
	$scope.runQuery = function () {
		// hide the current query results in case a new query is run
		$scope.querySuccessful = false;
		// show the loading image
		$scope.loading = true;
		// hide the current error if there is one in case a new query is run
		$scope.error = false;
		
		// perform the JSON call using the link along with the encoded URI query
		$.getJSON("http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=PREFIX+owl%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0D%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0D%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0D%0APREFIX+dc%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0D%0APREFIX+%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%0D%0APREFIX+dbpedia2%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fproperty%2F%3E%0D%0APREFIX+dbpedia%3A+%3Chttp%3A%2F%2Fdbpedia.org%2F%3E%0D%0APREFIX+skos%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0D%0A"
						+encodeURIComponent($scope.query)
						+"&output=json")
			.done(function (data) {
				// store the column names in columnHeaders
				$scope.columnHeaders = data.head.vars;
				// store the results/data
				$scope.data = data.results.bindings;
				// check if the data type is URI - if it is, then insert it into a link
				$.each($scope.data, function(index, item){
					$.each(item, function(key, property){
						if (property.type == "uri") {
							property.value = "<a href=\""+property.value+"\" target=\"_blank\">"+property.value.replace("http://dbpedia.org/resource/", "")+"</a>";
						}
					});
				});
				// show the loading image again
				$scope.loading = false;
				// set query to true so angular will show the table
				$scope.querySuccessful = true;
				// tell angular to update
				$scope.$apply();
			})
			.fail(function( jqxhr, textStatus, error ) {
				// hide the loading image
				$scope.loading = false;
				// print the error
				$scope.error = true;
				$scope.errorText = textStatus + ": " + error;
				// set to false - query was unsuccessful
				$scope.querySuccessful = false;
				// tell angular to update
				$scope.$apply();
			});
	}
});