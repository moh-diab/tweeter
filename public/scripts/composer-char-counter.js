
$(document).ready(function () {
  $("#tweet-text").on('change keyup paste', function () {
    // obtain the counter
    const counter = $(this).next().children()[1];

    //calculate the length of the tweet
    counter.value = 140 - $(this).val().length;

    if (counter.value < 0) {
      $(counter).css("color", "red");
    } else {
      $(counter).css("color", "#545149");
    }
  });
});