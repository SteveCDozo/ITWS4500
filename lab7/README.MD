I put the three new buttons in three separate forms because they should each call a different function when clicked.
For the third form, I combined the input field with the button because the input field (for the filename) is a 
required parameter for the request.

In my server script, I create variables to hold the schema and model for tweets. I specify what they are in the 
db.once('open') function.

My 'buildDB()' function adds the current tweets stored in the server (the ones that are currently on the page) to 
the database.

I chose to store the dates as Strings instead of Date or Timestamp objects because we are only displaying the date.
No extra functionality is needed.

My 'displayDB()' function retrieves the tweets in the database and displays them. I had to convert the user data first
in order to match the convention of the previous lab since the property names were changed.

My 'exportDB()' function is very similar to the export function I wrote for exporting CSV. The main difference is that
the header was different for XML and I used '<' and '>' around properties and didn't have to enclose values in quotes.
Another difference is that I process the tweets saved on the database instead of the current ones saved on the server
in the 'tweetArray' variable.