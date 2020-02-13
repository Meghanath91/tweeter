/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json

//***********************Database model*******************/
const data = [];
//cross-site scripting prevention
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//function to render tweets from Database
const renderTweets = function(tweetsFromDataBase) {
  for (let fakeTweet of tweetsFromDataBase) {
    $("#tweetFromData").prepend(createTweetElement(fakeTweet));
  }
};
//function to create new tweets
const createTweetElement = function(tweetToMarkUp) {
  const markUp = `<article class= "tweets">
<div class="tweetsHeader">
  <img class="profile-pic"src=${tweetToMarkUp.user.avatars}>
  <span class="profile-name">${tweetToMarkUp.user.name}</span>
  <span class="nickname">${tweetToMarkUp.user.handle}</span>
</div>
<p class="tweet-desc">${escape(tweetToMarkUp.content.text)}</p>
<hr class="line"width=”200″ align=”left”> 
<footer>
  <p class="days-count">${moment(tweetToMarkUp.created_at).fromNow()}</p>
  <img class="likes-comment"src="/images/likes-comment.png">
</footer>
</article>
`;
  return markUp;
};
//jqueary GET request to render tweets
const loadTweets = function() {
  $.ajax({
    type: "GET",
    url: "/tweets",
    dataType: "JSON",
    success: data => {
      $("#tweetFromData").empty();
      renderTweets(data);
    }
  });
};
//when page loaded
$(document).ready(function() {
  //button click for write new tweet
  $("#compose").click(function() {
    $(".new-tweet").toggle();
  });
  //when submit button clicks
  $(".form-inline").submit(function(event) {
    event.preventDefault(); //this will prevent default action of browser
    let numOfChar = $("#tweetArea").val().length;
    //if user try to tweet empty string
    if (numOfChar === 0) {
      $(".error").css("display", "none");
      $(".error-display").css("display", "inline-block");
    } else if (numOfChar > 140) {
      $(".error").css("display", "none");
      //if number of characters exceed 140
      $(".error-exceed").css("display", "inline-block");
    } else {
      //this will clear the error message
      $(".error").css("display", "none");
      //this will create standard text string
      const data = $(this).serialize();
      //this will empty the tweetArea
      $("#tweetArea").val("");
      //Ajax POST request to load tweets
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
        dataType: "String",
        complete: loadTweets
      });
    }
  });
  //to load the previous tweets
  loadTweets();
});