(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function (event) {
        if (
            location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top,
                    },
                    1000,
                    "easeInOutExpo"
                );
                event.preventDefault(); // Prevent default anchor click behavior

                // Debugging statements
                console.log("Scrolling to target:", target);
            } else {
                // Debugging statements
                console.log("Target not found:", this.hash);
            }
        }
    });

    // $(document).ready(function () {
    //     // Scroll to the top of the page on reload and ensure the first nav item is active
    //     setTimeout(function () {
    //         $('html, body').scrollTop(0);
    //         $('#sideNav .nav-link').removeClass('active');
    //         $('#sideNav .nav-item:first-child .nav-link').addClass('active');
    //         console.log("Scrolled to top and activated first nav item on page load");
    //     }, 0);

        // ScrollSpy initialization
        setTimeout(function () {
            var scrollSpy = new bootstrap.ScrollSpy(document.body, {
                target: '#sideNav',
                offset: 50
            });

            // Debugging statements
            console.log("ScrollSpy initialized with target:", scrollSpy._config.target);

            // Additional debugging to check active elements
            $(document.body).on('activate.bs.scrollspy', function () {
                console.log("Active element:", $('.nav-item .active').text());
            });
        }, 100);
    });
})(jQuery);