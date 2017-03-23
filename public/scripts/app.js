





function createTweetElement(tweet) {
  var tweetDate = new Date(tweet.created_at);
  var tweetDate2 = tweetDate.toLocaleString();
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
        ${tweetDate2}

        <span class="buttons" style="float:right">&#9873; &#10148; &#9829;</span>
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

// document.getElementById("submittweet").addEventListener("click", function(event){
//     event.preventDefault()
// });




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
    var msg = '<b>Error:</b> Your tweet is too long';
    $('#errormessage').addClass("tweeterror").removeClass("tweetok").html(msg);
  } else if (!tweetText || !withoutSpaces) {
    var msg = '<b>Error:</b> You didn\'t write anything';
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

 var tweetDate = new Date(tweet.created_at);
    var tweetDate2 = tweetDate.toLocaleString();
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
        ${tweetDate2}

        <span class="buttons" style="float:right">Test buttons</span>
        </footer>
        </article>`;
        var msg = '';
    $('#errormessage').removeClass("tweetok").html(msg);
    $('#tweets').prepend($output);

}

// const renderNewTweet = function renderNewTweet(tweets) {

//     // var tweet = tweet[tweet.length-1];
//     $('#tweets').prepend(Array[51].created_at, "test");
//     debugger;
    // var tweetDate = new Date(tweet.created_at);
    // var tweetDate2 = tweetDate.toLocaleString();
    // function escape(str) {
    //   var div = document.createElement('div');
    //   div.appendChild(document.createTextNode(str));
    //   return div.innerHTML;
    // }
    // var $output = `<article class="tweet">
    //           <header>
    //   <img src="${tweet.user.avatars.small}">
    //   <h2>${tweet.user.name}</h2>
    //   <div>
    //         <div class="username">${tweet.user.handle}</span>
    //         </div>

    //       </header>
    //       <div class="tweetContent">
    //       ${escape(tweet.content.text)}
    //       </div>
    //     <footer>
    //     ${tweetDate2}

    //     <span class="buttons" style="float:right">Test buttons</span>
    //     </footer>
    //     </article>`;
    //     var msg = '';
    // $('#errormessage').removeClass("tweetok").html(msg);
    // $('#tweets').prepend($output);
  // }




addTweet();


}
  event.preventDefault();
});



// function showValues() {
//     var str = $( "form" ).serialize();
//     $( "#results" ).text( str );
//   }
//   $( "textarea[name='text'], input[type='checkbox']").on( "submit", showValues );
//   $( "select" ).on( "submit", showValues );
//   showValues();


  // renderTweets(tweetData);

});

// use for each of the items, generate HTML
// newDOM += myHTML
// append HTML
