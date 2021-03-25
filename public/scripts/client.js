/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  const renderTweets = function(tweets) {
    
    // Sort tweets from latest to older
    let sortedTweets = tweets.sort((a, b) => b.created_at - a.created_at);
    
    //loops through sorted tweets and appends them to the container
    for (let tweet of sortedTweets) {
      $(".posted-tweets").append(createTweetElement(tweet));
    }    
  };

  const createTweetElement = function(tweet) {
  
    let $newTweet = $(
      `<article class="tweet">
        <header>
          <img class="profile-pic" src=${tweet.user.avatars}">
          <div class="profile-info">
           <p>${tweet.user.name}</p>
           <p class="username">${tweet.user.handle}</p>
          </div>
        </header>
        <p>${tweet.content.text}</p>
        <footer>
        <p>${moment(tweet.created_at).fromNow()}</p>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
        </footer>
      </article>`
    );
    return $newTweet;
  }

  // Event listener for submit 
  $("form").on("submit", function(event) {
    
    event.preventDefault();

    $.ajax({
      url: "/tweets/",
      method: 'POST',
      data: $("form").serialize()
    })
    .done(()=>{
      console.log("Did it work?");
    })
    .fail((err) => {
      console.log(err.message);
    })
  })

// Loads tweets 
  const loadTweets = function () {

    $.ajax({
      url: "/tweets/",
      method: "GET",
      dataType: ""
    })
    .done((res) => {
      renderTweets(res);
    })
    .fail(() => {
      console.log(err.message);
    })
  };

  loadTweets();
});

// console.log("$tweet", $tweet); //see what it looks like
// $(".posted-tweets").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes 