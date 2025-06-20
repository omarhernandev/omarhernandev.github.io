// Neural Network Background Animation - Three.js Implementation
// Following the same pattern as the matrix rain animation

(function() {
  'use strict';
  
  console.log('Neural Network: Script loading...');
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.log('Neural Network: Reduced motion detected, skipping animation');
    return;
  }
  
  // Neural Network Configuration
  const config = {
    particleCount: 1200,
    connectionDistance: 120,
    cameraDistance: 300,
    rotationSpeed: 0.0008,
    colorShiftSpeed: 0.002,
    spiralRadius: 150,
    spiralHeight: 200,
    glowIntensity: 0.8,
    lineOpacity: 0.3,
    particleSize: 4,
    maxConnections: 3,
    animationSpeed: 1
  };
  
  // Three.js Neural Network Class
  class NeuralNetworkBackground {
    constructor() {
      console.log('Neural Network: Constructor called');
      this.canvas = document.getElementById('neural-canvas');
      console.log('Neural Network: Canvas element:', this.canvas);
      
      if (!this.canvas) {
        console.error('Neural Network: Canvas element not found!');
        return;
      }
      
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.particles = null;
      this.connections = null;
      this.animationId = null;
      this.isVisible = true;
      this.time = 0;
      this.lastTime = 0;
      
      console.log('Neural Network: Starting initialization...');
      this.loadThreeJS().then(() => {
        this.init();
        this.setupEventListeners();
        this.start();
        console.log('Neural Network: Initialization complete');
      }).catch(error => {
        console.error('Neural Network: Failed to load Three.js:', error);
      });
    }
    
    async loadThreeJS() {
      console.log('Neural Network: Loading Three.js...');
      
      // Try primary CDN
      try {
        const THREE = await import('https://cdn.skypack.dev/three@0.177.0');
        window.THREE = THREE;
        console.log('Neural Network: Three.js loaded from skypack');
        return THREE;
      } catch (error) {
        console.warn('Neural Network: Skypack failed, trying unpkg...', error);
        
        // Fallback CDN
        try {
          const THREE = await import('https://unpkg.com/three@0.177.0/build/three.module.js');
          window.THREE = THREE;
          console.log('Neural Network: Three.js loaded from unpkg');
          return THREE;
        } catch (fallbackError) {
          console.error('Neural Network: All CDNs failed:', fallbackError);
          throw new Error('Failed to load Three.js from any CDN');
        }
      }
    }
    
    init() {
      console.log('Neural Network: Initializing scene...');
      this.setupScene();
      this.createParticles();
      this.createConnections();
      this.resize();
      console.log('Neural Network: Scene initialization complete');
    }
    
    setupScene() {
      const THREE = window.THREE;
      
      // Scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x0a0a0a);
      
      // Camera
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.z = config.cameraDistance;
      
      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      console.log('Neural Network: Scene setup complete');
      
      // Optimize for mobile
      if (window.innerWidth < 768) {
        config.particleCount = Math.floor(config.particleCount * 0.6);
        config.connectionDistance = Math.floor(config.connectionDistance * 0.8);
        console.log('Neural Network: Mobile optimizations applied');
      }
    }
    
    createParticles() {
      console.log('Neural Network: Creating particles...');
      const THREE = window.THREE;
      
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(config.particleCount * 3);
      const colors = new Float32Array(config.particleCount * 3);
      const sizes = new Float32Array(config.particleCount);
      
      // Create helical spiral pattern
      for (let i = 0; i < config.particleCount; i++) {
        const progress = i / config.particleCount;
        const angle = progress * Math.PI * 10; // Multiple spirals
        const radius = config.spiralRadius * (0.3 + 0.7 * Math.random());
        const height = (progress - 0.5) * config.spiralHeight;
        
        // Position in spiral with organic randomness
        positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 25;
        positions[i * 3 + 1] = height + (Math.random() - 0.5) * 35;
        positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 25;
        
        // Iridescent color palette (blues, purples, cyans, pinks)
        const hue = (progress * 0.6 + 0.5) % 1; // Blue to purple spectrum
        const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        // Varying sizes for depth
        sizes[i] = Math.random() * 2 + 1;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Particle material with glow effect
      const material = new THREE.PointsMaterial({
        size: config.particleSize,
        vertexColors: true,
        transparent: true,
        opacity: config.glowIntensity,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      this.particles = new THREE.Points(geometry, material);
      this.scene.add(this.particles);
      
      console.log('Neural Network: Particles created and added to scene');
    }
    
    createConnections() {
      console.log('Neural Network: Creating neural pathways...');
      const THREE = window.THREE;
      
      const positions = this.particles.geometry.attributes.position.array;
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = [];
      const lineColors = [];
      
      let connectionCount = 0;
      for (let i = 0; i < config.particleCount; i++) {
        const pos1 = new THREE.Vector3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        );
        
        // Connect to nearest neighbors
        let connections = 0;
        for (let j = i + 1; j < config.particleCount && connections < config.maxConnections; j++) {
          const pos2 = new THREE.Vector3(
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
          
          const distance = pos1.distanceTo(pos2);
          if (distance < config.connectionDistance) {
            // Add neural pathway line
            linePositions.push(pos1.x, pos1.y, pos1.z);
            linePositions.push(pos2.x, pos2.y, pos2.z);
            
            // Iridescent connection colors
            const color = new THREE.Color().setHSL(0.6, 0.8, 0.4);
            lineColors.push(color.r, color.g, color.b);
            lineColors.push(color.r, color.g, color.b);
            
            connections++;
            connectionCount++;
          }
        }
      }
      
      if (linePositions.length > 0) {
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
        lineGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lineColors), 3));
        
        const lineMaterial = new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: config.lineOpacity,
          blending: THREE.AdditiveBlending
        });
        
        this.connections = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.scene.add(this.connections);
        
        console.log('Neural Network: Created', connectionCount, 'neural pathways');
      }
    }
    
    updateColors() {
      const THREE = window.THREE;
      const colors = this.particles.geometry.attributes.color.array;
      
      for (let i = 0; i < config.particleCount; i++) {
        const progress = i / config.particleCount;
        
        // Time-based hue shifting for iridescent effect
        const hue = (progress * 0.6 + this.time * config.colorShiftSpeed + 0.5) % 1;
        const saturation = 0.8 + 0.2 * Math.sin(this.time * 0.003 + progress * Math.PI * 2);
        const lightness = 0.4 + 0.3 * Math.sin(this.time * 0.002 + progress * Math.PI * 4);
        
        const color = new THREE.Color().setHSL(hue, saturation, lightness);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
      
      this.particles.geometry.attributes.color.needsUpdate = true;
    }
    
    updatePositions() {
      const positions = this.particles.geometry.attributes.position.array;
      
      for (let i = 0; i < config.particleCount; i++) {
        const progress = i / config.particleCount;
        const baseAngle = progress * Math.PI * 10;
        const angle = baseAngle + this.time * config.rotationSpeed;
        const radius = config.spiralRadius * (0.3 + 0.7 * Math.sin(this.time * 0.001 + progress * Math.PI));
        const height = (progress - 0.5) * config.spiralHeight + 20 * Math.sin(this.time * 0.002 + progress * Math.PI * 3);
        
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = height;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      
      this.particles.geometry.attributes.position.needsUpdate = true;
    }
    
    animate(currentTime) {
      if (!this.isVisible) return;
      
      const deltaTime = currentTime - this.lastTime;
      this.lastTime = currentTime;
      
      if (deltaTime < 100) { // Cap delta time to prevent large jumps
        this.time += config.animationSpeed;
        
        // Update particle positions and colors
        this.updatePositions();
        this.updateColors();
        
        // Gentle camera rotation for immersive depth
        this.camera.position.x = Math.cos(this.time * 0.0005) * config.cameraDistance;
        this.camera.position.z = Math.sin(this.time * 0.0005) * config.cameraDistance;
        this.camera.lookAt(0, 0, 0);
        
        // Render the scene
        this.renderer.render(this.scene, this.camera);
      }
      
      this.animationId = requestAnimationFrame((time) => this.animate(time));
    }
    
    start() {
      if (this.animationId) return;
      this.lastTime = performance.now();
      this.animate(this.lastTime);
      console.log('Neural Network: Animation started');
    }
    
    stop() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
        console.log('Neural Network: Animation stopped');
      }
    }
    
    resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      console.log('Neural Network: Canvas resized to:', width, 'x', height);
    }
    
    setupEventListeners() {
      console.log('Neural Network: Setting up event listeners...');
      
      // Handle window resize
      window.addEventListener('resize', () => {
        this.resize();
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
          const background = document.getElementById('neural-canvas');
          if (background) background.style.display = 'none';
        }
      });
    }
    
    destroy() {
      console.log('Neural Network: Destroying...');
      this.stop();
      
      if (this.renderer) {
        this.renderer.dispose();
      }
      
      if (this.particles) {
        this.particles.geometry.dispose();
        this.particles.material.dispose();
      }
      
      if (this.connections) {
        this.connections.geometry.dispose();
        this.connections.material.dispose();
      }
    }
  }
  
  // Initialize Neural Network
  function initNeuralNetwork() {
    console.log('Neural Network: Initializing...');
    console.log('Neural Network: Document ready state:', document.readyState);
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      console.log('Neural Network: Waiting for DOM...');
      document.addEventListener('DOMContentLoaded', () => {
        console.log('Neural Network: DOM loaded, creating Neural Network...');
        try {
          new NeuralNetworkBackground();
        } catch (error) {
          console.error('Neural Network: Error creating Neural Network:', error);
        }
      });
    } else {
      console.log('Neural Network: DOM already loaded, creating Neural Network...');
      try {
        new NeuralNetworkBackground();
      } catch (error) {
        console.error('Neural Network: Error creating Neural Network:', error);
      }
    }
  }
  
  // Start the effect
  initNeuralNetwork();
  
})(); 