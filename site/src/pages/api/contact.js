import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting storage - in-memory Map
// Key: IP address, Value: Array of submission timestamps
const rateLimitMap = new Map();

// Clean up old rate limit entries (older than 1 hour)
function cleanupRateLimit() {
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const recentTimestamps = timestamps.filter(timestamp => timestamp > oneHourAgo);
    
    if (recentTimestamps.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recentTimestamps);
    }
  }
}

// Check rate limit for IP address
function checkRateLimit(ip) {
  cleanupRateLimit();
  
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Allow maximum 3 submissions per hour
  if (timestamps.length >= 3) {
    return false;
  }
  
  // Add current timestamp
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  
  return true;
}

// Sanitize input to prevent XSS attacks
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Validate email format with enhanced validation
function isValidEmail(email) {
  // RFC 5322 compliant regex (simplified but more robust)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) return false;
  
  // Additional validation checks
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  
  const [local, domain] = parts;
  
  // Local part validation
  if (local.length > 64) return false;
  if (local.startsWith('.') || local.endsWith('.')) return false;
  if (local.includes('..')) return false;
  
  // Domain validation
  if (domain.length > 253) return false;
  if (domain.startsWith('.') || domain.endsWith('.')) return false;
  if (domain.includes('..')) return false;
  
  // Check for valid TLD
  const domainParts = domain.split('.');
  if (domainParts.length < 2) return false;
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) return false;
  
  // Check for common invalid patterns
  const invalidPatterns = [
    /\.{2,}/,           // Multiple consecutive dots
    /@.*@/,             // Multiple @ symbols
    /\.@/,               // Dot before @
    /@\./,               // Dot after @
    /^@/,                // Starts with @
    /@$/,                // Ends with @
    /\s/,                // Contains spaces
    /[<>]/,              // Contains angle brackets
  ];
  
  return !invalidPatterns.some(pattern => pattern.test(email));
}

// Server-side validation
function validateFormData(data) {
  const errors = {};
  
  // Validate name
  if (!data.name || typeof data.name !== 'string') {
    errors.name = 'Name is required';
  } else {
    const name = data.name.trim();
    if (name.length < 2 || name.length > 100) {
      errors.name = 'Name must be between 2 and 100 characters';
    }
  }
  
  // Validate email
  if (!data.email || typeof data.email !== 'string') {
    errors.email = 'Email is required';
  } else {
    const email = data.email.trim();
    if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }
  }
  
  // Validate message
  if (!data.message || typeof data.message !== 'string') {
    errors.message = 'Message is required';
  } else {
    const message = data.message.trim();
    if (message.length < 10 || message.length > 1000) {
      errors.message = 'Message must be between 10 and 1000 characters';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Astro API route handler
export async function POST({ request }) {
  try {
    // Get client IP address for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Too many requests. Please try again later.'
      }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Parse JSON request body
    const body = await request.json();

    // Honeypot validation - reject if website field has any value
    if (body.website && body.website.trim() !== '') {
      console.error('Honeypot triggered for IP:', clientIP);
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid submission'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Server-side validation
    const validation = validateFormData(body);
    if (!validation.isValid) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Please check your input',
        errors: validation.errors
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      message: sanitizeInput(body.message)
    };

    // Send email using Resend
    try {
      const emailData = await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>',
        to: process.env.TO_EMAIL,
        replyTo: sanitizedData.email,
        subject: `New Contact Form Submission from ${sanitizedData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${sanitizedData.message}</p>
        `
      });

      console.log('Email sent successfully:', emailData.id);

      return new Response(JSON.stringify({
        success: true,
        message: 'Message sent successfully!'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });

    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return new Response(JSON.stringify({
        success: false,
        message: 'Failed to send message. Please try again.'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to send message. Please try again.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
