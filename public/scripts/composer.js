$(document).ready( function(){

  $('#compose').on('click', function(){
    var $composer = $('.new-tweet');
    if ( $composer.visible() ){
      $composer.slideUp('fast');
    } else  {
      $(document).scrollTop( $composer.offset() );
      $composer.slideDown('fast');
      $('form textarea').focus();
    }
  });

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