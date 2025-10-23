// Matrix Rain Effect - Unified Implementation
// Used across: index.html, projects.html, experience.html

(() => {
  // Development mode detection
  const isDevelopment = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.search.includes('debug=true');
  // Configuration object for fine-tuning the Matrix rain effect
  const config = {
    streams: 80,
    fontSize: 8,
    minSpeed: 40,
    maxSpeed: 120,
    minStreamLength: 10,
    maxStreamLength: 25,
    minOpacity: 0.1,
    maxOpacity: 0.9,
    spawnRate: 0.65,
    fadeSpeed: 0.008
  };
  
  // Character sets
  const programmingSymbols = ['{', '}', '[', ']', '<', '>', '/', '\\', '|', '-', '+', '=', '0', '1', '$', '%', '&', '*'];
  const binaryDigits = ['0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1']; // More 0s and 1s for higher probability
  const japaneseKanji = ['愛', '夢', '力', '心', '光', '希', '美', '和', '道', '真', '神', '空', '火', '水', '土', '風', '雲', '星', '月', '日', '山', '川', '海', '花', '木', '石', '金', '銀', '龍', '虎', '鳥', '魚', '人', '子', '母', '父', '友', '家', '学', '書', '音', '色', '時', '間', '世', '界', '生', '命', '死', '運', '命', '未', '来', '過', '去', '現', '在'];
  
  // Matrix Rain Class
  class MatrixRain {
    constructor() {
      if (isDevelopment) console.log('Matrix Rain: Constructor called');
      this.canvas = document.getElementById('matrix-rain-canvas');
      if (isDevelopment) console.log('Matrix Rain: Canvas element:', this.canvas);
      
      if (!this.canvas) {
        return;
      }
      
      this.ctx = this.canvas.getContext('2d');
      if (isDevelopment) console.log('Matrix Rain: Canvas context:', this.ctx);
      
      if (!this.ctx) {
        return;
      }
      
      this.streams = [];
      this.animationId = null;
      this.isVisible = true;
      this.isPaused = false;
      this.lastTime = 0;
      
      if (isDevelopment) console.log('Matrix Rain: Starting initialization...');
      this.init();
      this.setupEventListeners();
      this.start();
      if (isDevelopment) console.log('Matrix Rain: Initialization complete');
    }
    
    init() {
      this.resize();
      this.setupCanvas();
      this.createStreams();
    }
    
    setupCanvas() {
      this.ctx.font = `${config.fontSize}px 'Share Tech Mono', 'Noto Sans JP', monospace`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'top';
    }
    
    resize() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Get viewport dimensions if canvas rect is 0
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      
      if (isDevelopment) console.log('Matrix Rain: Canvas dimensions:', width, 'x', height);
      
      this.canvas.width = width * dpr;
      this.canvas.height = height * dpr;
      
      this.ctx.scale(dpr, dpr);
      this.canvas.style.width = width + 'px';
      this.canvas.style.height = height + 'px';
      
      this.width = width;
      this.height = height;
      
      if (isDevelopment) console.log('Matrix Rain: Canvas resized to:', this.width, 'x', this.height);
    }
    
    createStreams() {
      this.streams = [];
      const streamCount = Math.floor(config.streams * (this.width / 1920)); // Scale with screen width
      
      for (let i = 0; i < streamCount; i++) {
        if (Math.random() < config.spawnRate) {
          this.createStream();
        }
      }
    }
    
    createStream() {
      // Create depth layers for more varied opacity
      const depthLayer = Math.random();
      let baseOpacity, opacityVariation;
      
      if (depthLayer < 0.3) {
        // Background layer - lower opacity
        baseOpacity = config.minOpacity;
        opacityVariation = 0.3;
      } else if (depthLayer < 0.7) {
        // Middle layer - medium opacity
        baseOpacity = config.minOpacity + 0.2;
        opacityVariation = 0.4;
      } else {
        // Foreground layer - higher opacity
        baseOpacity = config.minOpacity + 0.4;
        opacityVariation = 0.5;
      }
      
      const stream = {
        x: Math.random() * this.width,
        y: -Math.random() * this.height,
        speed: config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed),
        length: config.minStreamLength + Math.floor(Math.random() * (config.maxStreamLength - config.minStreamLength)),
        characters: [],
        opacity: baseOpacity + Math.random() * opacityVariation,
        depthLayer: depthLayer, // Store depth layer for rendering
        opacityFlicker: Math.random() * Math.PI * 2 // Random phase for opacity fluctuation
      };
      
      // Generate mixed character stream (40% binary, 35% programming, 25% kanji)
      for (let i = 0; i < stream.length; i++) {
        const rand = Math.random();
        let charSet;
        
        if (rand < 0.4) {
          // 40% binary digits
          charSet = binaryDigits;
        } else if (rand < 0.75) {
          // 35% programming symbols
          charSet = programmingSymbols;
        } else {
          // 25% kanji
          charSet = japaneseKanji;
        }
        
        // Add individual character opacity variation for more depth
        const trailOpacity = 1 - (i / stream.length) * 0.8; // Base trail effect
        const charOpacityVariation = 0.7 + Math.random() * 0.3; // Individual variation (0.7-1.0)
        
        stream.characters.push({
          char: charSet[Math.floor(Math.random() * charSet.length)],
          opacity: trailOpacity * charOpacityVariation, // Combined opacity
          individualFlicker: Math.random() * Math.PI * 2 // Individual flicker phase
        });
      }
      
      this.streams.push(stream);
    }
    
    updateStreams(deltaTime) {
      for (let i = this.streams.length - 1; i >= 0; i--) {
        const stream = this.streams[i];
        stream.y += (stream.speed * deltaTime) / 1000;
        
        // Occasionally change characters for variety
        if (Math.random() < 0.002) {
          const charIndex = Math.floor(Math.random() * stream.characters.length);
          const rand = Math.random();
          let charSet;
          
          if (rand < 0.4) {
            // 40% binary digits
            charSet = binaryDigits;
          } else if (rand < 0.75) {
            // 35% programming symbols
            charSet = programmingSymbols;
          } else {
            // 25% kanji
            charSet = japaneseKanji;
          }
          
          stream.characters[charIndex].char = charSet[Math.floor(Math.random() * charSet.length)];
        }
        
        // Remove streams that have fallen off screen
        if (stream.y > this.height + (stream.length * config.fontSize)) {
          this.streams.splice(i, 1);
        }
      }
      
      // Spawn new streams randomly
      while (this.streams.length < config.streams && Math.random() < config.spawnRate * 0.1) {
        this.createStream();
      }
    }
    
    renderStreams() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      
      const time = Date.now() * 0.001; // Current time for color animation
      
      for (const stream of this.streams) {
        for (let i = 0; i < stream.characters.length; i++) {
          const char = stream.characters[i];
          const x = stream.x;
          const y = stream.y + (i * config.fontSize);
          
          if (y > -config.fontSize && y < this.height) {
            // Enhanced opacity calculation with depth and flickering
            let baseOpacity = stream.opacity * char.opacity;
            
            // Add subtle time-based opacity fluctuation for depth simulation
            const streamFlicker = Math.sin(time * 1.5 + stream.opacityFlicker) * 0.1;
            const charFlicker = Math.sin(time * 2.2 + char.individualFlicker) * 0.05;
            
            // Apply depth-based opacity modulation
            const depthModulation = stream.depthLayer < 0.3 ? 
              (0.6 + Math.sin(time * 0.8 + x * 0.005) * 0.2) : // Background layer - slower, more subtle
              stream.depthLayer < 0.7 ? 
              (0.8 + Math.sin(time * 1.2 + x * 0.008) * 0.15) : // Middle layer
              (0.9 + Math.sin(time * 1.8 + x * 0.012) * 0.1); // Foreground layer - faster, less variation
            
            // Distance-based opacity variation to simulate atmospheric perspective
            const distanceFromCenter = Math.abs(x - this.width / 2) / (this.width / 2);
            const atmosphericFade = 1 - (distanceFromCenter * 0.15); // Slight fade towards edges
            
            // Combine all opacity factors
            const finalOpacity = Math.min(
              baseOpacity * depthModulation * atmosphericFade * (1 + streamFlicker + charFlicker),
              config.maxOpacity
            );
            
            // Create iridescent color effect
            const positionFactor = (x / this.width) * 360; // Horizontal color shift
            const verticalFactor = (y / this.height) * 60; // Vertical shift
            const timeFactor = time * 30; // Slow color animation over time
            const streamFactor = (i / stream.length) * 120; // Color shift along stream
            
            // Calculate HSL values for iridescent effect
            const hue = (positionFactor + verticalFactor + timeFactor + streamFactor) % 360;
            const saturation = 70 + (Math.sin(time * 2 + x * 0.01) * 20); // Dynamic saturation
            const lightness = 50 + (finalOpacity * 30); // Brighter with higher opacity
            
            // Create shimmering effect with dual-tone
            const hue2 = (hue + 60) % 360; // Complementary hue
            const alpha = finalOpacity * (0.8 + 0.2 * Math.sin(time * 3 + x * 0.02 + y * 0.01));
            
            // Primary iridescent color
            this.ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
            this.ctx.fillText(char.char, x, y);
            
            // Add subtle second layer for extra shimmer on leading characters
            // Only apply shimmer to higher opacity (foreground) characters
            if (i < 3 && stream.depthLayer > 0.5) { // Only for first few characters in foreground streams
              const shimmerAlpha = alpha * 0.3 * (stream.depthLayer - 0.5) * 2; // Scale shimmer with depth
              this.ctx.fillStyle = `hsla(${hue2}, ${saturation + 10}%, ${lightness + 15}%, ${shimmerAlpha})`;
              this.ctx.fillText(char.char, x + 0.5, y + 0.5);
            }
          }
        }
      }
    }
    
    animate(currentTime) {
      if (!this.isVisible) return;
      
      const deltaTime = currentTime - this.lastTime;
      this.lastTime = currentTime;
      
      // Only update and render if not paused
      if (!this.isPaused && deltaTime < 100) { // Cap delta time to prevent large jumps
        this.updateStreams(deltaTime);
        this.renderStreams();
      }
      
      this.animationId = requestAnimationFrame((time) => this.animate(time));
    }
    
    start() {
      if (this.animationId) return;
      this.lastTime = performance.now();
      this.animate(this.lastTime);
    }
    
    stop() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }
    
    pause() {
      this.isPaused = true;
      if (isDevelopment) console.log('Matrix Rain: Paused');
    }
    
    resume() {
      if (this.isPaused) {
        this.isPaused = false;
        this.lastTime = performance.now();
        if (!this.animationId) {
          this.start();
        }
        if (isDevelopment) console.log('Matrix Rain: Resumed');
      }
    }
    
    togglePause() {
      if (this.isPaused) {
        this.resume();
      } else {
        this.pause();
      }
      return this.isPaused;
    }
    
    setupEventListeners() {
      // Handle window resize
      window.addEventListener('resize', () => {
        this.resize();
        this.setupCanvas();
        // Don't recreate streams on resize to prevent reset during scroll
        // Existing streams will continue seamlessly
      });
      
      // Pause animation when tab is not visible
      document.addEventListener('visibilitychange', () => {
        this.isVisible = !document.hidden;
        if (this.isVisible) {
          this.lastTime = performance.now();
          this.start();
        } else {
          this.stop();
        }
      });
      
      // Handle reduced motion changes
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
          this.stop();
          const background = document.getElementById('matrix-rain-background');
          if (background) background.style.display = 'none';
        }
      });
    }
    
    destroy() {
      this.stop();
      window.removeEventListener('resize', this.resize);
      document.removeEventListener('visibilitychange', this.visibilityHandler);
    }
  }
  
  // Global variable to store the MatrixRain instance
  let matrixRainInstance = null;
  
  // Global pause state for controlling both matrix rain and wave effects
  let globalPauseState = false;
  
  // Simple function to control wave effects pause state
  function setWaveEffectsPause(isPaused) {
    const waveElements = document.querySelectorAll('.wave-text .letter');
    waveElements.forEach(letter => {
      letter.style.animationPlayState = isPaused ? 'paused' : 'running';
    });
  }
  
  // Initialize Matrix Rain
  function initMatrixRain() {
    if (isDevelopment) console.log('Matrix Rain: Initializing...');
    if (isDevelopment) console.log('Matrix Rain: Document ready state:', document.readyState);
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      if (isDevelopment) console.log('Matrix Rain: Waiting for DOM...');
      document.addEventListener('DOMContentLoaded', () => {
        if (isDevelopment) console.log('Matrix Rain: DOM loaded, creating MatrixRain...');
        try {
          matrixRainInstance = new MatrixRain();
          initMatrixControl();
        } catch (error) {
          // Error creating MatrixRain - silently fail
        }
      });
    } else {
      if (isDevelopment) console.log('Matrix Rain: DOM already loaded, creating MatrixRain...');
      try {
        matrixRainInstance = new MatrixRain();
        initMatrixControl();
      } catch (error) {
        // Error creating MatrixRain - silently fail
      }
    }
  }
  
  // Initialize Matrix Control Button
  function initMatrixControl() {
    const controlBtn = document.getElementById('matrix-control-btn');
    const iconPath = document.getElementById('matrix-control-icon-path');
    
    if (!controlBtn || !iconPath || !matrixRainInstance) {
      if (isDevelopment) console.log('Matrix Rain Control: Elements not found, skipping control initialization');
      return;
    }
    
    let autoHideTimeout;
    let isUserActive = false;
    
    // Play/Pause icon paths
    const playIcon = "M8 5v14l11-7z"; // Triangle play icon
    const pauseIcon = "M6 19h4V5H6v14zm8-14v14h4V5h-4z"; // Two bars pause icon
    
    // Update button icon based on state
    function updateIcon(isPaused) {
      iconPath.setAttribute('d', isPaused ? playIcon : pauseIcon);
      controlBtn.setAttribute('aria-label', 
        isPaused ? 'Resume Matrix Rain Animation' : 'Pause Matrix Rain Animation');
      controlBtn.setAttribute('title', 
        isPaused ? 'Click to resume matrix rain' : 'Click to pause matrix rain');
    }
    
    // Show control button
    function showControl() {
      controlBtn.classList.remove('auto-hide');
      clearTimeout(autoHideTimeout);
      
      // Auto-hide after 3 seconds of inactivity
      autoHideTimeout = setTimeout(() => {
        if (!isUserActive) {
          controlBtn.classList.add('auto-hide');
        }
      }, 3000);
    }
    
    // Hide control button immediately
    function hideControl() {
      controlBtn.classList.add('auto-hide');
      clearTimeout(autoHideTimeout);
    }
    
    // Handle control button click
    controlBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      globalPauseState = !globalPauseState;
      
      // Pause/resume matrix rain
      if (matrixRainInstance) {
        if (globalPauseState) {
          matrixRainInstance.pause();
        } else {
          matrixRainInstance.resume();
        }
      }
      
      // Pause/resume wave effects
      setWaveEffectsPause(globalPauseState);
      
      updateIcon(globalPauseState);
      
      // Show briefly when clicked, then resume auto-hide behavior
      showControl();
    });
    
    // Show control on mouse movement
    let mouseMoveTimeout;
    document.addEventListener('mousemove', () => {
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        showControl();
      }, 100); // Debounce mouse movement
    });
    
    // Show control on scroll
    let scrollTimeout;
    document.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        showControl();
      }, 100); // Debounce scroll
    });
    
    // Track user activity on control button
    controlBtn.addEventListener('mouseenter', () => {
      isUserActive = true;
      clearTimeout(autoHideTimeout);
    });
    
    controlBtn.addEventListener('mouseleave', () => {
      isUserActive = false;
      showControl(); // Restart auto-hide timer
    });
    
    // Handle focus for keyboard navigation
    controlBtn.addEventListener('focus', () => {
      showControl();
      isUserActive = true;
    });
    
    controlBtn.addEventListener('blur', () => {
      isUserActive = false;
      showControl(); // Restart auto-hide timer
    });
    
    // Initialize with correct icon (starts playing)
    updateIcon(false);
    
    // Show control initially, then auto-hide
    setTimeout(() => {
      showControl();
    }, 1000); // Show after 1 second for initial visibility
    
    if (isDevelopment) console.log('Matrix Rain Control: Initialized successfully');
  }
  
  // Start the effect
  initMatrixRain();
})();
