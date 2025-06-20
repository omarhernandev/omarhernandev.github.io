// Neural Network Background Animation
// Dynamic 3D particle system with swirling neural pathways

console.log('Neural network script loading...');

// Async function to handle Three.js loading and initialization
async function initializeNeuralNetwork() {
  console.log('Loading Three.js...');
  
  // Try to import Three.js with error handling
  let THREE;
  try {
    THREE = await import('https://cdn.skypack.dev/three');
    console.log('Three.js loaded successfully:', THREE);
  } catch (error) {
    console.error('Failed to load Three.js:', error);
    
    // Fallback: Try alternative CDN
    try {
      THREE = await import('https://unpkg.com/three@0.177.0/build/three.module.js');
      console.log('Three.js loaded from unpkg:', THREE);
    } catch (fallbackError) {
      console.error('Failed to load Three.js from fallback CDN:', fallbackError);
      return;
    }
  }

  class NeuralNetworkBackground {
    constructor() {
      console.log('Initializing Neural Network Background...');
      this.canvas = null;
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.particles = [];
      this.connections = [];
      this.animationId = null;
      this.isActive = true;
      this.time = 0;
      
      // Configuration
      this.config = {
        particleCount: 800, // Reduced for better compatibility
        connectionDistance: 80,
        cameraDistance: 250,
        rotationSpeed: 0.0008,
        colorShiftSpeed: 0.001,
        spiralRadius: 120,
        spiralHeight: 150,
        glowIntensity: 0.7
      };
      
      this.init();
    }
    
    init() {
      console.log('Finding canvas element...');
      this.canvas = document.getElementById('neural-canvas');
      if (!this.canvas) {
        console.error('Neural canvas not found! Make sure element with id="neural-canvas" exists.');
        return;
      }
      console.log('Canvas found:', this.canvas);
      
      try {
        this.setupScene();
        this.createParticles();
        this.createConnections();
        this.setupEventListeners();
        this.animate();
        
        console.log('Neural network background initialized successfully with', this.config.particleCount, 'particles');
      } catch (error) {
        console.error('Error initializing neural network:', error);
      }
    }
    
    setupScene() {
      console.log('Setting up Three.js scene...');
      
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
      this.camera.position.z = this.config.cameraDistance;
      
      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true
      });
      
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      console.log('Scene setup complete. Canvas size:', window.innerWidth, 'x', window.innerHeight);
      
      // Optimize for mobile
      if (window.innerWidth < 768) {
        this.config.particleCount = Math.floor(this.config.particleCount * 0.6);
        console.log('Mobile detected, reduced particles to:', this.config.particleCount);
      }
    }
    
    createParticles() {
      console.log('Creating particles...');
      
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(this.config.particleCount * 3);
      const colors = new Float32Array(this.config.particleCount * 3);
      const sizes = new Float32Array(this.config.particleCount);
      
      // Create helical spiral pattern
      for (let i = 0; i < this.config.particleCount; i++) {
        const progress = i / this.config.particleCount;
        const angle = progress * Math.PI * 8; // Reduced complexity
        const radius = this.config.spiralRadius * (0.4 + 0.6 * Math.random());
        const height = (progress - 0.5) * this.config.spiralHeight;
        
        // Position in spiral with some randomness
        positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = height + (Math.random() - 0.5) * 30;
        positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 20;
        
        // Dynamic colors (blue to purple spectrum)
        const hue = (progress * 0.4 + 0.6) % 1; // More blue-focused
        const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        // Varying sizes
        sizes[i] = Math.random() * 2 + 1;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Particle material with glow effect
      const material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      this.particles = new THREE.Points(geometry, material);
      this.scene.add(this.particles);
      
      console.log('Particles created and added to scene');
    }
    
    createConnections() {
      console.log('Creating connection lines...');
      
      // Create connection lines between nearby particles
      const positions = this.particles.geometry.attributes.position.array;
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = [];
      const lineColors = [];
      
      let connectionCount = 0;
      for (let i = 0; i < this.config.particleCount; i++) {
        const pos1 = new THREE.Vector3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        );
        
        // Connect to nearest neighbors (limit for performance)
        let connections = 0;
        for (let j = i + 1; j < this.config.particleCount && connections < 2; j++) {
          const pos2 = new THREE.Vector3(
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
          
          const distance = pos1.distanceTo(pos2);
          if (distance < this.config.connectionDistance) {
            // Add line
            linePositions.push(pos1.x, pos1.y, pos1.z);
            linePositions.push(pos2.x, pos2.y, pos2.z);
            
            // Add colors (cyan to blue gradient)
            const color = new THREE.Color().setHSL(0.6, 0.7, 0.4);
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
          opacity: 0.2,
          blending: THREE.AdditiveBlending
        });
        
        this.connections = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.scene.add(this.connections);
        
        console.log('Created', connectionCount, 'connection lines');
      }
    }
    
    updateColors() {
      const colors = this.particles.geometry.attributes.color.array;
      
      for (let i = 0; i < this.config.particleCount; i++) {
        const progress = i / this.config.particleCount;
        const hue = (progress * 0.4 + this.time * this.config.colorShiftSpeed + 0.6) % 1;
        const saturation = 0.7 + 0.3 * Math.sin(this.time * 0.002 + progress * Math.PI * 2);
        const lightness = 0.4 + 0.2 * Math.sin(this.time * 0.001 + progress * Math.PI * 4);
        
        const color = new THREE.Color().setHSL(hue, saturation, lightness);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
      
      this.particles.geometry.attributes.color.needsUpdate = true;
    }
    
    updatePositions() {
      const positions = this.particles.geometry.attributes.position.array;
      
      for (let i = 0; i < this.config.particleCount; i++) {
        const progress = i / this.config.particleCount;
        const baseAngle = progress * Math.PI * 8;
        const angle = baseAngle + this.time * this.config.rotationSpeed;
        const radius = this.config.spiralRadius * (0.4 + 0.6 * Math.sin(this.time * 0.0008 + progress * Math.PI));
        const height = (progress - 0.5) * this.config.spiralHeight + 15 * Math.sin(this.time * 0.001 + progress * Math.PI * 3);
        
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = height;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      
      this.particles.geometry.attributes.position.needsUpdate = true;
    }
    
    animate() {
      if (!this.isActive) return;
      
      this.animationId = requestAnimationFrame(() => this.animate());
      this.time += 1;
      
      // Update particle positions and colors
      this.updatePositions();
      this.updateColors();
      
      // Gentle camera rotation
      this.camera.position.x = Math.cos(this.time * 0.0003) * this.config.cameraDistance;
      this.camera.position.z = Math.sin(this.time * 0.0003) * this.config.cameraDistance;
      this.camera.lookAt(0, 0, 0);
      
      // Render
      this.renderer.render(this.scene, this.camera);
    }
    
    setupEventListeners() {
      console.log('Setting up event listeners...');
      
      // Resize handler
      window.addEventListener('resize', () => this.handleResize());
      
      // Intersection Observer for performance
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isActive = entry.isIntersecting;
          if (this.isActive && !this.animationId) {
            console.log('Animation resumed');
            this.animate();
          } else if (!this.isActive) {
            console.log('Animation paused');
          }
        });
      });
      
      observer.observe(this.canvas);
      
      // Page visibility API for performance
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.isActive = false;
          if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
          }
          console.log('Page hidden, animation stopped');
        } else {
          this.isActive = true;
          if (!this.animationId) {
            this.animate();
          }
          console.log('Page visible, animation started');
        }
      });
    }
    
    handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      console.log('Canvas resized to:', width, 'x', height);
    }
    
    destroy() {
      console.log('Destroying neural network background...');
      this.isActive = false;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      
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

  // Create and return the neural background instance
  return new NeuralNetworkBackground();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM loaded, checking for neural canvas...');
  
  // Only initialize on homepage
  if (document.getElementById('neural-canvas')) {
    console.log('Neural canvas found, initializing...');
    try {
      const neuralBg = await initializeNeuralNetwork();
      
      // Store reference globally for potential cleanup
      window.neuralNetworkBg = neuralBg;
      console.log('Neural network background initialized successfully');
    } catch (error) {
      console.error('Failed to initialize neural network background:', error);
    }
  } else {
    console.log('Neural canvas not found on this page');
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.neuralNetworkBg) {
    window.neuralNetworkBg.destroy();
  }
}); 