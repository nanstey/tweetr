/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function timeAgo(timestamp){
  return 'A long time ago...';
}

function createTweetElement(tweetObj){
  var $tweet = $("<article>").addClass("tweet");
  var $header = $('<header>');
  var $img = $('<img>').attr('src', tweetObj.user.avatars.small );
  var $name = $('<h2>').text(tweetObj.user.name);
  var $handle = $('<span>').addClass('handle').text(tweetObj.user.handle);
  $header.append($img);
  $header.append($name);
  $header.append($handle);
  $tweet.append($header);

  var $content = $('<div>').addClass('tweet-content');
  $content.append('<span>').text(tweetObj.content.text);
  $tweet.append($content);

  var $footer = $('<footer>');
  var $time = $('<span>').addClass('tweet-time').text( timeAgo(tweetObj.created_at) );
  $footer.append($time);
  var $social = $('<div>').addClass('social');
  var $reply = $('<a>').addClass('icon reply fa fa-flag');
  var $retweet = $('<a>').addClass('icon retweet fa fa-retweet');
  var $favorite = $('<a>').addClass('icon favorite fa fa-heart');
  $social.append($reply);
  $social.append($retweet);
  $social.append($favorite);
  $footer.append($social);
  $tweet.append($footer);

  return $tweet;
}

function renderTweets(tweetsArr){
  for (var i = 0; i < tweetsArr.length; i++){
    var tweet = createTweetElement( tweetsArr[i] );
    $('#tweets-container').prepend(tweet);
  }
}

function loadTweets(){
  var tweetsArr = [];
  $.ajax({
    url: '/tweets',
    type: 'GET',
    dataType: 'json',
  })
  .done(function(responseText) {
    renderTweets(responseText);
  });
}


$(document).ready( function(){

  loadTweets();

  $('#submit-tweet').on('click', function (event){
    event.preventDefault();
    var count = Number( $('.counter').text() );
    if (count >= 0){
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $('form textarea').serialize()
      })
      .done(function(responseText) {
        renderTweets([responseText]);
      })
      .fail(function(err) {
        console.log(err);
      });
    } else {
      console.log('Too many characters!')
    }
  });

});