/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  // Array of tweet objects
  const tweetData = [
    {
    "user": {
      "name": "Kirby",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
    }, 
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const renderTweets = function(tweets) {
    
    //sort tweets from latest to older
    let sortedTweets = tweets.sort((a, b) => b.created_at - a.created_at);
    
    //loops through sorted tweets and appends them to the container
    //calls createTweetElement for each tweet 
    //takes return value and appends it to the tweets container 
    for (let tweet of sortedTweets) {
      $(".posted-tweets").append(createTweetElement(tweet))
    }    
  }

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

  renderTweets(tweetData);
});

// console.log("$tweet", $tweet); //see what it looks like
// $(".posted-tweets").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes 