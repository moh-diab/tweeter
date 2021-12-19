$(document).ready(function() {
  $("#tweet-text").on('keyup', function() {
    const counter = $(this).next().children()[1];

    if (counter.value <= 135) {
      $(counter).css("color","red");
    } else {
      $(counter).css("color","black");
    }

    counter.value = 140 - $(this).val().length;
  });
});

