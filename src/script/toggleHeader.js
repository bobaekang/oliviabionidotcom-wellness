/* Credit: https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c */

'use strict'

var didScroll
var lastScrollTop = 0

window.addEventListener('scroll', function (x) {
  didScroll = true
})

setInterval(function () {
  var scrollTop = window.scrollY

  if (didScroll) {
    if (Math.abs(lastScrollTop - scrollTop) > 10) {
      toggleHeader(scrollTop)
      lastScrollTop = scrollTop
    }

    didScroll = false
  }
}, 250)

function toggleHeader(scrollTop) {
  var el = document.querySelector('.header-fixed')

  if (scrollTop > lastScrollTop && scrollTop > el.offsetHeight) {
    // Scroll Down
    el.classList.remove('header-hide')
  } else {
    // Scroll Up
    if (scrollTop + window.innerHeight < document.body.scrollHeight) {
      el.classList.add('header-hide')
    }
  }
}
