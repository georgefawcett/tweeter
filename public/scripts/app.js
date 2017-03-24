function createTweetElement(tweet) {

  // Convert timestamp to how long ago it was
  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
    }

var timeAgo = timeSince(tweet.created_at) ;
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  var $output = `<article class="tweet">
    <header>
      <img src="${tweet.user.avatars.small}">
      <h2>${tweet.user.name}</h2>
      <div>
        <div class="username">${tweet.user.handle}</span>
      </div>
    </header>
    <div class="tweetContent">
      ${escape(tweet.content.text)}
    </div>
    <footer>
    <span id="date">
      ${timeAgo}
      </span>
      <span id="buttons">
        <span id="flagButton">&#9873;</span>
        <span id="retweetButton">&#10148;</span>
        <span id="likeButton">&#9829;</span>
      </span>
    </footer>
    </article>`;
  return $output;

}


function renderTweets(tweets) {

  tweets.sort(function (a, b) {
    return b.created_at - a.created_at;
  });

  var tweetOutput = "";

  for (var i = 0; i < tweets.length; i++) {
    tweetOutput += createTweetElement(tweets[i]);
  }

  $('#tweets').append(tweetOutput);

}



$(document).ready(function() {


  $(this).on('keyup paste', function(){
    var characters = $("#textfield").val().length;
    $("#counter").text(140-characters);
    if (characters > 140) {
      $("#counter").css('color', 'red');
    } else {
      $("#counter").css('color', 'black');
    }
  });


  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: `/tweets`,
      success: renderTweets
    });
  }

  loadTweets();

  $( "#input_form" ).submit(function( event ) {
    var formdata = $(this).serialize();
    var tweetText = $('textarea#textfield').val();
    var withoutSpaces = tweetText.replace(/\s/g, '').length;

    if (tweetText.length > 140) {
      var msg = '<b>Error:</b> Your tweet is too long!';
      $('#errormessage').addClass("tweeterror").removeClass("tweetok").html(msg);

    } else if (!tweetText || !withoutSpaces) {
      var msg = '<b>Error:</b> You didn\'t write anything!';
      $('#errormessage').addClass("tweeterror").removeClass("tweetok").html(msg);

  } else {

  function addTweet() {
    $.ajax( {
      type: "POST",
      url: '/tweets',
      data: formdata,
      success: loadNewTweet
    } );
  }

  function loadNewTweet() {
      $.ajax({
       method: 'GET',
        url: `/tweets`,
        success: renderNewTweet
      });
    };

  function renderNewTweet(tweets) {
    var tweet = tweets[tweets.length-1];
    var $newOutput = createTweetElement(tweet);



    // Reset the textarea and character counter
      $('#textfield').val('');
      $('#counter').html('140');

    // Remove error class if tweet is corrected
      var msg = '';
      $('#errormessage').removeClass("tweetok").removeClass("tweeterror").html(msg);
      $('#tweets').prepend($newOutput);

  }


  addTweet();

  }

  event.preventDefault();
  });

$("#composeButton").click(function(){
    $(".new-tweet").slideToggle(400, function() {
    $("#textfield").focus();
    });
});

// Set focus on default page-load
$("#textfield").focus();

});

