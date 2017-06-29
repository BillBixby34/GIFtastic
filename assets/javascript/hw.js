var topics = ["sunfish","mice","haunted house","tyrannosaurus rex","flying cars","stair climbing"];

function displaySomeImg() {
//$(event).preventDefault;//wrap in event listener for buttons??
//very sensitive about this function!
var nounInput = $(this).attr("data-name");//refresh on data-name and console this
var queryURL = "http://api.giphy.com/v1/gifs/search?q=stuff+" + nounInput + "&api_key=8764a1be29c64f7d9b9e53c5dd2a030f&limit=10";
  
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
      
      var someImg = $("<img class = 'someImg'>");
      someImg.attr("src", results[b].images.fixed_height_still.url);
      someImg.attr("data-still", results[b].images.fixed_height_still.url);
      someImg.attr("data-animate", results[b].images.fixed_height.url);
    
      //gif animate where?
      $(document).on("click", ".someImg", function() {
      var state = $(this).attr("data-state");

      if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", 'animate');
      } 
      else {
       
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state",'still');
      }
      
    });
//above is animate/still
      gifDiv.append(p);
      gifDiv.append(someImg);
      $("#nouns").prepend(gifDiv);//how to clear #nouns on button press??
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
function createButtons() {//function should display noun data
  $("#nounButtons").empty();//clears buttons info each time
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("noun");
    a.attr("data-name", topics[i]);//gives .noun to values entered into array
    a.text(topics[i]);
    $("#nounButtons").append(a);//at #nounButtons, append values of var a
  }
}
$("#add-noun").on("click", function(event) {//event listener for #add-noun input
  event.preventDefault();//form at #add-noun will not submit form(default)
  var nounInput = $("#noun-input").val().trim();//#noun-input is input box
 //activity6&8
  
  topics.push(nounInput);//move?value of nounInput is pushed to array topics
  console.log(topics);//console.log textbox entry in array
  createButtons();//function handles buttons from array
});
//Using $(document).on instead of $(".noun").on to add event listener to dynamically generated elements
//how to empty/refresh div .item or #nouns??
$(document).on("click", ".noun", displaySomeImg);//.on(...,...,function(){displaySomeImg();...})didn't work properly.Why?
createButtons();//function call to createButtons


