/* 
 * Add floating placeholder label to all form fields
 */

$('[data-floating-placeholders="true"]').find('input, select, textarea, .w-imput, .form_input').each(function () {

  var placeholderClassName = 'form_placeholder';
  var placeholderClass = '.' + placeholderClass;

  // remove all test placeholders beforehand
  $(this).parent().find(placeholderClass).remove();

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
  if ($(this).find('input').attr('type') === "date") {
    $(placeholderClass).show();
  } else {
    $(placeholderClass).hide();
  }

  // show each placeholder if input is filled
  if ($(this).hasClass('input_date')) {
    $(this).on('focus', function (e) {
      $(this).parent().find(placeholderClass).show();
    });
  } else {
    $(this).on('input', function (e) {
      if ($(this).val()) {
        $(this).parent().find(placeholderClass).show();
      } else {
        $(this).parent().find(placeholderClass).hide();
      }
    });
  }
});