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
  let $tweet =
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

const renderTweets = function(tweets) {
  for (tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(document).ready(() => {
      $('.container').append($tweet);
      });
  }
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


renderTweets(data);