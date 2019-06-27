$(function(){
$('.image__block').click(function(event) {
  var i_path = $(this).attr('src');
  $('body').append('<div id="overlay"></div><div id="magnify"><img src="img/product.png"><div id="close-popup"><i></i></div></div>');
  $('#overlay, #magnify').fadeIn('fast');
});

$('body').on('click', '#close-popup, #overlay', function(event) {
  event.preventDefault();

  $('#overlay, #magnify').fadeOut('fast', function() {
    $('#close-popup, #magnify, #overlay').remove();
  });
});
});
