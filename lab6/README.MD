You can use the command 'node index' to start the server

To implement the export functionality, I created another form under my search form. It has a 'select' element with a JSON option and
CSV option. It also has a 'Export' button to submit the form. I used the angular directive 'ng-model' to tie the input fields to the 
controller. 

In the server, I have a status variable to hold the status of the requests it is making. When the export form is submitted, I perform
a GET request to the server and send the chosen option (CSV or JSON) as the parameter. The server then reads the format type and checks 
if that file exists using the fs.access() function. If it already exists, the server status updates to notify the user it is overwriting
it. If the format is JSON, it uses the same method as in the previous lab. If it is CSV, it goes through the tweets in the tweet array
(which I already have stored in the server from the previous query request) and then goes through the property array (an array I created
on the server that holds the properties that we were instructed to save) and gets all the corresponding property values from the tweets.

I coded it so that if it starts with 'user_' it will access the user object of the tweet first and then the property that follows 'user_'.
Also, if the property is 'place' I had the server only obtain the place's 'full_name' instead of saving the whole object.

After storing all the necessary data in the 'output' variable, I write it to the file using the fs.writeFile() function. Finally I send
the 'status' variable to the client so any errors or information can be written to the page (which I accomplish via a paragraph element
linked to my angular controller). 


NOTE: Since both the back-end and front-end have access to the list of tweets, you need to think about where you would implement the 
conversion to CSV. Consider the pros and cons of putting the conversion function in the node server as opposed to adding it to an
Angular controller and answer the following question as part of the assignment:

Q: Where would it be better to place the CSV conversion code, in the node server or in an Angular controller? Why?

I believe it is better to place the CSV conversion code in the node server. My reasons for it are as follow:

1. I save the tweets from the last search request that was performed. They are stored in an array on the server. In my function to 
create the CSV file, I just access the tweets from that array. Since I already have the tweets on the server, there is no need to do
it client side.

2. If I were to do it client-side, I would have to convert the tweets to CSV, and then send it to the server via a parameter in the
GET request. By doing it server-side, I avoid this and save time and am more efficient since it's already stored on the server.

3. If the user wants a very large amount of tweets, it is better to leave that processing to the server in case the user's computer
isn't that great and would suffer in performance from processing all that data.