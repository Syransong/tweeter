$(document).ready(function() {

  $("#tweet-text").on("input", function() {
    const tweetLength = ($(this)).val().length;
    const counter = $(this).closest("form").find(".counter");
    const maxLength = 140;
    
    counter.text(maxLength - tweetLength);
   
    if (tweetLength > maxLength) {
      counter.addClass("char-exceeded");
    }

  });
});