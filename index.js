/* ============================================
   Portfolio — Interactions
   Vanilla JS, no dependencies
   Sidebar navigation + mobile menu + dark mode
   ============================================ */

(function () {
    'use strict';

    // ── DOM Elements ──
    var navToggle = document.getElementById('navToggle');
    var navMobile = document.getElementById('navMobile');
    var sidebarNav = document.getElementById('sidebarNav');
    var sidebarLinks = sidebarNav ? sidebarNav.querySelectorAll('.nav-link') : [];
    var mobileLinks = document.querySelectorAll('.mobile-link');
    var sections = document.querySelectorAll('section[id]');
    var revealElements = document.querySelectorAll('.reveal');

    // ── Theme toggle ──
    var themeToggleSidebar = document.getElementById('themeToggleSidebar');
    var themeToggleMobile = document.getElementById('themeToggleMobile');

    function getPreferredTheme() {
        var stored = localStorage.getItem('portfolio-theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    }

    function toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(current === 'dark' ? 'light' : 'dark');
    }

    // Initialize theme immediately
    setTheme(getPreferredTheme());

    // Listen to both toggle buttons
    if (themeToggleSidebar) {
        themeToggleSidebar.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }

    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem('portfolio-theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });


    // ── Mobile menu toggle ──
    function toggleMobileMenu() {
        var isOpen = navMobile.classList.contains('open');
        navToggle.classList.toggle('active');
        navMobile.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', !isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }


    // ── Active nav state on scroll (sidebar) ──
    function updateActiveNav() {
        var scrollPos = window.scrollY + 120;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                sidebarLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }


    // ── Scroll reveal with IntersectionObserver ──
    function initScrollReveal() {
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            revealElements.forEach(function (el) {
                el.classList.add('revealed');
            });
            return;
        }

        var observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    }


    // ── Smooth scroll for nav links ──
    function handleSmoothScroll(e) {
        var href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                closeMobileMenu();
            }
        }
    }


    // ── Throttle utility ──
    function throttle(fn, wait) {
        var time = Date.now();
        return function () {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        };
    }


    // ── Event listeners ──
    window.addEventListener('scroll', throttle(function () {
        updateActiveNav();
    }, 16));

    navToggle.addEventListener('click', toggleMobileMenu);

    // Sidebar nav link smooth scroll
    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Mobile link smooth scroll
    mobileLinks.forEach(function (link) {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Logo smooth scroll to top (sidebar)
    var sidebarLogo = document.querySelector('.sidebar-logo');
    if (sidebarLogo) {
        sidebarLogo.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Logo smooth scroll to top (mobile header)
    var mobileLogo = document.querySelector('.mobile-header .nav-logo');
    if (mobileLogo) {
        mobileLogo.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeMobileMenu();
        });
    }


    // ── Initialize ──
    updateActiveNav();
    initScrollReveal();

    // Close mobile menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMobile.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1024 && navMobile.classList.contains('open')) {
            closeMobileMenu();
        }
    });


    // ── Contact Form AJAX Submission ──
    var contactForm = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = document.getElementById('contact-submit-btn');
            var btnText = submitBtn.querySelector('.btn-text');
            var btnLoading = submitBtn.querySelector('.btn-loading');
            var svgIcon = submitBtn.querySelector('svg');

            // Show loading state
            submitBtn.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline';
            if (svgIcon) svgIcon.style.display = 'none';

            var formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function (response) {
                if (response.ok) {
                    // Hide form, show success checkmark
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'flex';
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(function () {
                alert('Oops! Something went wrong. Please try again or email me directly.');
                // Reset button
                submitBtn.disabled = false;
                if (btnText) btnText.style.display = 'inline';
                if (btnLoading) btnLoading.style.display = 'none';
                if (svgIcon) svgIcon.style.display = '';
            });
        });
    }

})();