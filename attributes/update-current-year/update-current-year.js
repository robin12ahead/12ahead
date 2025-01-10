$ = jQuery;

// function to automatically update the current year in the copyright footer
$(document).ready(function () {

    // get the current year
    var currentYear = (new Date).getFullYear();

    // override text with the current yar
    $('span.current-year').text(currentYear);
    $('[data-update-current-year="true"]').text(currentYear);

});
