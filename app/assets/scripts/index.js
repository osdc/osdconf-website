var toggleMenu = 0;

$('#navbar-close').on('click', function(e) {
  e.preventDefault();

  if (toggleMenu == 1) {
    $('.aterminal').css('transform', 'scale(0)');
    $('.menu').toggleClass('open');
    toggleMenu = 0;
  }
});

$('.menu-link').click(function(e) {
  e.preventDefault();

  if (toggleMenu == 0) {
    $('.aterminal').css('transform', 'scale(1)');
    $('.terminal').removeClass('close');
    $('.terminal').addClass('open');
    $('.menu').toggleClass('open');
    toggleMenu = 1;
  } else {
    $('.aterminal').css('transform', 'scale(0)');
    $('.terminal').removeClass('open');
    $('.terminal').addClass('close');
    $('.lo').removeClass('is-showing');
    $('.menu').toggleClass('open');
    toggleMenu = 0;
  }
});

$(window).scroll(function() {
  var wScroll = $(this).scrollTop();

  if (wScroll > $('.about').offset().top - 500) {
    $('.test').addClass('showing');
    $('.testtext').addClass('showingtext');

    if (wScroll > $('.speakers').offset().top - 380) {
      $('.speakers-head').addClass('speakers-head-show');
      $('.speaker-card').each(function(i) {
        setTimeout(function() {
          $('.speaker-card')
            .eq(i)
            .addClass('speaker-card-show');
        }, 300 * (i + 1));
      });
    }

    if (wScroll > $('.sponsors').offset().top - 280) {
      $('.sponsors-head').addClass('sponsors-show');
      $('.sponsors-desc').addClass('sponsors-show');
      $('.sponsors-button').addClass('sponsors-show');
      $('.sponsor').each(function(i) {
        setTimeout(function() {
          $('.sponsor')
            .eq(i)
            .addClass('sponsor-show');
        }, 120 * (i + 1));
      });

      if (wScroll > $('.schedule').offset().top - 480) {
        $('.schedule-head').addClass('schedule-head-show');
      }
    }
  }
});

function loshow() {
  $('.lo').each(function(i) {
    setTimeout(function() {
      $('.lo')
        .eq(i)
        .addClass('is-showing');
    }, 200 * (i + 1));
  });
}

function validatenav() {
  if (toggleMenu == 1) {
    $('.aterminal').css('transform', 'scale(0)');
    $('.terminal').removeClass('open');
    $('.terminal').addClass('close');
    $('.lo').removeClass('is-showing');
    $('.menu').toggleClass('open');
    toggleMenu = 0;
  }
}
