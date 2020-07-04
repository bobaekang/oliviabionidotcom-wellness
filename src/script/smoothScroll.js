/* The MIT License (MIT)
Copyright (c) 2013 Dustan Kasten
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

'use strict'

// polyfill (modified)
function polyfill() {
  // aliases
  var w = window

  // return if scroll behavior is supported and polyfill is not forced
  if (
    'scrollBehavior' in document.documentElement.style &&
    w.__forceSmoothScrollPolyfill__ !== true
  ) {
    return
  }

  // globals
  var SCROLL_TIME = 468

  // object gathering original scroll methods
  var original = {
    scroll: w.scroll || w.scrollTo,
  }

  // define timing method
  var now =
    w.performance && w.performance.now
      ? w.performance.now.bind(w.performance)
      : Date.now

  /**
   * returns result of applying ease math function to a number
   * @method ease
   * @param {Number} k
   * @returns {Number}
   */
  function ease(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k))
  }

  /**
   * self invoked function that, given a context, steps through scrolling
   * @method step
   * @param {Object} context
   * @returns {undefined}
   */
  function step(context) {
    var time = now()
    var elapsed = (time - context.startTime) / SCROLL_TIME
    var value = ease(elapsed > 1 ? 1 : elapsed)
    var currentX = context.startX + (context.x - context.startX) * value
    var currentY = context.startY + (context.y - context.startY) * value

    original.scroll.call(w, currentX, currentY)

    // scroll more if we have not reached our destination
    if (currentX !== context.x || currentY !== context.y) {
      w.requestAnimationFrame(step.bind(w, context))
    }
  }

  // ORIGINAL METHODS OVERRIDES
  // w.scroll and w.scrollTo
  w.scroll = w.scrollTo = function () {
    step({
      startTime: now(),
      startX: w.scrollX || w.pageXOffset,
      startY: w.scrollY || w.pageYOffset,
      x: arguments[0].left,
      y: arguments[0].top,
    })
  }
}

module.exports = { polyfill: polyfill }
