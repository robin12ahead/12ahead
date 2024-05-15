// copy url to clickboard

$(document).ready(function () {
    $('[data-copy-clipboard="click"]').click(function () {
        var url = window.location.href;
        var tempInput = $('<input>');
        $('body').append(tempInput);
        tempInput.val(url).select();
        document.execCommand('copy');
        tempInput.remove();

        var copiedText = $(this).attr('data-copy-clickboard-text');
        $(this).find('[data-copy-clipboard="notice"]').text(copiedText);
    });
});