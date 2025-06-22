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

    // Enhanced Letter Animation for Name
    function initDecryptAnimation() {
      var decryptElements = document.querySelectorAll('.decrypt-text');
      if (!decryptElements.length) return;

      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
      var decryptDuration = 1500; // 1.5 seconds for faster decoding experience
      
      // Chrome mobile detection and optimization
      var isChromeMobile = /Chrome/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent);
      
      // Initialize each decrypt element
      for (var elementIndex = 0; elementIndex < decryptElements.length; elementIndex++) {
        initSingleDecryptElement(decryptElements[elementIndex]);
      }
      
      function initSingleDecryptElement(decryptElement) {
        var targetText = decryptElement.getAttribute('data-text') || decryptElement.textContent;
        var isAnimating = false; // Flag to prevent animation overlap
        var animationTimeout = null; // For debouncing
        var charElements = [];
        
        if (isChromeMobile) {
          // Optimize for Chrome mobile performance
          decryptElement.style.willChange = 'transform';
          decryptElement.style.webkitTransform = 'translateZ(0)';
          decryptElement.style.transform = 'translateZ(0)';
        }
        
        // Add accessibility attributes
        decryptElement.setAttribute('aria-label', targetText);
        decryptElement.setAttribute('role', 'text');
        
        // Initialize character spans with enhanced letter animation support
        function initCharSpans() {
          console.log('Initializing character spans for:', targetText);
          decryptElement.innerHTML = '';
          charElements = [];
          
          for (var i = 0; i < targetText.length; i++) {
            var charSpan = document.createElement('span');
            
            if (targetText[i] === ' ') {
              charSpan.className = 'space';
              charSpan.innerHTML = '&nbsp;';
            } else {
              charSpan.className = 'char letter locked';
              charSpan.textContent = targetText[i];
            }
            
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
          
          console.log('Character spans initialized for:', targetText, 'Total elements:', charElements.length);
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
              if (targetText[lockedChars] === ' ') {
                charElement.innerHTML = '&nbsp;';
              } else {
                charElement.textContent = targetText[lockedChars];
              }
              removeClass(charElement, 'decrypting');
              addClass(charElement, 'locked');
              // Ensure letter class is maintained for animation
              if (targetText[lockedChars] !== ' ' && !hasClass(charElement, 'letter')) {
                addClass(charElement, 'letter');
              }
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
                if (targetText[i] === ' ') {
                  charElement.innerHTML = '&nbsp;';
                } else {
                  charElement.textContent = targetText[i];
                }
                removeClass(charElement, 'decrypting');
                addClass(charElement, 'locked');
                // Ensure letter class is maintained for animation
                if (targetText[i] !== ' ' && !hasClass(charElement, 'letter')) {
                  addClass(charElement, 'letter');
                }
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
        
        // Ensure text stays decoded on mouse leave
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
              if (targetText[i] === ' ') {
                charElement.innerHTML = '&nbsp;';
              } else {
                charElement.textContent = targetText[i];
              }
              removeClass(charElement, 'decrypting');
              addClass(charElement, 'locked');
              // Ensure letter class is maintained for animation
              if (targetText[i] !== ' ' && !hasClass(charElement, 'letter')) {
                addClass(charElement, 'letter');
              }
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
      }
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

    // Projects section scroll enhancement
    function initProjectsScroll() {
      var scrollContainer = document.querySelector('.projects__scroll-container');
      if (!scrollContainer) return;
      
      var isDragging = false;
      var startX = 0;
      var scrollLeft = 0;
      var velocity = 0;
      var lastX = 0;
      var lastTime = 0;
      
      // Get scroll boundaries
      function getScrollBounds() {
        return {
          maxScroll: Math.max(0, scrollContainer.scrollWidth - scrollContainer.clientWidth),
          minScroll: 0
        };
      }
      
      // Enforce scroll boundaries
      function enforceScrollBounds(targetScroll) {
        var bounds = getScrollBounds();
        return Math.max(bounds.minScroll, Math.min(bounds.maxScroll, targetScroll));
      }
      
      // Mouse/touch drag scrolling
      function startDrag(e) {
        isDragging = true;
        startX = (e.pageX || e.touches[0].pageX) - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
        lastX = startX;
        lastTime = Date.now();
        velocity = 0;
        
        addClass(scrollContainer, 'dragging');
        scrollContainer.style.cursor = 'grabbing';
        
        // Prevent text selection
        e.preventDefault();
      }
      
      function stopDrag(e) {
        if (!isDragging) return;
        
        isDragging = false;
        removeClass(scrollContainer, 'dragging');
        scrollContainer.style.cursor = '';
        
        // Apply momentum scrolling with boundary enforcement
        var momentumDuration = Math.min(Math.abs(velocity) * 100, 2000);
        var targetScroll = scrollContainer.scrollLeft + velocity * momentumDuration / 60;
        targetScroll = enforceScrollBounds(targetScroll);
        
        if (momentumDuration > 0) {
          smoothScrollTo(scrollContainer, targetScroll, momentumDuration);
        }
      }
      
      function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        var currentX = (e.pageX || e.touches[0].pageX) - scrollContainer.offsetLeft;
        var currentTime = Date.now();
        var deltaX = currentX - startX;
        var deltaTime = currentTime - lastTime;
        
        var newScrollLeft = enforceScrollBounds(scrollLeft - deltaX);
        scrollContainer.scrollLeft = newScrollLeft;
        
        // Calculate velocity for momentum
        if (deltaTime > 0) {
          velocity = (currentX - lastX) / deltaTime * 16; // 60fps
        }
        
        lastX = currentX;
        lastTime = currentTime;
      }
      
      // Mouse events
      addEvent(scrollContainer, 'mousedown', startDrag);
      addEvent(document, 'mouseup', stopDrag);
      addEvent(document, 'mousemove', drag);
      
      // Touch events for mobile
      addEvent(scrollContainer, 'touchstart', startDrag);
      addEvent(document, 'touchend', stopDrag);
      addEvent(document, 'touchmove', drag);
      
      // Keyboard navigation with boundary enforcement
      addEvent(scrollContainer, 'keydown', function(e) {
        // Get current viewport width to calculate appropriate scroll amount
        var viewportWidth = window.innerWidth;
        var cardWidth = viewportWidth <= 600 ? 250 + 15 : 
                       viewportWidth <= 900 ? 280 + 20 :
                       viewportWidth <= 1200 ? 320 + 30 : 350 + 30;
        var scrollAmount = cardWidth;
        var bounds = getScrollBounds();
        
        switch(e.keyCode) {
          case 37: // Left arrow
            e.preventDefault();
            var targetLeft = enforceScrollBounds(scrollContainer.scrollLeft - scrollAmount);
            smoothScrollTo(scrollContainer, targetLeft, 300);
            break;
          case 39: // Right arrow
            e.preventDefault();
            var targetRight = enforceScrollBounds(scrollContainer.scrollLeft + scrollAmount);
            smoothScrollTo(scrollContainer, targetRight, 300);
            break;
          case 36: // Home
            e.preventDefault();
            smoothScrollTo(scrollContainer, bounds.minScroll, 500);
            break;
          case 35: // End
            e.preventDefault();
            smoothScrollTo(scrollContainer, bounds.maxScroll, 500);
            break;
        }
      });
      
      // Enhanced smooth scroll helper function with boundary enforcement
      function smoothScrollTo(element, target, duration) {
        var start = element.scrollLeft;
        var bounds = getScrollBounds();
        target = enforceScrollBounds(target);
        var change = target - start;
        var startTime = performance.now ? performance.now() : Date.now();
        
        function animateScroll(currentTime) {
          var elapsed = currentTime - startTime;
          var progress = Math.min(elapsed / duration, 1);
          
          // Easing function (ease-out-cubic)
          var easeProgress = 1 - Math.pow(1 - progress, 3);
          
          var newScrollLeft = start + change * easeProgress;
          element.scrollLeft = enforceScrollBounds(newScrollLeft);
          
          if (progress < 1) {
            if (window.requestAnimationFrame) {
              requestAnimationFrame(animateScroll);
            } else {
              setTimeout(function() {
                animateScroll(Date.now());
              }, 16);
            }
          }
        }
        
        if (window.requestAnimationFrame) {
          requestAnimationFrame(animateScroll);
        } else {
          animateScroll(Date.now());
        }
      }
      
      // Add scroll indicators (optional) with boundary awareness
      var projectsSection = document.querySelector('.projects');
      if (projectsSection) {
        var bounds = getScrollBounds();
        if (bounds.maxScroll > 50) { // Only show indicator if there's significant scrollable content
          var scrollIndicator = document.createElement('div');
          scrollIndicator.className = 'projects__scroll-indicator';
          scrollIndicator.innerHTML = '<span>← Scroll for more projects →</span>';
          scrollIndicator.style.cssText = 'text-align: center; padding: 10px; font-size: 0.9rem; opacity: 0.7; transition: opacity 0.3s ease;';
          projectsSection.appendChild(scrollIndicator);
          
          // Hide indicator after first scroll or when at boundaries
          var hasScrolled = false;
          addEvent(scrollContainer, 'scroll', function() {
            var currentScroll = scrollContainer.scrollLeft;
            var bounds = getScrollBounds();
            
            if (!hasScrolled && currentScroll > 50) {
              hasScrolled = true;
              scrollIndicator.style.opacity = '0';
              setTimeout(function() {
                if (scrollIndicator.parentNode) {
                  scrollIndicator.parentNode.removeChild(scrollIndicator);
                }
              }, 300);
            }
          });
        }
      }
      
      // Handle window resize to recalculate boundaries
      addEvent(window, 'resize', function() {
        // Debounce resize events
        clearTimeout(window.projectsResizeTimeout);
        window.projectsResizeTimeout = setTimeout(function() {
          var bounds = getScrollBounds();
          var currentScroll = scrollContainer.scrollLeft;
          if (currentScroll > bounds.maxScroll) {
            smoothScrollTo(scrollContainer, bounds.maxScroll, 300);
          }
        }, 250);
      });
    }
    
    // Initialize projects scroll functionality
    initProjectsScroll();

    // Achievements section scroll animations
    function initAchievementsAnimations() {
      var achievementItems = document.querySelectorAll('.achievements__item');
      if (!achievementItems.length) return;

      // Check if user prefers reduced motion
      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Intersection Observer for scroll animations
      var achievementObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var item = entry.target;
            var achievementNumber = parseInt(item.getAttribute('data-achievement')) || 0;
            
            if (prefersReducedMotion) {
              // Immediate animation for reduced motion preference
              addClass(item, 'animate-in');
            } else {
              // Much quicker staggered animation with 50ms delay between each card
              setTimeout(function() {
                addClass(item, 'animate-in');
              }, achievementNumber * 50);
            }
            
            // Stop observing this item once animated
            achievementObserver.unobserve(item);
          }
        });
      }, {
        threshold: 0.1, // Trigger when 10% of the element is visible (more responsive)
        rootMargin: '0px 0px -20px 0px' // Trigger earlier for better responsiveness
      });

      // Start observing all achievement items
      achievementItems.forEach(function(item) {
        achievementObserver.observe(item);
      });

      // Fallback for browsers without Intersection Observer support
      if (!window.IntersectionObserver) {
        console.log('Intersection Observer not supported, applying immediate animations');
        achievementItems.forEach(function(item, index) {
          if (prefersReducedMotion) {
            addClass(item, 'animate-in');
          } else {
            setTimeout(function() {
              addClass(item, 'animate-in');
            }, index * 50);
          }
        });
      }

      // Handle window resize for responsive behavior
      addEvent(window, 'resize', function() {
        // Debounce resize events for performance
        clearTimeout(window.achievementsResizeTimeout);
        window.achievementsResizeTimeout = setTimeout(function() {
          // Re-trigger animations if items are in viewport after resize
          achievementItems.forEach(function(item) {
            if (hasClass(item, 'animate-in')) {
              var rect = item.getBoundingClientRect();
              var isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
              
              if (!isInViewport) {
                removeClass(item, 'animate-in');
                achievementObserver.observe(item);
              }
            }
          });
        }, 250);
      });
    }

    // Enhanced scroll performance for achievements
    function optimizeAchievementsPerformance() {
      var achievementCards = document.querySelectorAll('.achievement-card');
      
      // Add performance optimizations
      achievementCards.forEach(function(card) {
        // Enable hardware acceleration
        card.style.transform = 'translateZ(0)';
        card.style.backfaceVisibility = 'hidden';
        card.style.perspective = '1000px';
        
        // Optimize hover animations
        addEvent(card, 'mouseenter', function() {
          if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            card.style.willChange = 'transform, box-shadow';
          }
        });
        
        addEvent(card, 'mouseleave', function() {
          card.style.willChange = 'auto';
        });
      });
    }

    // Initialize achievements section when DOM is ready
    if (document.querySelector('.achievements')) {
      initAchievementsAnimations();
      optimizeAchievementsPerformance();
      
      // Log initialization for debugging
      console.log('Achievements section initialized with', document.querySelectorAll('.achievements__item').length, 'items');
    }

    // Non-Profit Affiliations section scroll animations
    function initNonProfitAnimations() {
      var nonprofitItems = document.querySelectorAll('.nonprofits__item');
      if (!nonprofitItems.length) return;

      // Check if user prefers reduced motion
      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Intersection Observer for scroll animations
      var nonprofitObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var item = entry.target;
            var nonprofitNumber = parseInt(item.getAttribute('data-nonprofit')) || 0;
            
            if (prefersReducedMotion) {
              // Immediate animation for reduced motion preference
              addClass(item, 'animate-in');
            } else {
              // Staggered animation with 100ms delay between each card
              setTimeout(function() {
                addClass(item, 'animate-in');
              }, nonprofitNumber * 100);
            }
            
            // Stop observing this item once animated
            nonprofitObserver.unobserve(item);
          }
        });
      }, {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element comes into view
      });

      // Start observing all nonprofit items
      nonprofitItems.forEach(function(item) {
        nonprofitObserver.observe(item);
      });

      // Fallback for browsers without Intersection Observer support
      if (!window.IntersectionObserver) {
        console.log('Intersection Observer not supported, applying immediate animations');
        nonprofitItems.forEach(function(item, index) {
          if (prefersReducedMotion) {
            addClass(item, 'animate-in');
          } else {
            setTimeout(function() {
              addClass(item, 'animate-in');
            }, index * 100);
          }
        });
      }

      // Handle window resize for responsive behavior
      addEvent(window, 'resize', function() {
        // Debounce resize events for performance
        clearTimeout(window.nonprofitsResizeTimeout);
        window.nonprofitsResizeTimeout = setTimeout(function() {
          // Re-trigger animations if items are in viewport after resize
          nonprofitItems.forEach(function(item) {
            if (hasClass(item, 'animate-in')) {
              var rect = item.getBoundingClientRect();
              var isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
              
              if (!isInViewport) {
                removeClass(item, 'animate-in');
                nonprofitObserver.observe(item);
              }
            }
          });
        }, 250);
      });
    }

    // Enhanced scroll performance for nonprofits
    function optimizeNonProfitPerformance() {
      var nonprofitCards = document.querySelectorAll('.nonprofit-card');
      
      // Add performance optimizations
      nonprofitCards.forEach(function(card) {
        // Enable hardware acceleration
        card.style.transform = 'translateZ(0)';
        card.style.backfaceVisibility = 'hidden';
        card.style.perspective = '1000px';
        
        // Optimize hover animations
        addEvent(card, 'mouseenter', function() {
          if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            card.style.willChange = 'transform, box-shadow';
          }
        });
        
        addEvent(card, 'mouseleave', function() {
          card.style.willChange = 'auto';
        });
      });
    }

    // Initialize non-profit section when DOM is ready
    if (document.querySelector('.nonprofits')) {
      initNonProfitAnimations();
      optimizeNonProfitPerformance();
      
      // Log initialization for debugging
      console.log('Non-Profit section initialized with', document.querySelectorAll('.nonprofits__item').length, 'items');
    }

    // Listen for reduced motion preference changes
    if (window.matchMedia) {
      var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      // Add event listener for preference changes (modern browsers)
      if (motionQuery.addEventListener) {
        motionQuery.addEventListener('change', function() {
          if (motionQuery.matches) {
            console.log('Reduced motion preference detected, disabling complex animations');
            // Apply immediate animations if preference changes to reduced motion
            var achievementItems = document.querySelectorAll('.achievements__item:not(.animate-in)');
            achievementItems.forEach(function(item) {
              addClass(item, 'animate-in');
            });
            
            var nonprofitItems = document.querySelectorAll('.nonprofits__item:not(.animate-in)');
            nonprofitItems.forEach(function(item) {
              addClass(item, 'animate-in');
            });
          }
        });
      }
    }

    // Enhanced header scroll effect functionality with hide/show behavior
    function initHeaderScrollEffect() {
      var header = document.querySelector('.header');
      if (!header) {
        console.log('Header element not found');
        return;
      }

      console.log('Header found:', header);
      
      var lastScrollTop = 0;
      var ticking = false;

      function handleHeaderScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var scrollDelta = scrollTop - lastScrollTop;
        
        console.log('Scroll event: scrollTop=' + scrollTop + ', scrollDelta=' + scrollDelta + ', lastScrollTop=' + lastScrollTop);
        
        // Add scrolled class when scrolled past 50px
        if (scrollTop > 50) {
          addClass(header, 'scrolled');
          console.log('Added scrolled class');
        } else {
          removeClass(header, 'scrolled');
          console.log('Removed scrolled class');
        }
        
        // Show header when scrolling up or at the very top
        if (scrollDelta < -5 || scrollTop <= 10) {
          removeClass(header, 'header-hidden');
          console.log('Showing header - scrolling up or at top');
        }
        // Hide header when scrolling down and not at the top
        else if (scrollDelta > 5 && scrollTop > 200) {
          addClass(header, 'header-hidden');
          console.log('Hiding header - scrolling down');
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
      }

      // Throttle scroll events for better performance
      function requestHeaderUpdate() {
        if (!ticking) {
          if (window.requestAnimationFrame) {
            requestAnimationFrame(handleHeaderScroll);
          } else {
            setTimeout(handleHeaderScroll, 16); // ~60fps fallback
          }
          ticking = true;
        }
      }

      // Initialize event listeners
      addEvent(window, 'scroll', requestHeaderUpdate);
      
      // Initial call to set correct state
      handleHeaderScroll();
      
      console.log('Enhanced header scroll effect with hide/show initialized');
    }

    // Initialize fixed header functionality
    initHeaderScrollEffect();

  });

})();
