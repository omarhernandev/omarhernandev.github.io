// Simple Neural Network Background - No Module Dependencies
console.log('Simple neural network script loading...');

// Simple particle system without Three.js
class SimpleNeuralNetwork {
  constructor() {
    console.log('Initializing Simple Neural Network...');
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.isActive = true;
    this.time = 0;
    
    this.config = {
      particleCount: 150,
      connectionDistance: 100,
      particleSize: 2,
      lineWidth: 1,
      speed: 0.5
    };
    
    this.init();
  }
  
  init() {
    console.log('Finding canvas element...');
    this.canvas = document.getElementById('neural-canvas');
    if (!this.canvas) {
      console.error('Neural canvas not found!');
      return;
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.setupCanvas();
    this.createParticles();
    this.setupEventListeners();
    this.animate();
    
    console.log('Simple neural network initialized with', this.config.particleCount, 'particles');
  }
  
  setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    console.log('Canvas setup complete:', this.canvas.width, 'x', this.canvas.height);
  }
  
  createParticles() {
    console.log('Creating particles...');
    this.particles = [];
    
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.speed,
        vy: (Math.random() - 0.5) * this.config.speed,
        hue: Math.random() * 60 + 200, // Blue to purple range
        brightness: Math.random() * 0.5 + 0.5
      });
    }
    
    console.log('Particles created');
  }
  
  drawParticles() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Update color
      particle.hue = (particle.hue + 0.1) % 360;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, this.config.particleSize, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${particle.hue}, 80%, 60%, ${particle.brightness})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = `hsla(${particle.hue}, 80%, 60%, 0.8)`;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
  }
  
  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.config.connectionDistance) {
          const opacity = 1 - (distance / this.config.connectionDistance);
          
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `hsla(220, 80%, 50%, ${opacity * 0.3})`;
          this.ctx.lineWidth = this.config.lineWidth;
          this.ctx.stroke();
        }
      }
    }
  }
  
  animate() {
    if (!this.isActive) return;
    
    this.animationId = requestAnimationFrame(() => this.animate());
    this.time += 1;
    
    // Clear canvas with fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw connections first (behind particles)
    this.drawConnections();
    
    // Draw particles
    this.drawParticles();
  }
  
  setupEventListeners() {
    console.log('Setting up event listeners...');
    
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      console.log('Canvas resized to:', this.canvas.width, 'x', this.canvas.height);
    });
    
    // Page visibility API
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.isActive = false;
        if (this.animationId) {
          cancelAnimationFrame(this.animationId);
          this.animationId = null;
        }
        console.log('Animation paused');
      } else {
        this.isActive = true;
        if (!this.animationId) {
          this.animate();
        }
        console.log('Animation resumed');
      }
    });
  }
  
  destroy() {
    console.log('Destroying simple neural network...');
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, checking for neural canvas...');
  
  if (document.getElementById('neural-canvas')) {
    console.log('Neural canvas found, initializing simple version...');
    try {
      const simpleNeural = new SimpleNeuralNetwork();
      window.simpleNeuralNetwork = simpleNeural;
      console.log('Simple neural network initialized successfully');
    } catch (error) {
      console.error('Failed to initialize simple neural network:', error);
    }
  } else {
    console.log('Neural canvas not found on this page');
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.simpleNeuralNetwork) {
    window.simpleNeuralNetwork.destroy();
  }
}); 