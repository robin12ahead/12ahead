/* Multi Step Form with Pasley field validation
* For more info about the project see here: https://thelumious.notion.site/Multi-step-Webflow-Form-65670070643a400cb0c856d285e1943c
* For this script to work parsley.js is needed. See here: https://parsleyjs.org/doc/
*/

$(function () {
  var $sections = $('[form-step]');

  function navigateTo(index) {
    // Mark the active section with the class 'is-active'
    $sections
      .removeClass('is-active')
      .hide()
      .eq(index)
        .addClass('is-active')
        .show();
    // Show only the navigation buttons that make sense for the active section:
    $('[form-button="back"]').toggle(index > 0);
    var atTheEnd = index >= $sections.length - 1;
    $('[form-button="next"]').toggle(!atTheEnd);
    $('[form-button="submit"]').toggle(atTheEnd);
  }

  function curIndex() {
    // Return the active index by looking at which section has the class 'is-active'
    return $sections.index($sections.filter('.is-active'));
  }

  // Previous button is easy, just go back
  $('[form-button="back"]').click(function() {
    navigateTo(curIndex() - 1);
  });

  // Next button goes forward if is-active block validates
  $('[form-button="next"]').click(function() {
    $('[multi-step]').parsley().whenValidate({
      group: 'block-' + curIndex()
    }).done(function() {
      navigateTo(curIndex() + 1);
    });
  });

  // Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.
  $sections.each(function(index, section) {
    $(section).find(':input').attr('data-parsley-group', 'block-' + index);
  });
  navigateTo(0); // Start at the beginning
});

/*
* Form personalization
*/

$(document).ready(function(){
  // Listen for any keyup event on input elements that have a 'data-name' attribute
  $('input[data-name]').keyup(function(){
    // Get the value of the 'data-name' attribute of the input
    var inputName = $(this).data('name');
    // Get the value entered by the user in the input
    var inputValue = $(this).val();
    // Find the span/div/p with a 'field' attribute matching the input's 'data-name' value and update its text
    $('[field="' + inputName + '"]').text(inputValue);
  });
});