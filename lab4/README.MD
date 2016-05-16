To begin, I updated the 'get_tweets.php' with my own credentials. 

In my 'controller.js' file, I use the getJSON() method to utilize an AJAX request to 'get_tweets' in order to get the tweet data. 

In the callback function, I change the format of the dates in the data by creating Date objects for them and then converting 
them to UTC strings for better readability. 

I then set the data to the 'tweets' variable in the angular scope so it can be accessed by the client.

In the HTML file, I used panels that span an entire row to display the data because I wanted to show that the data I was displaying
all belongs to one tweet. I have three columns in the row: the first is for the time, the second is for user information (picture,
display name, and username), and the third is the actual text of the tweet.

I repeated panels for each tweet by using the angular directive 'ng-repeat'

To make the app more responsive, I used a media query to check when the page renders at a width of 1025px (tablet width) and
change the formatting of the data in the three columns. I give them padding and change their alignment to be centered because it
looks nicer that way on a tablet/phone/smaller browser.

I used Google fonts to customize the look of the app and I also used rgba color for the panels to make them opaque. I didn't use
the CSS opacity property because that would change the opacity of the text too. I just wanted to make the color of the panel 
opaque so that is why I chose to use the rgba color.