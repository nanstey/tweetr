$(document).ready( function(){

  $('form textarea').on('keyup', function(e){
    var remain = 140 - $(this).val().length ;
    var counter = $(this).parent().find('.counter');
    if (remain < 1){
      counter.addClass('too-long');
    } else {
      counter.removeClass('too-long');
    }
    counter.text(remain);
  });

});