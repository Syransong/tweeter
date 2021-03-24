/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  // tweet data object 
  const tweetData = {
    "user": {
      "name": "Kirby",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  //convert long date to regular date 
  // const tweetDate = new Date(tweetData.created_at);
  // console.log(tweetDate);
  // tweetDate.toDateString();
  // console.log(tweetDate);
  // const datePosted = Date.now() - tweetDate;
  // console.log(datePosted.toDateString());

  // const tweetDate = new Date(tweetData.created_at);
  // const presentDate = new Date.now();

// construct new tweet using jQuery

const createTweetElement = function(tweetObj) {
  
  const newTweet = $(
    `<article class="tweet">
      <header>
        <img class="profile-pic" src=${tweetObj.user.avatars}">
        <div class="profile-info">
         <p>${tweetObj.user.name}</p>
         <p class="username">${tweetData.user.handle}</p>
        </div>
      </header>
      <p>${tweetObj.content.text}</p>
      <footer>
       <p>${moment(tweetObj.created_at).fromNow()}</p>
       <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
       </div>
      </footer>
    </article>`
  );
  return newTweet;
}

  const $tweet = createTweetElement(tweetData);
  
  // console.log("$tweet", $tweet); //see what it looks like
  $(".posted-tweets").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes 

})
