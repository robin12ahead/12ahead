/*
 * Adaptive Webflow Slider height adjustment
 */

$ = jQuery;

$(document).ready(function () {

    // selector for mutationsObserver
    const sliders = $('.w-slider[data-slider-adaptiveheight="true"]');

    // Keep track of all observers
    const observers = [];

    sliders.each(function () {
        const currentSlider = $(this);

        const mutationCallback = function (mutationsList) {
            mutationsList.forEach(mutation => {
                if (mutation.type === "attributes" && mutation.attributeName === "aria-hidden") {
                    // console.log("slider changed");

                    currentSlider.css("height", "auto");

                    currentSlider.find('.w-slide').each(function () {
                        if ($(this).attr('aria-hidden') !== 'true') {
                            const currentSlideHeight = $(this).outerHeight();
                            // console.log("slide-item height: " + currentSlideHeight);
                            currentSlider.css("height", currentSlideHeight);
                        }
                    });
                }
            });
        };

        const observer = new MutationObserver(mutationCallback);

        // Observe all descendants for aria-hidden changes
        observer.observe(currentSlider[0], {
            attributes: true,
            attributeFilter: ['aria-hidden'],
            subtree: true
        });

        // Store observer for cleanup later
        observers.push(observer);
    });

    // Disconnect all observers on page unload
    $(window).on("unload beforeunload", function () {
        observers.forEach(observer => observer.disconnect());
        // console.log("All MutationObservers disconnected.");
    });
});