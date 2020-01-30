/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const data = [
  // {
  //   user: {
  //     name: "Newton",
  //     avatars: "https://i.imgur.com/73hZDYK.png",
  //     handle: "@SirIsaac"
  //   },
  //   content: {
  //     text:
  //       "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   created_at: 1461116232227
  // },
  // {
  //   user: {
  //     name: "Descartes",
  //     avatars: "https://i.imgur.com/nlhLi3I.png",
  //     handle: "@rd"
  //   },
  //   content: {
  //     text: "Je pense , donc je suis"
  //   },
  //   created_at: 1461113959088
  // }
];

const renderTweets = function(tweetsFromDataBase) {
  for (let fakeTweet of tweetsFromDataBase) {
    $(tweetFromData).append(createTweetElement(fakeTweet));
  }
  
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
};


const createTweetElement = function(tweetToMarkUp) {
  //let $tweet = $('<article>').addClass('tweet');
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
  //renderTweets(data);
  $( ".form-inline" ).submit(function( event ) {
    //alert( "Handler for .submit() called." );
    event.preventDefault();
   // console.log(typeof( $( this ).serialize() ));
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $(this).serialize(),
      dataType: "String",
      success: loadTweets(data)
    });


  });
  const loadTweets = function(){
    $.ajax({
      type: "GET",
      url: "/tweets",
      data: "data",
      dataType: "JSON",
      success: (data) => {
        //console.log(data)
        renderTweets(data);
      }
    });
  }
 // loadTweets();
 
  // $.ajax({
  //   url: `/tweets`,
  //   type: "POST",
  //   dataType: "JSON"
  // })
  //   .then(() => {
  //     //const renderedPosts = formatRedditPosts(response.data.children)

  //     $('.form-inline').append(renderTweets(data))

  //   })
    // .catch(() => {
    //   const errorMessage = `
    //     <div class="error">
    //       <h1>Whoops, something went wrong!</h1>
    //       <p>Please try a different subreddit or call support at 967-1111</p>
    //     </div>
    //   `

    //   $('#app').append(errorMessage)
    // });
});