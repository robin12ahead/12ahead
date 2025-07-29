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
        let popupCloseAttr = '[data-popup-close]'; // selector to close the popup
        let openDelay = $(this).attr("data-popup-delay") || 3; // pop-up delay in seconds
        let expiration = $(this).attr("data-popup-expiration") || 30; // pop-up delay in days
        let cookieName = "popup-" + currentPopupName; // name for each individual popup
        let popupDisplayMode = $(this).attr("data-popup-display") || "flex"; // the css display mode when the popup is shown
        let closeAmount = $(this).attr("data-popup-open-amount") || 1; // amount of times the popup should be opened
        let popupStatus = $(this).attr("data-popup-status") || "active"; // amount of times the popup should be opened
        let closeCounter = 1; // start counter for amount of times the popup has been opened (start at 1)

        // only continue if popup is not inactive
        if (popupStatus != "inactive") {

            // Amount of times the popup has been opened
            // function to update the counter
            if ( getCookie(cookieName) ) {
                let cookieValue = Number(getCookie(cookieName));
                closeCounter = ++cookieValue;
                // alert("cookie value = " + cookieValue);
                // alert("counter = " + closeCounter);
            }

            // open the popup if no cookie exists / or if the popup has been opened more than set value
            if ( !getCookie(cookieName) || Number(getCookie(cookieName)) < closeAmount) {

                // open popup after set dalay / timout
                setTimeout(function () {
                    $('[data-popup="' + currentPopupName + '"]').css("display", popupDisplayMode);
                }, openDelay * 1000); // in seconds
                
            } else {
                // hide popup
                $('[data-popup="' + currentPopupName + '"]').css("display", "none");
            }

            // close the popup on click
            $(popupCloseAttr).click(function () {

                // hide the popup
                $('[data-popup="' + currentPopupName + '"]').css("display", "none");

                // save cookie when the popup has been closed
                let expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + (expiration * 24 * 60 * 60 * 1000));
                expires = "; expires=" + expirationDate.toUTCString();

                // set or update cookie
                document.cookie = cookieName + "=" + closeCounter + expires + "; path=/";
            });

        };

    });

});