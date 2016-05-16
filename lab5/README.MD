Before running the server, the 'Twitter' module needs to be installed

After that you can use the command 'node index' to start the server

I added a form in the header of the index.html so it would show up on the top of the page under the title.
The form includes a search box, a box to enter the number of results you wish to retrieve, and a button to submit the search.

I used the angular directive 'ng-model' to tie the input fields to the controller. This allowed me to read the input fields
when the user clicks the 'Search' button. I also used the 'ng-submit' directive to call the 'submit' function in the 
angular controller when the form is submitted. The submit function ensures that the value in the '# of tweets' box is
a positive number.

Once the number is validated, I tell angular to load the loading image and then perform the AJAX JSON request. In the getJSON
function, I specify the parameters to send to the server - the search terms and the number of results to return. When I receive
the data, I change the format of the dates and then store the tweets in the $scope.tweets variable and tell angular to update with
the $scope.$apply() function.

In the index.js file for the node server I use the Twitter and fs modules. I specified a function for the server to run when
a get request occurs for the /tweets page is called. I check the search_terms variable of the query parameters of the request
object to see if it is empty. If it is, then I set the parameter variable 'locations' for the stream to the RPI coordinates. If it is not
empty, I set the parameter variable 'track' to whatever the search terms are.

After that I call the stream function from the Twitter module. I keep count of the tweets as they come in and stop reading them when
the amount specified by the num_results variable of the query parameters of the request is reached. As each tweet comes in, I update
the counter and add each tweet to the tweet array. After the specified amount is reached, I write the tweet array to the file using the
writeFile() function of the fs module, send the array to the client, and end the stream with the destroy() function.
 
I could have done a separate $.getJSON request for each tweet (so if the user wanted 10 tweets, there would be 10 requests) but I chose
to do one request that gets all of the tweets because each request would create an overhead and it would be better to just have one than
many to be more time efficient and if I had many requests, I would have to keep creating new streams which would probably result in my 
IP being banned from using the streams anymore.

