

// Takes in all of the command line arguments
var userArgs = process.argv;
// console.log(userArgs);
// Assiging action varible for switch case using the 3rd command line argument.
var liriActionArg = userArgs[2];

function switchCase(liriActionArg, userArgs)
{ 
	switch (liriActionArg)
	{
	    case "my-tweets":
		    console.log('\033c');
		    //Include keys.js to read twitterKeys
			var exportedKeys = require("./keys.js");
			// console.log(exportedKeys.twitterKeys)
			var Twitter = require('twitter');
			var client = new Twitter(exportedKeys.twitterKeys);

			client.get('statuses/user_timeline', {screen_name: 'StratPark_HOA', count: '20'}, function(error, tweets, response) 
			// client.get('search/tweets', {q: 'from%3AStratPark_HOA'}, function(error, tweets, response) 
			// client.get('search/tweets', {q: 'from%3Astratfordpark'}, function(error, tweets, response) 
			{
		   		if(error)
		   		{
		   			console.log(error);
		   			return;
		   		}
		   		// console.log(tweets.statuses[1].text);
				for (var i = 0; i < tweets.length; i++) 
		   		{ 
		   		console.log("");
		   		console.log(tweets[i].created_at);
		   		console.log(tweets[i].text);
		   		console.log("");
		   		}
			});
		    //q=from%3AStratPark_HOA&result_type=recent
	    	break;

	    case "spotify-this-song":
	    	console.log('\033c');
	    	
	    	var spotify = require('spotify');

	    	// Create an empty variable for holding the song name
					
	    	if (userArgs[3] === undefined)
	    	{
	    		songName = "The Sign";
	    		console.log("");
	    		console.log("You didn't enter a song. Defaulting to 'The Sign' by Ace of Base");
	    		
	    		spotify.lookup({ type: 'track', id: '0hrBpAOgrt8RXigk83LLNE' }, function(err, data) 
				{
			    	if ( err ) 
			    	{
			        	console.log('Error occurred: ' + err);
			        	return;
			    	}
	    			console.log("");
	    			console.log("The song name is " + data.name);
	    			console.log("By artist: " + data.artists[0].name);
	    			console.log("From album: " + data.album.name);
	    			console.log("And can be located at " + data.preview_url);
	    			console.log("");
	    		});
	    	}

	    	else
	    	{ 
	    		var songName = "";
				// Loop through all the words in the node arguments to combine into signle string
				for (var i = 3; i < userArgs.length; i++) 
				{
					if (i > 3 && i < userArgs.length) 
					{
				    	songName = songName + " " + userArgs[i];
					}

				  	else 
				  	{
				    	songName += userArgs[i];
					}
				}
	 		

				spotify.search({ type: 'track', query: songName }, function(err, data) 
				{
		    	
			    	if ( err ) 
			    	{
			        	console.log('Error occurred: ' + err);
			        	return;
			    	}

		 			// var song = data.tracks.items[0];
		 			// console.log("----------------------");
		    //         console.log(song.artists.length);
		 			// console.log("----------------------");

		    //         if (song.artists.length > 1) 
		    //         {
		    //         	console.log("entered into if statement")
		    //             for (var i=0; i<song.artists.length; i++) 
		    //             {
		 			//  		console.log("----Inside For Loop-----------")
		    //                 console.log(song.artists[i].name);
		 			//  		console.log("----Inside For Loop-----------")
		    //         	}
		    //         }
		            
		    //         else 
		    //         {
		 			//  	console.log("----Inside Else State----------")
		    //         	console.log("Artist: "+song.artists[0].name);
		 			//  	console.log("----Inside Else State----------")
		 			// }
		 				
		 			console.log("");
		 			console.log("The song name is " + data.tracks.items[0].name);
		 			console.log("By Artist: " + data.tracks.items[0].artists[0].name);
		    		console.log("From Album: " + data.tracks.items[0].album.name);
		 			console.log("And can be located at " + data.tracks.items[0].preview_url);
		 			// console.log(data.tracks.items);
		 			console.log("");

				});
	    	
			}

	    	break;

	    case "movie-this":
	    	console.log('\033c');

			// Create an empty variable for holding the movie name
			var movieName = "";
			
	    	if (userArgs[3] === undefined)
	    	{
	    		console.log("");
	    		movieName = "Mr. Nobody";
	    		console.log("You didn't enter a movie. Defaulting to Mr. Nobody");
	    		console.log("");
	    	}

			// Loop through all the words in the node argument
			// And do a little for-loop magic to handle the inclusion of "+"s
			for (var i = 3; i < userArgs.length; i++) 
			{
				if (i > 3 && i < userArgs.length) 
				{
			    	movieName = movieName + "+" + userArgs[i];
				}

			  	else 
			  	{
			    	movieName += userArgs[i];
				}
			}
			// console.log(movieName)

			// Then run a request to the OMDB API with the movie specified
			var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

			// This line is just to help us debug against the actual URL.
			// console.log(queryUrl);
		    
		    // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
			
			var request = require("request");

			// Then run a request to the OMDB API with remember the titans for testing purposes
			request(queryUrl, function(error, response, body) 
			{

			  	// If the request is successful (i.e. if the response status code is 200)

			  	if (!error && response.statusCode === 200) 
			  	{
			    	// Parse the body of the site and recover the necessary information
	    			console.log("");				
					console.log("The movie title is: " + JSON.parse(body).Title)
					console.log("The year released is: " + JSON.parse(body).Year)
					console.log("The IMDB rating is: " + JSON.parse(body).imdbRating)
					console.log("The country where produced is: " + JSON.parse(body).Country)
					console.log("The language is: " + JSON.parse(body).language)
					console.log("The plot is: " + JSON.parse(body).Plot)
			    	console.log("The movie's actors are: " + JSON.parse(body).Actors);
					// console.log("The Rotten Tomatoes Rating is: " + JSON.parse(body).Title)
					// console.log("The Rotten Tomatoes URL is: " + JSON.parse(body).Title)
				    console.log("");		 	
			 	}
			 			 		
			});
		    break;

	    case "do-what-it-says":
	    	console.log('\033c');

	    	// fs is an NPM package for reading and writing files
			var fs = require("fs");

			// This block of code will read from the "random.txt" file.
			// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
			// The code will store the contents of the reading inside the variable "data"
			fs.readFile("random.txt", "utf8", function(error, data) 
			{

				// We will then print the contents of data
				console.log(data);

				// Then split it by commas (to make it more readable)
				var dataArr = data.split(",");

				// We will then re-display the content as an array for later use.
				// console.log(dataArr);
				liriActionArg = dataArr[0];
				userArgs[3] = dataArr[1];
				switchCase(liriActionArg, userArgs);

			});
	    	break;

	}
}

switchCase(liriActionArg, userArgs);