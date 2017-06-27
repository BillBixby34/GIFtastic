var topics = ["sunfish","rockfish","mocassins","tyrannosaurus rex"];
//function for dumping JSON content for each button into div
function displayAnimalImg() {
//$(event).preventDefault;//wrap in event listener for buttons??
//very sensitive about this function!
var animalInput = $(this).attr("data-name");//refresh on data-name
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalInput + "&api_key=dc6zaTOxFJmzC&limit=10";
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    console.log(response);//check

    
    var results = response.data;
    
    for (var b = 0; b < results.length; b++){
      if (results[b].rating !== "r" && results[b].rating !== "pg-13") {  
      var gifDiv = $("<div class='item'>");
      
      var p = $("<p>").text("Rating: " + results[b].rating);
      
      var animalImg = $("<img class = 'animalImg'>");
      animalImg.attr("src", results[b].images.fixed_height.url);
      animalImg.attr("data-still", results[b].images.fixed_height_still.url);
      animalImg.attr("data-animate", results[b].images.fixed_height.url);
    
      //gif animate where?
      $(document).on("click", ".animalImg", function() {
      var state = $(this).data("state");

      if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", 'animate');
      } 
      else {
       
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state",'still');
      }
      
    });
//above is animate/still click function for class="gif"
      gifDiv.append(p);
      gifDiv.append(animalImg);
      $("#animals").prepend(gifDiv);
      }
    }
     
    
    //console.log(response.data.image_original_url);//check
//$("#animals").text(JSON.stringify(response));//added text to id="animals"
  //activity12
        //var imageUrl = response.data.image_original_url;
        //console.log(imageURL);
        //var animalImg = $("<img>");//create image tag
       //animalImg.attr("src", imageUrl);
        //animalImg.attr("alt", "animal image");//this one is most suspect
        //at top of element with id
        //$("#animals").prepend(animalImg);

  });
}
function createButtons() {//function should display animal data
  $("#animalButtons").empty();//clears buttons info each time
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("animal");//add .animal to var a
    a.attr("data-name", topics[i]);//gives .animal to values entered into array
    a.text(topics[i]);
    $("#animalButtons").append(a);//at #animalButtons, append values of var a
  }
}
$("#add-animal").on("click", function(event) {//event listener for add-animal button
  event.preventDefault();//form at #add-animal will not submit form(default)
  event.stopPropagation()
  var animalInput = $("#animal-input").val().trim();//#animal-input is input box
 //activity6&8
  
  topics.push(animalInput);//move?value of animalInput is pushed to array topics
  console.log(topics);//console.log textbox entry in array
  createButtons();//function handles buttons from array
});
//Using $(document).on instead of $(".animal").on to add event listenersto dynamically generated elements

$(document).on("click", ".animal", displayAnimalImg);
createButtons();//function call to display initial list(?) of array(?)


 //create button functionality
 //not working, change .animal, relocate?
 //activity14
 //$(".animal").on("click", function() {//on click of any .animal
  //var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalInput + "&api_key=dc6zaTOxFJmzC&limit=10";

  //$.ajax({
        //url: queryURL,
        //method: "GET"
      //})
      //.done(function(response) {
        //var imageUrl = response.data.image_original_url;
        //var animalImg = $("<img>");//create image tag
       // animalImg.attr("src", imageUrl);
        //animalImg.attr("alt", "animal image");//this one is most suspect
        //at top of element with id
        //$("#animals").prepend(animalImg);
      //});
    //above comment out


//below is animate/still click function for class="gif"
  //$(".gif").on("click", function() {
    //  var state = $(this).attr("data-state");

      //if (state === "still") {
        //$(this).attr("src", $(this).attr("data-animate"));
        //$(this).attr("data-state", 'animate');
      //} 
      //else {
       
        //$(this).attr("src", $(this).attr("data-still"));
        //$(this).attr("data-state",'still');
      //}
      
    //});
//above is animate/still click function for class="gif"