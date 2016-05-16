From the homepage, you can click the 'eye' button to be sent to the 'visualize' page.

I used ChartsJS to implement three different visualizations of the data in the tweets. I followed the guide in their documentation.

I update the charts by retrieving the relevant data in the GET request when the search button is clicked to get tweets. 
I then call functions in a separate JavaScript file since Angular doesn't directly modify the DOM. I made three different
functions, one for each chart, and they each accept different data as arguments. In the function bodies, I simply add the new
data to the charts and call the update function so they are redrawn to reflect the changes.

The three things I chose to visualize were:

1. What percent of tweets are original? I show the amount of retweets compared to the number of original tweets. I check if a tweet is a 
retweet by checking if the first two characters of the tweet's text are 'RT'

2. How old are the accounts that are tweeting? I show the amount of users belonging to each creation date year. I get this from the last
four digits of the user's 'created_at' property

3. The ratio of friends to followers. I got this data from the user object in the tweet object.

Professor Plotka allowed me to submit it by tonight.