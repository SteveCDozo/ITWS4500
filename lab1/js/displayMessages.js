$(function() {
	// store the times, pictures, names, and messages in arrays
	var times = [];
	var pictures = [];
	var names = [];
	var screennames = [];	
	var messages = [];
	
	// get data from the JSON file
   $.getJSON('./tweets.json')
   		// called if the file was found
   		.done(function (data) {
   			console.log( "JSON Success!" );

   			// go through each tweet and push the text onto the messages array
   			$.each(data, function(tweetNumber, tweet) {
   				times.push(tweet.created_at);
   				pictures.push(tweet.user.profile_image_url);
   				names.push(tweet.user.name);
   				screennames.push(tweet.user.screen_name);
   				messages.push(tweet.text);
   			});

   			// keep track of the current tweet with a counter variable
   			var counter = 0;

   			// display the first 5 tweets
   			while (counter < 5) {
   				$("#time").prepend("<section class=img-rounded><time>" + new Date(times[counter]).toUTCString() + "</time></section>");
		  		$("#user").prepend("<section class=img-rounded><img class=img-rounded class=img-responsive src=" + pictures[counter] + "><div><h5><b>" + names[counter] + "</b></h5><br><h6>@" + screennames[counter] + "</h6></div></section>");
		  		$("#message").prepend("<section class=img-rounded><p>" + messages[counter] + "</p></section>");
		  		counter++;
   			}

   			// scroll through the tweets every 3 seconds   			
			window.setInterval(function(){
				// show the removal animation
				$("#time section:last").animate({height:'toggle'});
				$("#user section:last").animate({height:'toggle'});
				$("#message section:last").animate({height:'toggle'});
				// wait 1 second for the animations to complete, then remove the last tweet
				setTimeout(function(){
					$("#time section:last").remove();
					$("#user section:last").remove();
					$("#message section:last").remove();
					// add a new tweet to the top
			  		$("#time").prepend("<section class=img-rounded><time>" + new Date(times[counter]).toUTCString() + "</time></section>");
			  		$("#user").prepend("<section class=img-rounded><img class=img-rounded class=img-responsive src=" + pictures[counter] + "><div><h5><b>" + names[counter] + "</b></h5><br><h6>@" + screennames[counter] + "</h6></div></section>");
			  		$("#message").prepend("<section class=img-rounded><p>" + messages[counter] + "</p></section>");
			  		counter++;
			  		// hide them by changing display
			  		$("#time section:first").css("display","none");
			  		$("#user section:first").css("display","none");
			  		$("#message section:first").css("display","none");
			  		// animate them by using the fadeIn function
			  		$("#time section:first").fadeIn();
					$("#user section:first").fadeIn();
					$("#message section:first").fadeIn();
				}, 1000);		  		
			}, 3000);
   		})
   		// called if the file was not found
   		.fail(function( jqxhr, textStatus, error ) {
   			// print the error
			var err = textStatus + ", " + error;
			console.log( "JSON Request Failed: " + err );
		});
});