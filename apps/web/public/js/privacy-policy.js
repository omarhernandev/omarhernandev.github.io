/**
 * Privacy Policy Modal
 * Reusable modal component for displaying privacy policy across all pages
 */

// Privacy Policy Modal HTML Template
const privacyModalHTML = `
  <div class="modal" id="privacy-modal" aria-hidden="true" role="dialog" aria-labelledby="privacy-modal-title">
    <div class="modal__backdrop"></div>
    <div class="modal__container">
      <div class="modal__header">
        <h2 class="modal__title" id="privacy-modal-title">Privacy Policy</h2>
        <button class="modal__close" id="close-privacy-modal" aria-label="Close privacy policy modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="modal__content">
        <div class="modal__text">
          <p>This website collects limited personal information through the contact form, including your name, email address, and message. This information is used solely to respond to your inquiry and will not be sold, shared, or used for marketing purposes.</p>
          <p>Messages are delivered directly to the site owner's email inbox and are retained only as long as necessary to handle the communication. No cookies, tracking pixels, or analytics tools are used on this site.</p>
          <p>By submitting the contact form, you consent to the use of your information for the purposes stated above. If you wish to have your information deleted, please indicate this in your message.</p>
          <p>© 2025 Omar Hernandez</p>
        </div>
      </div>
    </div>
  </div>
`;

// Privacy Policy Modal Functionality
class PrivacyPolicyModal {
  constructor() {
    this.modal = null;
    this.openBtn = null;
    this.closeBtn = null;
    this.backdrop = null;
    this.body = document.body;
    
    this.init();
  }
  
  init() {
    // Add modal HTML to page if it doesn't exist
    this.addModalToPage();
    
    // Get references to modal elements
    this.modal = document.getElementById('privacy-modal');
    this.openBtn = document.getElementById('privacy-policy-link');
    this.closeBtn = document.getElementById('close-privacy-modal');
    this.backdrop = this.modal?.querySelector('.modal__backdrop');
    
    if (this.modal && this.openBtn) {
      this.setupEventListeners();
    }
  }
  
  addModalToPage() {
    // Check if modal already exists
    if (document.getElementById('privacy-modal')) {
      return;
    }
    
    // Add modal HTML before closing body tag
    const body = document.body;
    body.insertAdjacentHTML('beforeend', privacyModalHTML);
  }
  
  setupEventListeners() {
    // Open modal event listener
    this.openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.openModal();
    });
    
    // Close modal event listeners
    this.closeBtn?.addEventListener('click', () => this.closeModal());
    this.backdrop?.addEventListener('click', () => this.closeModal());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
        this.closeModal();
      }
    });
  }
  
  // Calculate scrollbar width for body padding compensation
  getScrollbarWidth() {
    const scrollDiv = document.createElement('div');
    scrollDiv.style.cssText = 'width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;';
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }
  
  openModal() {
    if (!this.modal) return;
    
    // Prevent body scroll and compensate for scrollbar
    const scrollbarWidth = this.getScrollbarWidth();
    this.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    this.body.classList.add('modal-open');
    
    // Show modal
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    
    // Focus management
    this.closeBtn?.focus();
    
    // Trap focus within modal
    this.trapFocus();
  }
  
  closeModal() {
    if (!this.modal) return;
    
    // Hide modal
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    this.body.classList.remove('modal-open');
    this.body.style.removeProperty('--scrollbar-width');
    
    // Return focus to trigger button
    this.openBtn?.focus();
  }
  
  trapFocus() {
    const focusableElements = this.modal.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
}

// Initialize privacy policy modal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new PrivacyPolicyModal();
});
