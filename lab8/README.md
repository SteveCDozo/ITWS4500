The query I created finds the 16th President of the United States. I load it into the query box via Angular when the page 
initially loads.

The default form submit function brings the user to a different page for the results. I used the ng-submit directive instead
because I wanted the results to show up on the same page, and I saw that it took care of preventing the page from redirecting.

To execute the query I formatted the link according to the query that was entered (by using encodeURIComponent) and I indicated
that JSON should be returned (output=json). By doing this I could perform an AJAX JSON request to retrieve the results.

While the AJAX request is processing, I display a gif of a loading graphic so the user knows the site is still loading the data.
It can be seen if you run the following query taken from the examples on the dbpedia website:

SELECT ?name ?birth ?description ?person WHERE {
?person a dbo:MusicalArtist .
?person dbo:birthPlace :Berlin .
      ?person dbo:birthDate ?birth .
      ?person foaf:name ?name .
      ?person rdfs:comment ?description .
      FILTER (LANG(?description) = 'en') . 
} ORDER BY ?name

When the data gets retrieved, I load it into an Angular variable which gets loaded into a table. For the table, I used a ng-if
directive to display it only if the AJAX request is successful. I used a ng-repeat for the table columns according to the number 
of properties that were requested in the SELECT statement of the query. I also used ng-repeat for the rows according to the 
number of results that were returned.

If the type of the property is 'uri' then I store it into the data array (which is an Angular variable) as a link. I use the
<a> tag with the 'href' attribute set to to the value of the uri and display only the name of the uri by using the replace function
to remove the first part of the URL, which is "http://dbpedia.org/resource/" Since I am loading HTML into the variable and
it is being displayed on the page, I needed to make sure it was safe so that was why I used 'ngSanitize'

Since I change the Angular variables in the AJAX call functions (done() and fail()), Angular does not recognize the change because
AJAX runs asynchronously. I needed to call the $apply() function to notify Angular that I updated the variables and the changes
should be reflected on the page.

In case the AJAX fails, I get the error and store it in an Angular variable which gets displayed in the results box.