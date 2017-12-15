$(document).ready(function(){
//Global Variables
var topics = ['cat', 'dog', 'sloth', 'hippo', 'racoon', 'fish'];
var currentTopic;

//create buttons for topics
writeButtons(topics);
$('#topics').on('click','button',getAPI);

//add topics to array and reprint buttons
$('#search').click(function(){
	var addTopic = $('#input').val().trim();
	console.log(addTopic)
	if (typeof addTopic === 'string') {
		topics.push(addTopic);
	}
	writeButtons(topics);
	$('#topics').on('click','button',getAPI);
});


//funtion
//===================================================================================================
	//write's topic buttons
	function writeButtons(arr){
		//clear the buttons so they dont get repeated
		$('#topics').empty();
		for (var i = 0; i < arr.length; i++) {
			//create the html for the buttons
			let print = `<button class="topic btn btn-secondary" topic="${arr[i]}"> ${arr[i]} </button>`
			//create the bittons
			$('#topics').append(print);
		}
	};
//===================================================================================================
	//gets API of topic that is clicked
	function getAPI(event) {
		console.log('check');
		currentTopic = $(event.target).attr('topic');
		console.log(currentTopic);

		APIKey = 'RWfe7cMJk8zsYcF5fFbnrX9zxm1ukK17'
		queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${currentTopic}&limit:4`;

		//Ajax call for the GIPHY API
		$.ajax({
    	  url: queryURL,
    	  method: 'GET'
    	}).done(function(data) {
    	  console.log(data);
    	  writeGiphy(data);
    	});
	};
//===================================================================================================
	//takes the api, pulls out data to writes gifs 
	function writeGiphy(input) {
		console.log(input);
		//clears the gif area for new gifs
		$('#gifs').empty();
		for (var i = 0; i < 10; i++) {
			//create the html fot the gifs
			let print = `<img src="${input.data[i].images.original.url}"><p class="gifTitle">${input.data[i].title}</p>`
			//print the gifs
			$('#gifs').append(print);
		}
	};
});
