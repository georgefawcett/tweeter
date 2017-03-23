$(document).ready(function() {
  $(this).on('keyup', function(){
  var characters = $("#textfield").val().length;
  $("#counter").text(140-characters);
  if (characters > 140) {
    $("#counter").css('color', 'red');
  } else {
    $("#counter").css('color', 'black');
  }
  });



});


