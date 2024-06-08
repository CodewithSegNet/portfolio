/*!
    * Start Bootstrap - Resume v6.0.2 (https://startbootstrap.com/theme/resume)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
    */(function ($) {
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
            }
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        var scrollSpy = new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 50 
        });

        // Debugging statements
        console.log("ScrollSpy initialized with target:", scrollSpy._config.target);
    });
})(jQuery); 
