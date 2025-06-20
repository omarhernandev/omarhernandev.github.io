// Neural Network Background Animation
// Dynamic 3D particle system with swirling neural pathways

import * as THREE from 'https://cdn.skypack.dev/three';

class NeuralNetworkBackground {
  constructor() {
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
      particleCount: 1500,
      connectionDistance: 100,
      cameraDistance: 300,
      rotationSpeed: 0.001,
      colorShiftSpeed: 0.002,
      spiralRadius: 150,
      spiralHeight: 200,
      glowIntensity: 0.8
    };
    
    this.init();
  }
  
  init() {
    this.canvas = document.getElementById('neural-canvas');
    if (!this.canvas) {
      console.error('Neural canvas not found');
      return;
    }
    
    this.setupScene();
    this.createParticles();
    this.createConnections();
    this.setupEventListeners();
    this.animate();
    
    console.log('Neural network background initialized with', this.config.particleCount, 'particles');
  }
  
  setupScene() {
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
    
    // Optimize for mobile
    if (window.innerWidth < 768) {
      this.config.particleCount = Math.floor(this.config.particleCount * 0.6);
    }
  }
  
  createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.config.particleCount * 3);
    const colors = new Float32Array(this.config.particleCount * 3);
    const sizes = new Float32Array(this.config.particleCount);
    
    // Create helical spiral pattern
    for (let i = 0; i < this.config.particleCount; i++) {
      const progress = i / this.config.particleCount;
      const angle = progress * Math.PI * 12; // Multiple spirals
      const radius = this.config.spiralRadius * (0.3 + 0.7 * Math.random());
      const height = (progress - 0.5) * this.config.spiralHeight;
      
      // Position in spiral with some randomness
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = height + (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 30;
      
      // Dynamic colors (will be updated in animation)
      const hue = (progress * 0.6 + 0.5) % 1; // Blue to purple spectrum
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Varying sizes
      sizes[i] = Math.random() * 3 + 1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Particle material with glow effect
    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }
  
  createConnections() {
    // Create connection lines between nearby particles
    const positions = this.particles.geometry.attributes.position.array;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const lineColors = [];
    
    for (let i = 0; i < this.config.particleCount; i++) {
      const pos1 = new THREE.Vector3(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );
      
      // Connect to nearest neighbors
      let connections = 0;
      for (let j = i + 1; j < this.config.particleCount && connections < 3; j++) {
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
          
          // Add colors (cyan to purple gradient)
          const color = new THREE.Color().setHSL(0.6, 0.8, 0.4);
          lineColors.push(color.r, color.g, color.b);
          lineColors.push(color.r, color.g, color.b);
          
          connections++;
        }
      }
    }
    
    if (linePositions.length > 0) {
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
      lineGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lineColors), 3));
      
      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });
      
      this.connections = new THREE.LineSegments(lineGeometry, lineMaterial);
      this.scene.add(this.connections);
    }
  }
  
  updateColors() {
    const colors = this.particles.geometry.attributes.color.array;
    
    for (let i = 0; i < this.config.particleCount; i++) {
      const progress = i / this.config.particleCount;
      const hue = (progress * 0.6 + this.time * this.config.colorShiftSpeed + 0.5) % 1;
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
    
    for (let i = 0; i < this.config.particleCount; i++) {
      const progress = i / this.config.particleCount;
      const baseAngle = progress * Math.PI * 12;
      const angle = baseAngle + this.time * this.config.rotationSpeed;
      const radius = this.config.spiralRadius * (0.3 + 0.7 * Math.sin(this.time * 0.001 + progress * Math.PI));
      const height = (progress - 0.5) * this.config.spiralHeight + 20 * Math.sin(this.time * 0.002 + progress * Math.PI * 3);
      
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
    this.camera.position.x = Math.cos(this.time * 0.0005) * this.config.cameraDistance;
    this.camera.position.z = Math.sin(this.time * 0.0005) * this.config.cameraDistance;
    this.camera.lookAt(0, 0, 0);
    
    // Render
    this.renderer.render(this.scene, this.camera);
  }
  
  setupEventListeners() {
    // Resize handler
    window.addEventListener('resize', () => this.handleResize());
    
    // Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isActive = entry.isIntersecting;
        if (this.isActive && !this.animationId) {
          this.animate();
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
      } else {
        this.isActive = true;
        if (!this.animationId) {
          this.animate();
        }
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
  }
  
  destroy() {
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on homepage
  if (document.getElementById('neural-canvas')) {
    const neuralBg = new NeuralNetworkBackground();
    
    // Store reference globally for potential cleanup
    window.neuralNetworkBg = neuralBg;
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.neuralNetworkBg) {
    window.neuralNetworkBg.destroy();
  }
}); 