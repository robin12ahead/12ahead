/*
* Adaptive Webflow Slider height adjustment
*/

$(document).ready(function () {

    // selector for mutationsObserver
    const sliderElement =  $('.w-slider[data-slider-adaptiveheight="true"]');

    $(sliderElement).each(function () {

        var currentSlider = $(this);
        var elements = $(this).find('.w-slide');

        // Define a callback function to handle mutations
        const mutationCallback = function (mutationsList, observer) {

            $(currentSlider).css("height", "auto");

            $(elements).each(function () {

                // var ariaHidden = $(this).attr('aria-hidden');

                if ( $(this).attr('aria-hidden') !== 'true') {
                    
                    var currentSlideHeight = $(this).outerHeight();
                    // console.log("slide-item height: " + currentSlideHeight);

                    $(currentSlider).css("height", currentSlideHeight);
                }

            });
        };

        // Iterate over each element and attach MutationObserver
        elements.each(function () {
            const observer = new MutationObserver(mutationCallback);

            // Configure the observer to listen to specific types of mutations
            const config = {
                attributes: true,
                attributeFilter: ['aria-hidden'],
                // childList: false,
                // subtree: false,
            };

            // Start observing the target node for configured mutations
            observer.observe(this, config);
        });
    });

});