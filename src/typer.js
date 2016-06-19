/*
TyperJS Plugin v1.0.1
(c) 2016 123Apps. (http://123apps.org)
*/
(function ($) {
  "use strict";

  $.fn.typer = function(options) {
    // merge options
    var settings = $.extend({
      speedType: 60,
      speedBackspace: 20,
      backspaceDelay: 800,
      repeatDelay: 1000,
      repeat: true,
      strings: [
        "TyperJS plugin"
      ]
    }, options);

    var chars,
        charsLength,
        charIndex = 0,
        stringIndex = 0,
        typerElements = "<span class=\"typed\"></span><span class=\"typed_cursor\">&#x7c;</span>";

    function type(strings) {
      if (stringIndex < strings.length) {
        chars = strings[stringIndex].split("");
        charsLength = chars.length;

        setTimeout(function() {
          $(".typed").append(chars[charIndex]);
          charIndex++;
          if (charIndex < charsLength) {
            type(strings);
          } else {
            charIndex = 0;
            stringIndex++;

            // type next string and backspace what is typed
            setTimeout(function() {
              backspace(function() {
                type(strings);
              });
            }, settings.backspaceDelay);
          }
        }, settings.speedType);
      } else {
        // all strings are typed
        // repeat
        if (settings.repeat) {
          repeat(strings);
        }
      }
    }

    // repeat typing
    function repeat(strings) {
      stringIndex = 0;
      setTimeout(function() {
        type(strings);
      }, settings.repeatDelay);
    }

    // backspace what is typed
    function backspace(callback) {
      setTimeout(function() {
        var typedEl = $(".typed");
        typedEl.text(typedEl.text().slice(0, -1));
        if (0 < typedEl.text().length) {
          backspace(callback);
        } else {
          if ("function" === typeof callback) {
            callback();
          }
        }
      }, settings.speedBackspace);
    }

    function blinkCursor() {
      setInterval(function() {
        $(".typed_cursor").fadeOut(400).fadeIn(400);
      }, 900);
    }

    return this.each(function() {
      // add typed elements
      $(this).append(typerElements);

      // blink cursor
      blinkCursor();

      // type all strings
      type(settings.strings);
    });
  };
}(jQuery));
