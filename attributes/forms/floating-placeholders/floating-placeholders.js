/* 
 * Add floating placeholder label to all form fields
 */

$('[data-floating-placeholders="true"]').find('input, select, textarea, .w-imput, .form_input').each(function () {

    var placeholderClassName = 'form_placeholder';

    // remove all test placeholders beforehand
    $(this).parent().find("." + placeholderClassName).remove();

    // get the correct placeholder text
    let placeholder_text = "";
    if ($(this).is('input, textarea')) {
        placeholder_text = $(this).attr('placeholder');
    } else if ($(this).is('select')) {
        placeholder_text = $(this).find("option:first-child").text();
    }

    // define placeholder html
    let placeholder_html = '<label class="' + placeholderClassName + '">' + placeholder_text + '</label>';

    // put placeholder before each input
    $(this).before(placeholder_html);

    // hide all placeholders
    $("." + placeholderClassName).hide();
    $('input[type="date"]').parent().find("." + placeholderClassName).show();

    // show each placeholder if input is filled
    $(this).on('input', function (e) {
        if ($(this).val()) {
            $(this).parent().find("." + placeholderClassName).show();
        } else {
            $(this).parent().find("." + placeholderClassName).hide();
        }
    });
});