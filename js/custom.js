(function ($) {

  "use strict";

    // COLOR MODE with system preference and manual override
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

    function isDarkApplied() {
      return $('body').hasClass('dark-mode');
    }

    function applyTheme(mode) {
      // mode: 'dark' | 'light' | 'system'
      var shouldUseDark = false;
      if (mode === 'dark') {
        shouldUseDark = true;
      } else if (mode === 'light') {
        shouldUseDark = false;
      } else { // system
        shouldUseDark = prefersDark && prefersDark.matches;
      }

      $('body').toggleClass('dark-mode', shouldUseDark);
      $('.color-mode-icon').toggleClass('active', shouldUseDark);
    }

    function getSavedTheme() {
      return localStorage.getItem('theme') || 'system';
    }

    function setSavedTheme(mode) {
      localStorage.setItem('theme', mode);
    }

    // Initialize theme (defaults to system)
    applyTheme(getSavedTheme());

    // React to system changes only when using system mode
    if (prefersDark && prefersDark.addEventListener) {
      prefersDark.addEventListener('change', function () {
        if (getSavedTheme() === 'system') {
          applyTheme('system');
        }
      });
    } else if (prefersDark && prefersDark.addListener) {
      // Safari / older browsers
      prefersDark.addListener(function () {
        if (getSavedTheme() === 'system') {
          applyTheme('system');
        }
      });
    }

    // Toggle cycles between manual dark and light
    $('.color-mode').click(function(){
        var current = getSavedTheme();
        var next;
        if (current === 'dark') {
          next = 'light';
        } else if (current === 'light') {
          next = 'dark';
        } else { // system -> pick opposite of current system
          next = (prefersDark && prefersDark.matches) ? 'light' : 'dark';
        }
        setSavedTheme(next);
        applyTheme(next);
    })

    // HEADER
    $(".navbar").headroom();

    // PROJECT CAROUSEL
    $('.owl-carousel').owlCarousel({
    	items: 1,
	    loop:true,
	    margin:10,
	    nav:true
	});

    // SMOOTHSCROLL
    $(function() {
      $('.nav-link, .custom-btn-link').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });  

    // TOOLTIP
    $('.social-links a').tooltip();

})(jQuery);
