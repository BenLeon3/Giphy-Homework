// Initial array of baseball teams
var topic = ["Dodgers", "Yankees", "SF Giants", "Blue Jays", "Red Sox", "Miami Marlins", "Astros", "Clevland Indians", "Detroit Tigers"];

        

// displayTeamInfo function re-renders the HTML to display the appropriate content
function displayTeamInfo() {
    var team = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=veS1ZpaXAfovnes4X5Sw6zhPLFm0ZJlB&limit=10";

    // Creates AJAX call for the specific team button being clicked
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response);
    
        var results = response.data; 
        console.log(results);

        for (var i = 0; i < results.length; i++) {
            var teamDiv = $("<div class='team'>");

            var imgURL = results[i].images.fixed_height_still.url;
            var image = $("<img class='gif'>").attr("src", imgURL);
            
            image.attr({'data-animate' : results[i].images.fixed_height.url});
            image.attr({'data-state' : "still"});
            image.attr({'data-still' : results[i].images.fixed_height_still.url});

            var rating = results[i].rating;
            var pElementOne = $("<p>").text("Rating: " + rating);
            teamDiv.append(pElementOne);
            
            teamDiv.append(image);
            
            $("#teams-view").prepend(teamDiv);

        }
    });
}



// Function for displaying team data
function renderButtons() {
    $("#buttons-view").empty();
    for (var j = 0; j < topic.length; j++) {
        var a = $("<button>");
        a.addClass("team");
        a.attr("data-name", topic[j]);
        a.text(topic[j]);
        a.on('click', displayTeamInfo);

        $("#buttons-view").append(a);
    }
}

// This function handles events where the add team button is clicked
$("#add-team").on("click", function(event) {
    event.preventDefault();
    var team = $("#team-input").val().trim();
    topic.push(team);
    
    renderButtons();
});
// Changes state of gifs from still to animated
$("#teams-view").on("click", ".gif", function() {
    var $imgClicked = $(this);
    var state = $(this).attr("data-state");

    if(state === 'still') {
        $imgClicked.attr('src', $imgClicked.attr('data-animate'));
        $imgClicked.attr('data-state', 'animate');
    } 
    else{ 
        $imgClicked.attr('src', $imgClicked.attr('data-still'));
        $imgClicked.attr('data-state', 'still');
    } 
});

renderButtons();