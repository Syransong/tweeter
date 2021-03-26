/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// validate tweet function 
const validateTweet = function (text) {
  
  console.log(!text);
  if (!text) {
    // alert("Where's your tweet?");
    $(".alert").slideDown();
    $(".alert-msg").text("Hey, where's your tweet? 🤔 ");
    return false;
  }
  if (text.length > 140) {
    // alert("Your tweet is too long!");
    $(".alert").slideDown();
    // $(".alert").addClass("long-tweet");
    $(".alert-msg").text("Hey, your tweet is too dang long! 😡");
    return false;
  } 
  return true;
};

// Escape Function
const escape = function(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML
}

$(document).ready(() => {
  
  // Render Tweets
  const renderTweets = function(tweets) {
    $(".posted-tweets").empty();
    
    // Sort tweets from latest to oldest
    const sortedTweets = tweets.sort((a, b) => b.created_at - a.created_at);
    
    //loops through sorted tweets and appends them to the container
    for (let tweet of sortedTweets) {
      $(".posted-tweets").append(createTweetElement(tweet));
    }    
  };

  const createTweetElement = function(tweet) {
    const $newTweet = $(
      `<article class="tweet">
        <header>
          <img class="profile-pic" src=${tweet.user.avatars}">
          <div class="profile-info">
           <p>${tweet.user.name}</p>
           <p class="username">${tweet.user.handle}</p>
          </div>
        </header>
        <p>${escape(tweet.content.text)}</p>
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
      .done((res) => {
        loadTweets();
        $("#tweet-text").val(""); 
        $(".counter").val("140");
        $(".alert").slideUp();
        // $(".alert").removeClass(["no-tweet", "too-long"]);
        console.log("Did it work?");
        return;
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

  loadTweets();
});
