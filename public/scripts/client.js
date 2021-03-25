/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// validate tweet function 

const validateTweet = function (text) {
  if (!text) {
    alert("Where's your tweet?");
    return false;

  } else if (text.length > 140) {
    alert("Your tweet is too long!");
    return false;

  } else {
    return true;
  }
};

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

    const text = $("#tweet-text").val();

    if (validateTweet(text)) {
      $.ajax({
        url: "/tweets/",
        method: 'POST',
        data: $("form").serialize()
      })
      .done(()=>{
        $(".posted-tweets").empty();
        loadTweets();
        console.log("Did it work?");
      })
      .fail((err) => {
        console.log(err.message);
      })
    } else {
      console.log("Tweet could not be posted :(")
    }
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

  // loadTweets();
});

// console.log("$tweet", $tweet); //see what it looks like
// $(".posted-tweets").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes 