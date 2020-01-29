$(document).ready(function() {
  $("#tweetArea").keydown(function(e) {
    let counter = 140;
    let numberOfChar = $(this).val().length;
    let result = counter - numberOfChar;
    $(".counter").text(result);
    if (result < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});
