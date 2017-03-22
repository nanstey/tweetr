$(document).ready( function(){

  $('.tweet')
    .on('mouseover', function(){
      $(this).addClass('tweet-hover');
  }).on('mouseleave', function(){
      $(this).removeClass('tweet-hover');
  });

});