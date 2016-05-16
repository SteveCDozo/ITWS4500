# Tweet-Ticker
Web Science Systems Development: Lab 1

To start off my index.html file, I used the template provided on http://getbootstrap.com/getting-started/

I found out I could use jQuery's getJSON method to perform an AJAX request to read the JSON file for the tweets. I used the template provided at http://api.jquery.com/jquery.getjson/ to structure the method call (more specifically, the .done and .fail parts).

I chose to display three different columns:

	1. The time and day of the tweet - If this was a real application, the times wouldn't be all the same. I chose to use the UTC string so that the timezone would be displayed, which is cool to see when people's tweets from different parts of the world show up.

	2. Some user information - I chose to display their picture, display name, and actual screen name because this information is essential and unique to each user.

	3. The message - This is the main part of the tweet, it wouldn't make sense to not display it.

I scrolled through tweets by deleting the last one using the ':last' selector (jQuery) and using the 'remove()' method on it. I then prepended the next tweet so it would go to the top of the list.

I got the background image from https://www.flickr.com/photos/miyukiutada/452566198

Professor Plotka said I could have until Wednesday to turn this assignment in.