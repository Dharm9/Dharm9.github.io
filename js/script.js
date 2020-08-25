// Smooth Scrolling for internal links
$('a[href^="#"]').on("click",function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $("html, body").stop().animate({
	        "scrollTop": $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});

// Change background of nav bar on scroll
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
	// console.log(scroll);
  if (scroll > window.innerHeight - 55) {
      $(".navbar").removeClass("transparent");
			$(".navbar").addClass("bgcolor");
    } else {
			$(".navbar").removeClass("bgcolor");
      $(".navbar").addClass("transparent");
    }
	// Hide Name on scroll
	if (scroll > 180) {
      $(".hide-on-scroll").removeClass("fade-in");
			$(".hide-on-scroll").addClass("fade-out");
    } else {
			$(".hide-on-scroll").removeClass("fade-out");
      $(".hide-on-scroll").addClass("fade-in");
    }
});

// Activate scrollspy to highlight nav item when scrolled over
$("body").scrollspy({target: ".navbar"})

// Reshape contact page
jQuery(document).ready(function($) {
  var alterClass = function() {
    var ww = document.body.clientWidth;
    if (ww < 768) {
			$('.contact-links').addClass('flex-fill');
      $('.contact-links').removeClass('flex-column');
    } else if (ww >= 768) {
      $('.contact-links').addClass('flex-column');
			$('.contact-links').removeClass('flex-fill');
    };
  };
  $(window).resize(function(){
    alterClass();
  });
  //Fire it when the page first loads:
  alterClass();
});

//Init WOW
// new WOW().init();
