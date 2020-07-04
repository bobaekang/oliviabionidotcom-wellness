'use strict'

require('./smoothScroll').polyfill()

window.scrollToId = function (id) {
  var rect = document.getElementById(id).getBoundingClientRect()
  window.scrollTo({
    top: rect.top + window.scrollY,
    left: 0,
    behavior: 'smooth',
  })
}
