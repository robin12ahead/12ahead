// Limit Characters on a target text and add "read more"

$(document).ready(function () {

    const targets = $('[data-read-more="target"]');
    targets.each(function () {
        var maxCharacters = $(this).attr("data-read-more-characters") || 150; // character limit to display, default is set to 150
        var readMoreText = $(this).attr("data-read-more-text") || "read more";

        const text = $(this).text();
        const truncate = text.substring(0, maxCharacters);
        $(this).html(truncate + '... ' + '<span class="read-more">' + readMoreText + '</span> ');
    });

});