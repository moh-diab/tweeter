/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// calculates date difference between two dates
let date_diff_indays = function (date1, date2) {
  dt1 = new Date(date1);
  dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}

const createTweetElement = function (tweet) {
  const $tweet =
    `
  <article class="tweet">
      <header>
        <div class="left">
          <img class="profile-picture" src="${tweet.user.avatars}" alt="Profile Picture">
          <div>${tweet.user.name}</div>
        </div>
        <span class="handle">
          ${tweet.user.handle}
        </span>
      </header>
      ${($(`<div class="content">`).text(tweet.content.text)).prop('outerHTML')}
      <footer>
        <div>
          ${date_diff_indays(tweet.created_at, Date.now())} days ago
        </div>
        <div class="icons">
          <i class="fa fa-flag"></i>
          <i class="fa fa-retweet"></i>
          <i class="fa fa-heart"></i>
        </div>
      </footer>
    </article>
    `;
  return $tweet;
};

// create tweet elements for each tweet and append it to the container
const renderTweets = function (tweets) {
  $('article.tweet').remove();

  tweets = tweets.reverse();

  for (tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('.container').append($tweet);
  }
};

// read tweets from server and render them
let loadTweets = function () {
  $.get("/tweets", function (data) {
    $(document).ready(() => {
      renderTweets(data);
    });
  }, "json");
}

$(document).ready(function () {
  // hiding compose tweet textarea apon rendering
  $(".new-tweet").hide();
  // hiding the error division apon rendering
  $(".error").hide();

  // reading the tweet, if it is not null or it does not exceed character limit, send it to server
  $('.submit-tweet').on('submit', function (event) {
    event.preventDefault();
    // filtering the raw data (removing 'text:')
    const data = $(this).serialize().slice(5);
    // checking if the tweet text is null or exceeds the character limits
    if (data === "" || data === null) {
      $(".error").show();
      $(".error-msg").text("Error: Empty tweets cannot not be posted!");
      return false;
    } else if (unescape(data).length > 140) {
      $(".error").show();
      $(".error-msg").text("Error: This tweet cannot be posted because it exceeds the 140 character limit!\n")
      $('#tweet-text').val('');
      return false;
    }
    $(".error").hide();
    $.post('/tweets', $(this).serialize(), function () {
      loadTweets();
      $('#tweet-text').val('');
      $('#tweet-text').change();
    })
  });

  // show the compose tweet box if it is hidden and hide it if it is showing
  $(".compose-btn").on("click", function (event) {
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").show('slow', function () {
        $("#tweet-text").focus();
      });
    } else {
      $(".new-tweet").hide('slow');
    }
  });

  loadTweets();
});