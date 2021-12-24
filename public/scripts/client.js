/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      <div class="content">
        ${tweet.content.text}
      </div>
      <footer>
        <div>
          ${date_diff_indays(tweet.created_at, Date.now())} days ago
        </div>
        <div>
          <i class="fa fa-flag"></i>
          <i class="fa fa-retweet"></i>
          <i class="fa fa-heart"></i>
        </div>
      </footer>
    </article>
    `;
  return $tweet;
};

const renderTweets = function (tweets) {
  for (tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('.container').append($tweet);
  }
}

$(document).ready(function () {
  $('.submit-tweet').on('submit', function (event) {
    event.preventDefault();
    const data = $(this).serialize().slice(5);;
    // check if the tweet text is null or exceeds the character limits
    if (data === "" || data === null) {
      alert("Error: Empty tweets cannot not be posted!");
      return false;
    } else if (data.length > 140) {
      alert("Error: Your tweet cannot be posted because it exceeds the 140 character limit!\n");
      $('#tweet-text').val('');
      return false;
    }
    $.post('/tweets', $(this).serialize(), function () {
      console.log("success");
    })
  });
  loadTweets()
});

let loadTweets = function () {
  $.get("/tweets", function (data) {
    $(document).ready(() => {
      renderTweets(data);
    });
  }, "json");
}