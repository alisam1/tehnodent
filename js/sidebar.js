$('.sidebar__submenu label').on('click', function(e) {
    e.preventDefault();

    // Add the correct active class
    if($(this).closest('.sidebar__submenu ul').hasClass('active')) {
        // Remove active classes
        $('.sidebar__submenu ul').removeClass('active');
    } else {
        // Remove active classes
        $('.sidebar__submenu ul').removeClass('active');

        // Add the active class
        $(this).closest('.sidebar__submenu ul').removeClass('active');
    }

    // Show the content
    var $content = $(this).next();
    $content.slideToggle(100);
    $('.sidebar__submenu ul').not($content).slideUp('fast');
});
