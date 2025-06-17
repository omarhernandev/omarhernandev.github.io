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

      // Safari video autoplay fix
    function initSafariVideoFix() {
      var video = document.querySelector('.main__video');
      if (!video) return;
      
      // Safari-specific video initialization
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      if (isSafari || isIOS) {
        console.log('Safari/iOS detected, applying video fixes');
        
        // Force video to load
        video.load();
        
        // Try to play video with multiple attempts
        var playAttempts = 0;
        var maxAttempts = 3;
        
        function attemptPlay() {
          playAttempts++;
          console.log('Safari video play attempt:', playAttempts);
          
          var playPromise = video.play();
          
          if (playPromise !== undefined) {
            playPromise.then(function() {
              console.log('Safari video autoplay successful');
            }).catch(function(error) {
              console.warn('Safari video autoplay failed:', error);
              
              if (playAttempts < maxAttempts) {
                setTimeout(attemptPlay, 1000);
              } else {
                console.log('Safari video autoplay failed after', maxAttempts, 'attempts');
                // Fallback: show a play button or static image
                video.poster = '../images/Home/Home-Hero.png';
              }
            });
          }
        }
        
        // Wait for video metadata to load before attempting play
        video.addEventListener('loadedmetadata', function() {
          console.log('Safari video metadata loaded');
          setTimeout(attemptPlay, 500);
        });
        
        // Additional Safari-specific event listeners
        video.addEventListener('canplaythrough', function() {
          console.log('Safari video can play through');
          if (video.paused) {
            attemptPlay();
          }
        });
        
        // Handle Safari video stalling
        video.addEventListener('stalled', function() {
          console.log('Safari video stalled, reloading');
          video.load();
        });
        
                 // Handle Safari video errors
         video.addEventListener('error', function(e) {
           console.error('Safari video error:', e);
           // Fallback to poster image
           video.poster = '../images/Home/Home-Hero.png';
         });
         
         // Add click handler for manual play (Safari fallback)
         var videoContainer = document.querySelector('.main');
         if (videoContainer) {
           videoContainer.addEventListener('click', function() {
             if (video.paused) {
               console.log('Manual video play triggered');
               video.play().catch(function(error) {
                 console.warn('Manual video play failed:', error);
               });
             }
           });
         }
       }
       
       // Universal video play attempt (for all browsers)
       setTimeout(function() {
         if (video.paused) {
           console.log('Universal video play attempt');
           video.play().catch(function(error) {
             console.warn('Universal video play failed:', error);
           });
         }
       }, 1000);
     }

    // Hero image is now handled via HTML/CSS - no JavaScript animation needed

    // Decryption Animation for Name
    function initDecryptAnimation() {
      var decryptElement = document.querySelector('.decrypt-text');
      if (!decryptElement) return;

      var targetText = decryptElement.getAttribute('data-text') || 'Omar Hernandez';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
      var decryptDuration = 2500; // 2.5 seconds for more natural decoding experience
      var isAnimating = false; // Flag to prevent animation overlap
      var animationTimeout = null; // For debouncing
      var charElements = [];
      
      // Chrome mobile detection and optimization
      var isChromeMobile = /Chrome/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent);
      if (isChromeMobile) {
        // Optimize for Chrome mobile performance
        decryptElement.style.willChange = 'transform';
        decryptElement.style.webkitTransform = 'translateZ(0)';
        decryptElement.style.transform = 'translateZ(0)';
      }
      
      // Add accessibility attributes
      decryptElement.setAttribute('aria-label', targetText);
      decryptElement.setAttribute('role', 'text');
      
      // Initialize character spans
      function initCharSpans() {
        decryptElement.innerHTML = '';
        charElements = [];
        
        for (var i = 0; i < targetText.length; i++) {
          var charSpan = document.createElement('span');
          charSpan.className = 'char locked';
          charSpan.textContent = targetText[i] === ' ' ? '\u00A0' : targetText[i];
          
          // Chrome mobile optimization for individual characters
          if (isChromeMobile) {
            charSpan.style.webkitTransform = 'translateZ(0)';
            charSpan.style.transform = 'translateZ(0)';
            charSpan.style.webkitBackfaceVisibility = 'hidden';
            charSpan.style.backfaceVisibility = 'hidden';
          }
          
          charElements.push(charSpan);
          decryptElement.appendChild(charSpan);
        }
      }
      
      function getRandomChar() {
        return chars[Math.floor(Math.random() * chars.length)];
      }
      
      // Main decryption animation function
      function startDecryptAnimation() {
        // Prevent overlapping animations
        if (isAnimating) return;
        
        isAnimating = true;
        var startTime = Date.now();
        var lockedChars = 0;
        
        // Reset all characters to decrypting state
        for (var i = 0; i < charElements.length; i++) {
          if (targetText[i] !== ' ') {
            removeClass(charElements[i], 'locked');
            addClass(charElements[i], 'decrypting');
            charElements[i].textContent = getRandomChar();
          }
        }
        
        function animate() {
          var elapsed = Date.now() - startTime;
          var progress = Math.min(elapsed / decryptDuration, 1);
          
          // Determine how many characters should be locked by now
          var shouldBeLocked = Math.floor(progress * targetText.length);
          
          // Lock characters that should be locked
          while (lockedChars < shouldBeLocked && lockedChars < targetText.length) {
            var charElement = charElements[lockedChars];
            charElement.textContent = targetText[lockedChars] === ' ' ? '\u00A0' : targetText[lockedChars];
            removeClass(charElement, 'decrypting');
            addClass(charElement, 'locked');
            lockedChars++;
          }
          
          // Update still-decrypting characters with random chars
          for (var i = lockedChars; i < charElements.length; i++) {
            if (targetText[i] !== ' ') { // Don't randomize spaces
              charElements[i].textContent = getRandomChar();
            }
          }
          
          // Continue animation if not complete
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Ensure all characters are properly locked
            for (var i = 0; i < charElements.length; i++) {
              var charElement = charElements[i];
              charElement.textContent = targetText[i] === ' ' ? '\u00A0' : targetText[i];
              removeClass(charElement, 'decrypting');
              addClass(charElement, 'locked');
            }
            isAnimating = false;
          }
        }
        
        // Reset locked character counter
        lockedChars = 0;
        animate();
      }
      
      // Initialize character spans
      initCharSpans();
      
      // Add hover functionality with debouncing
      addEvent(decryptElement, 'mouseenter', function() {
        // Clear any pending animation timeout
        if (animationTimeout) {
          clearTimeout(animationTimeout);
        }
        
        // Debounce hover events to prevent rapid triggering
        animationTimeout = setTimeout(function() {
          startDecryptAnimation();
        }, 100);
      });
      
      // Ensure name stays decoded on mouse leave
      addEvent(decryptElement, 'mouseleave', function() {
        // Clear any pending animation timeout
        if (animationTimeout) {
          clearTimeout(animationTimeout);
          animationTimeout = null;
        }
        
        // If animation is not running, ensure all characters are properly locked
        if (!isAnimating) {
          for (var i = 0; i < charElements.length; i++) {
            var charElement = charElements[i];
            charElement.textContent = targetText[i] === ' ' ? '\u00A0' : targetText[i];
            removeClass(charElement, 'decrypting');
            addClass(charElement, 'locked');
          }
        }
      });
      
      // Focus/blur events for keyboard accessibility
      addEvent(decryptElement, 'focus', function() {
        if (animationTimeout) {
          clearTimeout(animationTimeout);
        }
        animationTimeout = setTimeout(function() {
          startDecryptAnimation();
        }, 100);
      });
      
      addEvent(decryptElement, 'blur', function() {
        if (animationTimeout) {
          clearTimeout(animationTimeout);
          animationTimeout = null;
        }
      });
      
      // Initial page load animation - start after a brief delay
      setTimeout(function() {
        startDecryptAnimation();
      }, 500);
    }

    // Initialize when DOM is ready
  ready(function() {
    
    // Initialize decryption animation
    initDecryptAnimation();
    
    // Hero image is now handled via HTML/CSS - no JavaScript needed
    
    // Remove Safari video fixes (no longer needed)
    // initSafariVideoFix();
    
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

    // Mobile menu close button functionality
    var menuCloseButton = document.querySelector(".menu-close-button");
    if (menuCloseButton) {
      addEvent(menuCloseButton, 'click', function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false; // IE8 and below
        }
        
        // Close the mobile menu by removing the menu-open class
        removeClass(document.body, "menu-open");
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

    // Professional Typewriter Effect
    function initTypewriter() {
      var typewriterElement = document.getElementById('typewriter-text');
      if (!typewriterElement) return;

      var jobTitles = [
        "Software Engineer",
        "Data Engineer", 
        "Research Scientist",
        "Full-stack Developer",
        "AI Developer",
        "Cloud Engineer",
        "Machine Learning Engineer",
        "Neuroscience Researcher",
        "Python Developer",
        "ETL Architect",
        "Cybersecurity Analyst",
        "Data Analyst",
        "R&D Engineer",
        "Product Engineer",
        "Healthcare Technologist",
        "Backend Developer"
      ];

      // Fisher-Yates shuffle algorithm for randomizing array
      function shuffleArray(array) {
        var shuffled = array.slice(); // Create a copy to avoid mutating original
        for (var i = shuffled.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = shuffled[i];
          shuffled[i] = shuffled[j];
          shuffled[j] = temp;
        }
        return shuffled;
      }

      // Randomize the job titles order
      var randomizedTitles = shuffleArray(jobTitles);
      
      var currentIndex = 0;
      var currentText = '';
      var isDeleting = false;
      var typeSpeed = 80;
      var deleteSpeed = 50;
      var pauseDelay = 2000;

      function typeWriter() {
        var currentTitle = randomizedTitles[currentIndex];
        
        if (isDeleting) {
          currentText = currentTitle.substring(0, currentText.length - 1);
        } else {
          currentText = currentTitle.substring(0, currentText.length + 1);
        }

        typewriterElement.textContent = currentText;
        
        // Update aria-label for accessibility
        var typewriterContainer = typewriterElement.parentNode;
        if (typewriterContainer) {
          typewriterContainer.setAttribute('aria-label', 'Current role: ' + currentText);
        }

        var currentSpeed = typeSpeed;

        if (isDeleting) {
          currentSpeed = deleteSpeed;
        }

        if (!isDeleting && currentText === currentTitle) {
          // Finished typing, pause then start deleting
          currentSpeed = pauseDelay;
          isDeleting = true;
        } else if (isDeleting && currentText === '') {
          // Finished deleting, move to next title
          isDeleting = false;
          currentIndex = (currentIndex + 1) % randomizedTitles.length;
          
          // Re-shuffle when we complete a full cycle for continuous randomness
          if (currentIndex === 0) {
            randomizedTitles = shuffleArray(jobTitles);
          }
          
          currentSpeed = typeSpeed;
        }

        setTimeout(typeWriter, currentSpeed);
      }

      // Start the typewriter effect
      typeWriter();
    }

    // Initialize typewriter effect
    initTypewriter();

    // Interactive Quote Cycling System
    function initRandomQuote() {
      var quoteElement = document.querySelector('.main__quote');
      if (!quoteElement) return;

      var quotes = [
        "The future is already here — it's just not evenly distributed. – William Gibson",
        "Data is a precious thing and will last longer than the systems themselves. – Tim Berners-Lee",
        "Simplicity is the ultimate sophistication. – Leonardo da Vinci",
        "In God we trust. All others must bring data. – W. Edwards Deming",
        "The brain is wider than the sky. – Emily Dickinson",
        "Machines take me by surprise with great frequency. – Alan Turing",
        "Talk is cheap. Show me the code. – Linus Torvalds",
        "I am not a free software zealot; I am a software freedom activist. – Richard Stallman",
        "That brain of mine is something more than merely mortal, as time will show. – Ada Lovelace",
        "The microprocessor is not just an invention; it is a new way of thinking. – Federico Faggin",
        "Love and compassion are necessities, not luxuries. Without them, humanity cannot survive. – Dalai Lama",
        "The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom. – Isaac Asimov",
        "Innovation distinguishes between a leader and a follower. – Steve Jobs",
        "The best way to predict the future is to invent it. – Alan Kay",
        "Any sufficiently advanced technology is indistinguishable from magic. – Arthur C. Clarke",
        "First, solve the problem. Then, write the code. – John Johnson",
        "Code is like humor. When you have to explain it, it's bad. – Cory House",
        "The only way to learn a new programming language is by writing programs in it. – Dennis Ritchie"
      ];

      var currentQuoteIndex = Math.floor(Math.random() * quotes.length);
      var isAnimating = false;

      function displayQuote(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        var selectedQuote = quotes[index];
        
        // Add fade out effect
        quoteElement.style.opacity = '0';
        quoteElement.style.transform = 'translateY(10px)';
        
        setTimeout(function() {
          // Update the quote text
          quoteElement.textContent = selectedQuote;
          
          // Update aria-label for accessibility
          quoteElement.setAttribute('aria-label', 'Inspirational quote: ' + selectedQuote + '. Click to see next quote.');
          
          // Add fade in effect
          quoteElement.style.opacity = '1';
          quoteElement.style.transform = 'translateY(0)';
          
          setTimeout(function() {
            isAnimating = false;
          }, 300);
        }, 150);
      }

      function nextQuote() {
        if (isAnimating) return;
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        displayQuote(currentQuoteIndex);
      }

      // Display initial quote
      displayQuote(currentQuoteIndex);
      
      // Add click event listener for cycling quotes
      addEvent(quoteElement, 'click', nextQuote);
      
      // Add keyboard support for accessibility
      quoteElement.setAttribute('tabindex', '0');
      quoteElement.setAttribute('role', 'button');
      quoteElement.setAttribute('title', 'Click to see next inspirational quote');
      
      addEvent(quoteElement, 'keydown', function(event) {
        // Support Enter and Space keys
        if (event.keyCode === 13 || event.keyCode === 32) {
          event.preventDefault();
          nextQuote();
        }
      });
    }

    // Initialize random quote display
    initRandomQuote();

  });

})();
