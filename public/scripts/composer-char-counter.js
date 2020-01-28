$(document).ready(function() {

  $("#tweetArea").keydown(function (e) { 
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


// let n = 140;
// document.addEventListener("keypress", (event)=>{
//   console.log(event);
//   console.log(n--);
//   //return n--
// })


