// Cross-browser compatibility utilities
(function() {
  'use strict';

  // Polyfill for Element.closest() (IE support)
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;
      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  // Polyfill for Element.matches() (IE support)
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;
  }

  // Polyfill for NodeList.forEach() (IE support)
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  // Cross-browser DOMContentLoaded
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState !== 'loading') fn();
      });
    }
  }

  // Cross-browser event listener helper
  function addEvent(element, event, handler) {
    if (element.addEventListener) {
      element.addEventListener(event, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + event, handler);
    } else {
      element['on' + event] = handler;
    }
  }

  // Cross-browser class manipulation
  function hasClass(element, className) {
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
  }

  function addClass(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  }

  function removeClass(element, className) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  function toggleClass(element, className) {
    if (element.classList) {
      element.classList.toggle(className);
    } else {
      if (hasClass(element, className)) {
        removeClass(element, className);
      } else {
        addClass(element, className);
      }
    }
  }

  // Cross-browser localStorage with fallback
  function getStorageItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function setStorageItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // Fallback for browsers without localStorage
      document.cookie = key + '=' + value + '; path=/';
    }
  }

  // Initialize when DOM is ready
  ready(function() {
    
    // Mobile menu toggle with cross-browser support
    var menuToggle = document.querySelector(".icon-menu");
    if (menuToggle) {
      addEvent(menuToggle, 'click', function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false; // IE8 and below
        }
        toggleClass(document.body, "menu-open");
      });
    }

    // Theme Toggle Logic with enhanced cross-browser support
    var themeToggleButton = document.querySelector('.theme-toggle-button');
    var audio = null;
    
    // Create audio with fallback
    try {
      audio = new Audio('/assets/night-toggle.mp3');
    } catch (e) {
      console.warn('Audio not supported in this browser');
    }

    function applyTheme(theme) {
      removeClass(document.body, 'light-mode');
      removeClass(document.body, 'dark-mode');
      addClass(document.body, theme);
      setStorageItem('theme', theme);
      
      // Update meta theme-color for mobile browsers
      var themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute('content', theme === 'dark-mode' ? '#0a0a0a' : '#163440');
      }
    }

    function toggleTheme() {
      if (hasClass(document.body, 'dark-mode')) {
        applyTheme('light-mode');
      } else {
        applyTheme('dark-mode');
        
        // Play sound with cross-browser support
        if (audio) {
          try {
            audio.currentTime = 0;
            var playPromise = audio.play();
            if (playPromise !== undefined) {
              playPromise.catch(function(e) {
                console.warn("Audio play failed:", e);
              });
            }
          } catch (e) {
            console.warn("Audio play failed:", e);
          }
        }
        
        // Flash effect with cross-browser support
        var flash = document.createElement('div');
        flash.className = 'flash-green';
        document.body.appendChild(flash);
        
        // Use setTimeout with fallback
        var removeFlash = function() {
          if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
          }
        };
        
        if (window.setTimeout) {
          setTimeout(removeFlash, 500);
        } else {
          removeFlash(); // Immediate fallback
        }
      }
    }

    // Initialize theme on page load with cross-browser support
    var savedTheme = getStorageItem('theme');
    var prefersDark = false;
    
    // Check for prefers-color-scheme with fallback
    if (window.matchMedia) {
      try {
        prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch (e) {
        prefersDark = false;
      }
    }

    if (savedTheme) {
      applyTheme(savedTheme);
    } else if (prefersDark) {
      applyTheme('dark-mode');
    } else {
      applyTheme('light-mode');
    }

    // Add theme toggle event listener
    if (themeToggleButton) {
      addEvent(themeToggleButton, 'click', toggleTheme);
    }

    // FAQ/Spoller functionality with cross-browser support
    var spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");
    
    if (spollerButtons.length > 0) {
      spollerButtons.forEach(function(button) {
        addEvent(button, 'click', function() {
          var currentItem = button.closest ? button.closest("[data-spoller]") : 
                           button.parentNode.parentNode; // Fallback for IE
          var content = currentItem.querySelector(".spollers-faq__text");
          var parent = currentItem.parentNode;
          var isOneSpoller = parent.hasAttribute ? parent.hasAttribute("data-one-spoller") :
                            parent.getAttribute("data-one-spoller") !== null;

          if (isOneSpoller) {
            var allItems = parent.querySelectorAll("[data-spoller]");
            allItems.forEach(function(item) {
              if (item !== currentItem) {
                var otherContent = item.querySelector(".spollers-faq__text");
                removeClass(item, "active");
                if (otherContent) {
                  otherContent.style.maxHeight = null;
                }
              }
            });
          }

          if (hasClass(currentItem, "active")) {
            removeClass(currentItem, "active");
            if (content) {
              content.style.maxHeight = null;
            }
          } else {
            addClass(currentItem, "active");
            if (content) {
              content.style.maxHeight = content.scrollHeight + "px";
            }
          }
        });
      });
    }

    // Form enhancement for cross-browser compatibility
    var forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
      addEvent(form, 'submit', function(event) {
        // Add any form validation or enhancement here
        var inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(function(input) {
          // Remove any browser-specific styling issues
          if (input.style.removeProperty) {
            input.style.removeProperty('-webkit-appearance');
          }
        });
      });
    });

    // Viewport height fix for mobile browsers (especially iOS Safari)
    function setViewportHeight() {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', vh + 'px');
    }
    
    setViewportHeight();
    addEvent(window, 'resize', setViewportHeight);
    addEvent(window, 'orientationchange', function() {
      setTimeout(setViewportHeight, 100);
    });

    // Prevent zoom on input focus for iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      var inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
      inputs.forEach(function(input) {
        if (parseFloat(getComputedStyle(input).fontSize) < 16) {
          input.style.fontSize = '16px';
        }
      });
    }

    // Enhanced scroll behavior for Safari
    if (window.CSS && CSS.supports && CSS.supports('scroll-behavior', 'smooth')) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

  });

})();
