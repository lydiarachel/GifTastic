$(document).ready(function () {

    //array for the initial button topics of things that make my heart happy

    var topics = ["sunshine", "beaches", "ballet", "dance", "beauty", "fashion", "music"]

    var topicBtn;
    var newBtn = "";

    var topicBtnMaker = function(){
        $("#button-display").empty();

        for(var i=0; i<topics.length; i++){
            topicBtn = $("<button type='button'>" + topics[i] + "</button>").addClass("btn btn-primary").attr("data", topics[i]);
        
            $("#button-display").append(topicBtn);
        };
    }

    $("#button-display").on("click", ".btn", function(){
        var happyThing = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + happyThing + "&api_key=SVrKVR4JCcFoaXJOAOYhsMur7J2gPLPn&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET" 

        }).then(function(response){
            console.log(response);
            
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                // a div is created to hold a gif of any topic
                var divImageHolder = $("<div class = 'item'>");
               
                // Under every gif, display its rating (PG, G, so on).
               var p = $("<p>");
               p.text(results[i].rating);
               var p = $("<p>").html("Rating: " + results[i].rating);

               var imageTopicDisplay = $("<img class = 'gif'>");

             
               imageTopicDisplay.attr("src", results[i].images.fixed_height_still.url);
               imageTopicDisplay.attr("data-still", results[i].images.fixed_height_still.url);
               imageTopicDisplay.attr("data-animate", results[i].images.fixed_height.url)
               imageTopicDisplay.attr("data-state", "still")
               imageTopicDisplay.addClass("gif");
               
              
               divImageHolder.append(imageTopicDisplay);
              
               divImageHolder.prepend(p); 			
              
               $("#gifs-appear-here").prepend(divImageHolder);
           }
        })
})


$("#gifs-appear-here").on("click", ".gif", function(event){
	event.preventDefault();
	
	var state = $(this).attr("data-state");
	
	
	if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

})

$("#addHappyBtn").on("click", function(event){
    event.preventDefault();
    

	newBtn = $("#input-from-user").val();
	
	topics.push(newBtn);
	
	topicBtnMaker();
});

    topicBtnMaker();

})


