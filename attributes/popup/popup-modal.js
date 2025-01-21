$ = jQuery;

// Function to control popup modals via attributes
$(document).ready(function () {

    // Function to get cookie value by name
    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }

    // target attributes
    let popupAttr = '[data-popup]';

    // function for each popup modal
    $(popupAttr).each(function () {

        // control attributes
        let currentPopupName = $(this).attr("data-popup"); // gets the name of the popup
        let popupCloseAttr = '[data-popup-close]';
        let openDelay = $(this).attr("data-popup-delay") || 3; // pop-up delay in seconds
        let expiration = $(this).attr("data-popup-expiration") || 30; // pop-up delay in days
        let cookieName = "popup-" + currentPopupName;
        let popupDisplayMode = $(this).attr("data-popup-display") || "flex";
        let closeAmount = $(this).attr("data-popup-open-amount") || 1;
        let closeCounter = 1;

        // update counter
        if ( getCookie(cookieName) ) {
            let cookieValue = Number(getCookie(cookieName));
            closeCounter = ++cookieValue;
            // alert("cookie value = " + cookieValue);
            // alert("counter = " + closeCounter);
        }

        // open the popup if no cookie exists
        if ( !getCookie(cookieName) || Number(getCookie(cookieName)) < closeAmount) {

            setTimeout(function () {
                $('[data-popup="' + currentPopupName + '"]').css("display", popupDisplayMode);
            }, openDelay * 1000);

        } else {
            $('[data-popup="' + currentPopupName + '"]').css("display", "none");
        }

        // close the popup on click
        $('[data-popup-close]').click(function () {

            // hide the popup
            $('[data-popup="' + currentPopupName + '"]').css("display", "none");

            // save cookie that the popup has been closed
            let expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (expiration * 24 * 60 * 60 * 1000));
            expires = "; expires=" + expirationDate.toUTCString();

            document.cookie = cookieName + "=" + closeCounter + expires + "; path=/";
        });

    });

});