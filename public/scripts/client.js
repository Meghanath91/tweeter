/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const data = [];

const renderTweets = function(tweetsFromDataBase) {
  $("#tweetFromData").empty();
  for (let fakeTweet of tweetsFromDataBase) {
    $("#tweetFromData").append(createTweetElement(fakeTweet));
  }
};

const createTweetElement = function(tweetToMarkUp) {
  const markUp = `<article class= "tweets">
<div class="tweetsHeader">
  <img class="profile-pic"src=${tweetToMarkUp.user.avatars}>
  <span class="profile-name">${tweetToMarkUp.user.name}</span>
  <span class="nickname">${tweetToMarkUp.user.handle}</span>
</div>
<p class="tweet-desc">${tweetToMarkUp.content.text}</p>
<hr class="line"width=”200″ align=”left”> 
<footer>
  <p class="days-count">${moment(tweetToMarkUp.created_at).fromNow()}</p>
  <img class="likes-comment"src="/images/likes-comment.png">
</footer>
</article>
`;
  return markUp;
};

$(document).ready(function() {
  $(".form-inline").submit(function(event) {
    //alert( "Handler for .submit() called." );
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $(this).serialize(),
      dataType: "String",
      success: loadTweets()
    });
  });

  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      data: "data",
      dataType: "JSON",
      success: data => {
        //console.log(data)
        renderTweets(data);
      }
    });
  };
  loadTweets();
});
