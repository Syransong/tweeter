$(document).ready(function() {
  console.log("is this working?")

  //add an event listener to the form field?

  $("#tweet-text").on("input", function(event) {
    const tweetLength = ($(this)).val().length;
    let charsLeft = 140 - tweetLength;
    console.log(charsLeft);
    
  })

});