/* Init scroll dependent functions */
$(window).scroll(function(){
  const distancefromTop = $(window).scrollTop();

  navbarChange(distancefromTop, 120);
  headerParallax(distancefromTop);
  startAnimation(distancefromTop);
});

/* --Scroll function section-- */

/* Change navbar scrolling from top */
const navbarChange = function(distance, trigger) {
  const navbar = '.navbar';
  if (distance > trigger) {
    $(navbar).removeClass('bg-transparent navbar-dark').addClass('nav-change navbar-light');
  } else {
    $(navbar).removeClass('nav-change navbar-light').addClass('navbar-dark bg-transparent');
  }
}

/* Dynamic background */
const headerParallax = function(distance) {
  $('#headerBackground').css({'transform' : 'translateY(' + distance * 0.3 + 'px)'});
}

/* Trigger animation chain */
const startAnimation = function(distance) {
  const canvasSize = $('#canvas').height();
  const canvasPos =  $('#canvas').offset().top;
  const windowHeight = $(window).height();

  const trigger = (canvasPos - canvasSize);

  if (distance > trigger) {
    $('#canvas img').addClass('animate');
  } else if(distance < (trigger - windowHeight)) {
    $('#canvas img').removeClass('animate');
  }
}

/* --End of scroll function section-- */

/* Collapse usability */
/* Function for scroll back to the top of the content on collapse hide on a element click */
$('a[data-toggle="collapse"]').click(function() {
  const collapseId = $(this).attr('href');

  const topParent = $(collapseId).parents('.portfolio-content');
  const parerntId = '#'+$(topParent).attr('id');

  if($(collapseId)[0].classList.value.includes('show')) {
    $('html, body').animate({scrollTop: $(parerntId).offset().top - 50});
  }
});

/* Executes functions on collapse show */
$('.collapse').on('show.bs.collapse', function () {
  let collapseId = $(this).attr('id');

  loadCollapseIframes(collapseId);
  loadCollapseImages(collapseId);

  toggleTitle(collapseId);
 // changeToggleCol(collapseId);
});

/* Executes functions on collapse hide */
$('.collapse').on('hide.bs.collapse', function () {
  let collapseId = $(this).attr('id');

  toggleTitle(collapseId);
 // changeToggleCol(collapseId);
});

/* Changes the title of the a element based on the collapse show and hide */
const toggleTitle = function(id) {
  let curCollapse = $('a[href*="' + id + '"]');

  if (curCollapse.text() === 'Vis mere.') {
    curCollapse.text( 'Vis mindre.' );
  } else {
    curCollapse.text( 'Vis mere.' );
  }
}

/* Move #collapseContentThree toggle a element column on show and hide */
const changeToggleCol = function(id) {
  const element = $('#collapseContentThree')[0];
  const sipling = $(element.nextElementSibling)[0];
  const siplingChild = $(sipling.children)[0];

  if (!(element.classList.value.includes('show')) && (id === 'collapseContentThree' )) {
    $(siplingChild).removeClass('col-md-8').addClass('col-md-12');
  } else if((element.classList.value.includes('show')) && (id === 'collapseContentThree' )) {
    $(siplingChild).removeClass('col-md-12').addClass('col-md-8');
  }
}

/* Activate scrollspy menu */
$('body').scrollspy({
  target: '#navbarNav',
  offset: 50
});

/* Subheader cycle */
function changeSubHeader(elementPath, newText){
  $(elementPath).fadeOut(1000, function() {
      $(this).text(newText.innerText).fadeIn(1000);
  });
}

let curSubHeaderItem = 0;

const intervalID = setInterval(function() {
  const subHeader = 'h2#subHeader';
  const xpArray = $('ul#xp li');

  curSubHeaderItem++;

    if (curSubHeaderItem >= xpArray.length) {
        curSubHeaderItem = 0;
    }
    changeSubHeader(subHeader, xpArray[curSubHeaderItem]);
}, 5000);

/* Enable Tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

/* Submit functionality */

$('#contactForm').submit(function(event) {
  event.preventDefault();
  const self = $(this);
  const sendButton = $('#sendMessageButton');
  sendButton.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>').prop("disabled", true); // Disable send button while Ajax call is running

  // Get data from form
  const name = $('input[name="name"]').val(),
        email = $('input[name="email"]').val(),
        phone = $('input[name="phone"]').val(),
        message = $('textarea[name="message"]').val();

  $.ajax({
    url: 'mail/contact-me.php',
    method: 'POST',
    data: {
      name: name,
      email: email,
      phone: phone,
      message: message
    },
    cache: false,
    success: function() {
      $('#messageSuccess').html('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Tak for beskeden.</strong> Jeg vender tilbage til dig snarest muligt.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');

      // Clear form fields
      self.trigger('reset');
    },
    error: function() {
      $('#messageDanger').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Noget gik galt.</strong> Prøv igen på et senere tidspunkt.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');

      // Clear form fields
      self.trigger('reset');
    },
    complete: function() {
      setTimeout(function() {
        sendButton.html('Send').prop("disabled", false); // Re-enable submit button when AJAX call is complete
      }, 1000);
    }
  });
});

/*When clicking on Full hide fail/success boxes */
$('*[name]').focus(function() {
  $('.alert').alert('close');
});

$('#contactForm *[required]').blur(function() {
  const title = $(this).siblings('label').text();
  if ( !$(this).val() ) {
    $('#messageWarning').html('<div id="messageWarning" class="alert alert-warning alert-dismissible fade show" role="alert">Undfyld venligst <strong>' + title.toLowerCase() + '</strong> feltet før du sender.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
  }
});

/* Lazy-load images and iframes inside collapse show */
const loadCollapseImages = function(id) {
  const collapseImg = $('#'+ id +' img');

  for (let i = 0; i < collapseImg.length; i++) {
    const el = $(collapseImg[i]);
    const elDataAttr = el.attr('data-src');
    if (elDataAttr) {
      el.attr('src', elDataAttr);
    }
  }
}

const loadCollapseIframes = function(id) {
  const collapseIframe = $('#'+ id +' iframe');
  
  for (let i = 0; i < collapseIframe.length; i++) {
    const el = $(collapseIframe[i]);
    const elDataAttr = el.attr('data-src');
    if (elDataAttr) {
      el.attr('src', elDataAttr);
    }
  }
}