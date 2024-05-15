// re-format time and date
// reference and infos here: https://momentjs.com/docs/#/displaying/format/
$(document).ready(function () {

    // get current set locale
    let lang = $('html').attr("lang");

    // set moment.js to the current language
    moment.locale(lang);

    // change time format
    $('[data-date-format="target"]').each(function () {
        let toFormat = $(this).attr("data-date-format-to") || "DD.MM.YYYY";
        let fromFormat = $(this).attr("data-date-format-from");
        let currentTimeString = $(this).text();
        let formattedTime;

        if (fromFormat) {
            formattedTime = moment(currentTimeString, fromFormat).format(toFormat);
        } else {
            formattedTime = moment(currentTimeString).format(toFormat);
        }

        $(this).text(formattedTime);
    });
});