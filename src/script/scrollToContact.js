'use strict';

require('./smoothScroll').polyfill();

window.scrollToContact = function() {
  document.getElementById('fullname').focus({preventScroll:true});
  
  var rect = document.getElementById('contact').getBoundingClientRect()
  window.scrollTo({
    top: rect.top + window.scrollY,
    left: 0,
    behavior: 'smooth'
  });
}