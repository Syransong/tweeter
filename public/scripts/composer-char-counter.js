$(document).ready(function() {
  console.log("is this working?")

  //add an event listener to the form field?

  $("#tweet-text").on("input", function(event) {
    const tweetLength = ($(this)).val().length;
    const counter = $(this).closest("form").find(".counter");
    const maxLength = 140;

    if (tweetLength > maxLength) {
      counter.addClass("char-exceeded");
    }
    
    counter.text(maxLength - tweetLength);
  })
});