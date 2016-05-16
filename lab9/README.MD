I used the Mongoose module so it made things easy for me. There is no installation script needed.

To combine the labs together, the main thing I did was combine the forms in the html and combine the file conversion code into one
method on the server (for xml, csv, json). They now read the data from the MongoDB and convert that instead of reading the current
tweets on the page.

For the search and export forms, I hide them initially and only show them when the user clicks on the corresponding button. I thought
this would give my app a simplistic look. Although I show the user the input fields of the form when the corresponding button is 
clicked, I do not show them the actual submit button. I did this because I think the app looks better without the 'submit' buttons
there. They didn't really add any aesthetics to it and were taking up space. To compensate for hiding them from the user, the user
must hit 'Enter' when they are done filing out the form. That will trigger the form's submit function.

I took out the form for the 'save to database' functionality because I realized a form wasn't needed. There is no data being 
collected for parameters or anything. The user just has to click a button and the database will save the tweets. Converting the
form to just one <button> also made it easier for me to display a 'save icon' in the button because I could just include an <img>
element in between the <button> tags.

I chose to allow the user to refresh tweets by clicking 'enter' again in the search form. The server will open a new stream and
update the page with new tweets.

Some visual changes I made were changing the way the tweet was displayed. I now have the image on the left, and the rest of the 
information to the right of it. I changed the format of the times. I also linked the user name with the actual Twitter profile so
you can click on the user name and the user's Twitter page will open in a new tab.

Professor Plokta allowed me an extension until tonight.